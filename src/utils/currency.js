const EXCHANGE_RATE = 85;

export const formatPrice = (priceInUSD, currency) => {
    if (currency === 'INR') {
        const priceInINR = Math.round(priceInUSD * EXCHANGE_RATE);
        return `₹${priceInINR.toLocaleString('en-IN')}`;
    }
    return `$${priceInUSD.toLocaleString('en-US')}`;
};

export const convertPrice = (priceInUSD, currency) => {
    if (currency === 'INR') {
        return Math.round(priceInUSD * EXCHANGE_RATE);
    }
    return priceInUSD;
};
