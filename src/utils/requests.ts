const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
} as const;

type Method = keyof typeof METHODS;

interface RequestOptions {
    headers?: Record<string, string>;
    method?: Method;
    data?: Record<string, any> | FormData;
    timeout?: number;
}

function queryStringify(data: Record<string, any>): string {
    if (typeof data !== 'object' || data === null) {
        throw new Error('Data must be an object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

type HTTPMethod = <R = XMLHttpRequest>(url: string, options?: RequestOptions) => Promise<R>;

class HTTPTransport {

    get: HTTPMethod = (url, options = {}) =>
        this.request(url, { ...options, method: METHODS.GET }, options.timeout);

    post: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method: METHODS.POST}, options.timeout)
    )

    put: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method: METHODS.PUT}, options.timeout)
    )

    delete: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method: METHODS.DELETE}, options.timeout)
    )

    private request<R = XMLHttpRequest>(
        url: string,
        options: RequestOptions = { method: METHODS.GET },
        timeout: number = 5000
    ): Promise<R> {
        const { headers = {}, method, data } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && data ? `${url}${queryStringify(data as Record<string, any>)}` : url
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => resolve(xhr as R);
            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    }
}

interface FetchWithRetryOptions extends RequestInit {
    tries?: number;
}

function fetchWithRetry(url: string, options: FetchWithRetryOptions = {}): Promise<Response> {
    const { tries = 1 } = options;

    function onError(err: any): Promise<Response> {
        const triesLeft = tries - 1;
        if (!triesLeft) {
            throw err;
        }

        return fetchWithRetry(url, { ...options, tries: triesLeft });
    }

    return fetch(url, options).catch(onError);
}
