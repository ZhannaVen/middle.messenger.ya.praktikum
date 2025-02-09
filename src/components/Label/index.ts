import Block from '../../services/Block';

interface LabelProps {
    for: string;
    text: string;
    [key: string]: any;
}

export class Label extends Block<LabelProps> {
    render() {
        return `<label 
             for="{{for}}" 
             class="label"
             >
             {{text}}
             </label>`;
    }
}
