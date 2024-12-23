export interface Profile {
    login: string;
    email: string;
    firstname: string;
    lastname: string;
    chatLogin: string;
    phone: string;
    password: string;
}

export const mockProfile: Profile = {
    login: "ivanivan",
    email: "ivan@ya.ru",
    firstname: "Иван",
    lastname: "Иванов",
    chatLogin: "Иван",
    phone: "+7 (909) 967 30 30",
    password: "********",
};
