import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";
import { Button, Input, Field, FieldLabel } from "@/components/ui";
import { TemplateContent } from "@/login/TemplateComponents";

export default function LoginRecoveryAuthnCodeInput(
  props: PageProps<Extract<KcContext, { pageId: "login-recovery-authn-code-input.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, messagesPerField, recoveryAuthnCodesInputBean } = kcContext;
  const { msg, msgStr } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("auth-recovery-code-header")}
      displayMessage={!messagesPerField.existsError("recoveryCodeInput")}
    >
      <TemplateContent>
        <form id="kc-recovery-code-login-form" action={url.loginAction} method="post" className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="recoveryCodeInput">
              {msg("auth-recovery-code-prompt", `${recoveryAuthnCodesInputBean.codeNumber}`)}
            </FieldLabel>
            <Input
              tabIndex={1}
              id="recoveryCodeInput"
              name="recoveryCodeInput"
              aria-invalid={messagesPerField.existsError("recoveryCodeInput")}
              autoComplete="off"
              type="text"
              autoFocus
            />
            {messagesPerField.existsError("recoveryCodeInput") && (
              <span
                id="input-error"
                className="text-destructive text-sm"
                aria-live="polite"
                dangerouslySetInnerHTML={{
                  __html: kcSanitize(messagesPerField.get("recoveryCodeInput"))
                }}
              />
            )}
          </Field>

          <Button type="submit" name="login" id="kc-login" className="w-full">
            {msgStr("doLogIn")}
          </Button>
        </form>
      </TemplateContent>
    </Template>
  );
}

