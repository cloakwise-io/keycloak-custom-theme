import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";
import { Button, Input, Field, FieldLabel } from "@/components/ui";
import { TemplateContent } from "@/login/TemplateComponents";

export default function LoginOauth2DeviceVerifyUserCode(
  props: PageProps<Extract<KcContext, { pageId: "login-oauth2-device-verify-user-code.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, messagesPerField } = kcContext;
  const { msg, msgStr } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={!messagesPerField.existsError("device_user_code")}
      headerNode={msg("oauth2DeviceVerificationTitle")}
    >
      <TemplateContent>
        <form
          id="kc-user-verify-device-user-code-form"
          className="flex flex-col gap-4"
          action={url.oauth2DeviceVerificationAction}
          method="post"
        >
          <Field>
            <FieldLabel htmlFor="device-user-code">{msg("verifyOAuth2DeviceUserCode")}</FieldLabel>
            <Input
              id="device-user-code"
              name="device_user_code"
              autoComplete="off"
              type="text"
              autoFocus
              aria-invalid={messagesPerField.existsError("device_user_code")}
            />
            {messagesPerField.existsError("device_user_code") && (
              <span
                className="text-destructive text-sm"
                dangerouslySetInnerHTML={{
                  __html: kcSanitize(messagesPerField.get("device_user_code"))
                }}
              />
            )}
          </Field>

          <Button type="submit" className="w-full">
            {msgStr("doSubmit")}
          </Button>
        </form>
      </TemplateContent>
    </Template>
  );
}

