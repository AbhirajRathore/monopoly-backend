import Web3 from 'web3'

export const verifyTokenAddress = async (
  token: string,
  message: string,
  walletAddress: string
) => {
    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/')
    const verify = web3.eth.accounts.recover(message, token)
    if (verify.toLowerCase() !== walletAddress.toLowerCase()) return false
    return true
}
