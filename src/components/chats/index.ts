import Block from '../../services/Block';
import {Chat, MessageData} from "../../utils/types";

interface ChatsProps {
    chats: Chat[];
    onClick: (e: Event) => void; // Обработчик события click
    events?: Record<string, (e: Event) => void>; // Вспомогательное поле для событий
    [key: string]: any;
}

export class Chats extends Block<ChatsProps> {
    constructor(props: any) {
        super({
            ...props,
            events: {
                click: (e: Event) => {
                    props.onClick(e);
                },
            },
        });
    }

    override render(): string {
        return `
            <div class="chats-list">
                {{#each chats}}
                    <div class="chat-item" data-chat-id="{{id}}">
                        {{ this.id }}
                        {{ this.title }}
                        {{ this.last_message.content }}
                    </div>
                {{/each}}
            </div>
        `;
    }
}

interface ActiveChatProps {
    chat: Chat;
    allMessages: MessageData[];
    optionsButton: typeof Block;
    [key: string]: any;
}

export class ActiveChat extends Block<ActiveChatProps> {
    constructor(props: any) {
        super({
            ...props,
        });
    }

    override render(): string {
        return `
            <div class="active-chat" id="active-chat-{{id}}">
                <header class="chat-header">
                    <span class="chat-title">{{ chat.title }}</span>
                    {{{ optionsButton }}}
                </header>
            </div>
                {{#each allMessages }}
                    <div class="message">
                        <p class="message-text">{{{this.content}}}</p>
<!--                        <p class="message-time">{{{this.time}}}</p>-->
<!--                        <p class="message-user-id">{{{this.user_id}}}</p>-->
                    </div>
                {{/each}}
            </div>
        `;
    }
}