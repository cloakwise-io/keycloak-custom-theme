import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, realm, auth, messagesPerField } = kcContext;
  const { msg, msgStr } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={!messagesPerField.existsError("username")}
      headerNode={msg("emailForgotTitle")}
    >
      <form id="kc-reset-password-form" className="flex flex-col gap-4" action={url.loginAction} method="post">
        <p className="text-md text-muted-foreground">{realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}</p>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="username">
              {!realm.loginWithEmailAllowed ? msg("username") : !realm.registrationEmailAsUsername ? msg("usernameOrEmail") : msg("email")}
            </Label>
            <Input
              type="text"
              id="username"
              name="username"
              defaultValue={auth.attemptedUsername ?? ""}
              aria-invalid={messagesPerField.existsError("username")}
              required
            />
            {messagesPerField.existsError("username") && (
              <span
                className="text-destructive text-sm"
                dangerouslySetInnerHTML={{
                  __html: kcSanitize(messagesPerField.get("username"))
                }}
              />
            )}
          </div>
          <Button type="submit" className="w-full">
            {msgStr("doSubmit")}
          </Button>
        </div>
        <Button variant="link" className="w-full text-sm" asChild>
          <a href={url.loginUrl}>{msg("backToLogin")}</a>
        </Button>
      </form>
    </Template>
  );
}
