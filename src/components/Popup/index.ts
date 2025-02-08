import Block from '../../services/Block';


interface PopupProps {
    [key: string]: any;
}

export class Popup extends Block<PopupProps> {
    constructor(props: any) {
        super(props)
    }

    override render(): string {
        return `
                 <div class="Popup">
                    {{{ someLabel }}}
                    {{{ someInput }}}
                    {{{ someButton }}}
                    {{{ closeButton }}}
                 </div>
                     `;
    }
}