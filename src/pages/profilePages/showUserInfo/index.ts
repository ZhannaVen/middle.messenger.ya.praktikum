import Block from '../../../services/Block';
import {Link} from '../../../components/Link';
import {Button} from "../../../components/Button";
import router from "../../../services/Router";
import {State} from "../../../services/Store";
import {connect} from "../../../services/HOC";
import {AuthController} from "../../../controllers/auth-controller";
import store from '../../../services/Store';
import {Urls} from "../../../utils/types";
import {AvatarWithProps} from "../../../components/Avatar";


export class ProfilePage extends Block {
    constructor() {
        super({
            chatsButton: new Button({
                text: "<=",
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
            user: store.getState().user,
            changeDataLink: new Link({
                href: 'settings/change-profile',
                'data-page': 'changeProfileData',
                text: 'Изменить данные',
                class: 'change-profile-link',
                onClick: (event: Event) => {
                    console.log('CLICK');
                    router.go(Urls.ChangeProfile)
                    event.preventDefault();
                    event.stopPropagation();

                },
            }),
            changePasswordLink: new Link({
                href: 'settings/change-password',
                'data-page': 'changePassword',
                text: 'Изменить пароль',
                class: 'change-password-link',
                onClick: (event: Event) => {
                    console.log('CLICK');
                    router.go(Urls.ChangePassword)
                    event.preventDefault();
                    event.stopPropagation();

                },
            }),
            authorizeLink: new Link({
                href: '/',
                'data-page': 'authorize',
                text: 'Выйти',
                class: 'profile-login-link',
                onClick: (event: Event) => {
                    console.log('CLICK Logout link');
                    AuthController.logout();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }),
        });
    }

    override componentDidMount(): void {
        console.log('ProfilePage componentDidMount');

        store.subscribe((newState) => {
            console.log("🔄 Store updated:", newState);
            this.setProps({ user: newState.user }); // Обновляем пропсы компонента
        });

        const persistedState = localStorage.getItem('appState');
        if (persistedState) {
            store.setState(JSON.parse(persistedState));
        }

        AuthController.fetchUser()
            .then(() => console.log('User data fetched'))
            .catch((err) => console.error('Error fetching user data:', err));

        window.addEventListener("beforeunload", () => {
            localStorage.setItem("appState", JSON.stringify(store.getState()));
        });

    }

    override render(): string {
        const { user } = this.props;

        if (!user) {
            return `<div>Загрузка...</div>`;
        }

        return `
                <div id="app">
                    <main class="profile-container">
                        <div class="profile-left-side">
                            {{{ chatsButton }}}
                        </div>
                        <div class="profile-right-side">
                            <div class="profile-card">
                                {{{ avatar }}}
                                <h2 class="profile-name">{{{ login }}}</h2>
                                <table class="profile-info">
                                    <tbody>
                                        <tr>
                                            <td>Почта</td>
                                            <td class="value">
                                                {{{ user.email }}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Логин</td>
                                            <td class="value">
                                                {{{ user.login }}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Имя</td>
                                            <td class="value">
                                                {{{ user.first_name }}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Фамилия</td>
                                            <td class="value">
                                                {{{ user.second_name }}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Имя в чате</td>
                                            <td class="value">
                                                {{{ user.display_name }}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Телефон</td>
                                            <td class="value">
                                                {{{ user.phone }}}
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

const mapStateToProps = (state: State) => ({ user: state.user });

export const ProfileWithProps = connect(mapStateToProps)(ProfilePage);
