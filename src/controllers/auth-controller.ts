import authAPI from '../api/auth-api';
import {SignInData, SignUpData, Urls, UserInfo,} from '../utils/types';
import store from '../services/Store';
import router from "../services/Router";
import {ChatsController} from "./chat-controller";

export class AuthController {

    static async signin(data: SignInData) {
        try {
            console.log("Я пришел в signin контроллер")
            await authAPI.signin(data);
            await ChatsController.getChatsList()
            await this.fetchUser();
            console.log("Сейчас перейду в чаты")
            router.go(Urls.Chats);
        } catch (error) {
            console.log(error, 'an error has occurred in signin');
            await ChatsController.getChatsList()
            await this.fetchUser();
            router.go(Urls.Chats);
        }
    }

    static async signup(data: SignUpData) {
        try {
            await authAPI.signup(data);
             await ChatsController.getChatsList()
            await this.fetchUser();
            router.go(Urls.Chats);
        } catch (error) {
            console.log(error, 'an error has occurred in signup');
        }
    }

    static async logout() {
        try {
            await authAPI.logout();
            store.set('user', undefined);
            router.go(Urls.Authorize);
        } catch (error) {
            console.log(error, 'an error has occurred in logout');
        }
    }

    static async fetchUser() {
        const user = await authAPI.getUserInfo();
        store.set('user', user as UserInfo);
    }
}
