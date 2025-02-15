import {BaseAPI} from "./base-api.js";
import {PasswordData, ProfileData} from '../utils/types.js';

export class ProfileAPI extends BaseAPI {
    constructor() {
        super('/user');
    }

    changeProfile(data: ProfileData) {
        return this.http.put('/profile', { data });
    }

    changeAvatar(data: FormData) {
        return this.http.put('/profile/avatar', { data });
    }

    changePassword(data: PasswordData) {
        return this.http.put('/password', { data });
    }
}

export default new ProfileAPI();
