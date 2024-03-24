export const getRandomDateBetween = (from: Date, to: Date): Date => {
    const fromTime = from.getTime();
    const toTime = to.getTime();
    return new Date(fromTime + Math.random() * (toTime - fromTime));
};
