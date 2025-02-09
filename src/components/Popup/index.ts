import Block from '../../services/Block';


interface PopupProps {
    [key: string]: any;
}

export class Popup extends Block<PopupProps> {
    override render(): string {
        return `
                 <div class="popup">
                    {{{ someLabel }}}
                    {{{ someInput }}}
                    {{{ someButton }}}
                    {{{ closeButton }}}
                 </div>
                     `;
    }
}
