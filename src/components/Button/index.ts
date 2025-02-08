import Block from '../../services/Block';

interface ButtonProps {
    id?: string;
    text: string;
    onClick: (e: Event) => void;
    events?: Record<string, (e: Event) => void>;
    [key: string]: any;
}

export class Button extends Block<ButtonProps> {
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
        return `<button
             class="button"
             id="{{ id }}"
             type="submit"
             >
                {{ text }}
             </button>`;
    }
}

