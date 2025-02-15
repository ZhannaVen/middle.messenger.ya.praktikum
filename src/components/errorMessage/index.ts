import Block from '../../services/Block.js';


interface errorMessageProps {
    error: string;
    [key: string]: any;
}

export class errorMessage extends Block<errorMessageProps> {
    override render() {
        return `
               <p class="input-error-text">
                   {{ error }}
               </p>
               `;
    }
}

