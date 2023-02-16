export const createTokenPayload = (user: any) => {
  return { username: user.username, userId: user._id, userType: user.userType };
};

export const createWalletAddressPayload = (obj: any, walletAddress: string) => {
  return { userId: obj._id, publicAddress: walletAddress };
};