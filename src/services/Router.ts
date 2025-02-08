import Block from "./Block";


function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

function render(query: string, block: Block) {
    const root = document.getElementById(query);
    if (root) {
        const content = block.getContent();
        if (content) {
            root.append(content);
        }
    }
    return root;
}

class Route {
    private _pathname: string;

    private readonly _blockClass: typeof Block;

    private _block: null | Block;

    private _props: {
        rootQuery: string;
    };

    constructor(pathname: string, view: typeof Block, props: { rootQuery: string }) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass({});
            render(this._props.rootQuery, this._block as Block);
            this._block.dispatchComponentDidMount();
            return;
        }

        this._block.show();
    }
}

class Router {
    private routes: Route[] = [];

    private static __instance: Router;

    private readonly _rootQuery: string = '';

    private _currentRoute: null | Route = null;

    private history = window.history;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    public use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }

    start() {
        console.log("Router start() called");
        window.onpopstate = ((event: PopStateEvent) => {
            const target = event.currentTarget as Window; // Явное указание типа
            this._onRoute(target.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}

export default new Router('app');

