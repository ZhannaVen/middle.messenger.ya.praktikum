import { merge } from './merge';

type Indexed<T = Record<string, unknown>> = {
    [key in string]: T;
};

export const set = (object: Indexed | unknown, path: string, value: unknown): Indexed | unknown => {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    const result = path.split('.').reduceRight<Indexed>(
        (acc, key) => ({
            [key]: acc,
        }),
        value as any,
    );
    return merge(object as Indexed, result);
};
