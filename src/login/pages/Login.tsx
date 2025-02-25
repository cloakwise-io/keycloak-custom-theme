import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { PasswordInput } from "@/components/overrides/custom-password-input";
import { Checkbox } from "@/components/ui/checkbox";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialProviders } from "@/components/overrides/social-providers";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const { msg, msgStr } = i18n;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={!messagesPerField.existsError("username", "password")}
      headerNode={
        <div className="flex flex-col items-center gap-2 text-center mb-4">
          <h1 className="text-2xl font-bold">{msg("loginAccountTitle")}</h1>
        </div>
      }
      displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
      infoNode={
        <div className="text-center text-sm mt-4">
          {msg("noAccount")}{" "}
          <a href={url.registrationUrl} className="underline underline-offset-4">
            {msg("doRegister")}
          </a>
        </div>
      }
      socialProvidersNode={<SocialProviders providers={social?.providers} label={msgStr("identity-provider-login-label")} />}
    >
      {realm.password && (
        <form className="flex flex-col gap-4" onSubmit={() => setIsLoginButtonDisabled(true)} action={url.loginAction} method="post">
          {!usernameHidden && (
            <div className="grid gap-2">
              <Label htmlFor="username">
                {!realm.loginWithEmailAllowed ? msg("username") : !realm.registrationEmailAsUsername ? msg("usernameOrEmail") : msg("email")}
              </Label>
              <Input
                id="username"
                name="username"
                defaultValue={login.username ?? ""}
                type="text"
                autoFocus
                autoComplete="username"
                aria-invalid={messagesPerField.existsError("username", "password")}
              />
              {messagesPerField.existsError("username", "password") && (
                <span
                  className="text-destructive text-sm"
                  dangerouslySetInnerHTML={{
                    __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                  }}
                />
              )}
            </div>
          )}

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">{msg("password")}</Label>
              {realm.resetPasswordAllowed && (
                <a href={url.loginResetCredentialsUrl} className="ml-auto text-sm underline-offset-4 hover:underline">
                  {msg("doForgotPassword")}
                </a>
              )}
            </div>
            <PasswordInput
              id="password"
              name="password"
              autoComplete="current-password"
              aria-invalid={messagesPerField.existsError("username", "password")}
            />
            {usernameHidden && messagesPerField.existsError("username", "password") && (
              <span
                className="text-destructive text-sm"
                dangerouslySetInnerHTML={{
                  __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                }}
              />
            )}
          </div>

          {realm.rememberMe && !usernameHidden && (
            <div className="flex items-center space-x-2">
              <Checkbox id="rememberMe" name="rememberMe" defaultChecked={!!login.rememberMe} />
              <label htmlFor="rememberMe" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {msg("rememberMe")}
              </label>
            </div>
          )}

          <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
          <Button type="submit" className="w-full" disabled={isLoginButtonDisabled}>
            {msgStr("doLogIn")}
          </Button>
        </form>
      )}
    </Template>
  );
}
