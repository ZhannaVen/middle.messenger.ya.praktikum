import EventBus from './EventBus.js';
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
