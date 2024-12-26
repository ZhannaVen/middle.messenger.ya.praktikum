import Block from '../../services/Block';

interface ButtonProps {
    id?: string; // Делается необязательным, если кнопка может быть без id
    text: string; // Текст кнопки
    onClick: (e: Event) => void; // Обработчик события click
    events?: Record<string, (e: Event) => void>; // Вспомогательное поле для событий
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
