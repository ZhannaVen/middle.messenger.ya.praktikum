interface queryStringifyParams {
    data: {
        [key: string]: unknown;
    };
}

export const queryStringify = (data: queryStringifyParams) => {
    const mapped = Object.entries(data).map(([key, value]) => {
        if (typeof value === 'object') {
            value.toString();
        }
        return `${key}=${value}`;
    });

    return `?${mapped.join('&')}`;
};