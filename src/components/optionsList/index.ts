import Block from '../../services/Block';


interface OptionsProps {
    [key: string]: any;
}

export class OptionsList extends Block<OptionsProps> {
    override render(): string {
        return `
                 <div class="popup">
                    {{{ addUserButton }}}
                    {{{ deleteUserButton }}}
                    {{{ deleteChatButton }}}
                    {{{ changeChatAvatarButton }}}
                 </div>
                     `;
    }
}

