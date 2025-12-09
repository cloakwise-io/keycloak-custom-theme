import "../global.css";
import "../custom.css";
import { Suspense, lazy, ComponentType } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
import LoginTemplate from "./Template";

const UserProfileFormFields = lazy(
  () => import("keycloakify/login/UserProfileFormFields")
);

const CustomUserProfileFormFields = lazy(() => import("./UserProfileFormFields"));

const doMakeUserConfirmPassword = true;
const Login = lazy(() => import("./pages/Login"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const LoginVerifyEmail = lazy(() => import("./pages/LoginVerifyEmail"));
const LoginUsername = lazy(() => import("./pages/LoginUsername"));
const LoginPassword = lazy(() => import("./pages/LoginPassword"));
const Register = lazy(() => import("./pages/Register"));
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"));
const LoginUpdateProfile = lazy(() => import("./pages/LoginUpdateProfile"));
const LoginOTP = lazy(() => import("./pages/LoginOtp"));
const WebauthnAuthenticate = lazy(() => import("./pages/WebauthnAuthenticate"));
const WebauthnRegister = lazy(() => import("./pages/WebauthnRegister"));
const WebauthnError = lazy(() => import("./pages/WebauthnError"));
const LoginOauth2DeviceVerifyUserCode = lazy(() => import("./pages/LoginOauth2DeviceVerifyUserCode"));
const LoginOauthGrant = lazy(() => import("./pages/LoginOauthGrant"));
const LinkIdpAction = lazy(() => import("./pages/LinkIdpAction"));
const LoginIdpLinkConfirm = lazy(() => import("./pages/LoginIdpLinkConfirm"));
const LoginIdpLinkEmail = lazy(() => import("./pages/LoginIdpLinkEmail"));
const LoginIdpLinkConfirmOverride = lazy(() => import("./pages/LoginIdpLinkConfirmOverride"));
const LoginPageExpired = lazy(() => import("./pages/LoginPageExpired"));
const LoginConfigTotp = lazy(() => import("./pages/LoginConfigTotp"));
const LogoutConfirm = lazy(() => import("./pages/LogoutConfirm"));
const IdpReviewUserProfile = lazy(() => import("./pages/IdpReviewUserProfile"));
const UpdateEmail = lazy(() => import("./pages/UpdateEmail"));
const SelectAuthenticator = lazy(() => import("./pages/SelectAuthenticator"));
const SamlPostForm = lazy(() => import("./pages/SamlPostForm"));
const DeleteCredential = lazy(() => import("./pages/DeleteCredential"));
const Code = lazy(() => import("./pages/Code"));
const DeleteAccountConfirm = lazy(() => import("./pages/DeleteAccountConfirm"));
const FrontchannelLogout = lazy(() => import("./pages/FrontchannelLogout"));
const LoginRecoveryAuthnCodeConfig = lazy(() => import("./pages/LoginRecoveryAuthnCodeConfig"));
const LoginRecoveryAuthnCodeInput = lazy(() => import("./pages/LoginRecoveryAuthnCodeInput"));
const LoginResetOtp = lazy(() => import("./pages/LoginResetOtp"));
const LoginX509Info = lazy(() => import("./pages/LoginX509Info"));
const LoginPasskeysConditionalAuthenticate = lazy(() => import("./pages/LoginPasskeysConditionalAuthenticate"));
const SelectOrganization = lazy(() => import("./pages/SelectOrganization"));
const Error = lazy(() => import("./pages/Error"));
const Info = lazy(() => import("./pages/Info"));
const Terms = lazy(() => import("./pages/Terms"));

// Pages with standard props
const STANDARD_PAGE_COMPONENTS: Partial<Record<KcContext["pageId"], ComponentType<any>>> = {
  "login.ftl": Login,
  "login-reset-password.ftl": LoginResetPassword,
  "login-verify-email.ftl": LoginVerifyEmail,
  "login-username.ftl": LoginUsername,
  "login-otp.ftl": LoginOTP,
  "login-password.ftl": LoginPassword,
  "login-update-password.ftl": LoginUpdatePassword,
  "webauthn-authenticate.ftl": WebauthnAuthenticate,
  "webauthn-register.ftl": WebauthnRegister,
  "webauthn-error.ftl": WebauthnError,
  "login-oauth2-device-verify-user-code.ftl": LoginOauth2DeviceVerifyUserCode,
  "login-oauth-grant.ftl": LoginOauthGrant,
  "link-idp-action.ftl": LinkIdpAction,
  "login-idp-link-confirm.ftl": LoginIdpLinkConfirm,
  "login-idp-link-email.ftl": LoginIdpLinkEmail,
  "login-idp-link-confirm-override.ftl": LoginIdpLinkConfirmOverride,
  "login-page-expired.ftl": LoginPageExpired,
  "login-config-totp.ftl": LoginConfigTotp,
  "logout-confirm.ftl": LogoutConfirm,
  "select-authenticator.ftl": SelectAuthenticator,
  "saml-post-form.ftl": SamlPostForm,
  "delete-credential.ftl": DeleteCredential,
  "code.ftl": Code,
  "delete-account-confirm.ftl": DeleteAccountConfirm,
  "frontchannel-logout.ftl": FrontchannelLogout,
  "login-recovery-authn-code-config.ftl": LoginRecoveryAuthnCodeConfig,
  "login-recovery-authn-code-input.ftl": LoginRecoveryAuthnCodeInput,
  "login-reset-otp.ftl": LoginResetOtp,
  "login-x509-info.ftl": LoginX509Info,
  "login-passkeys-conditional-authenticate.ftl": LoginPasskeysConditionalAuthenticate,
  "select-organization.ftl": SelectOrganization,
  "error.ftl": Error,
  "info.ftl": Info,
  "terms.ftl": Terms,
};

// Pages that need UserProfileFormFields
const USER_PROFILE_PAGE_COMPONENTS: Partial<Record<KcContext["pageId"], ComponentType<any>>> = {
  "login-update-profile.ftl": LoginUpdateProfile,
  "register.ftl": Register,
  "idp-review-user-profile.ftl": IdpReviewUserProfile,
  "update-email.ftl": UpdateEmail,
};

export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;
  const { i18n } = useI18n({ kcContext });

  const StandardPageComponent = STANDARD_PAGE_COMPONENTS[kcContext.pageId];
  const UserProfilePageComponent = USER_PROFILE_PAGE_COMPONENTS[kcContext.pageId];

  return (
    <Suspense>
      {StandardPageComponent ? (
        <StandardPageComponent
          kcContext={kcContext}
          i18n={i18n}
          classes={classes}
          Template={LoginTemplate}
          doUseDefaultCss={false}
        />
      ) : UserProfilePageComponent ? (
        <UserProfilePageComponent
          kcContext={kcContext}
          i18n={i18n}
          classes={classes}
          Template={LoginTemplate}
          doUseDefaultCss={false}
          UserProfileFormFields={CustomUserProfileFormFields}
          doMakeUserConfirmPassword={doMakeUserConfirmPassword}
        />
      ) : (
        <DefaultPage
          kcContext={kcContext}
          i18n={i18n}
          classes={classes}
          Template={Template}
          doUseDefaultCss={true}
          UserProfileFormFields={UserProfileFormFields}
          doMakeUserConfirmPassword={doMakeUserConfirmPassword}
        />
      )}
    </Suspense>
  );
}

const classes = {
  kcHtmlClass: "bg-background"
} satisfies { [key in ClassKey]?: string };
