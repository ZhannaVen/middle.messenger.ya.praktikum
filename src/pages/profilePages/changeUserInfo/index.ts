import Block from '../../../services/Block';
import {mockProfile} from "../../../utils/mockProfile";
import {Input} from "../../../components/Input";
import * as utils from "../../../utils/validators";
import {Button} from "../../../components/Button";


export class ChangeProfileDataPage extends Block {
    constructor(changePage: (page: string) => void) {
        super({
            chatsButton: new Button({
                text: "<-",
                id: "chats-button",
                onClick: (event: Event) => {
                    console.log('CLICK Chats button');
                    changePage('chats');
                    event.preventDefault();
                    event.stopPropagation();
                }
            }),
            saveButton: new Button({
                text: "Сохранить",
                id: "submit-save",
                onClick: (event: Event) => {
                    console.log('CLICK Save button');

                    const inputs = [
                        { id: '#profile-email-input', name: 'Почта', validator: utils.validateEmail },
                        { id: '#profile-login-input', name: 'Логин', validator: utils.validateLogin },
                        { id: '#profile-firstname-input', name: 'Имя', validator: utils.validateName },
                        { id: '#profile-lastname-input', name: 'Фамилия', validator: utils.validateName },
                        { id: '#profile-phone-input', name: 'Телефон', validator: utils.validatePhone },
                    ];

                    const changes: Record<string, string> = {};
                    let isValid = true;

                    inputs.forEach(({ id, name, validator }) => {
                        const input = document.querySelector(id) as HTMLInputElement;
                        if (input && input.value.trim() !== '') {
                            if (validator(input.value)) {
                                changes[name] = input.value;
                            } else {
                                isValid = false;
                                console.log(`Поле "${name}" заполнено некорректно: ${input.value}`);
                            }
                        }
                    });

                    if (isValid) {
                        console.log('Все непустые данные провалидированы');
                        console.log('Изменённые данные:', changes);
                        changePage('chats');
                    } else {
                        console.log('Необходимо правильно заполнить данные');
                    }

                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            emailInput: new Input({
                id: "profile-email-input",
                name: "email",
                type: "text",
                placeholder: mockProfile.email,
                onBlur: (event: Event) => {
                    console.log('email blur');
                    const emailValue = (event.target as HTMLInputElement).value;
                    if (emailValue) {
                        if (utils.validateEmail(emailValue)) {
                            console.log('Email is valid');
                        } else {
                            console.log('Email is invalid');
                        }
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            loginInput: new Input({
                id: "profile-login-input",
                name: "login",
                type: "text",
                placeholder: mockProfile.login,
                onBlur: (event: Event) => {
                    console.log('login blur');
                    const loginValue = (event.target as HTMLInputElement).value;
                    if (loginValue) {
                        if (utils.validateLogin(loginValue)) {
                            console.log('Login is valid');
                        } else {
                            console.log('Login is invalid');
                        }
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            firstNameInput: new Input({
                id: "profile-firstname-input",
                name: "first_name",
                type: "text",
                placeholder: mockProfile.firstname,
                onBlur: (event: Event) => {
                    console.log('first name blur');
                    const firstNameValue = (event.target as HTMLInputElement).value;
                    if (firstNameValue) {
                        if (utils.validateName(firstNameValue)) {
                            console.log('First name is valid');
                        } else {
                            console.log('First name invalid');
                        }
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            lastNameInput: new Input({
                id: "profile-lastname-input",
                name: "second_name",
                type: "text",
                placeholder: mockProfile.lastname,
                onBlur: (event: Event) => {
                    console.log('last name blur');
                    const lastNameValue = (event.target as HTMLInputElement).value;
                    if (lastNameValue) {
                        if (utils.validateName(lastNameValue)) {
                            console.log('Last name is valid');
                        } else {
                            console.log('Last name invalid');
                        }
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            phoneInput: new Input({
                id: "profile-phone-input",
                name: "phone",
                type: "text",
                placeholder: mockProfile.phone,
                onBlur: (event: Event) => {
                    console.log('phone blur');
                    const phoneValue = (event.target as HTMLInputElement).value;
                    if (phoneValue) {
                        if (utils.validatePhone(phoneValue)) {
                            console.log('Phone is valid');
                        } else {
                            console.log('Phone name invalid');
                        }
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            chatLoginInput: new Input({
                id: "profile-chatName-input",
                name: "chatName",
                type: "text",
                placeholder: mockProfile.chatLogin,
                onBlur: (event: Event) => {
                    console.log('chatName blur');
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),



        });
    }

    override render(): string {
        return `
                <div id="app">
                    <main class="profile-container">
                        <div class="profile-left-side">
                            {{{ chatsButton }}}
                        </div>
                        <div class="profile-right-side">
                            <div class="profile-card">
                                <div class="avatar">
                                <img src="" alt="Аватар" class="avatar-image">
                                </div>
                                <table class="profile-info">
                                    <tbody>
                                        <tr>
                                            <td>Почта</td>
                                            <td class="value">
                                            {{{ emailInput }}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Логин</td>
                                            <td class="value">
                                            {{{ loginInput }}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Имя</td>
                                            <td class="value">
                                            {{{ firstNameInput }}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Фамилия</td>
                                            <td class="value">
                                            {{{ lastNameInput }}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Имя в чате</td>
                                            <td class="value">
                                            {{{ chatLoginInput }}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Телефон</td>
                                            <td class="value">
                                            {{{ phoneInput }}}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {{{ saveButton }}}
                            </div>
                        </div>
                    </main>
                </div>
                     `;
    }
}

