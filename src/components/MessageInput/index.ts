import Block from "../../services/Block";


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

export class MessageInput extends Block<InputProps> {
    constructor(props: any) {
        super({
            ...props,
            events: {
                blur: (e: Event) => {
                    props.onBlur(e);
                },
                keydown: (e: KeyboardEvent) => {
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
