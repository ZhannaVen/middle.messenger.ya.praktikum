import { JSDOM } from 'jsdom';

const jsdom = new JSDOM(`<!DOCTYPE html><html><body><div id="app"></div></body></html>`, {
    url: "http://localhost:3000",
    pretendToBeVisual: true,
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.navigator = jsdom.window.navigator;
global.FormData = jsdom.window.FormData;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
global.localStorage = jsdom.window.localStorage;
global.sessionStorage = jsdom.window.sessionStorage;
global.HTMLElement = jsdom.window.HTMLElement;
