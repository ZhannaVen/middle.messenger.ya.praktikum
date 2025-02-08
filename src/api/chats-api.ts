import {BaseAPI} from "./base-api";

class ChatsAPI extends BaseAPI {
    constructor() {
        super('/chats');
    }

    createChat(title: string) {
        return this.http.post('/', {data: {title}});
    }

    deleteChat(chatId: number) {
        return this.http.delete('/', {data: {chatId}});
    }

    getChats(data: Record<string, any>) {
        return this.http.get('/', { data });
    }

    getChatUsers(chatId: number) {
        return this.http.get(`/${chatId}/users`);
    }

    addUsers(users: number[], chatId: number) {
        return this.http.put('/users', {data: {users, chatId}});
    }

    deleteUsers(users: number[], chatId: number) {
        return this.http.delete('/users', {data: {users, chatId}});
    }

    getToken(chatId: number) {
        return this.http.post(`/token/${chatId}`);
    }
}

export default new ChatsAPI();