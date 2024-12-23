import Block from '../../services/Block';

export class Chats extends Block {
    constructor(props: any) {
        super({
            ...props,
            lists: {
                chats: props.chats,  // Передаем список сообщений в lists
            },
        });
    }

    override render(): string {
        console.log(this.props);
        console.log(this.lists);
        return `
            <div class="chats-list">
                {{#each lists.chats}}
                    <div class="chat-item" data-chat-id="{{id}}">
                        {{ this.user }}
                    </div>
                {{/each}}
            </div>
        `;
    }
}

export class ActiveChat extends Block {
    constructor(props: any) {
        super({
            ...props,
            lists: {
                messages: props.messages,  // Передаем список сообщений в lists
            },
        });
    }

    override render(): string {
        console.log(this.props);
        console.log(this.lists);
        return `
            <div class="active-chat" id="active-chat-{{id}}">
                <h3>{{ user }}</h3>
                {{#each lists.messages}}
                    <div class="message">
                        <p>{{this}}</p>
                    </div>
                {{/each}}
            </div>
        `;
    }
}