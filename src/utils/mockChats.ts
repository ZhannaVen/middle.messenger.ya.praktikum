let chats : { id: string; messages: string[]; user: string }[] = [
    { id: 'chat1', user: 'Алексей Иванов', messages: ['Привет, как дела?', 'Пообедаем вместе?'] },
    { id: 'chat2', user: 'Петр Алексеев', messages: ['Привет!'] },
    { id: 'chat3', user: 'Иван Петров', messages: ['Здравствуй!'] },
];
let activeChatId: string = 'chat1';


export {chats, activeChatId}