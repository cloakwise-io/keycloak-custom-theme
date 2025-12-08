import { useState } from "react";
import { Fingerprint } from "lucide-react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useScript } from "keycloakify/login/pages/Login.useScript";
import { PasswordInput } from "@/components/overrides/custom-password-input";
import { Button, Input, Checkbox, Field, FieldLabel, FieldSeparator } from "@/components/ui";
import { TemplateContent, TemplateFooter } from "@/login/TemplateComponents";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";
import { SocialProviderButton } from "@/components/overrides/social-provider-button";
import { cn } from "@/lib/utils";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField, enableWebAuthnConditionalUI, authenticators } = kcContext;
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const { msg, msgStr } = i18n;

  const webAuthnButtonId = "authenticateWebAuthnButton";

  useScript({
    webAuthnButtonId,
    kcContext,
    i18n
  });

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={!messagesPerField.existsError("username", "password")}
      headerNode={msg("loginAccountTitle")}
      displayInfo={false}
    >
      {realm.password && (
        <>
          <TemplateContent className="space-y-6">
            <form
              id="kc-form-login"
              className="flex flex-col gap-4"
              onSubmit={() => setIsLoginButtonDisabled(true)}
              action={url.loginAction}
              method="post"
            >
              {!usernameHidden && (
                <Field>
                  <FieldLabel htmlFor="username">
                    {!realm.loginWithEmailAllowed ? msg("username") : !realm.registrationEmailAsUsername ? msg("usernameOrEmail") : msg("email")}
                  </FieldLabel>
                  <Input
                    id="username"
                    name="username"
                    tabIndex={2}
                    defaultValue={login.username ?? ""}
                    type="text"
                    autoFocus
                    autoComplete="username"
                    aria-invalid={messagesPerField.existsError("username", "password")}
                  />
                  {messagesPerField.existsError("username", "password") && (
                    <span
                      id="input-error"
                      className="text-destructive text-sm"
                      aria-live="polite"
                      dangerouslySetInnerHTML={{
                        __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                      }}
                    />
                  )}
                </Field>
              )}

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">{msg("password")}</FieldLabel>
                  {realm.resetPasswordAllowed && (
                    <a href={url.loginResetCredentialsUrl} className="ml-auto text-xs underline-offset-4 hover:underline">
                      {msg("doForgotPassword")}
                    </a>
                  )}
                </div>
                <PasswordInput
                  tabIndex={3}
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
              </Field>

              <div id="kc-form-options">
                {realm.rememberMe && !usernameHidden && (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rememberMe" name="rememberMe" defaultChecked={!!login.rememberMe} tabIndex={5} />
                    <label htmlFor="rememberMe" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {msg("rememberMe")}
                    </label>
                  </div>
                )}
              </div>

              <div id="kc-form-buttons">
                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                <Button type="submit" name="login" className="w-full" disabled={isLoginButtonDisabled} tabIndex={7} id="kc-login">
                  {msgStr("doLogIn")}
                </Button>
              </div>
            </form>

            {enableWebAuthnConditionalUI && (
              <>
                <form id="webauth" action={url.loginAction} method="post" className="hidden">
                  <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                  <input type="hidden" id="authenticatorData" name="authenticatorData" />
                  <input type="hidden" id="signature" name="signature" />
                  <input type="hidden" id="credentialId" name="credentialId" />
                  <input type="hidden" id="userHandle" name="userHandle" />
                  <input type="hidden" id="error" name="error" />
                </form>

                {authenticators !== undefined && authenticators.authenticators.length !== 0 && (
                  <form id="authn_select" className="hidden">
                    {authenticators.authenticators.map((authenticator, i) => (
                      <input key={i} type="hidden" name="authn_use_chk" readOnly value={authenticator.credentialId} />
                    ))}
                  </form>
                )}

                <Button
                  id={webAuthnButtonId}
                  type="button"
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Fingerprint className="w-4 h-4" />
                  {msgStr("passkey-doAuthenticate")}
                </Button>
              </>
            )}

            {/* Social providers separator */}
            {social?.providers && social.providers.length > 0 && (
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                {msgStr("identity-provider-login-label")}
              </FieldSeparator>
            )}
          </TemplateContent>
          <TemplateFooter className="flex-col gap-2 space-y-6">
            <div id="kc-social-providers" className="w-full">
              {social?.providers && social.providers.length > 0 && (
                <div className={cn("grid gap-3 grid-cols-1", social.providers.length > 1 && "md:grid-cols-2")}>
                  {social.providers.map((p) => (
                    <SocialProviderButton
                      key={p.alias}
                      alias={p.alias}
                      displayName={p.displayName}
                      loginUrl={p.loginUrl}
                      id={`social-${p.alias}`}
                    />
                  ))}
                </div>
              )}
            </div>
            {realm.registrationAllowed && !registrationDisabled && (
              <div id="kc-registration-container">
                <div id="kc-registration" className="text-center text-sm">
                  {msg("noAccount")}{" "}
                  <a href={url.registrationUrl} className="underline underline-offset-4" tabIndex={8}>
                    {msg("doRegister")}
                  </a>
                </div>
              </div>
            )}
          </TemplateFooter>
        </>
      )}
    </Template>
  );
}
