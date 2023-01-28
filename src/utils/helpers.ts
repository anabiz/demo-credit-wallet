export const generateWalletId = (): string =>{
    return (Math.floor(100000000 + Math.random() * 900000000)).toString();
}

export const validateWalletId = (walletId: string): boolean =>{
    if(walletId.length === 9 && /^\d+$/.test(walletId))
      return true;
    return false;  
}