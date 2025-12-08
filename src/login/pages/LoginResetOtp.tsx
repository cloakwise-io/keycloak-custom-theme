import { Fragment } from "react";
import { Smartphone } from "lucide-react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";
import { Button } from "@/components/ui";
import { TemplateContent } from "@/login/TemplateComponents";
import { cn } from "@/lib/utils";

export default function LoginResetOtp(props: PageProps<Extract<KcContext, { pageId: "login-reset-otp.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, messagesPerField, configuredOtpCredentials } = kcContext;
  const { msg, msgStr } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={!messagesPerField.existsError("totp")}
      headerNode={msg("doLogIn")}
    >
      <TemplateContent className="space-y-6">
        <form id="kc-otp-reset-form" action={url.loginAction} method="post" className="space-y-6">
          <p id="kc-otp-reset-form-description" className="text-sm text-muted-foreground">
            {msg("otp-reset-description")}
          </p>

          {configuredOtpCredentials.userOtpCredentials.length > 0 && (
            <div className="space-y-3">
              {configuredOtpCredentials.userOtpCredentials.map((otpCredential, index) => {
                const isChecked = otpCredential.id === configuredOtpCredentials.selectedCredentialId;
                return (
                  <Fragment key={otpCredential.id}>
                    <input
                      id={`kc-otp-credential-${index}`}
                      type="radio"
                      name="selectedCredentialId"
                      value={otpCredential.id}
                      defaultChecked={isChecked}
                      className="sr-only"
                    />
                    <label
                      htmlFor={`kc-otp-credential-${index}`}
                      className={cn(
                        "flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors",
                        "hover:bg-accent/50",
                        isChecked && "border-primary bg-primary/5"
                      )}
                      tabIndex={index}
                    >
                      <Smartphone className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      <span className="font-medium text-sm flex-1">{otpCredential.userLabel}</span>
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors",
                          isChecked ? "border-primary" : "border-muted-foreground"
                        )}
                      >
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full bg-primary transition-opacity",
                            isChecked ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </div>
                    </label>
                  </Fragment>
                );
              })}
            </div>
          )}

          <Button type="submit" id="kc-otp-reset-form-submit" className="w-full">
            {msgStr("doSubmit")}
          </Button>
        </form>
      </TemplateContent>
    </Template>
  );
}

