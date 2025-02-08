import Block from '../../services/Block';
import {State} from "../../services/Store";
import {connect} from "../../services/HOC";

interface AvatarProps {
    avatar: string;
    size: string;
    [key: string]: any;
}

export class Avatar extends Block<AvatarProps> {
    constructor(props: any) {
        super({
            ...props,
        });
    }

    override render() {
        return `<div class="avatar">
                  {{#if avatar}}
                    <img width="{{size}}" height="{{size}}" src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" alt="Аватар" class="avatar-image">
                  {{/if}}
                </div>`;
    }
}

const mapStateToProps = (state: State) => ({
    avatar: state.user?.avatar || '',
});

export const AvatarWithProps = connect(mapStateToProps)(Avatar);