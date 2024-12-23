import Block from '../../services/Block';

export class Button extends Block {
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
