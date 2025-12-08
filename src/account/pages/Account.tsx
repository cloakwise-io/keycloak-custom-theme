import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export default function Account(props: PageProps<Extract<KcContext, { pageId: "account.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, realm, messagesPerField, stateChecker, account, referrer } = kcContext;
  const { msg } = i18n;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="account">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {msg("editAccountHtmlTitle")}
            </div>
            <span className="text-sm text-muted-foreground font-normal">
              <span className="text-destructive">*</span> {msg("requiredFields")}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={url.accountUrl} method="post" className="space-y-6">
            <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />

            <FieldGroup>
              {!realm.registrationEmailAsUsername && (
                <Field>
                  <FieldLabel htmlFor="username">
                    {msg("username")}
                    {realm.editUsernameAllowed && <span className="text-destructive ml-1">*</span>}
                  </FieldLabel>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    disabled={!realm.editUsernameAllowed}
                    defaultValue={account.username ?? ""}
                    aria-invalid={messagesPerField.existsError("username")}
                  />
                  {messagesPerField.existsError("username") && (
                    <FieldError>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: kcSanitize(messagesPerField.get("username"))
                        }}
                      />
                    </FieldError>
                  )}
                </Field>
              )}

              <Field>
                <FieldLabel htmlFor="email">
                  {msg("email")}
                  <span className="text-destructive ml-1">*</span>
                </FieldLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  autoFocus
                  defaultValue={account.email ?? ""}
                  aria-invalid={messagesPerField.existsError("email")}
                />
                {messagesPerField.existsError("email") && (
                  <FieldError>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: kcSanitize(messagesPerField.get("email"))
                      }}
                    />
                  </FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="firstName">
                  {msg("firstName")}
                  <span className="text-destructive ml-1">*</span>
                </FieldLabel>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  defaultValue={account.firstName ?? ""}
                  aria-invalid={messagesPerField.existsError("firstName")}
                />
                {messagesPerField.existsError("firstName") && (
                  <FieldError>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: kcSanitize(messagesPerField.get("firstName"))
                      }}
                    />
                  </FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="lastName">
                  {msg("lastName")}
                  <span className="text-destructive ml-1">*</span>
                </FieldLabel>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  defaultValue={account.lastName ?? ""}
                  aria-invalid={messagesPerField.existsError("lastName")}
                />
                {messagesPerField.existsError("lastName") && (
                  <FieldError>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: kcSanitize(messagesPerField.get("lastName"))
                      }}
                    />
                  </FieldError>
                )}
              </Field>
            </FieldGroup>

            <div className="flex items-center gap-4">
              {referrer !== undefined && (
                <Button variant="link" asChild>
                  <a href={referrer?.url}>{msg("backToApplication")}</a>
                </Button>
              )}
              <div className="flex gap-2 ml-auto">
                <Button
                  type="submit"
                  name="submitAction"
                  value="Save"
                >
                  {msg("doSave")}
                </Button>
                <Button
                  type="submit"
                  variant="outline"
                  name="submitAction"
                  value="Cancel"
                >
                  {msg("doCancel")}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </Template>
  );
}
