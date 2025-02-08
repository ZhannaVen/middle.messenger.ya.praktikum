import Block from '../../services/Block';

interface LinkProps {
    href: string;
    class?: string;
    datapage?: string;
    text: string;
    onClick: (e: Event) => void;
    [key: string]: any;
}

export class Link extends Block<LinkProps> {
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
