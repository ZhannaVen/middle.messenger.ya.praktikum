import Block from '../../../services/Block';
import {Link} from '../../../components/Link';
import {mockProfile} from "../../../utils/mockProfile";
import {Button} from "../../../components/Button";


export class ProfilePage extends Block {
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
            login: mockProfile.login,
            email: mockProfile.email,
            firstName: mockProfile.firstname,
            lastName: mockProfile.lastname,
            chatLogin: mockProfile.chatLogin,
            phone: mockProfile.phone,
            changeDataLink: new Link({
                href: '#',
                'data-page': 'changeProfileData',
                text: 'Изменить данные',
                class: 'change-profile-link',
                onClick: (event: Event) => {
                    console.log('CLICK');
                    changePage('changeProfileData');
                    event.preventDefault();
                    event.stopPropagation();

                },
            }),
            changePasswordLink: new Link({
                href: '#',
                'data-page': 'changePassword',
                text: 'Изменить пароль',
                class: 'change-password-link',
                onClick: (event: Event) => {
                    console.log('CLICK');
                    changePage('changePassword');
                    event.preventDefault();
                    event.stopPropagation();

                },
            }),
            authorizeLink: new Link({
                href: '#',
                'data-page': 'authorize',
                text: 'Выйти',
                class: 'profile-login-link',
                onClick: (event: Event) => {
                    console.log('CLICK');
                    changePage('authorize');
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
                                <h2 class="profile-name">{{{ login }}}</h2>
                                <table class="profile-info">
                                    <tbody>
                                        <tr>
                                            <td>Почта</td>
                                            <td class="value">
                                                {{{ email }}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Логин</td>
                                            <td class="value">
                                                {{{ login }}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Имя</td>
                                            <td class="value">
                                                {{{ firstName }}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Фамилия</td>
                                            <td class="value">
                                                {{{ lastName }}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Имя в чате</td>
                                            <td class="value">
                                                {{{ chatLogin }}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Телефон</td>
                                            <td class="value">
                                                {{{ phone }}}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="profile-links">
                                    {{{ changeDataLink }}}
                                    {{{ changePasswordLink }}}
                                    {{{ authorizeLink }}}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                     `;
    }
}
