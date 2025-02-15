import Block from '../../services/Block.js';

interface TextProps {
    text: string;
    class: string;
    [key: string]: any;
}

export class Text extends Block<TextProps> {
    override render() {
        return '<p class="{{class}}">{{text}}</p>';
    }
}
