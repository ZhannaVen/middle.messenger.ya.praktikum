import Block from '../../services/Block';
import {Link} from '../../components/Link';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import {ActiveChat, Chats} from "../../components/chats";
import * as utils from '../../utils/validators'
import * as mockChats from '../../utils/mockChats'


export class ChatsPage extends Block {
    constructor(changePage: (page: string) => void) {
        super({
            profileLink: new Link({
                href: "#",
                class: "user-profile-link",
                'data-page': "userProfile",
                text: "Профиль",
                onClick: (event: Event) => {
                    console.log('CLICK');
                    changePage('profile')
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            activeChat: new ActiveChat({
                user: mockChats.chats[0].user,
                id: mockChats.chats[0].id,
                messages: mockChats.chats[0].messages,
            }),
            chats: new Chats({
                chats: mockChats.chats,
            }),
            messageInput: new Input({
                id: 'message-input',
                name:"message-input",
                type:"text",
                placeholder:"Ваше сообщение",
                onBlur: (event: Event) => {
                    console.log('message blur');
                    const messageValue = (event.target as HTMLInputElement).value;
                    if (utils.validateMessage(messageValue)) {
                        console.log('Message is valid');
                    } else {
                        console.log('Message is invalid');
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            sendButton: new Button({
                id:"send-message",
                text:"Отправить ",
                onClick: (event: Event) => {
                    console.log('CLICK Submit button');
                    const messageValue = (document.querySelector('#message-input') as HTMLInputElement).value;
                    if (utils.validateMessage(messageValue)) {
                        console.log('Message is valid');
                        console.log(messageValue);
                    } else {
                        console.log('Message is invalid');
                    }
                    event.preventDefault();
                    event.stopPropagation();
                }
            }),
        });
    }

    override render(): string {
        return `
                <div id="app">
                    <body>
                        <main class="messenger-container">
                            <div class="messenger-left-side">
                                {{{ profileLink }}}
                                {{{ chats }}}
                            </div>
                            <div class="messenger-right-side">
                                {{{ activeChat }}}
                                <form class="messenger-input">
                                    {{{ messageInput }}}
                                    {{{ sendButton }}}
                                </form>
                            </div>
                        </main>
                    </body>
                </div>
                    `;
    }
}
