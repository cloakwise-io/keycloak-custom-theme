import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { cn } from "@/lib/utils";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";

type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
  UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
  doMakeUserConfirmPassword: boolean;
};

export default function Register(props: RegisterProps) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes
  });

  const { messageHeader, url, messagesPerField, recaptchaRequired, recaptchaVisible, recaptchaSiteKey, recaptchaAction, termsAcceptanceRequired } =
    kcContext;

  const { msg, msgStr, advancedMsg } = i18n;

  const [isFormSubmittable, setIsFormSubmittable] = useState(false);
  const [areTermsAccepted, setAreTermsAccepted] = useState(false);

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={messageHeader !== undefined ? advancedMsg(messageHeader) : msg("registerTitle")}
      displayMessage={messagesPerField.exists("global")}
      displayRequiredFields={false}
      infoNode={
        <div className="text-center text-sm mt-4">
          {msg("acceptTerms")}{" "}
          <a href={url.loginUrl} className="underline underline-offset-4">
            {msg("doLogIn")}
          </a>
        </div>
      }
    >
      <form id="kc-register-form" className="flex flex-col gap-2" action={url.registrationAction} method="post">
        <UserProfileFormFields
          kcContext={kcContext}
          i18n={i18n}
          kcClsx={kcClsx}
          onIsFormSubmittableValueChange={setIsFormSubmittable}
          doMakeUserConfirmPassword={doMakeUserConfirmPassword}
        />

        {termsAcceptanceRequired && (
          <div className={cn("space-x-3 space-y-0 rounded-md border p-4 mt-2", messagesPerField.existsError("termsAccepted") && "border-destructive")}>
            <div className="items-top flex space-x-2">
              <Checkbox
                id="termsAccepted"
                name="termsAccepted"
                checked={areTermsAccepted}
                onCheckedChange={(checked: boolean) => setAreTermsAccepted(checked)}
                aria-invalid={messagesPerField.existsError("termsAccepted")}
              />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="termsAccepted" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {msg("termsTitle")}
                </label>
                <p className="text-sm text-muted-foreground">{msg("acceptTerms")}</p>
              </div>
            </div>

            {messagesPerField.existsError("termsAccepted") && (
              <span
                className="text-destructive text-sm"
                dangerouslySetInnerHTML={{
                  __html: kcSanitize(messagesPerField.get("termsAccepted"))
                }}
              />
            )}
          </div>
        )}

        {recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (
          <div className="g-recaptcha mt-2" data-size="compact" data-sitekey={recaptchaSiteKey} data-action={recaptchaAction} />
        )}

        <div className="flex flex-col gap-2 mt-2">
          {recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined ? (
            <Button
              className="w-full"
              variant="secondary"
              type="submit"
              disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}
              data-sitekey={recaptchaSiteKey}
              data-callback={() => {
                (document.getElementById("kc-register-form") as HTMLFormElement).submit();
              }}
              data-action={recaptchaAction}
            >
              {msgStr("doRegister")}
            </Button>
          ) : (
            <Button className="w-full" type="submit" disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}>
              {msgStr("doRegister")}
            </Button>
          )}
        </div>

        <div id="kc-form-options">
          <Button variant="link" className="w-full text-sm" asChild>
            <a href={url.loginUrl}>{msg("backToLogin")}</a>
          </Button>
        </div>
      </form>
    </Template>
  );
}
