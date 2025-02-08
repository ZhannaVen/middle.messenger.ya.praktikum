import Block from '../../services/Block';

interface TextProps {
    text: string;
    class: string;
    [key: string]: any;
}

export class Text extends Block<TextProps> {
    constructor(props: any) {
        super({
            ...props,
        });
    }

    override render() {
        return '<p class="{{class}}">{{text}}</p>';
    }
}
