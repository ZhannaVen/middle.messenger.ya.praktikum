import Block from '../../services/Block';


interface ChatPopupProps {
    [key: string]: any;
}

export class DeleteChatPopup extends Block<ChatPopupProps> {
    override render(): string {
        return `
                 <div class="popup">
                    {{{ someText }}}
                    {{{ deleteButton }}}
                    {{{ closeButton }}}
                 </div>
                     `;
    }
}
