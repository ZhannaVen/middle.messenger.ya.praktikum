import Block from '../../services/Block';
import {Link} from '../../components/Link';
import {Label} from '../../components/Label';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import * as utils from "../../utils/validators";
import {getFormData} from "../../utils/helpFunctions";



export class AuthorizePage extends Block {
    constructor(changePage: (page: string) => void) {
        super({
            loginLabel: new Label({
                forAttr: "login-input",
                text: "Логин"
            }),
            loginInput: new Input({
                id: 'login-input',
                name:"login",
                type:"text",
                placeholder:"ivanivanov",
                onBlur: (event: Event) => {
                    console.log('login blur');
                    const loginValue = (event.target as HTMLInputElement).value;
                    if (utils.validateLogin(loginValue)) {
                        console.log('Login is valid');
                    } else {
                        console.log('Login is invalid');
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            passwordLabel: new Label({
                forAttr: "password-input",
                text: "Пароль"
            }),
            passwordInput: new Input({
                id:"password-input",
                name:"password",
                type:"text",
                placeholder:"***********",
                onBlur: (event: Event) => {
                    console.log('password blur');
                    const passwordValue = (event.target as HTMLInputElement).value;
                    if (utils.validatePassword(passwordValue)) {
                        console.log('Password is valid');
                    } else {
                        console.log('Password name invalid');
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            authorizeButton: new Button({
                id:"submit-authorization",
                text:"Авторизоваться",
                onClick: (event: Event) => {
                    console.log('CLICK Submit button');
                    const loginValue = (document.querySelector('#login-input') as HTMLInputElement).value;
                    const passwordValue = (document.querySelector('#password-input') as HTMLInputElement).value;
                    if (
                        (utils.validateLogin(loginValue)) &&
                        (utils.validatePassword(passwordValue))
                    ) {
                        console.log('Данные провалидированы');
                        console.log('Данные из формы:');
                        const form = document.querySelector('.login-form') as HTMLFormElement;
                        if (form) {
                            const formData = getFormData(form);
                            console.log(formData);
                            changePage('chats')
                        }
                    } else {
                        console.log('Необходимо правильно заполнить данные');
                    }
                    event.preventDefault();
                    event.stopPropagation();
                }
            }),
            registerLink: new Link({
                href: '#',
                'data-page': 'register',
                text: 'Нет аккаунта?',
                class: 'register-link',
                onClick: (event: Event) => {
                    console.log('CLICK');
                    changePage('register');
                    event.preventDefault();
                    event.stopPropagation();

                },
            }),
        });
    }

    override render(): string {
        return `
                 <div id="app">
                    <main class="login-container">
                      <h1>Вход</h1>
                       <form class="login-form">
                         {{{ loginLabel }}}
                         {{{ loginInput }}}
                         {{{ passwordLabel }}}
                         {{{ passwordInput }}}
                         {{{ authorizeButton }}}
                         {{{ registerLink }}}
                       </form>
                    </main>
                 </div>
                     `;
    }
}