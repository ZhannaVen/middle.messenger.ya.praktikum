import Block from '../../services/Block';


interface OptionsProps {
    [key: string]: any;
}

export class OptionsList extends Block<OptionsProps> {
    constructor(props: any) {
        super(props)
    }

    override render(): string {
        return `
                 <div class="chatOptions">
                    {{{ addUserButton }}}
                    {{{ deleteUserButton }}}
                    {{{ deleteChatButton }}}
                 </div>
                     `;
    }
}

