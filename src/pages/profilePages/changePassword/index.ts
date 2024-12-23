import Block from '../../../services/Block';
import {mockProfile} from "../../../utils/mockProfile";
import {Input} from "../../../components/Input";
import * as utils from "../../../utils/validators";
import {Button} from "../../../components/Button";


export class ChangePasswordPage extends Block {
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
                    const password1Value = (document.querySelector('#profile-newpassword-input') as HTMLInputElement).value;
                    const password2Value = (document.querySelector('#profile-newpassword2-input') as HTMLInputElement).value;
                    if (
                        (utils.validatePassword(password1Value)) &&
                        (password1Value === password2Value)
                    ) {
                        console.log('Данные провалидированы');
                        changePage('chats')
                    } else {
                        console.log('Необходимо правильно заполнить данные');
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            oldPasswordInput: new Input({
                id: "profile-oldpassword-input",
                name: "oldpassword",
                type: "text",
                placeholder: mockProfile.password,
                onBlur: (event: Event) => {
                    console.log('old password blur');
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            newPasswordInput: new Input({
                id: "profile-newpassword-input",
                name: "newpassword",
                type: "text",
                placeholder: mockProfile.password,
                onBlur: (event: Event) => {
                    console.log('new password blur');
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
            newPassword2Input: new Input({
                id: "profile-newpassword2-input",
                name: "newpassword",
                type: "text",
                placeholder: mockProfile.password,
                onBlur: (event: Event) => {
                    console.log('password2 blur');
                    const password1Value = (document.querySelector('#profile-newpassword-input') as HTMLInputElement).value;
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
                                            <td>Старый пароль</td>
                                            <td class="value">
                                                {{{ oldPasswordInput }}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Новый пароль</td>
                                            <td class="value">
                                                {{{ newPasswordInput }}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Повторите новый пароль</td>
                                            <td class="value">
                                                {{{ newPassword2Input }}}
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


