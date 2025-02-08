import Block from '../../../services/Block';
import {mockProfile} from "../../../utils/mockProfile";
import {Input} from "../../../components/Input";
import * as utils from "../../../utils/validators";
import {Button} from "../../../components/Button";
import {errorMessage} from "../../../components/errorMessage";
import * as messages from "../../../utils/constances";
import router from "../../../services/Router";
import {ProfileData, Urls} from "../../../utils/types";
import {ProfileController} from "../../../controllers/profile-controller";
import {AvatarWithProps} from "../../../components/Avatar";
import {AvatarChange} from "../../../components/AvatarChange";


export class ChangeProfileDataPage extends Block {
    constructor() {
        super({
            chatsButton: new Button({
                text: "<-",
                id: "chats-button",
                onClick: (event: Event) => {
                    console.log('CLICK Chats button');
                    router.go(Urls.Chats)
                    event.preventDefault();
                    event.stopPropagation();
                }
            }),
            avatar: new AvatarWithProps({
                size: '100'
            }),
            avatarChange: new AvatarChange({
                avatar: new AvatarWithProps({
                    size: '100',
                }),
                events: {
                    change: async (event: Event) => {
                        const formData = new FormData();
                        const target = event.target as HTMLInputElement;
                        if (target.files && target.files.length !== 0) {
                            const file = target.files[0];
                            formData.append('avatar', file);
                            await ProfileController.changeAvatar(formData);
                        }
                    },
                },
            }),
            saveButton: new Button({
                text: "Сохранить",
                id: "submit-save",
                onClick: async (event: Event) => {
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

                        const profileData: ProfileData = {
                            display_name: (document.querySelector('#profile-chatName-input') as HTMLInputElement).value,
                            email: (document.querySelector('#profile-email-input') as HTMLInputElement).value,
                            first_name: (document.querySelector('#profile-firstname-input') as HTMLInputElement).value,
                            second_name: (document.querySelector('#profile-lastname-input') as HTMLInputElement).value,
                            login: (document.querySelector('#profile-login-input') as HTMLInputElement).value,
                            phone: (document.querySelector('#profile-phone-input') as HTMLInputElement).value,
                        };
                        if (profileData) {
                            await ProfileController.changeProfile(profileData);
                        }
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
                            (this.children.errorMessageEmail as Block).setProps({error: ""});
                        } else {
                            console.log('Email is invalid');
                            (this.children.errorMessageEmail as Block).setProps({error: messages.wrongEmail})
                        }
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            errorMessageEmail: new errorMessage({
                error: ""
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
                            (this.children.errorMessageLogin as Block).setProps({error: ""});
                        } else {
                            console.log('Login is invalid');
                            (this.children.errorMessageLogin as Block).setProps({error: messages.wrongLogin})
                        }
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            errorMessageLogin: new errorMessage({
                error: ""
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
                            (this.children.errorMessageFirstname as Block).setProps({error: ""});
                        } else {
                            console.log('First name invalid');
                            (this.children.errorMessageFirstname as Block).setProps({error: messages.wrongName})
                        }
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            errorMessageFirstname: new errorMessage({
                error: ""
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
                            (this.children.errorMessageLastname as Block).setProps({error: ""});
                        } else {
                            console.log('Last name invalid');
                            (this.children.errorMessageLastname as Block).setProps({error: messages.wrongName})
                        }
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            errorMessageLastname: new errorMessage({
                error: ""
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
                            (this.children.errorMessagePhone as Block).setProps({error: ""});
                        } else {
                            console.log('Phone name invalid');
                            (this.children.errorMessagePhone as Block).setProps({error: messages.wrongPhone})
                        }
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            errorMessagePhone: new errorMessage({
                error: ""
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
                                {{{ avatarChange }}}
                                <table class="profile-info">
                                    <tbody>
                                        <tr>
                                            <td>Почта</td>
                                            <td class="value">
                                            {{{ emailInput }}}
                                             {{{ errorMessageEmail }}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Логин</td>
                                            <td class="value">
                                            {{{ loginInput }}}
                                            {{{ errorMessageLogin }}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Имя</td>
                                            <td class="value">
                                            {{{ firstNameInput }}}
                                            {{{ errorMessageFirstname }}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Фамилия</td>
                                            <td class="value">
                                            {{{ lastNameInput }}}
                                            {{{ errorMessageLastname }}}
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
                                            {{{ errorMessagePhone }}}
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
