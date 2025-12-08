import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Smartphone, QrCode, Key, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Totp(props: PageProps<Extract<KcContext, { pageId: "totp.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { totp, mode, url, messagesPerField, stateChecker } = kcContext;
  const { msg, msgStr, advancedMsg } = i18n;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="totp">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{msg("authenticatorTitle")}</h2>
          {totp.otpCredentials.length === 0 && (
            <span className="text-sm text-muted-foreground">
              <span className="text-destructive">*</span> {msg("requiredFields")}
            </span>
          )}
        </div>

        {totp.enabled && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                {msg("configureAuthenticators")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader className="bg-muted">
                    <TableRow>
                      <TableHead colSpan={totp.otpCredentials.length > 1 ? 4 : 3}>
                        {msg("configureAuthenticators")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {totp.otpCredentials.map((credential, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4 text-muted-foreground" />
                            <span>{msg("mobile")}</span>
                          </div>
                        </TableCell>
                        {totp.otpCredentials.length > 1 && (
                          <TableCell>
                            <code className="text-xs bg-muted px-2 py-1 rounded">
                              {credential.id}
                            </code>
                          </TableCell>
                        )}
                        <TableCell>
                          <span className="font-medium">{credential.userLabel || ""}</span>
                        </TableCell>
                        <TableCell>
                          <form action={url.totpUrl} method="post" className="inline">
                            <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />
                            <input type="hidden" id="submitAction" name="submitAction" value="Delete" />
                            <input type="hidden" id="credentialId" name="credentialId" value={credential.id} />
                            <Button
                              id={`remove-mobile-${index}`}
                              type="submit"
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </form>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {!totp.enabled && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  {msg("authenticatorTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol id="kc-totp-settings" className="space-y-6 list-decimal list-outside ml-6 text-sm">
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                      1
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="font-medium">{msg("totpStep1")}</p>
                      <div className="rounded-lg bg-muted p-4">
                        <ul id="kc-totp-supported-apps" className="space-y-1.5">
                          {totp.supportedApplications?.map(app => (
                            <li key={app} className="text-sm flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              {advancedMsg(app)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>

                  {mode && mode === "manual" ? (
                    <>
                      <li className="flex gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                          2
                        </div>
                        <div className="flex-1 space-y-3">
                          <p className="font-medium">{msg("totpManualStep2")}</p>
                          <div className="rounded-lg bg-muted p-4">
                            <code className="block font-mono text-sm bg-background px-3 py-2 rounded border select-all">
                              <span id="kc-totp-secret-key">{totp.totpSecretEncoded}</span>
                            </code>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={totp.qrUrl} id="mode-barcode" className="inline-flex items-center gap-2">
                              <QrCode className="h-4 w-4" />
                              {msg("totpScanBarcode")}
                            </a>
                          </Button>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                          3
                        </div>
                        <div className="flex-1 space-y-2">
                          <p className="font-medium">{msg("totpManualStep3")}</p>
                          <div className="rounded-lg bg-muted p-4 space-y-2">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="font-medium">{msg("totpType")}:</span>{" "}
                                <span className="text-muted-foreground">{msg(`totp.${totp.policy.type}`)}</span>
                              </div>
                              <div>
                                <span className="font-medium">{msg("totpAlgorithm")}:</span>{" "}
                                <span className="text-muted-foreground">{totp.policy.getAlgorithmKey()}</span>
                              </div>
                              <div>
                                <span className="font-medium">{msg("totpDigits")}:</span>{" "}
                                <span className="text-muted-foreground">{totp.policy.digits}</span>
                              </div>
                              {totp.policy.type === "totp" ? (
                                <div>
                                  <span className="font-medium">{msg("totpInterval")}:</span>{" "}
                                  <span className="text-muted-foreground">{totp.policy.period}</span>
                                </div>
                              ) : (
                                <div>
                                  <span className="font-medium">{msg("totpCounter")}:</span>{" "}
                                  <span className="text-muted-foreground">{totp.policy.initialCounter}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    </>
                  ) : (
                    <li className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                        2
                      </div>
                      <div className="flex-1 space-y-3">
                        <p className="font-medium">{msg("totpStep2")}</p>
                        <div className="flex flex-col items-center gap-4 rounded-lg bg-muted p-6">
                          <div className="rounded-lg bg-white p-4 shadow-sm">
                            <img
                              id="kc-totp-secret-qr-code"
                              src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                              alt="Figure: Barcode"
                              className="h-48 w-48"
                            />
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={totp.manualUrl} id="mode-manual" className="inline-flex items-center gap-2">
                              <Key className="h-4 w-4" />
                              {msg("totpUnableToScan")}
                            </a>
                          </Button>
                        </div>
                      </div>
                    </li>
                  )}

                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                      {mode && mode === "manual" ? "4" : "3"}
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="font-medium">{msg("totpStep3")}</p>
                      <p className="text-sm text-muted-foreground">{msg("totpStep3DeviceName")}</p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{msg("authenticatorTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form action={url.totpUrl} id="kc-totp-settings-form" method="post" className="space-y-6">
                  <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="totp">
                        {msg("authenticatorCode")}
                        <span className="text-destructive ml-1">*</span>
                      </FieldLabel>
                      <Input
                        type="text"
                        id="totp"
                        name="totp"
                        autoComplete="off"
                        className="font-mono text-lg tracking-widest"
                        aria-invalid={messagesPerField.existsError("totp")}
                      />
                      {messagesPerField.existsError("totp") && (
                        <FieldError>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: kcSanitize(messagesPerField.get("totp"))
                            }}
                          />
                        </FieldError>
                      )}
                    </Field>
                    <input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret} />
                    {mode && <input type="hidden" id="mode" value={mode} />}

                    <Field>
                      <FieldLabel htmlFor="userLabel">
                        {msg("totpDeviceName")}
                        {totp.otpCredentials.length >= 1 && <span className="text-destructive ml-1">*</span>}
                      </FieldLabel>
                      <Input
                        type="text"
                        id="userLabel"
                        name="userLabel"
                        autoComplete="off"
                        aria-invalid={messagesPerField.existsError("userLabel")}
                      />
                      {messagesPerField.existsError("userLabel") && (
                        <FieldError>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: kcSanitize(messagesPerField.get("userLabel"))
                            }}
                          />
                        </FieldError>
                      )}
                    </Field>
                  </FieldGroup>

                  <div className="flex justify-end gap-2">
                    <Button type="submit" id="saveTOTPBtn">
                      {msgStr("doSave")}
                    </Button>
                    <Button type="submit" variant="outline" id="cancelTOTPBtn" name="submitAction" value="Cancel">
                      {msg("doCancel")}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Template>
  );
}
