import { useState } from "react";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              {msg("changePasswordHtmlTitle")}
            </div>
            <span className="text-sm text-muted-foreground font-normal">{msg("allFieldsRequired")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={url.passwordUrl} method="post" className="space-y-6">
            <input
              type="text"
              id="username"
              name="username"
              value={account.username ?? ""}
              autoComplete="username"
              readOnly
              style={{ display: "none" }}
            />

            <FieldGroup>
              {password.passwordSet && (
                <Field>
                  <FieldLabel htmlFor="password">
                    {msg("password")}
                  </FieldLabel>
                  <PasswordInput
                    id="password"
                    name="password"
                    autoFocus
                    autoComplete="current-password"
                    value={currentPassword}
                    onChange={event => setCurrentPassword(event.target.value)}
                  />
                </Field>
              )}

              <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />

              <Field>
                <FieldLabel htmlFor="password-new">
                  {msg("passwordNew")}
                </FieldLabel>
                <PasswordInput
                  id="password-new"
                  name="password-new"
                  autoComplete="new-password"
                  value={newPassword}
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
                />
                {newPasswordError && (
                  <FieldError>{newPasswordError}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="password-confirm">
                  {msg("passwordConfirm")}
                </FieldLabel>
                <PasswordInput
                  id="password-confirm"
                  name="password-confirm"
                  autoComplete="new-password"
                  value={newPasswordConfirm}
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
                />
                {newPasswordConfirmError && (
                  <FieldError>{newPasswordConfirmError}</FieldError>
                )}
              </Field>
            </FieldGroup>

            <div className="flex justify-end">
              <Button
                disabled={newPasswordError !== "" || newPasswordConfirmError !== ""}
                type="submit"
                name="submitAction"
                value="Save"
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
