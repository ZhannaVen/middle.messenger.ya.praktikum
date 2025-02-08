// let chats : { id: string; messages: string[]; user: string }[] = [
//     { id: 'chat1', user: 'Алексей Иванов', messages: ['Привет, как дела?', 'Пообедаем вместе?'] },
//     { id: 'chat2', user: 'Петр Алексеев', messages: ['Привет!'] },
//     { id: 'chat3', user: 'Иван Петров', messages: ['Здравствуй!'] },
// ];

let chats = [

    {id: 47230, title: 'Third test chat', avatar: null, created_by: 3341, unread_count: 0},
    {id: 47229, title: 'Second test chat', avatar: null, created_by: 3341, unread_count: 0},
    {id: 47228, title: 'First test chat', avatar: null, created_by: 3341, unread_count: 0}

];
let activeChatId: string = 'chat1';


export {chats, activeChatId}