import Block from '../../services/Block';


interface ChatPopupProps {
    [key: string]: any;
}

export class DeleteChatPopup extends Block<ChatPopupProps> {
    constructor(props: any) {
        super(props)
    }

    override render(): string {
        return `
                 <div class="Popup">
                    {{{ someText }}}
                    {{{ deleteButton }}}
                    {{{ closeButton }}}
                 </div>
                     `;
    }
}
