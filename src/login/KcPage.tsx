import "./global.css";
import "./custom.css";
import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
import AuthTemplate from "./Template";

const UserProfileFormFields = lazy(
  () => import("keycloakify/login/UserProfileFormFields")
);

const CustomUserProfileFormFields = lazy(
  () => import("./UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;
const Login = lazy(() => import("./pages/Login"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const LoginVerifyEmail = lazy(() => import("./pages/LoginVerifyEmail"));
const LoginUsername = lazy(() => import("./pages/LoginUsername"));
const LoginPassword = lazy(() => import("./pages/LoginPassword"));
const Register = lazy(() => import("./pages/Register"));

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
                Template={AuthTemplate}
                doUseDefaultCss={false}
              />
            );
          case "login-reset-password.ftl":
            return (
              <LoginResetPassword
                {...{ kcContext, i18n, classes }}
                Template={AuthTemplate}
                doUseDefaultCss={false}
              />
            );
          case "login-verify-email.ftl":
            return (
              <LoginVerifyEmail
                {...{ kcContext, i18n, classes }}
                Template={AuthTemplate}
                doUseDefaultCss={false}
              />
            );
          case "login-username.ftl":
            return (
              <LoginUsername
                {...{ kcContext, i18n, classes }}
                Template={AuthTemplate}
                doUseDefaultCss={false}
              />
            );
          case "login-password.ftl":
            return (
              <LoginPassword
                {...{ kcContext, i18n, classes }}
                Template={AuthTemplate}
                doUseDefaultCss={false}
              />
            );
          case "register.ftl":
            return (
              <Register
                {...{ kcContext, i18n, classes }}
                Template={AuthTemplate}
                doUseDefaultCss={false}
                UserProfileFormFields={CustomUserProfileFormFields}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
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
