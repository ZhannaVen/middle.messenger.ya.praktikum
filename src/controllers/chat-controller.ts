import chatsAPI from '../api/chats-api';
import store from "../services/Store";
import {Chat, ChatMember} from '../utils/types';
import {MessagesController} from './message-controller';

export class ChatsController {

    static async createChat(title: string) {
        try {
            await chatsAPI.createChat(title);
            await this.getChatsList();
        } catch (error) {
            console.log(error, 'error has occurred while creating new chat');
        }
    }

    static async deleteChat(chatId: number) {
        try {
            await chatsAPI.deleteChat(chatId);
            console.log('delete chat: ', chatId);
            store.set('activeChat', null);
            await this.getChatsList();
        } catch (error) {
            console.log(error, 'error has occurred in deleting chat users');
        }
    }

    static async getToken(chatId: number) {
        return chatsAPI.getToken(chatId);
    }

    static async getChatsList() {
        try {
            const chats = await chatsAPI.getChats({ limit: 10 });
            chats.map(async (chat: Chat) => {
                console.log("chat id")
                console.log(chat.id)
                const { token } = await this.getToken(chat.id);
                await MessagesController.connect(chat.id, token);
            });
            store.set('chats', chats);
        } catch (error) {
            console.log(error, 'error has occurred in getting chats');
        }
    }

    static async addUserToChat(chatId: number, userId: number[]) {
        try {
            await chatsAPI.addUsers(userId, chatId);
            await this.getChatsList();
        } catch (error) {
            console.log(error, 'error has occurred in adding chat users');
        }
    }

    static async deleteUserFromChat(chatId: number, userId: number[]) {
        try {
            await chatsAPI.deleteUsers(userId, chatId);
            await this.getChatsList();
        } catch (error) {
            console.log(error, 'delete user from chat error');
        }
    }

    static async selectChat(chatId: number) {
        const activeChat = store.getState().chats?.find((chat) => chat.id === chatId);
        store.set('activeChat', activeChat);
        await this.fetchChatUsers(chatId);
    }

    static async fetchChatUsers(chatId: number) {
        try {
            const chatMembers: ChatMember[] = await chatsAPI.getChatUsers(chatId);
            store.set('activeChat',
                {
                    ...store.getState().activeChat,
                    members: chatMembers,
                },
            );
        } catch (error) {
            console.log(error, 'error has occurred in getting chat users');
        }
    }
}
