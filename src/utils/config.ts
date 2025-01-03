export const getConfig = (key: string) => {
    // @ts-expect-error
    return window.env?.[key];
};