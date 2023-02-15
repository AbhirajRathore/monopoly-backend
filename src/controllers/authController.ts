import Errors from '../errors/index'
import Users from '../models/Users'
import Token from '../models/Tokens'
import { randomBytes } from 'crypto'
import { StatusCodes } from 'http-status-codes'
import  {verifyTokenAddress}  from '../utils/verify-token'
import { createWalletAddressPayload } from '../utils/createTokenPayload'
import { createLimitedTimeToken } from '../utils/jwt'

const sendToken = async (user:any, walletAddress:string, userAgent:any, ip:any) => {
  const tokenUser = createWalletAddressPayload(
    user,
    walletAddress
  )
  // check for existing token
  const existingToken = await Token.findOne({
    user: user._id
  })

  if (existingToken) {
    await Token.findOneAndDelete({ user: user._id })
  }

  const token = createLimitedTimeToken({ payload: tokenUser, expiresIn: '24h' })

  const userToken = { token, ip, userAgent, user: user._id }

  await Token.create(userToken)

  return {
    token,
    user,
  }
}

export const walletConnect = async (req:any, res:any) => {
  try {
    const { walletAddress } = req.body
    const vta = await verifyTokenAddress(req.body.token, req.body.message, walletAddress)

    if (!vta) {
      return res.status(401).json({
        err: 'BAD AUTHENTICATION'
      })
    }

    const wallets = [walletAddress]
    const ip = req.ip
    const userAgent = req.headers['user-agent']
    if (walletAddress) {
      const regex = new RegExp(`^${walletAddress.trim()}$`, 'ig')
      const walletAlreadyExists = await Users.findOne({
        wallets: { $regex: regex }
      })
      if (walletAlreadyExists && !!walletAddress) {
        const t = await sendToken(walletAlreadyExists, walletAddress, userAgent, ip)
        res.status(StatusCodes.OK).json({
          accessToken: t.token,
          user: {
            username: t.user.username,
            userId: t.user._id,
            wallet_address: walletAddress
          }
        })

        return
      }
    }

    const verificationToken = randomBytes(40).toString('hex')
    console.log('verificationToken: ', verificationToken)
    const createObj = {
      wallets,
      username: walletAddress,
      profileUrl: '',
      backgroundUrl: '',
      verificationToken
    }
    console.log('createObj: ', createObj)

    const user = await Users.create(createObj)
    const t = await sendToken(user, walletAddress, userAgent, ip)
    console.log('t: ', t)

    res.status(StatusCodes.OK).json({
      accessToken: t.token,
      user: {
        username: t.user.username,
        userId: t.user._id,
        wallet_address: walletAddress
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ err: 'Internal Server Error' })
  }
}

export const logout = async (req:any, res:any) => {
  try {
    await Token.findOneAndDelete({ user: req.user.userId })
    res.status(StatusCodes.OK).json({ msg: 'User logged out!' })
  } catch (error:any) {
    throw new Errors.BadRequestError(error.message)
  }
}