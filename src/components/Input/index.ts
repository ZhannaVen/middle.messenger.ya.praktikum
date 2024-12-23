import Block from '../../services/Block';

export class Input extends Block {
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
        return `<input 
                     id="{{id}}" 
                     name="{{name}}" 
                     type="{{type}}" 
                     placeholder="{{placeholder}}" 
                     value="{{value}}" 
                     class="input"
                     >`;
    }
}