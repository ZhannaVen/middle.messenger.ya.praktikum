import store, {State, StoreEvents} from '../services/Store.js';
import Block from '../services/Block.js';
import {isEqual} from '../utils/isEqual.js';


export const connect = (mapStateToProps: (state: State) => any) => <P extends Record<string, unknown>>(Component: typeof Block<P>) => class extends Component {
    constructor(props: P) {
        console.log("I am in connect")
        let state = mapStateToProps(store.getState());
        super({ ...props, ...mapStateToProps(store.getState()) });
        store.on(StoreEvents.Updated, () => {
            const propsFromState = mapStateToProps(store.getState());
            console.log(propsFromState);
            if (!isEqual(state, propsFromState)) {
                this.setProps({ ...propsFromState });
            }
            state = propsFromState;
        });
    }
};
