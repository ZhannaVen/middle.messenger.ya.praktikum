import Block from "../../services/Block";
import {Chat} from "../../utils/types";

export interface ChatBlockProps {
    chat: Chat;
    events?: {
        click: () => void;
    };
    onClick?: (chatId: number) => void;
}


export class ChatBlock extends Block {
    constructor(props: ChatBlockProps) {
        super({
            ...props,
            events: {
                click: () => {
                    this.props.onClick(this.props.chat.id);
                },
            },
        });
    }

    render() {
        const { id, title, last_message } = this.props.chat;
        return `
                <div class="chat-item" data-chat-id="${id}">
                    <div class="chat-title">${title}</div>
                    <div class="chat-message">${last_message?.content || "Нет сообщений"}</div>
                </div>
        `
            ;
    }
}