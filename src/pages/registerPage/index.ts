import Block from '../../services/Block';
import {Link} from '../../components/Link';
import {Label} from '../../components/Label';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import * as utils from '../../utils/validators'
import {getFormData} from "../../utils/helpFunctions";


export class RegisterPage extends Block {
    constructor(changePage: (page: string) => void) {
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
                    } else {
                        console.log('Email is invalid');
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
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
                    } else {
                        console.log('Login is invalid');
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
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
                    } else {
                        console.log('First name invalid');
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
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
                    } else {
                        console.log('Last name invalid');
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
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
                    } else {
                        console.log('Phone name invalid');
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
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
                    } else {
                        console.log('Password name invalid');
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
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
                    } else {
                        console.log('Пароли не сопадают');
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
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
                href: "#",
                class: "login-link",
                text: "Войти",
                onClick: (event: Event) => {
                    console.log('CLICK');
                    changePage('authorize')
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
                        <h1>Регистрация</h1>
                        <form class="login-form">
                            <div class="register-inputs">
                              {{{ emailLabel }}}
                              {{{ emailInput }}}
                              {{{ loginLabel }}}
                              {{{ loginInput }}}
                              {{{ firstnameLabel }}}
                              {{{ firstnameInput }}}
                              {{{ lastnameLabel }}}
                              {{{ lastnameInput }}}
                              {{{ phoneLabel }}}
                              {{{ phoneInput }}}
                              {{{ passwordLabel }}}
                              {{{ passwordInput }}}
                              {{{ password2Label }}}
                              {{{ password2Input }}}
                            </div>
                              {{{ registerButton }}}
                              {{{ registerLink }}}
                        </form>
                    </main>
                </div>
                    `;
    }
}