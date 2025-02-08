import Block from '../../services/Block';

interface LabelProps {
    for: string;
    text: string;
    [key: string]: any;
}

export class Label extends Block<LabelProps> {
    constructor(props: any) {
        super({
            ...props,
        });
    }

    render() {
        return `<label 
             for="{{for}}" 
             class="label"
             >
             {{text}}
             </label>`;
    }
}