import {ExtendedProfileData, PasswordData, ProfileData, Urls} from '../utils/types.js';
import ProfileAPI from "../api/profile-api.js";
import store from '../services/Store.js';
import router from "../services/Router.js";
import {AuthController} from "./auth-controller.js";

export class ProfileController {
    static async changeProfile(data: ProfileData) {
        try {
            const newData: ExtendedProfileData = await ProfileAPI.changeProfile(data);
            store.set('user', newData);
            router.go(Urls.Profile);
        } catch (error) {
            console.log(error, 'an error has occurred in changing profile');
        }
    }

    static async changeAvatar(data: FormData) {
        try {
            await ProfileAPI.changeAvatar(data);
            await AuthController.fetchUser();
        } catch (error) {
            console.log(error, 'an error has occurred in changing avatar');
        }
    }

    static async changePassword(data: PasswordData) {
        try {
            await ProfileAPI.changePassword(data);
            router.go(Urls.Profile);
        } catch (error) {
            console.log(error, 'an error has occurred in changing password');
        }
    }
}
