type Indexed<T = Record<string, unknown>> = {
    [key in string]: T;
};

export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
    for (const p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
};
