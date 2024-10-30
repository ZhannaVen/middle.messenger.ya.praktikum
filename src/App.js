import Handlebars from 'handlebars';
import * as Pages from './pages/index.js';
import './helpers/handlebarsHelpers.js';
import {mockProfile} from './mockProfile.js';

// Register partials
import Input from './components/Input.js';
import Button from './components/Button.js';
import Select from './components/Select.js';
import ErrorMessage from './components/ErrorMessage.js';
import Link from './components/Link.js';
import Label from './components/Label.js';

Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Select', Select);
Handlebars.registerPartial('ErrorMessage', ErrorMessage);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('Label', Label);

export default class App {
  constructor() {
    this.state = {
      currentPage: 'authorize'
    };
    this.appElement = document.getElementById('app');
  }

  render() {
    let template;
    if (this.state.currentPage === 'authorize') {
      template = Handlebars.compile(Pages.AuthorizePage);
      this.appElement.innerHTML = template();
    }
    else if (this.state.currentPage === 'register') {
      template = Handlebars.compile(Pages.RegisterPage);
      this.appElement.innerHTML = template();
    }
    else if (this.state.currentPage === '404') {
      template = Handlebars.compile(Pages.NoPage);
      this.appElement.innerHTML = template();
    }
    else if (this.state.currentPage === '500') {
      template = Handlebars.compile(Pages.ErrorPage);
      this.appElement.innerHTML = template();
    }
    else if (this.state.currentPage === 'chats') {
      template = Handlebars.compile(Pages.ChatsPage);
      this.appElement.innerHTML = template();
    }
    else if (this.state.currentPage === 'userProfile') {
      template = Handlebars.compile(Pages.UserProfilePage);
      this.appElement.innerHTML = template(mockProfile);
    }
    else if (this.state.currentPage === 'changeUserProfile') {
      template = Handlebars.compile(Pages.ChangeProfilePage);
      this.appElement.innerHTML = template(mockProfile);
    }
    else if (this.state.currentPage === 'changeUserPassword') {
      template = Handlebars.compile(Pages.ChangePasswordPage);
      this.appElement.innerHTML = template();
    }
    this.attachEventListeners();
  }

  attachEventListeners() {
    if (this.state.currentPage === 'authorize') {
      const authorizeButton = document.getElementById('submit-authorization');
      const registerLink = document.querySelector('.register-link');
      authorizeButton.addEventListener('click', () => this.authorization());
      registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.changePage(e.target.dataset.page);
      });
    }
    else if (this.state.currentPage === 'register') {
      const registerButton = document.getElementById('submit-register');
      const loginLink = document.querySelector('.login-link');
      registerButton.addEventListener('click', () => this.loginPage());
      loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.changePage(e.target.dataset.page);
      });
    }
    else if ((this.state.currentPage === '404') || (this.state.currentPage === '500')){
      const chatsLink = document.querySelector('.chats-link');
      chatsLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.changePage(e.target.dataset.page);
      });
    }
    else if (this.state.currentPage === 'chats') {
      const sendButton = document.getElementById('send-message');
      const profileLink = document.querySelector('.user-profilePages-link');
      sendButton.addEventListener('click', () => this.sendMessage());
      profileLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.changePage(e.target.dataset.page);
      });
    }
    else if (this.state.currentPage === 'userProfile') {
      const changeProfileLink = document.querySelector('.change-profile-link');
      const changePasswordLink = document.querySelector('.change-password-link');
      const loginLink = document.querySelector('.profile-login-link');
      changeProfileLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.changePage(e.target.dataset.page);
      });
      changePasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.changePage(e.target.dataset.page);
      });
      loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.changePage(e.target.dataset.page);
      });
    }
    else if (this.state.currentPage === 'changeUserProfile') {
      const saveButton = document.getElementById('submit-new-data');
      saveButton.addEventListener('click', () => this.saveData());
    }
    else if (this.state.currentPage === 'changeUserPassword') {
      const saveButton = document.getElementById('submit-new-password');
      saveButton.addEventListener('click', () => this.savePassword());
    }
  }

  authorization() {
    this.state.currentPage = 'chats';
    this.render();
  }

  loginPage() {
    this.state.currentPage = 'authorize';
    this.render();
  }

  sendMessage() {
    this.state.currentPage = 'chats';
    this.render();
  }

  saveData() {
    this.state.currentPage = 'userProfile';
    this.render();
  }

  savePassword() {
    this.state.currentPage = 'userProfile';
    this.render();
  }

  changePage(page) {
    this.state.currentPage = page;
    this.render();
  }

}
