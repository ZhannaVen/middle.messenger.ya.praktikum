import EventBus from './EventBus';
import Handlebars from 'handlebars';
import { v4 as uuidv4func } from 'uuid';

interface BlockProps {
    [key: string]: any;
}

export default class Block<Props extends BlockProps = any> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    private _element: HTMLElement | null = null;

    public id = uuidv4func();

    protected props: Props;

    public children: Record<string, Block | Block[]>;

    private eventBus: () => EventBus;

    constructor(propsWithChildren: Props) {
        const eventBus = new EventBus();
        const { children, props } = this._getChildrenAndProps(propsWithChildren);
        this.children = children;
        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _addEvents() {
        const { events = {} } = this.props as Props & { events: Record<string, () => void> };
        Object.keys(events).forEach((eventName) => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    _removeEvents() {
        const { events = {} } = this.props as Props & { events: Record<string, () => void> };
        Object.keys(events).forEach((eventName) => {
            this._element?.removeEventListener(eventName, events[eventName]);
        });
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    private _init() {
        this.init();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init() {}

    _componentDidMount() {
        this.componentDidMount();
    }

    protected componentDidMount() {
        console.log("Block mounted")
    }

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        Object.values(this.children).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach((c) => c.dispatchComponentDidMount());
            } else {
                child.dispatchComponentDidMount();
            }
        });
    }
    private _componentDidUpdate() {
        if (this.componentDidUpdate()) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate() {
        return true;
    }

    _getChildrenAndProps(childrenAndProps: Props): { children: Record<string, Block | Block[]>; props: Props } {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block | Block[]> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key as string] = value;
            } else {
                props[key] = value;
            }
        });

        return {
            props: props as Props,
            children,
        };
    }

    setProps = (nextProps: Props) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement | null {
        return this._element;
    }
    private _render() {
        console.log('Render');

        this._removeEvents();

        const template = this.render()

        const propsAndStubs = { ...this.props } as Record<string, unknown>;
        Object.entries(this.children).forEach(([name, component]) => {
            if (Array.isArray(component)) {
                propsAndStubs[name] = component.map((comp) => `<div data-id="${comp.id}"></div>`);
            } else {
                propsAndStubs[name] = `<div data-id="${component.id}"></div>`;
            }
        });
        const html = Handlebars.compile(template)(propsAndStubs);
        const temp = document.createElement('template');
        temp.innerHTML = html;
        Object.entries(this.children).forEach(([_, component]) => {
            if (Array.isArray(component)) {
                const stubs = component.map((comp) => temp.content.querySelector(`[data-id="${comp.id}"]`));
                if (!stubs.length) {
                    return;
                }
                stubs.forEach((stub, index) => {
                    component[index].getContent()?.append(...Array.from(stub!.childNodes));
                    stub!.replaceWith(component[index].getContent()!);
                });
            } else {
                const stub = temp.content.querySelector(`[data-id="${component.id}"]`);
                if (!stub) {
                    return;
                }
                component.getContent()?.append(...Array.from(stub.childNodes));

                stub.replaceWith(component.getContent()!);
            }
        });

        const fragment = temp.content
        const newElement = fragment.firstElementChild as HTMLElement;

        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;

        this._addEvents();
    }

    protected render(): string {
        return ''
    }
    public getContent(): HTMLElement {
        if (!this.element) {
            throw new Error('Element is not created');
        }
        return this.element;
    }

    _makePropsProxy(props: Props) {
        const self = this;

        return new Proxy(props, {
            get(target: any, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: any, prop: string, value: any) {
                const oldTarget = { ...target };
                target[prop as keyof Props] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('No access');
            },
        });
    }

    show() {
        const content = this.getContent();
        if (content) {
            content.style.display = 'block';
        }
    }

    hide() {
        const content = this.getContent();
        if (content) {
            content.style.display = 'none';
        }
    }
}







