import './styles/main.pcss';
import router from "./services/Router";
import {Urls} from "./utils/types";
import {AuthorizeWithProps} from "./pages/authorizePage";
import {ChatsWithProps} from "./pages/ChatsPage";
import {ProfileWithProps} from "./pages/profilePages/showUserInfo";
import {ChangeProfileDataPage} from "./pages/profilePages/changeUserInfo";
import {ChangePasswordPage} from "./pages/profilePages/changePassword";
import {NotFoundPage} from "./pages/404Page";
import {ErrorPage} from "./pages/500Page";
import store, {State} from "./services/Store";
import {RegisterWithProps} from "./pages/registerPage";

document.addEventListener('DOMContentLoaded', async () => {
  console.log("Trying to mount App...");
  const app = document.querySelector("#app");
  console.log("App container:", app);

  store.subscribe((state: State) => {
    localStorage.setItem('appState', JSON.stringify(state));
  });

  console.log("Initializing router...");
  router
      .use(Urls.Authorize, AuthorizeWithProps)
      .use(Urls.Register, RegisterWithProps)
      .use(Urls.Chats, ChatsWithProps)
      .use(Urls.Profile, ProfileWithProps)
      .use(Urls.ChangeProfile, ChangeProfileDataPage)
      .use(Urls.ChangePassword, ChangePasswordPage)
      .use(Urls.NotFound, NotFoundPage)
      .use(Urls.Error, ErrorPage)
      .start();
  console.log("Router started");
});
