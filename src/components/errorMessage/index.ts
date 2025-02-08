import Block from '../../services/Block';


interface errorMessageProps {
    error: string;
    [key: string]: any;
}

export class errorMessage extends Block<errorMessageProps> {
    constructor(props: any) {
        super({
            ...props,
        });
    }

    override render() {
        return `
               <p class="input-error-text">
                   {{ error }}
               </p>
               `;
    }
}

