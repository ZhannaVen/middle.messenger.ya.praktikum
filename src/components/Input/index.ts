import Block from '../../services/Block.js';

interface InputProps {
    id: string;
    name: string;
    type: string;
    placeholder?: string;
    value?: string;
    onBlur: (e: Event) => void;
    error?: string;
    [key: string]: any;
}

export class Input extends Block<InputProps> {
    constructor(props: any) {
        super({
            ...props,
            events: {
                blur: (e: Event) => {
                    props.onBlur(e);
                },
            },
        });
    }

    override render() {
            return `
                     <input 
                     id="{{id}}" 
                     name="{{name}}" 
                     type="{{type}}" 
                     placeholder="{{placeholder}}" 
                     value="{{value}}" 
                     class="input"
                     >
                   `;
        }
}
