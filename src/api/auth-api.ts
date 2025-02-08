import {BaseAPI} from "./base-api";
import {SignInData, SignUpData, UserInfo} from '../utils/types';

class AuthAPI extends BaseAPI {
    constructor() {
        super('/auth');
    }

    signup(data: SignUpData) {
        return this.http.post('/signup', { data });
    }

    signin(data: SignInData) {
        return this.http.post('/signin', { data });
    }

    logout() {
        return this.http.post('/logout');
    }

    getUserInfo(): Promise<UserInfo> {
        return this.http.get('/user');
    }

}

export default new AuthAPI();
