import Block from '../../services/Block';

interface AvatarChangeProps {
    avatar: Block;
    events?: {
        change: (event: Event) => void;
    };
}

export class AvatarChange extends Block<AvatarChangeProps> {
        constructor(props: any) {
        super({
            ...props,
        });
    }

    override render() {
        return `
                <div class="avatar-container">
                    {{{avatar}}}
                    <label class="avatar-label">
                        <span class="avatar-span">Поменять аватар</span>
                        <input class="avatar-input" type="file" name="avatar" accept="image/*">
                    </label>
                </div>`;
    }
}