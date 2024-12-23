import Block from '../../services/Block';


export class Label extends Block {
    constructor(props: any) {
        super({
            ...props,
        });
    }

    override render() {
        return `<label 
             for="{{for}}" 
             class="label"
             >
             {{text}}
             </label>`;
    }
}