import { afterEach, beforeEach, describe, it } from 'mocha';
import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { expect } from 'chai';
import { HTTPTransport } from "./requests.js";

describe('HTTPTransport: Basic Functionality', () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let instance: HTTPTransport;
    const requests: SinonFakeXMLHttpRequest[] = [];

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();
        // @ts-expect-error
        global.XMLHttpRequest = xhr;
        xhr.onCreate = (req) => {
            requests.push(req);
        };
        instance = new HTTPTransport('');
    });

    afterEach(() => {
        requests.length = 0;
        xhr.restore();
    });

    describe('HTTP methods', () => {
        const methods = [
            { name: 'get', expected: 'GET' },
            { name: 'post', expected: 'POST' },
            { name: 'put', expected: 'PUT' },
            { name: 'delete', expected: 'DELETE' },
        ];

        methods.forEach(({ name, expected }) => {
            it(`should execute ${name.toUpperCase()}() and set the HTTP method to ${expected}`, () => {
                // @ts-ignore
                instance[name]('/');
                const [request] = requests;
                expect(request.method).to.equal(expected);
            });
        });
    });

    describe('Request Data Validation', () => {
        const testCases = [
            {
                method: 'get',
                url: '/chats',
                data: { limit: 50 },
                expectedUrlPart: '?limit=50',
            },
            {
                method: 'post',
                url: '/auth/signup',
                data: { login: 'Somelogin', password: 'Somepassword1' },
                expectedBody: JSON.stringify({ login: 'Somelogin', password: 'Somepassword1' }),
            },
            {
                method: 'put',
                url: '/chats/users',
                data: { users: [123], chatId: 123 },
                expectedBody: JSON.stringify({ users: [123], chatId: 123 }),
            },
            {
                method: 'delete',
                url: '/chats',
                data: { chatId: 123 },
                expectedBody: JSON.stringify({ chatId: 123 }),
            },
        ];

        testCases.forEach(({ method, url, data, expectedUrlPart, expectedBody }) => {
            it(`should build correct request for ${method.toUpperCase()} ${url}`, () => {
                // @ts-ignore
                instance[method](url, { data });
                const [request] = requests;
                if (method === 'get' && expectedUrlPart) {
                    expect(request.url).to.include(`${url}${expectedUrlPart}`);
                } else if (expectedBody) {
                    expect(request.requestBody).to.equal(expectedBody);
                }
            });
        });
    });

    describe('Cookies Handling', () => {
        const methods = ['get', 'post', 'put', 'delete'];
        methods.forEach((method) => {
            it(`should send cookies when using ${method.toUpperCase()}() method`, () => {
                // @ts-ignore
                instance[method]('/', {});
                const [request] = requests;
                expect(request.withCredentials).to.equal(true);
            });
        });
    });
});

