import { Fragment } from "react";
import { Key, Fingerprint } from "lucide-react";
import { useScript } from "keycloakify/login/pages/LoginPasskeysConditionalAuthenticate.useScript";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";
import { Button, Field, FieldLabel, Input } from "@/components/ui";
import { TemplateContent } from "@/login/TemplateComponents";

export default function LoginPasskeysConditionalAuthenticate(
  props: PageProps<Extract<KcContext, { pageId: "login-passkeys-conditional-authenticate.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { messagesPerField, login, url, usernameHidden, shouldDisplayAuthenticators, authenticators, registrationDisabled, realm } = kcContext;
  const { msg, msgStr, advancedMsg } = i18n;

  const authButtonId = "authenticateWebAuthnButton";

  useScript({ authButtonId, kcContext, i18n });

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("passkey-login-title")}
      infoNode={
        realm.registrationAllowed &&
        !registrationDisabled && (
          <div id="kc-registration" className="text-center text-sm">
            {msg("noAccount")}{" "}
            <a tabIndex={6} href={url.registrationUrl} className="underline underline-offset-4">
              {msg("doRegister")}
            </a>
          </div>
        )
      }
    >
      <TemplateContent className="space-y-6">
        <form id="webauth" action={url.loginAction} method="post" className="hidden">
          <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
          <input type="hidden" id="authenticatorData" name="authenticatorData" />
          <input type="hidden" id="signature" name="signature" />
          <input type="hidden" id="credentialId" name="credentialId" />
          <input type="hidden" id="userHandle" name="userHandle" />
          <input type="hidden" id="error" name="error" />
        </form>

        {authenticators !== undefined && Object.keys(authenticators).length !== 0 && (
          <>
            <form id="authn_select" className="hidden">
              {authenticators.authenticators.map((authenticator, i) => (
                <input key={i} type="hidden" name="authn_use_chk" readOnly value={authenticator.credentialId} />
              ))}
            </form>
            {shouldDisplayAuthenticators && (
              <>
                {authenticators.authenticators.length > 1 && (
                  <div className="text-sm font-medium text-muted-foreground mb-4">
                    {msg("passkey-available-authenticators")}
                  </div>
                )}
                <div className="space-y-3">
                  {authenticators.authenticators.map((authenticator, i) => (
                    <div
                      key={i}
                      id={`kc-webauthn-authenticator-item-${i}`}
                      className="flex items-start gap-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <Key className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div id={`kc-webauthn-authenticator-label-${i}`} className="font-medium text-sm mb-1">
                          {advancedMsg(authenticator.label)}
                        </div>
                        {authenticator.transports !== undefined &&
                          authenticator.transports.displayNameProperties !== undefined &&
                          authenticator.transports.displayNameProperties.length !== 0 && (
                            <div
                              id={`kc-webauthn-authenticator-transport-${i}`}
                              className="text-xs text-muted-foreground mb-1"
                            >
                              {authenticator.transports.displayNameProperties.map((nameProperty, idx, arr) => (
                                <Fragment key={idx}>
                                  <span>{advancedMsg(nameProperty)}</span>
                                  {idx !== arr.length - 1 && <span>, </span>}
                                </Fragment>
                              ))}
                            </div>
                          )}
                        <div className="text-xs text-muted-foreground">
                          <span id={`kc-webauthn-authenticator-createdlabel-${i}`}>
                            {msg("passkey-createdAt-label")}{" "}
                          </span>
                          <span id={`kc-webauthn-authenticator-created-${i}`}>{authenticator.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        <div id="kc-form">
          <div id="kc-form-wrapper">
            {realm.password && (
              <form
                id="kc-form-login"
                action={url.loginAction}
                method="post"
                style={{ display: "none" }}
                onSubmit={event => {
                  try {
                    // @ts-expect-error
                    event.target.login.disabled = true;
                  } catch {}
                  return true;
                }}
              >
                {!usernameHidden && (
                  <Field>
                    <FieldLabel htmlFor="username">{msg("passkey-autofill-select")}</FieldLabel>
                    <Input
                      tabIndex={1}
                      id="username"
                      aria-invalid={messagesPerField.existsError("username")}
                      name="username"
                      defaultValue={login.username ?? ""}
                      autoComplete="username webauthn"
                      type="text"
                      autoFocus
                    />
                    {messagesPerField.existsError("username") && (
                      <span
                        id="input-error-username"
                        className="text-destructive text-sm"
                        aria-live="polite"
                        dangerouslySetInnerHTML={{
                          __html: kcSanitize(messagesPerField.get("username"))
                        }}
                      />
                    )}
                  </Field>
                )}
              </form>
            )}
            <div id="kc-form-passkey-button" style={{ display: "none" }}>
              <Button id={authButtonId} type="button" autoFocus className="w-full gap-2">
                <Fingerprint className="w-4 h-4" />
                {msgStr("passkey-doAuthenticate")}
              </Button>
            </div>
          </div>
        </div>
      </TemplateContent>
    </Template>
  );
}

