export enum Urls {
    Authorize = '/',
    Register = '/sign-up',
    Chats = '/messenger',
    Profile = '/settings',
    ChangePassword = '/settings/change-password',
    ChangeProfile = '/settings/change-profile',
    NotFound = '/404',
    Error = '/500',
}

export interface SignInData {
    login: string;
    password: string;
}

export interface SignUpData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    password: string;
}

export interface UserInfo {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    password: string;
    avatar: string;
    display_name: string;
    id: number;
}

export interface ProfileData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    display_name: string;
}

export interface ExtendedProfileData extends ProfileData {
    avatar: string;
    id: string;
}

export interface PasswordData {
    oldPassword: string;
    newPassword: string;
}

export interface Chat {
    user: string;
    avatar: string;
    created_by: number;
    id: number;
    last_message: LastMessage;
    title: string;
    unread_count: number;
}

export interface MessageData {
    chat_id: number;
    content: string;
    time: string;
    type: string;
    user_id: string;
    file?: {
        content_size: number;
        content_type: string;
        filename: string;
        id: number;
        path: string;
        upload_date: string;
        user_id: number;
    };
}

export interface LastMessage {
    content: string;
    time: string;
    user: {
        avatar: string;
        email: string;
        first_name: string;
        login: string;
        phone: string;
        second_name: string;
    };
}

export interface ChatMember extends Omit<UserInfo, 'phone' | 'email'> {
    role?: string;
}
