import Block from '../../services/Block';

interface InputProps {
    id: string;
    name: string;
    type: string;
    placeholder?: string;
    value?: string;
    onBlur: (e: Event) => void;
    onKeyDown: (e: Event) => void;
    error?: string;
    [key: string]: any;
}

export class Input extends Block<InputProps> {
    constructor(props: any) {
        super({
            ...props,
            events: {
                blur: (e: Event) => {
                    console.log('blur input');
                    props.onBlur(e);
                },
                keydown: (e: KeyboardEvent) => {
                    console.log('keydown input');
                    props.onKeyDown(e);
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
