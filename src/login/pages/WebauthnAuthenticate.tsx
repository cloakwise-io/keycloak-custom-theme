import { Fragment } from "react";
import { Key, Fingerprint } from "lucide-react";
import { useScript } from "keycloakify/login/pages/WebauthnAuthenticate.useScript";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { Button, Field } from "@/components/ui";
import { TemplateContent, TemplateFooter } from "@/login/TemplateComponents";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";

export default function WebauthnAuthenticate(props: PageProps<Extract<KcContext, { pageId: "webauthn-authenticate.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, realm, registrationDisabled, authenticators, shouldDisplayAuthenticators } = kcContext;
  const { msg, msgStr, advancedMsg } = i18n;
  const authButtonId = "authenticateWebAuthnButton";

  useScript({
    authButtonId,
    kcContext,
    i18n
  });

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("webauthn-login-title")}
      displayInfo={false}
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

        {authenticators && (
          <>
            <form id="authn_select" className="hidden">
              {authenticators.authenticators.map((authenticator, idx) => (
                <input key={idx} type="hidden" name="authn_use_chk" value={authenticator.credentialId} />
              ))}
            </form>

            {shouldDisplayAuthenticators && authenticators.authenticators.length > 0 && (
              <>
                {authenticators.authenticators.length > 1 && (
                  <div className="text-sm font-medium text-muted-foreground mb-4">
                    {msg("webauthn-available-authenticators")}
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
                        {authenticator.transports.displayNameProperties?.length && (
                          <div
                            id={`kc-webauthn-authenticator-transport-${i}`}
                            className="text-xs text-muted-foreground mb-1"
                          >
                            {authenticator.transports.displayNameProperties
                              .map((displayNameProperty, idx, arr) => ({
                                displayNameProperty,
                                hasNext: idx !== arr.length - 1
                              }))
                              .map(({ displayNameProperty, hasNext }) => (
                                <Fragment key={displayNameProperty}>
                                  {advancedMsg(displayNameProperty)}
                                  {hasNext && <span>, </span>}
                                </Fragment>
                              ))}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          <span id={`kc-webauthn-authenticator-createdlabel-${i}`}>
                            {msg("webauthn-createdAt-label")}{" "}
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

        <Field>
          <Button
            id={authButtonId}
            type="button"
            autoFocus
            className="w-full gap-2"
            tabIndex={1}
          >
            <Fingerprint className="w-4 h-4" />
            {msgStr("webauthn-doAuthenticate")}
          </Button>
        </Field>
      </TemplateContent>

      {realm.registrationAllowed && !registrationDisabled && (
        <TemplateFooter className="justify-center">
          <div className="text-center text-sm">
            {msg("noAccount")}{" "}
            <a tabIndex={6} href={url.registrationUrl} className="underline underline-offset-4">
              {msg("doRegister")}
            </a>
          </div>
        </TemplateFooter>
      )}
    </Template>
  );
}
