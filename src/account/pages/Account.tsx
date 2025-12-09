import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, UserPen } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Account(props: PageProps<Extract<KcContext, { pageId: "account.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, realm, messagesPerField, stateChecker, account, referrer } = kcContext;
  const { msg } = i18n;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="account">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Preview - Left Side */}
        <div className="lg:col-span-4">
          <Card className="sticky top-24">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </div>
                <span className="text-xl">{msg("account")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Preview */}
              <div className="flex flex-col items-center space-y-4 pb-6 border-b">
                <Avatar className="size-32 rounded-full border border-primary/10">
                  <AvatarImage src="/img_avatar.svg" alt={account.username} />
                </Avatar>
                <div className="text-center space-y-1">
                  <h3 className="text-2xl font-bold">
                    {account.firstName || account.lastName
                      ? `${account.firstName || ""} ${account.lastName || ""}`.trim()
                      : account.username || "User"}
                  </h3>
                  {account.email && (
                    <p className="text-sm text-muted-foreground">{account.email}</p>
                  )}
                </div>
              </div>

              {/* Account Details Preview */}
              <div className="space-y-4">
                <div className="space-y-3">
                  {!realm.registrationEmailAsUsername && account.username && (
                    <div className="group">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        {msg("username")}
                      </p>
                      <p className="text-sm font-medium px-3 py-2 rounded-lg bg-muted/50 transition-colors duration-200 group-hover:bg-muted">
                        {account.username}
                      </p>
                    </div>
                  )}

                  {account.email && (
                    <div className="group">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        {msg("email")}
                      </p>
                      <p className="text-sm font-medium px-3 py-2 rounded-lg bg-muted/50 transition-colors duration-200 group-hover:bg-muted break-all">
                        {account.email}
                      </p>
                    </div>
                  )}

                  {account.firstName && (
                    <div className="group">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        {msg("firstName")}
                      </p>
                      <p className="text-sm font-medium px-3 py-2 rounded-lg bg-muted/50 transition-colors duration-200 group-hover:bg-muted">
                        {account.firstName}
                      </p>
                    </div>
                  )}

                  {account.lastName && (
                    <div className="group">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        {msg("lastName")}
                      </p>
                      <p className="text-sm font-medium px-3 py-2 rounded-lg bg-muted/50 transition-colors duration-200 group-hover:bg-muted">
                        {account.lastName}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Form - Right Side */}
        <div className="lg:col-span-8">
          <Card>
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <UserPen className="h-5 w-5" />
                  </div>
                  <span className="text-2xl">{msg("editAccountHtmlTitle")}</span>
                </div>
                <span className="text-sm text-muted-foreground font-normal">
                  <span className="text-destructive">*</span> {msg("requiredFields")}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form action={url.accountUrl} method="post" className="space-y-8">
                <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />

                <div className="space-y-6">
                  {!realm.registrationEmailAsUsername && (
                    <Field>
                      <FieldLabel htmlFor="username" className="text-base font-medium">
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
                        className="transition-all duration-200 focus:scale-[1.01] h-11"
                      />
                      {messagesPerField.existsError("username") && (
                        <FieldError className="animate-in slide-in-from-top-1 duration-300">
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
                    <FieldLabel htmlFor="email" className="text-base font-medium">
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
                      className="transition-all duration-200 focus:scale-[1.01] h-11"
                    />
                    {messagesPerField.existsError("email") && (
                      <FieldError className="animate-in slide-in-from-top-1 duration-300">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: kcSanitize(messagesPerField.get("email"))
                          }}
                        />
                      </FieldError>
                    )}
                  </Field>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field>
                      <FieldLabel htmlFor="firstName" className="text-base font-medium">
                        {msg("firstName")}
                        <span className="text-destructive ml-1">*</span>
                      </FieldLabel>
                      <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        defaultValue={account.firstName ?? ""}
                        aria-invalid={messagesPerField.existsError("firstName")}
                        className="transition-all duration-200 focus:scale-[1.01] h-11"
                      />
                      {messagesPerField.existsError("firstName") && (
                        <FieldError className="animate-in slide-in-from-top-1 duration-300">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: kcSanitize(messagesPerField.get("firstName"))
                            }}
                          />
                        </FieldError>
                      )}
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="lastName" className="text-base font-medium">
                        {msg("lastName")}
                        <span className="text-destructive ml-1">*</span>
                      </FieldLabel>
                      <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        defaultValue={account.lastName ?? ""}
                        aria-invalid={messagesPerField.existsError("lastName")}
                        className="transition-all duration-200 focus:scale-[1.01] h-11"
                      />
                      {messagesPerField.existsError("lastName") && (
                        <FieldError className="animate-in slide-in-from-top-1 duration-300">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: kcSanitize(messagesPerField.get("lastName"))
                            }}
                          />
                        </FieldError>
                      )}
                    </Field>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t">
                  {referrer !== undefined && (
                    <Button variant="link" asChild className="px-0">
                      <a href={referrer?.url}>{msg("backToApplication")}</a>
                    </Button>
                  )}
                  <div className="flex gap-3 ml-auto">
                    <Button
                      type="submit"
                      variant="outline"
                      name="submitAction"
                      value="Cancel"
                      className="min-w-[100px] transition-all duration-200 hover:scale-105"
                    >
                      {msg("doCancel")}
                    </Button>
                    <Button
                      type="submit"
                      name="submitAction"
                      value="Save"
                      className="min-w-[100px] transition-all duration-200 hover:scale-105 hover:shadow-md"
                    >
                      {msg("doSave")}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Template>
  );
}
