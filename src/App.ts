import {AuthorizePage} from './pages/authorizePage';
import {RegisterPage} from './pages/registerPage';
import {ChatsPage} from "./pages/ChatsPage";
import {NotFoundPage} from "./pages/404Page";
import {ErrorPage} from "./pages/500Page";
import {ProfilePage} from "./pages/profilePages/showUserInfo";
import {ChangeProfileDataPage} from "./pages/profilePages/changeUserInfo";
import {ChangePasswordPage} from "./pages/profilePages/changePassword";

// deploy first review

interface AppState {
  currentPage: string;
}

export default class App {
  private state: AppState;

  private appElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: 'register',
    };
    this.appElement = document.getElementById('app');
  }

  render(): string {

    if (this.state.currentPage === 'authorize') {
      const authorizePage = new AuthorizePage(this.changePage.bind(this));
      console.log(authorizePage.getContent());
      if (this.appElement) {
        this.appElement.replaceWith(authorizePage.getContent());
        this.appElement = authorizePage.getContent();
      }
    }
    else if (this.state.currentPage === 'register') {
      const registerPage = new RegisterPage(this.changePage.bind(this));
      console.log(registerPage.getContent());
      if (this.appElement) {
        this.appElement.replaceWith(registerPage.getContent());
        this.appElement = registerPage.getContent();
      }
    }
    else if (this.state.currentPage === 'chats') {
      const chatsPage = new ChatsPage(this.changePage.bind(this));
      console.log(chatsPage.getContent());
      if (this.appElement) {
        this.appElement.replaceWith(chatsPage.getContent());
        this.appElement = chatsPage.getContent();
      }
    }
    else if (this.state.currentPage === '404') {
      const notFoundPage = new NotFoundPage(this.changePage.bind(this));
      console.log(notFoundPage.getContent());
      if (this.appElement) {
        this.appElement.replaceWith(notFoundPage.getContent());
        this.appElement = notFoundPage.getContent();
      }
    }
    else if (this.state.currentPage === '500') {
      const errorPage = new ErrorPage(this.changePage.bind(this));
      console.log(errorPage.getContent());
      if (this.appElement) {
        this.appElement.replaceWith(errorPage.getContent());
        this.appElement = errorPage.getContent();
      }
    }
    else if (this.state.currentPage === 'profile') {
      const profilePage = new ProfilePage(this.changePage.bind(this));
      console.log(profilePage.getContent());
      if (this.appElement) {
        this.appElement.replaceWith(profilePage.getContent());
        this.appElement = profilePage.getContent();
      }
    }
    else if (this.state.currentPage === 'changeProfileData') {
      const changeProfileDataPage = new ChangeProfileDataPage(this.changePage.bind(this));
      console.log(changeProfileDataPage.getContent());
      if (this.appElement) {
        this.appElement.replaceWith(changeProfileDataPage.getContent());
        this.appElement = changeProfileDataPage.getContent();
      }
    }
    else if (this.state.currentPage === 'changePassword') {
      const changePasswordPage = new ChangePasswordPage(this.changePage.bind(this));
      console.log(changePasswordPage.getContent());
      if (this.appElement) {
        this.appElement.replaceWith(changePasswordPage.getContent());
        this.appElement = changePasswordPage.getContent();
      }
    }
    return '';
  }

  changePage(page: string): void {
    this.state.currentPage = page;
    this.render();
  }
}


