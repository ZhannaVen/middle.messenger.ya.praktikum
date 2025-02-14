import EventBus from "./EventBus";

export enum WebSocketEvents {
    Close = 'close',
    Connect = 'connected',
    Error = 'error',
    Message = 'message',
    Open = 'open',
}

export class WebSocketTransport extends EventBus {
    private socket: WebSocket | null = null;

    private interval: ReturnType<typeof setInterval> | number = 0;

    private readonly url: string;

    constructor(url: string) {
        super();
        this.url = url;
    }

    public connect() {
        this.socket = new WebSocket(this.url);
        this.addEventListeners(this.socket);
        this.setPing();
        return new Promise<void>((resolve) => {
            this.on(WebSocketEvents.Connect, () => resolve());
        });
    }

    private setPing() {

        this.interval = setInterval(() => {
            this.send({ type: 'ping' });
        }, 5000);

        this.on(WebSocketEvents.Close, () => {
            clearInterval(this.interval);

            this.interval = 0;
        });
    }

    public send(data: unknown) {
        if (!this.socket) {
            throw new Error('Сокет-соединение не установлено');
        }
        this.socket.send(JSON.stringify(data));
    }

    private addEventListeners(socket: WebSocket) {
        socket.addEventListener(WebSocketEvents.Open, () => {
            this.emit(WebSocketEvents.Connect);
        });

        socket.addEventListener(WebSocketEvents.Close, (event: CloseEvent) => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто', event.reason);
            } else {
                console.log('Обрыв соединения');
            }
            this.emit(WebSocketEvents.Close);
        });

        socket.addEventListener(WebSocketEvents.Message, (event: MessageEvent) => {
            try {
                let dataStr = event.data;
                if (typeof dataStr !== 'string') {
                    dataStr = dataStr.toString();
                }
                if (dataStr[0] !== '{' && dataStr[0] !== '[') {
                    console.warn('Получено не JSON сообщение:', dataStr);
                    return;
                }
                const data = JSON.parse(event.data);
                if (data.type === 'pong') {
                    return;
                }
                this.emit(WebSocketEvents.Message, data);
            } catch (error) {
                console.log('Ошибка при парсинге JSON:', error, event.data);
            }
        });

        socket.addEventListener(WebSocketEvents.Error, (event: Event) => {
            console.log('Ошибка', event);
            this.emit(WebSocketEvents.Error, event);
        });
    }
}
