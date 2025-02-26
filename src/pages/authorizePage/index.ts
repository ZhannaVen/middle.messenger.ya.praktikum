import Block from '../../services/Block';
import {Link} from '../../components/Link';
import {Label} from '../../components/Label';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import {errorMessage} from "../../components/errorMessage";
import * as utils from "../../utils/validators";
import {getFormData} from "../../utils/helpFunctions";
import * as messages from "../../utils/constances";
import {AuthController} from "../../controllers/auth-controller";
import { SignInData} from '../../utils/types';
import {State} from "../../services/Store";
import {connect} from "../../services/HOC";
// import {ProfilePage} from "../profilePages/showUserInfo";


export class AuthorizePage extends Block {
    constructor() {
        super({
            loginLabel: new Label({
                for: "login-input",
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
                        (this.children.errorMessageLogin as Block).setProps({error: ""});

                    } else {
                        console.log('Login is invalid');
                        (this.children.errorMessageLogin as Block).setProps({error: messages.wrongLogin})

                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            errorMessageLogin: new errorMessage({
                error: ""
            }),
            passwordLabel: new Label({
                for: "password-input",
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
                        (this.children.errorMessagePassword as Block).setProps({error: ""});
                    } else {
                        console.log('Password name invalid');
                        (this.children.errorMessagePassword as Block).setProps({error: messages.wrongPassword});
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            errorMessagePassword: new errorMessage({
                error: ""
            }),
            authorizeButton: new Button({
                id:"submit-authorization",
                text:"Авторизоваться",
                onClick: async (event: Event) => {
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
                            await AuthController.signin(formData as unknown as SignInData);
                        }
                    } else {
                        console.log('Необходимо правильно заполнить данные');
                    }
                    event.preventDefault();
                    event.stopPropagation();
                }
            }),
            registerLink: new Link({
                href: '/sign-up',
                'data-page': 'register',
                text: 'Нет аккаунта?',
                class: 'register-link',
            }),
        });
    }

    render() {
        return (`
                 <div id="app">
                    <main class="login-container">
                      <h1>Вход</h1>
                       <form class="login-form">
                         {{{ loginLabel }}}
                         {{{ loginInput }}}
                         {{{ errorMessageLogin }}}
                         {{{ passwordLabel }}}
                         {{{ passwordInput }}}
                         {{{ errorMessagePassword }}}
                         {{{ authorizeButton }}}
                         {{{ registerLink }}}
                       </form>
                    </main>
                 </div>
                     `);
    }
}

const mapStateToProps = (state: State) => ({ user: state.user });

export const AuthorizeWithProps = connect(mapStateToProps)(AuthorizePage);
