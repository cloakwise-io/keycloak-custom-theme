import { useState } from "react";
import { Fingerprint } from "lucide-react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useScript } from "keycloakify/login/pages/LoginPassword.useScript";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";
import { Button, Field, FieldLabel } from "@/components/ui";
import { TemplateContent } from "@/login/TemplateComponents";
import { PasswordInput } from "@/components/overrides/custom-password-input";

export default function LoginPassword(props: PageProps<Extract<KcContext, { pageId: "login-password.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const { realm, url, messagesPerField, enableWebAuthnConditionalUI, authenticators } = kcContext;
  const { msg, msgStr } = i18n;

  const webAuthnButtonId = "authenticateWebAuthnButton";

  useScript({
    webAuthnButtonId,
    kcContext,
    i18n
  });

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("doLogIn")}
      displayMessage={!messagesPerField.existsError("password")}
    >
      <TemplateContent className="space-y-6">
        <form
          id="kc-form-login"
          className="flex flex-col gap-4"
          onSubmit={() => {
            setIsLoginButtonDisabled(true);
            return true;
          }}
          action={url.loginAction}
          method="post"
        >
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">{msg("password")}</FieldLabel>
              {realm.resetPasswordAllowed && (
                <a tabIndex={5} href={url.loginResetCredentialsUrl} className="ml-auto text-sm underline-offset-4 hover:underline">
                  {msg("doForgotPassword")}
                </a>
              )}
            </div>

            <PasswordInput
              tabIndex={2}
              id="password"
              name="password"
              autoFocus
              autoComplete="on"
              aria-invalid={messagesPerField.existsError("username", "password")}
            />

            {messagesPerField.existsError("password") && (
              <span
                id="input-error-password"
                className="text-destructive text-sm"
                aria-live="polite"
                dangerouslySetInnerHTML={{
                  __html: kcSanitize(messagesPerField.get("password"))
                }}
              />
            )}
          </Field>

          <div id="kc-form-options" />

          <div id="kc-form-buttons">
            <Button id="kc-login" tabIndex={4} name="login" type="submit" className="w-full" disabled={isLoginButtonDisabled}>
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
      </TemplateContent>
    </Template>
  );
}
