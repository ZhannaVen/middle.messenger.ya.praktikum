import {expect} from 'chai';
import {Router} from "./Router.js";
import {AuthorizePage} from "../pages/authorizePage/index.js";
import {RegisterPage} from "../pages/registerPage/index.js";


describe('Test that Router', () => {
    let router: Router;

    beforeEach(() => {
        let appElement = global.document.querySelector('#app');
        if (!appElement) {
            appElement = global.document.createElement('div');
            appElement.id = 'app';
            global.document.body.appendChild(appElement);
        } else {
            appElement.innerHTML = '';
        }
        router = new Router('app');
    });

    afterEach(() => {
        window.history.replaceState({}, '', '/');
    });

    it('renders content on a given route', () => {
        router.use('/', AuthorizePage).use('/sign-up', RegisterPage);
        router.start();
        router.go('/sign-up');

        const appElement = global.document.querySelector('#app');
        const heading = appElement?.querySelector('h1');
        expect(heading).not.to.be.null;
        expect(heading!.textContent).to.equal('Регистрация');
    });

    it('goes back', async () => {
        router.use('/', AuthorizePage).use('/sign-up', RegisterPage);
        router.start();
        router.go('/sign-up');

        await new Promise(r => setTimeout(r, 10));

        const popstatePromise = new Promise<void>((resolve) => {
            window.addEventListener('popstate', () => resolve(), { once: true });
        });
        router.back();
        await popstatePromise;

        await new Promise(r => setTimeout(r, 10));

        const appElement = global.document.querySelector('#app');
        expect(appElement).not.to.be.null;
        const heading = appElement?.querySelector('h1');
        expect(heading).not.to.be.null;
        expect(heading!.textContent).to.equal('Вход');
    });

    it('goes forward', async () => {
        router.use('/', AuthorizePage).use('/sign-up', RegisterPage);
        router.start();
        router.go('/sign-up');

        await new Promise(r => setTimeout(r, 10));

        const popstateBack = new Promise<void>((resolve) => {
            window.addEventListener('popstate', () => resolve(), { once: true });
        });
        router.back();
        await popstateBack;
        await new Promise(r => setTimeout(r, 10));

        const popstateForward = new Promise<void>((resolve) => {
            window.addEventListener('popstate', () => resolve(), { once: true });
        });
        router.forward();
        await popstateForward;
        await new Promise(r => setTimeout(r, 10));

        const appElement = global.document.querySelector('#app');
        expect(appElement).not.to.be.null;
        const heading = appElement?.querySelector('h1');
        expect(heading).not.to.be.null;
        expect(heading!.textContent).to.equal('Регистрация');
    });
});
