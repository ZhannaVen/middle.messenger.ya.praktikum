import Block from '../../services/Block';
import {Link} from '../../components/Link';



export class NotFoundPage extends Block {
    constructor(changePage: (page: string) => void) {
        super({
            chatsLink: new Link({
                href: '#',
                'data-page': 'chats',
                text: 'Назад к чатам',
                class: 'chats-link',
                onClick: (event: Event) => {
                    console.log('CLICK');
                    changePage('chats');
                    event.preventDefault();
                    event.stopPropagation();

                },
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
