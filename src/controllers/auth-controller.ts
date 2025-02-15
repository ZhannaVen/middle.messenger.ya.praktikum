import authAPI from '../api/auth-api.js';
import {SignInData, SignUpData, Urls, UserInfo,} from '../utils/types.js';
import store from '../services/Store.js';
import router from "../services/Router.js";
import {ChatsController} from "./chat-controller.js";

export class AuthController {

    static async signin(data: SignInData) {
        try {
            await authAPI.signin(data);
            await ChatsController.getChatsList()
            await this.fetchUser();
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
