import Block from '../../services/Block';
import {Link} from '../../components/Link';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import {ActiveChat} from "../../components/chats";
import {errorMessage} from "../../components/errorMessage";
import * as utils from '../../utils/validators'
import * as messages from "../../utils/constances";
import {State} from "../../services/Store";
import {connect} from "../../services/HOC";
import {Urls} from "../../utils/types";
import {AuthController} from "../../controllers/auth-controller";
import router from "../../services/Router";
import store from "../../services/Store";
import {MessagesController} from "../../controllers/message-controller";
import {OptionsList} from "../../components/optionsList";
import {Popup} from "../../components/Popup";
import {Label} from "../../components/Label";
import {ChatsController} from "../../controllers/chat-controller";
import {DeleteChatPopup} from "../../components/deleteChatPopup";
import {Text} from "../../components/Text";
import {Chat} from "../../utils/types";
import {ChatBlock} from "../../components/Chat";


export class ChatsPage extends Block {
    constructor() {
        console.log("ChatsPage constructor");
        super({
            profileLink: new Link({
                href: "/settings",
                class: "user-profile-link",
                'data-page': "userProfile",
                text: "Профиль",
                onClick: (event: Event) => {
                    console.log('CLICK Profile button');
                    AuthController.fetchUser()
                    router.go(Urls.Profile)
                    event.preventDefault();
                    event.stopPropagation();
                }
            }),
            createChatButton: new Button({
                id: "create-chat",
                text: "Создать новый чат",
                onClick: (event: Event) => {
                    console.log('CLICK create chat button');
                    this.setProps({createChat: true});
                    (this.children.createChatPopup as Block).show();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }),
            createChatPopup: new Popup({
                someLabel: new Label({
                    forAttr: "create-chat-input",
                    text: "Укажите назание чата"
                }),
                someInput: new Input({
                    id: 'create-chat-input',
                    name: "createChat-input",
                    type: "text",
                    placeholder: "Название чата",
                    onBlur: (event: Event) => {
                        console.log('create-сhat-input blur');
                        const newChatValue = (event.target as HTMLInputElement).value;
                        if (!newChatValue) {
                            console.log('Value is empty');
                        }
                        event.preventDefault();
                        event.stopPropagation();
                    },
                }),
                someButton: new Button({
                    id: "submit-create-chat",
                    text: "Создать чат",
                    onClick: async (event: Event) => {
                        console.log('CLICK Submit button');
                        event.preventDefault();
                        event.stopPropagation();

                        const chatTitle = (document.querySelector('#create-chat-input') as HTMLInputElement).value;
                        if (!chatTitle) {
                            console.log('Необходимо правильно заполнить данные');
                            return;
                        }
                        await ChatsController.createChat(chatTitle);
                        this.setProps({ chats: store.getState().chats });
                        (this.children.createChatPopup as Block).hide();
                    }
                }),
            }),
            activeChat: new ActiveChat({
                chat: store.getState().activeChat,
                allMessages: (store.getState()?.currentMessages || []).slice(-5),
                optionsButton: new Button({
                    id: "menu-button",
                    text: "⋮",
                    onClick: (event: Event) => {
                        console.log('CLICK options button');
                        if (this.props.optionsPopup === false || !this.props.optionsPopup) {
                            this.setProps({
                                optionsPopup: true,
                            });
                            (this.children.optionsList as Block).show()
                        } else {
                            this.setProps({
                                optionsPopup: false,
                            });
                            (this.children.optionsList as Block).hide()
                        }

                        event.preventDefault();
                        event.stopPropagation();
                    }
                }),
            }),
            optionsList: new OptionsList({
                addUserButton: new Button({
                    id: "addUserPopup",
                    text: "Добавить пользователя",
                    onClick: (event: Event) => {
                        console.log('CLICK Popup button');
                        this.setProps({
                            optionsPopup: false,
                            addUser: true,
                        });
                        if (this.children.optionsList instanceof Block) {
                            this.children.optionsList.hide();
                        }
                        (this.children.createUserPopup as Block).show()
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }),
                deleteUserButton: new Button({
                    id: "deleteUserPopup",
                    text: "Удалить пользователя",
                    onClick: (event: Event) => {
                        console.log('CLICK deleteUserPopup button');
                        this.setProps({
                            optionsPopup: false,
                            deleteUser: true,
                        });
                        if (this.children.optionsList instanceof Block) {
                            this.children.optionsList.hide();
                        }
                        (this.children.deleteUserPopup as Block).show()
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }),
                deleteChatButton: new Button({
                    id: "deleteChatPopup",
                    text: "Удалить чат",
                    onClick: (event: Event) => {
                        console.log('CLICK deleteChatPopup button');
                        this.setProps({
                            optionsPopup: false,
                            deleteChat: true,
                        });
                        if (this.children.optionsList instanceof Block) {
                            this.children.optionsList.hide();
                        }
                        (this.children.deleteChatPopup as Block).show()
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }),
            }),
            addUserPopup: new Popup({
                someLabel: new Label({
                    forAttr: "addUser-input",
                    text: "Укажите id пользователей через запятую"
                }),
                someInput: new Input({
                    id: 'addUser-input',
                    name: "addUser-input",
                    type: "text",
                    placeholder: "some id",
                    onBlur: (event: Event) => {
                        console.log('addUser-input blur');
                        const addUserValue = (event.target as HTMLInputElement).value;
                        if (!addUserValue) {
                            console.log('Value is empty');
                        }
                        event.preventDefault();
                        event.stopPropagation();
                    },
                }),
                someButton: new Button({
                    id: "submit-addUser",
                    text: "Добавить",
                    onClick: async (event: Event) => {
                        console.log('CLICK Submit button');
                        const addUserValue = (document.querySelector('#addUser-input') as HTMLInputElement).value;
                        if (addUserValue) {
                            const userId = addUserValue.split(',').map((n) => +n);
                            const chatId = store.getState().activeChat?.id;
                            if (chatId) {
                                await ChatsController.addUserToChat(chatId, userId);
                                (this.children.addUserPopup as Block).hide();
                            }
                            (this.children.addUserPopup as Block).hide();
                        } else {
                            console.log('Необходимо правильно заполнить данные');
                        }
                        event.preventDefault();
                        event.stopPropagation();
                    }

                }),
                closeButton: new Button({
                    id: "addUser-close-button",
                    text: "X",
                    onClick: (event: Event) => {
                        console.log('CLICK addUser-close button');
                        (this.children.addUserPopup as Block).hide();
                        event.preventDefault();
                        event.stopPropagation();
                    }
                })
            }),
            deleteUserPopup: new Popup({
                someLabel: new Label({
                    forAttr: "deleteUser-input",
                    text: "Укажите id пользователей через запятую"
                }),
                someInput: new Input({
                    id: 'deleteUser-input',
                    name: "deleteUser-input",
                    type: "text",
                    placeholder: "some id",
                    onBlur: (event: Event) => {
                        console.log('deleteUser-input blur');
                        const deleteUserValue = (event.target as HTMLInputElement).value;
                        if (!deleteUserValue) {
                            console.log('Value is empty');
                        }
                        event.preventDefault();
                        event.stopPropagation();
                    },
                }),
                someButton: new Button({
                    id: "submit-deleteUser",
                    text: "Удалить",
                    onClick: async (event: Event) => {
                        console.log('CLICK Submit button');
                        const deleteUserValue = (document.querySelector('#addUser-input') as HTMLInputElement).value;
                        if (deleteUserValue) {
                            const userId = deleteUserValue.split(',').map((n) => +n);
                            const chatId = store.getState().activeChat?.id;
                            if (chatId) {
                                await ChatsController.deleteUserFromChat(chatId, userId);
                                (this.children.deleteUserPopup as Block).hide();
                            }
                        } else {
                            console.log('Необходимо правильно заполнить данные');
                        }
                        event.preventDefault();
                        event.stopPropagation();
                    }

                }),
                closeButton: new Button({
                    id: "deleteUser-close-button",
                    text: "X",
                    onClick: (event: Event) => {
                        console.log('CLICK deleteUser-close button');
                        (this.children.deleteUserPopup as Block).hide();
                        event.preventDefault();
                        event.stopPropagation();
                    }
                })
            }),
            deleteChatPopup: new DeleteChatPopup({
                someText: new Text({
                    text: "Вы действительно хотите удалить этот чат?",
                    class: "deleteChat"
                }),
                deleteButton: new Button({
                    id: "submit-deleteChat",
                    text: "Удалить",
                    onClick: async (event: Event) => {
                        console.log('CLICK Submit button');
                        const activeChat = store.getState().activeChat;
                        if (activeChat && activeChat.id) {
                            const activeChatId = activeChat.id;
                            console.log("Active chat id from store:", activeChatId);
                            await ChatsController.deleteChat(activeChatId);
                            await ChatsController.getChatsList();
                            const chats = store.getState().chats;
                            if (chats && chats.length > 0) {
                                store.set("activeChat", chats[0]);
                                ChatsController.selectChat(chats[0].id);
                                MessagesController.findMessages(chats[0].id);
                            } else {
                                store.set("activeChat", null);
                            }

                            (this.children.activeChat as Block).setProps({
                                chat: store.getState().activeChat,
                                messages: store.getState()?.messages || [],
                            });
                            this.setProps({ chats: store.getState().chats });

                        } else {
                            console.warn("Активный чат отсутствует в store");
                        }
                        (this.children.deleteChatPopup as Block).hide();
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }),
                closeButton: new Button({
                    id: "deleteChat-close-button",
                    text: "X",
                    onClick: (event: Event) => {
                        console.log('CLICK deleteChat-close button');
                        (this.children.deleteChatPopup as Block).hide();
                        event.preventDefault();
                        event.stopPropagation();
                    }
                })
            }),
            messageInput: new Input({
                id: 'message-input',
                name: "message-input",
                type: "text",
                placeholder: "Ваше сообщение",
                onBlur: async (event: Event) => {
                    console.log('message blur');
                    const target = event.target as HTMLInputElement
                    const messageValue = target.value;
                    if (utils.validateMessage(messageValue)) {
                        console.log('Message is valid');
                        (this.children.errorMessage as Block).setProps({error: ""});
                    } else {
                        console.log('Message is invalid');
                        (this.children.errorMessage as Block).setProps({error: messages.wrongMessage});
                    }
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            errorMessage: new errorMessage({
                error: ""
            }),
            sendButton: new Button({
                id: "send-message",
                text: "Отправить ",
                onClick: async (event: Event) => {
                    console.log('CLICK Submit button');
                    const inputElement = document.querySelector('#message-input') as HTMLInputElement;
                    const messageValue = inputElement.value;
                    if (utils.validateMessage(messageValue)) {
                        console.log('Message is valid');
                        if (messageValue) {
                            const chatId = store.getState().activeChat?.id;
                            if (chatId) {
                                await MessagesController.sendMessage(chatId, messageValue);
                                MessagesController.findMessages(chatId);
                                setTimeout(() => {
                                    MessagesController.findMessages(chatId);
                                    (this.children.activeChat as Block).setProps({
                                        allMessages: (store.getState()?.currentMessages || []).slice(-5)
                                    });
                                    inputElement.value = "";
                                }, 1000);

                            }
                        }
                    } else {
                        console.log('Message is invalid');
                    }
                    event.preventDefault();
                    event.stopPropagation();
                }
            }),
        });
    }

    init(){
        this.children.chats = (store.getState().chats ?? []).map(
            (chat: Chat) => new ChatBlock({
                chat,
                onClick: (chatId: number) => {
                    ChatsController.selectChat(chatId);
                    MessagesController.findMessages(chatId);
                    (this.children.activeChat as Block).setProps({
                        chat: store.getState().activeChat,
                        allMessages: store.getState()?.currentMessages|| [],
                    });

                },
            })
        );
    }

    render(): string {
        return `
                <div id="app">
                    <body>
                        <main class="messenger-container">
                            <div class="messenger-left-side">
                                {{{ profileLink }}}
                                {{{ createChatButton }}}
                                <div class="chats-list">
                                       {{#each chats}}
                                           {{{this}}}
                                       {{/each}}                                       
                                </div>
                            </div>
                            <div class="messenger-right-side">
                                {{{ activeChat }}}
                                {{#if optionsPopup}}
                                    {{{ optionsList }}}
                                {{/if}}
                                {{#if addUser}}
                                    {{{ addUserPopup }}}
                                {{/if}}
                                {{#if deleteUser}}
                                    {{{ deleteUserPopup }}}
                                {{/if}}
                                {{#if deleteChat}}
                                    {{{ deleteChatPopup }}}
                                {{/if}}
                                {{#if createChat}}
                                    {{{ createChatPopup }}}
                                {{/if}}
                                <form class="messenger-input">
                                    {{{ messageInput }}}
                                    {{{ errorMessage }}}
                                    {{{ sendButton }}}
                                </form>
                            </div>
                        </main>
                    </body>
                </div>
                    `;
    }

    componentDidMount() {
        console.log("ChatsPage mounted");

        store.subscribe((newState) => {
            console.log("Store updated:", newState);
        });
        const persistedState = localStorage.getItem('appState');
        if (persistedState) {
            store.setState(JSON.parse(persistedState));
        }

        AuthController.fetchUser();
        ChatsController.getChatsList().then(() => {
            const chats = store.getState().chats;
            console.log("Chats after loading:", store.getState().chats);
            if (chats && chats.length > 0) {
                store.set('activeChat', chats[0]);
                MessagesController.findMessages(chats[0].id);
            }
        });

        window.addEventListener("beforeunload", () => {
            localStorage.setItem("appState", JSON.stringify(store.getState()));
        });

    }

    componentDidUpdate() {
        console.log("componentDidUpdate: обновление списка чатов");
        this.children.chats = (store.getState().chats ?? []).map(
            (chat: Chat) => new ChatBlock({
                chat,
                onClick: (chatId: number) => {
                    ChatsController.selectChat(chatId);
                    MessagesController.findMessages(chatId);
                    (this.children.activeChat as Block).setProps({
                        chat: store.getState().activeChat,
                        allMessages: (store.getState()?.currentMessages || []).slice(-5),
                    });
                },
            })
        );
        return true;
    }
}

const mapStateToProps = (state: State) => ({
    chats: state.chats || [],
    activeChat: state.activeChat || null,
});

export const ChatsWithProps = connect(mapStateToProps)(ChatsPage);
