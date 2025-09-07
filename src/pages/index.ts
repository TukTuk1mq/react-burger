import MainPage from "./main/main-page";
import Login from "./login/login";
import Registration from "./registration/registration";
import ForgotPassword from "./forgot-password/forgot-password";
import NotFound from "./404/404";
import Profile from "./profile/profile";
import ResetPassword from "./reset-password/reset-password";
import ProfileEdit from "./profile-edit/profile-edit";
import ProfileLogout from "./profile-logout/profile-logout";
import IngredientDetailsPage from "./ingredient-details/ingredients-details";
import FeedPage from "./feed/feed";

export {
  MainPage,
  Login,
  Registration,
  ForgotPassword,
  NotFound,
  Profile,
  ProfileEdit,
  ResetPassword,
  ProfileLogout,
  IngredientDetailsPage,
  FeedPage
};

export type { default as MainPageType } from "./main/main-page";
export type { default as LoginType } from "./login/login";
export type { default as RegistrationType } from "./registration/registration";
export type { default as ForgotPasswordType } from "./forgot-password/forgot-password";
export type { default as NotFoundType } from "./404/404";
export type { default as ProfileType } from "./profile/profile";
export type { default as ResetPasswordType } from "./reset-password/reset-password";
export type { default as ProfileEditType } from "./profile-edit/profile-edit";
export type { default as ProfileLogoutType } from "./profile-logout/profile-logout";
export type { default as IngredientDetailsPageType } from "./ingredient-details/ingredients-details";
export type { default as FeedPageType} from "./feed/feed"
