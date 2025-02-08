import Block from '../../services/Block';
import {Link} from '../../components/Link';
import {Urls} from "../../utils/types";


export class NotFoundPage extends Block {
    constructor() {
        super({
            chatsLink: new Link({
                href: Urls.Chats,
                'data-page': 'chats',
                text: 'Назад к чатам',
                class: 'chats-link',
            }),
        });
    }

    override render(): string {
        return `
                 <div id="app">
                    <main class="error-container">
                      <div class="error-code">404</div>
                      <div class="error-message">Не туда попали</div>
                      {{{ chatsLink }}}
                    </main>
                 </div>
                     `;
    }
}