// interface BlockProps {
//     [key: string]: any;
// }
//
// export default abstract class Block<Props extends Record<string, any> = Record<string, any>> {
//     static EVENTS = {
//         INIT: 'init',
//         FLOW_CDM: 'flow:component-did-mount',
//         FLOW_CDU: 'flow:component-did-update',
//         FLOW_RENDER: 'flow:render',
//     };
//
//     protected _element: HTMLElement | null = null;
//
//     protected _id: number = Math.floor(100000 + Math.random() * 900000);
//
//     protected props: Props;
//
//     protected children: Record<string, Block>;
//
//     protected lists: Record<string, any[]>;
//
//     protected eventBus: () => EventBus;
//
//     constructor(propsWithChildren: BlockProps = {}) {
//         const eventBus = new EventBus();
//         const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren);
//         this.props = this._makePropsProxy({ ...props });
//         this.children = children;
//         this.lists = this._makePropsProxy({ ...lists });
//         this.eventBus = () => eventBus;
//         this._registerEvents(eventBus);
//         eventBus.emit(Block.EVENTS.INIT);
//     }
//
//     private _addEvents(): void {
//         const { events = {} } = this.props;
//         Object.keys(events).forEach(eventName => {
//             if (this._element) {
//                 this._element.addEventListener(eventName, events[eventName]);
//             }
//         });
//     }
//
//     private _removeEvents(): void {
//         const { events = {} } = this.props;
//         Object.keys(events).forEach(eventName => {
//             if (this._element && events[eventName] !== undefined) {
//                 this._element.removeEventListener(eventName, events[eventName]);
//             }
//         });
//     }
//
//     private _registerEvents(eventBus: EventBus): void {
//         eventBus.on(Block.EVENTS.INIT, this.init.bind(this) as EventCallback);
//         eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this) as EventCallback);
//         eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as EventCallback);
//         eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this) as EventCallback);
//     }
//
//     protected init(): void {
//         this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
//     }
//
//     private _componentDidMount(): void {
//         this.componentDidMount();
//         Object.values(this.children).forEach(child => {child.dispatchComponentDidMount();});
//     }
//
//     // private _componentDidMount(): void {
//     //     this.componentDidMount();
//     //
//     //     // Вызываем `dispatchComponentDidMount` для всех дочерних компонентов
//     //     Object.values(this.children).forEach(child => {
//     //         if (child instanceof Block) {
//     //             child.dispatchComponentDidMount();
//     //         }
//     //     });
//     //
//     //     // Вызываем `dispatchComponentDidMount` для списков компонентов
//     //     Object.values(this.lists).forEach(list => {
//     //         list.forEach(item => {
//     //             if (item instanceof Block) {
//     //                 item.dispatchComponentDidMount();
//     //             }
//     //         });
//     //     });
//     // }
//
//     protected componentDidMount(): void {}
//
//     public dispatchComponentDidMount(): void {
//         this.eventBus().emit(Block.EVENTS.FLOW_CDM);
//     }
//
//     private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
//         const response = this.componentDidUpdate(oldProps, newProps);
//         if (!response) {
//             return;
//         }
//         this._render();
//     }
//
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
//         console.log('Updated:', oldProps, newProps);
//         return true;
//     }
//
//     private _getChildrenPropsAndProps(propsAndChildren: BlockProps): {
//         children: Record<string, Block>,
//         props: BlockProps,
//         lists: Record<string, any[]>
//     } {
//         const children: Record<string, Block> = {};
//         const props: BlockProps = {};
//         const lists: Record<string, any[]> = {};
//
//         Object.entries(propsAndChildren).forEach(([key, value]) => {
//             if (value instanceof Block) {
//                 children[key] = value;
//             } else if (Array.isArray(value)) {
//                 lists[key] = value;
//             } else {
//                 // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//                 props[key] = value;
//             }
//         });
//
//         return { children, props, lists };
//     }
//
//     protected addAttributes(): void {
//         const { attr = {} } = this.props;
//
//         Object.entries(attr).forEach(([key, value]) => {
//             if (this._element) {
//                 this._element.setAttribute(key, value as string);
//             }
//         });
//     }
//
//     protected setAttributes(attr: any): void {
//         Object.entries(attr).forEach(([key, value]) => {
//             if (this._element) {
//                 this._element.setAttribute(key, value as string);
//             }
//         });
//     }
//
//     public setProps = (nextProps: BlockProps): void => {
//         if (!nextProps) {
//             return;
//         }
//
//         Object.assign(this.props, nextProps);
//     };
//
//     public setLists = (nextList: Record<string, any[]>): void => {
//         if (!nextList) {
//             return;
//         }
//
//         Object.assign(this.lists, nextList);
//         this._render();
//     };
//
//     get element(): HTMLElement | null {
//         return this._element;
//     }
//
//     private _render(): void {
//         console.log('Render');
//
//         this._removeEvents();
//
//         const propsAndStubs = { ...this.props } as Record<string, any>;
//         const tmpId =  Math.floor(100000 + Math.random() * 900000);
//         Object.entries(this.children).forEach(([key, child]) => {
//             propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
//         });
//
//         Object.entries(this.lists).forEach(([key]) => {
//             propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`;
//         });
//
//         const fragment = this._createDocumentElement('template');
//         fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
//
//         Object.values(this.children).forEach(child => {
//             const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
//             if (stub) {
//                 stub.replaceWith(child.getContent());
//             }
//         });
//
//         Object.entries(this.lists).forEach(([, child]) => {
//             const listCont = this._createDocumentElement('template');
//             child.forEach(item => {
//                 if (item instanceof Block) {
//                     listCont.content.append(item.getContent());
//                 } else {
//                     listCont.content.append(`${item}`);
//                 }
//             });
//             const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`);
//             if (stub) {
//                 stub.replaceWith(listCont.content);
//             }
//         });
//
//         const newElement = fragment.content.firstElementChild as HTMLElement;
//         if (this._element && newElement) {
//             this._element.replaceWith(newElement);
//         }
//         this._element = newElement;
//         this._addEvents();
//         this.addAttributes();
//     }
//
//     protected render(): string {
//         return '';
//     }
//
//     public getContent(): HTMLElement {
//         if (!this._element) {
//             throw new Error('Element is not created');
//         }
//         return this._element;
//     }
//
//     private _makePropsProxy(props: any): any {
//         // eslint-disable-next-line @typescript-eslint/no-this-alias
//         const self = this;
//
//         return new Proxy(props, {
//             get(target: any, prop: string) {
//                 const value = target[prop];
//                 return typeof value === 'function' ? value.bind(target) : value;
//             },
//             set(target: any, prop: string, value: any) {
//                 const oldTarget = { ...target };
//                 target[prop] = value;
//                 self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
//                 return true;
//             },
//             deleteProperty() {
//                 throw new Error('No access');
//             },
//         });
//     }
//
//     private _createDocumentElement(tagName: string): HTMLTemplateElement {
//         return document.createElement(tagName) as HTMLTemplateElement;
//     }
//
//     public show(): void {
//         const content = this.getContent();
//         if (content) {
//             content.style.display = 'block';
//         }
//     }
//
//     public hide(): void {
//         const content = this.getContent();
//         if (content) {
//             content.style.display = 'none';
//         }
//     }
// }