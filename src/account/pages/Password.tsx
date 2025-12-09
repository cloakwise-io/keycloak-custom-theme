import { useState } from "react";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { PasswordInput } from "@/components/overrides/custom-password-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

export default function Password(props: PageProps<Extract<KcContext, { pageId: "password.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, password, account, stateChecker } = kcContext;
  const { msg, msgStr } = i18n;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [newPasswordConfirmError, setNewPasswordConfirmError] = useState("");
  const [hasNewPasswordBlurred, setHasNewPasswordBlurred] = useState(false);
  const [hasNewPasswordConfirmBlurred, setHasNewPasswordConfirmBlurred] = useState(false);

  const checkNewPassword = (newPassword: string) => {
    if (!password.passwordSet) {
      return;
    }

    if (newPassword === currentPassword) {
      setNewPasswordError(msgStr("newPasswordSameAsOld"));
    } else {
      setNewPasswordError("");
    }
  };

  const checkNewPasswordConfirm = (newPasswordConfirm: string) => {
    if (newPasswordConfirm === "") {
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      setNewPasswordConfirmError(msgStr("passwordConfirmNotMatch"));
    } else {
      setNewPasswordConfirmError("");
    }
  };

  return (
    <Template
      {...{
        kcContext: {
          ...kcContext,
          message: (() => {
            if (newPasswordError !== "") {
              return {
                type: "error",
                summary: newPasswordError
              };
            }

            if (newPasswordConfirmError !== "") {
              return {
                type: "error",
                summary: newPasswordConfirmError
              };
            }

            return kcContext.message;
          })()
        },
        i18n,
        doUseDefaultCss,
        classes
      }}
      active="password"
    >
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Lock className="h-5 w-5" />
              </div>
              <span className="text-2xl">{msg("changePasswordHtmlTitle")}</span>
            </div>
            <span className="text-sm text-muted-foreground font-normal">{msg("allFieldsRequired")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={url.passwordUrl} method="post" className="space-y-8">
            <input
              type="text"
              id="username"
              name="username"
              value={account.username ?? ""}
              autoComplete="username"
              readOnly
              style={{ display: "none" }}
            />

            <div className="space-y-6">
              {password.passwordSet && (
                <Field>
                  <FieldLabel htmlFor="password" className="text-base font-medium">
                    {msg("password")}
                  </FieldLabel>
                  <PasswordInput
                    id="password"
                    name="password"
                    autoFocus
                    autoComplete="current-password"
                    value={currentPassword}
                    onChange={event => setCurrentPassword(event.target.value)}
                    className="transition-all duration-200 focus:scale-[1.01] h-11"
                  />
                </Field>
              )}

              <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />

              <Field>
                <FieldLabel htmlFor="password-new" className="text-base font-medium">
                  {msg("passwordNew")}
                </FieldLabel>
                  <PasswordInput
                    id="password-new"
                    name="password-new"
                    autoComplete="new-password"
                    value={newPassword}
                    aria-invalid={!!newPasswordError}
                    onChange={event => {
                      const newPassword = event.target.value;

                      setNewPassword(newPassword);
                      if (hasNewPasswordBlurred) {
                        checkNewPassword(newPassword);
                      }
                    }}
                    onBlur={() => {
                      setHasNewPasswordBlurred(true);
                      checkNewPassword(newPassword);
                    }}
                    className="transition-all duration-200 focus:scale-[1.01] h-11"
                  />
                {newPasswordError && (
                  <FieldError className="animate-in slide-in-from-top-1 duration-300">{newPasswordError}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="password-confirm" className="text-base font-medium">
                  {msg("passwordConfirm")}
                </FieldLabel>
                  <PasswordInput
                    id="password-confirm"
                    name="password-confirm"
                    autoComplete="new-password"
                    value={newPasswordConfirm}
                    aria-invalid={!!newPasswordConfirmError}
                    onChange={event => {
                      const newPasswordConfirm = event.target.value;

                      setNewPasswordConfirm(newPasswordConfirm);
                      if (hasNewPasswordConfirmBlurred) {
                        checkNewPasswordConfirm(newPasswordConfirm);
                      }
                    }}
                    onBlur={() => {
                      setHasNewPasswordConfirmBlurred(true);
                      checkNewPasswordConfirm(newPasswordConfirm);
                    }}
                    className="transition-all duration-200 focus:scale-[1.01] h-11"
                  />
                {newPasswordConfirmError && (
                  <FieldError className="animate-in slide-in-from-top-1 duration-300">{newPasswordConfirmError}</FieldError>
                )}
              </Field>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button
                disabled={newPasswordError !== "" || newPasswordConfirmError !== ""}
                type="submit"
                name="submitAction"
                value="Save"
                className="min-w-[120px] transition-all duration-200 hover:scale-105 hover:shadow-md disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                {msg("doSave")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Template>
  );
}
