import { expect } from 'chai';
import { AuthorizePage } from './index.js';
import {AuthController} from "../../controllers/auth-controller.js";

describe('AuthorizePage tests that', () => {
    let page: AuthorizePage;
    let container: HTMLElement;

    beforeEach(() => {
        page = new AuthorizePage();
        container = document.createElement('div');
        container.id = 'app';
        container.appendChild(page.getContent());
        document.body.appendChild(container);
    });

    afterEach(() => {
        container.remove();
    });


    it('there is a main element with class "login-container"', () => {
        const mainEl = container.querySelector('main.login-container');
        expect(mainEl).to.not.be.null;
    });

    it('there is a header with text "Вход"', () => {
        const header = container.querySelector('main.login-container h1');
        expect(header).to.not.be.null;
        expect(header!.textContent?.trim()).to.equal('Вход');
    });

    it('there is a form with class "login-form"', () => {
        const form = container.querySelector('form.login-form');
        expect(form).to.not.be.null;
    });

    it('there is a label for login with text "Логин"', () => {
        const loginLabel = container.querySelector('label[for="login-input"].label');
        expect(loginLabel).to.not.be.null;
        expect(loginLabel!.textContent?.trim()).to.equal('Логин');
    });

    it('there is an input with id "login-input" and placeholder "ivanivanov"', () => {
        const loginInput = container.querySelector('#login-input') as HTMLInputElement;
        expect(loginInput).to.not.be.null;
        expect(loginInput.placeholder).to.equal('ivanivanov');
    });

    it('there is a label for password with text "Пароль"', () => {
        const passwordLabel = container.querySelector('label[for="password-input"].label');
        expect(passwordLabel).to.not.be.null;
        expect(passwordLabel!.textContent?.trim()).to.equal('Пароль');
    });

    it('there is an input with id "password-input" and placeholder "***********"', () => {
        const passwordInput = container.querySelector('#password-input') as HTMLInputElement;
        expect(passwordInput).to.not.be.null;
        expect(passwordInput.placeholder).to.equal('***********');
    });

    it('there is a button with id "submit-authorization" and text "Авторизоваться"', () => {
        const button = container.querySelector('#submit-authorization') as HTMLButtonElement;
        expect(button).to.not.be.null;
        expect(button.textContent?.trim()).to.equal('Авторизоваться');
    });

    it('there is a link with class "register-link" with text "Нет аккаунта?" and href "/sign-up"', () => {
        const link = container.querySelector('a.register-link');
        expect(link).to.not.be.null;
        expect(link!.textContent?.trim()).to.equal('Нет аккаунта?');
        expect(link!.getAttribute('href')).to.equal('/sign-up');
    });
    it('there is an error message on invalid login input (blur)', () => {
        const form = container.querySelector('.login-form');
        const loginInput = form?.querySelector('#login-input') as HTMLInputElement;
        loginInput.value = 'no';
        const blurEvent = new window.Event('blur', { bubbles: true, cancelable: true });
        loginInput.dispatchEvent(blurEvent);

        const errorElement = form?.querySelector('.input-error-text');
        expect(errorElement).to.not.be.null;
        expect(errorElement!.textContent?.trim()).to.not.equal('');
    });

    it('there is a call to AuthController signin on valid authorize button click', async () => {
        let signinCalled = false;
        const originalSignin = AuthController.signin;
        AuthController.signin = async () => {
            signinCalled = true;
            return Promise.resolve();
        };

        const form = container.querySelector('.login-form');
        const loginInput = form?.querySelector('#login-input') as HTMLInputElement;
        const passwordInput = form?.querySelector('#password-input') as HTMLInputElement;
        loginInput.value = 'Somelogin';
        passwordInput.value = 'Somepassword1';

        const button = form?.querySelector('#submit-authorization');
        expect(button).to.not.be.null;
        const clickEvent = new window.MouseEvent('click', { bubbles: true, cancelable: true });
        button!.dispatchEvent(clickEvent);

        await new Promise(resolve => setTimeout(resolve, 20));
        expect(signinCalled).to.be.true;

        AuthController.signin = originalSignin;
    });

    it('there is a registration link that navigates to "/sign-up"', () => {
        const link = container.querySelector('a.register-link') as HTMLAnchorElement;
        expect(link).to.not.be.null;
        expect(link.getAttribute('href')).to.equal('/sign-up');
    });
});

