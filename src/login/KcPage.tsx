import "../global.css";
import "../custom.css";
import { Suspense, lazy } from "react";
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
const Error = lazy(() => import("./pages/Error"));
const Info = lazy(() => import("./pages/Info"));
const Terms = lazy(() => import("./pages/Terms"));

export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;
  const { i18n } = useI18n({ kcContext });

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case "login.ftl":
            return (
              <Login
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "login-reset-password.ftl":
            return (
              <LoginResetPassword
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "login-verify-email.ftl":
            return (
              <LoginVerifyEmail
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "login-username.ftl":
            return (
              <LoginUsername
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );

          case "login-otp.ftl":
            return (
              <LoginOTP
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );

          case "login-password.ftl":
            return (
              <LoginPassword
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "login-update-password.ftl":
            return (
              <LoginUpdatePassword
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "login-update-profile.ftl":
            return (
              <LoginUpdateProfile
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
                UserProfileFormFields={CustomUserProfileFormFields}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
              />
            );
          case "register.ftl":
            return (
              <Register
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
                UserProfileFormFields={CustomUserProfileFormFields}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
              />
            );
          case "webauthn-authenticate.ftl":
            return (
              <WebauthnAuthenticate
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "webauthn-register.ftl":
            return (
              <WebauthnRegister
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "webauthn-error.ftl":
            return (
              <WebauthnError
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "login-oauth2-device-verify-user-code.ftl":
            return (
              <LoginOauth2DeviceVerifyUserCode
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "login-oauth-grant.ftl":
            return (
              <LoginOauthGrant
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "link-idp-action.ftl":
            return (
              <LinkIdpAction
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "login-idp-link-confirm.ftl":
            return (
              <LoginIdpLinkConfirm
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "login-idp-link-email.ftl":
            return (
              <LoginIdpLinkEmail
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "login-idp-link-confirm-override.ftl":
            return (
              <LoginIdpLinkConfirmOverride
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "login-page-expired.ftl":
            return (
              <LoginPageExpired
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "login-config-totp.ftl":
            return (
              <LoginConfigTotp
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "logout-confirm.ftl":
            return (
              <LogoutConfirm
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "idp-review-user-profile.ftl":
            return (
              <IdpReviewUserProfile
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
                UserProfileFormFields={CustomUserProfileFormFields}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
              />
            );
          case "update-email.ftl":
            return (
              <UpdateEmail
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
                UserProfileFormFields={CustomUserProfileFormFields}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
              />
            );
          case "select-authenticator.ftl":
            return (
              <SelectAuthenticator
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "saml-post-form.ftl":
            return (
              <SamlPostForm
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "delete-credential.ftl":
            return (
              <DeleteCredential
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "code.ftl":
            return (
              <Code
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "error.ftl":
            return (
              <Error
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "info.ftl":
            return (
              <Info
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          case "terms.ftl":
            return (
              <Terms
                {...{ kcContext, i18n, classes }}
                Template={LoginTemplate}
                doUseDefaultCss={false}
              />
            );
          default:
            return (
              <DefaultPage
                kcContext={kcContext}
                i18n={i18n}
                classes={classes}
                Template={Template}
                doUseDefaultCss={true}
                UserProfileFormFields={UserProfileFormFields}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
              />
            );
        }
      })()}
    </Suspense>
  );
}

const classes = {
  kcHtmlClass: "bg-background"
} satisfies { [key in ClassKey]?: string };
