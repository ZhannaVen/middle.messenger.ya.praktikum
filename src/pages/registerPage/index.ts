import Block from '../../services/Block';
import {Link} from '../../components/Link';
import {Label} from '../../components/Label';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import {errorMessage} from "../../components/errorMessage";
import * as utils from '../../utils/validators'
import * as messages from '../../utils/constances'
import {getFormData} from "../../utils/helpFunctions";
import {AuthController} from "../../controllers/auth-controller";
import {SignUpData} from '../../utils/types';
import {State} from "../../services/Store";
import {connect} from "../../services/HOC";


export class RegisterPage extends Block {
    constructor() {
        super({
            emailLabel: new Label({
                for:"email-input",
                text:"Почта"
            }),
            emailInput: new Input({
                id: "email-input",
                name: "email",
                type: "text",
                placeholder: "pochta@yandex.ru",
                onBlur: (event: Event) => {
                    console.log('email blur');
                    const emailValue = (event.target as HTMLInputElement).value;
                    if (utils.validateEmail(emailValue)) {
                        console.log('Email is valid');
                        (this.children.errorMessageEmail as Block).setProps({error: ""});
                    } else {
                        console.log('Email is invalid');
                        (this.children.errorMessageEmail as Block).setProps({error: messages.wrongEmail})
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            errorMessageEmail: new errorMessage({
                error: ""
            }),
            loginLabel: new Label({
                for:"login-input",
                text:"Логин"
            }),
            loginInput: new Input({
                id: "login-input",
                name: "login",
                type: "text",
                placeholder: "ivanivanov",
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
            firstnameLabel: new Label({
                for:"firstname-input",
                text:"Имя"
            }),
            firstnameInput: new Input({
                id: "firstname-input",
                name: "first_name",
                type: "text",
                placeholder: "Иван",
                onBlur: (event: Event) => {
                    console.log('first name blur');
                    const firstNameValue = (event.target as HTMLInputElement).value;
                    if (utils.validateName(firstNameValue)) {
                        console.log('First name is valid');
                        (this.children.errorMessageFirstname as Block).setProps({error: ""});
                    } else {
                        console.log('First name invalid');
                        (this.children.errorMessageFirstname as Block).setProps({error: messages.wrongName})
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            errorMessageFirstname: new errorMessage({
                error: ""
            }),
            lastnameLabel: new Label({
                for:"lastname-input",
                text:"Фамилия"
            }),
            lastnameInput: new Input({
                id: "lastname-input",
                name: "second_name",
                type: "text",
                placeholder: "Иванов",
                onBlur: (event: Event) => {
                    console.log('last name blur');
                    const lastNameValue = (event.target as HTMLInputElement).value;
                    if (utils.validateName(lastNameValue)) {
                        console.log('Last name is valid');
                        (this.children.errorMessageLastname as Block).setProps({error: ""});
                    } else {
                        console.log('Last name invalid');
                        (this.children.errorMessageLastname as Block).setProps({error: messages.wrongName})
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            errorMessageLastname: new errorMessage({
                error: ""
            }),
            phoneLabel: new Label({
                for:"phone-input",
                text:"Телефон"
            }),
            phoneInput: new Input({
                id: "phone-input",
                name: "phone",
                type: "text",
                placeholder: "+7 (909) 967 30 30",
                onBlur: (event: Event) => {
                    console.log('phone blur');
                    const phoneValue = (event.target as HTMLInputElement).value;
                    if (utils.validatePhone(phoneValue)) {
                        console.log('Phone is valid');
                        (this.children.errorMessagePhone as Block).setProps({error: ""});
                    } else {
                        console.log('Phone name invalid');
                        (this.children.errorMessagePhone as Block).setProps({error: messages.wrongPhone})
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            errorMessagePhone: new errorMessage({
                error: ""
            }),
            passwordLabel: new Label({
                for:"password-input",
                text:"Пароль"
            }),
            passwordInput: new Input({
                id: "password-input",
                name: "password",
                type: "text",
                placeholder: "***********",
                onBlur: (event: Event) => {
                    console.log('password blur');
                    const passwordValue = (event.target as HTMLInputElement).value;
                    if (utils.validatePassword(passwordValue)) {
                        console.log('Password is valid');
                        (this.children.errorMessagePassword as Block).setProps({error: ""});
                    } else {
                        console.log('Password name invalid');
                        (this.children.errorMessagePassword as Block).setProps({error: messages.wrongPassword})
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            errorMessagePassword: new errorMessage({
                error: ""
            }),
            password2Label: new Label({
                for:"password2-input",
                text:"Пароль (еще раз)"
            }),
            password2Input: new Input({
                id: "password2-input",
                name: "password",
                type: "text",
                placeholder: "***********",
                onBlur: (event: Event) => {
                    console.log('password2 blur');
                    const password1Value = (document.querySelector('#password-input') as HTMLInputElement).value;
                    const password2Value = (event.target as HTMLInputElement).value;
                    if (password1Value === password2Value) {
                        console.log('Пароли совпадают');
                        (this.children.errorMessagePassword2 as Block).setProps({error: ""});
                    } else {
                        console.log('Пароли не сопадают');
                        (this.children.errorMessagePassword2 as Block).setProps({error: messages.wrongPassword2})
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            errorMessagePassword2: new errorMessage({
                error: ""
            }),
            registerButton: new Button({
                text: "Зарегистрироваться",
                id: "submit-register",
                onClick: (event: Event) => {
                    console.log('CLICK Submit button');
                    const emailValue = (document.querySelector('#email-input') as HTMLInputElement).value;
                    const loginValue = (document.querySelector('#login-input') as HTMLInputElement).value;
                    const firstNameValue = (document.querySelector('#firstname-input') as HTMLInputElement).value;
                    const lastNameValue = (document.querySelector('#lastname-input') as HTMLInputElement).value;
                    const phoneValue = (document.querySelector('#phone-input') as HTMLInputElement).value;
                    const password1Value = (document.querySelector('#password-input') as HTMLInputElement).value;
                    const password2Value = (document.querySelector('#password2-input') as HTMLInputElement).value;
                    if (
                        (utils.validateEmail(emailValue)) &&
                        (utils.validateLogin(loginValue)) &&
                        (utils.validateName(firstNameValue)) &&
                        (utils.validateName(lastNameValue)) &&
                        (utils.validatePhone(phoneValue)) &&
                        (utils.validatePassword(password1Value)) &&
                        (password1Value === password2Value)
                    ) {
                        console.log('Данные провалидированы');
                        console.log('Данные из формы:');
                        const form = document.querySelector('.login-form') as HTMLFormElement;
                        if (form) {
                            const formData = getFormData(form);
                            console.log(formData);
                            if (formData) {
                                AuthController.signup(formData as unknown as SignUpData);
                            }
                        }
                    } else {
                        console.log('Необходимо правильно заполнить данные');
                    }
                    event.preventDefault();
                    event.stopPropagation();
                    }
            }),
            registerLink: new Link({
                href: "/",
                class: "login-link",
                text: "Войти",
            }),
        });
    }

    override render(): string {
        return `
                <div id="app">
                    <main class="login-container">
                        <h1>Регистрация</h1>
                        <form class="login-form">
                            <div class="register-inputs">
                              {{{ emailLabel }}}
                              {{{ emailInput }}}
                              {{{ errorMessageEmail }}}
                              {{{ loginLabel }}}
                              {{{ loginInput }}}
                              {{{ errorMessageLogin }}}
                              {{{ firstnameLabel }}}
                              {{{ firstnameInput }}}
                              {{{ errorMessageFirstname }}}
                              {{{ lastnameLabel }}}
                              {{{ lastnameInput }}}
                              {{{ errorMessageLastname }}}
                              {{{ phoneLabel }}}
                              {{{ phoneInput }}}
                              {{{ errorMessagePhone }}}
                              {{{ passwordLabel }}}
                              {{{ passwordInput }}}
                              {{{ errorMessagePassword }}}
                              {{{ password2Label }}}
                              {{{ password2Input }}}
                              {{{ errorMessagePassword2 }}}
                            </div>
                              {{{ registerButton }}}
                              {{{ registerLink }}}
                        </form>
                    </main>
                </div>
                    `;
    }
}

const mapStateToProps = (state: State) => ({ user: state.user });

export const RegisterWithProps = connect(mapStateToProps)(RegisterPage);
