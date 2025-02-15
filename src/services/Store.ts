import EventBus from "./EventBus.js";
import {set} from "../utils/set.js";
import {Chat, MessageData, UserInfo} from '../utils/types.js';


export interface State {
    chats?: Chat[];
    currentMessages?: MessageData[];
    messages?: Record<number, MessageData[]>;
    activeChat?: Chat | null;
    user?: UserInfo;
}

export enum StoreEvents {
    Updated = 'Updated',
}

class Store extends EventBus {
    private state: State = {};

    constructor() {
        super();
    }

    getState(): State {
        console.log(this.state)
        return this.state;
    }

    set(path: string, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvents.Updated, this.state);
    }

    setState(newState: State) {
        this.state = newState;
        this.emit(StoreEvents.Updated, this.state);
    }

    subscribe(callback: (state: State) => void) {
        this.on(StoreEvents.Updated, callback);
    }
}

export default new Store();
