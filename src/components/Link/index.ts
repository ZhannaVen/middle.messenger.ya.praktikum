import Block from '../../services/Block';

export class Link extends Block {
    constructor(props: any) {
        super({
            ...props,
            events: {
                click: (e: Event) => {
                    props.onClick(e);
                },
            },
        });
    }

    override render() {
        return '<a href="{{href}}" class="{{class}}" data-page="{{datapage}}">{{text}}</a>';
    }
}