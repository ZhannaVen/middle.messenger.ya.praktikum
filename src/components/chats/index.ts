import Block from '../../services/Block';
import {Chat, MessageData} from "../../utils/types";


interface ActiveChatProps {
    chat: Chat| null | undefined;
    allMessages: MessageData[];
    optionsButton: Block<any>;
    [key: string]: any;
}

export class ActiveChat extends Block<ActiveChatProps> {
    override render(): string {
        return `
            <div class="active-chat" id="active-chat-{{id}}">
                <header class="chat-header">
                    <div class="avatar" id="active-chat-avatar">
                        {{#if chat.avatar}}
                            <img width="50" height="50" src="https://ya-praktikum.tech/api/v2/resources{{chat.avatar}}" alt="Аватар" class="avatar-image">
                        {{/if}}
                    </div>
                    <span class="chat-title">{{ chat.title }}</span>
                    {{{ optionsButton }}}
                </header>
                <div class="messages">
                    {{#each allMessages }}
                        <div class="message">
                            <p class="message-text">{{{this.content}}}</p>
    <!--                        <p class="message-time">{{{this.time}}}</p>-->
    <!--                        <p class="message-user-id">{{{this.user_id}}}</p>-->
                         </div>
                     {{/each}}
                 </div>
             </div>
        `;
    }
}
