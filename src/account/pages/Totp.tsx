import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
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
import { Trash2, Smartphone, QrCode, Key } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Totp(props: PageProps<Extract<KcContext, { pageId: "totp.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { totp, mode, url, messagesPerField, stateChecker } = kcContext;
  const { msg, msgStr, advancedMsg } = i18n;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="totp">
      <div className="space-y-6">
        {totp.enabled && (
          <Card>
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Smartphone className="h-5 w-5" />
                </div>
                {msg("configureAuthenticators")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader className="bg-muted">
                    <TableRow className="hover:bg-muted">
                      <TableHead colSpan={totp.otpCredentials.length > 1 ? 4 : 3} className="font-semibold">
                        {msg("configureAuthenticators")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {totp.otpCredentials.map((credential, index) => (
                      <TableRow
                        key={index}
                        className="transition-colors duration-150 hover:bg-muted/30"
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4 text-muted-foreground" />
                            <span>{msg("mobile")}</span>
                          </div>
                        </TableCell>
                        {totp.otpCredentials.length > 1 && (
                          <TableCell>
                            <code className="text-xs bg-muted/80 px-2.5 py-1.5 rounded-md font-mono border">
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
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200 hover:scale-110"
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Setup Steps - Left Side */}
            <div className="lg:col-span-7">
              <Card className="sticky top-24">
                <CardHeader className="space-y-1 pb-6">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <span className="text-xl">{msg("authenticatorTitle")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol id="kc-totp-settings" className="space-y-6 list-none text-sm">
                    <li className="flex gap-4 group">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg group-hover:scale-110 transition-all duration-200">
                        1
                      </div>
                      <div className="flex-1 space-y-3">
                        <p className="font-semibold text-base">{msg("totpStep1")}</p>
                        <div className="rounded-xl bg-muted/50 border p-5 backdrop-blur-sm">
                          <ul id="kc-totp-supported-apps" className="space-y-2">
                            {totp.supportedApplications?.map(app => (
                              <li key={app} className="text-sm flex items-center gap-2.5 transition-all duration-200 hover:translate-x-1">
                                <div className="h-2 w-2 rounded-full bg-primary shadow-sm" />
                                <span className="font-medium">{advancedMsg(app)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>

                    {mode && mode === "manual" ? (
                      <>
                        <li className="flex gap-4 group">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg group-hover:scale-110 transition-all duration-200">
                            2
                          </div>
                          <div className="flex-1 space-y-3">
                            <p className="font-semibold text-base">{msg("totpManualStep2")}</p>
                            <div className="rounded-xl bg-muted/50 border p-5 backdrop-blur-sm">
                              <code className="block font-mono text-sm bg-background px-4 py-3 rounded-lg border select-all hover:bg-muted/50 transition-colors duration-200">
                                <span id="kc-totp-secret-key">{totp.totpSecretEncoded}</span>
                              </code>
                            </div>
                            <Button variant="outline" size="sm" asChild className="transition-all duration-200 hover:scale-105 hover:shadow-md">
                              <a href={totp.qrUrl} id="mode-barcode" className="inline-flex items-center gap-2">
                                <QrCode className="h-4 w-4" />
                                {msg("totpScanBarcode")}
                              </a>
                            </Button>
                          </div>
                        </li>
                        <li className="flex gap-4 group">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg group-hover:scale-110 transition-all duration-200">
                            3
                          </div>
                          <div className="flex-1 space-y-3">
                            <p className="font-semibold text-base">{msg("totpManualStep3")}</p>
                            <div className="rounded-xl bg-muted/50 border p-5 backdrop-blur-sm space-y-3">
                              <div className="grid grid-cols-1 gap-3 text-sm">
                                <div className="flex justify-between py-2 border-b border-border/50">
                                  <span className="font-medium">{msg("totpType")}:</span>
                                  <span className="text-muted-foreground">{msg(`totp.${totp.policy.type}`)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border/50">
                                  <span className="font-medium">{msg("totpAlgorithm")}:</span>
                                  <span className="text-muted-foreground">{totp.policy.getAlgorithmKey()}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border/50">
                                  <span className="font-medium">{msg("totpDigits")}:</span>
                                  <span className="text-muted-foreground">{totp.policy.digits}</span>
                                </div>
                                {totp.policy.type === "totp" ? (
                                  <div className="flex justify-between py-2">
                                    <span className="font-medium">{msg("totpInterval")}:</span>
                                    <span className="text-muted-foreground">{totp.policy.period}</span>
                                  </div>
                                ) : (
                                  <div className="flex justify-between py-2">
                                    <span className="font-medium">{msg("totpCounter")}:</span>
                                    <span className="text-muted-foreground">{totp.policy.initialCounter}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      </>
                    ) : (
                      <li className="flex gap-4 group">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg group-hover:scale-110 transition-all duration-200">
                          2
                        </div>
                        <div className="flex-1 space-y-3">
                          <p className="font-semibold text-base">{msg("totpStep2")}</p>
                          <div className="flex flex-col items-center gap-4 rounded-xl bg-muted/50 border-2 p-8 backdrop-blur-sm">
                            <div className="rounded-xl bg-white p-6 shadow-lg ring-2 ring-primary/10 hover:ring-primary/30 transition-all duration-300 hover:scale-105">
                              <img
                                id="kc-totp-secret-qr-code"
                                src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                                alt="Figure: Barcode"
                                className="h-48 w-48"
                              />
                            </div>
                            <Button variant="outline" size="sm" asChild className="transition-all duration-200 hover:scale-105 hover:shadow-md">
                              <a href={totp.manualUrl} id="mode-manual" className="inline-flex items-center gap-2">
                                <Key className="h-4 w-4" />
                                {msg("totpUnableToScan")}
                              </a>
                            </Button>
                          </div>
                        </div>
                      </li>
                    )}

                    <li className="flex gap-4 group">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg group-hover:scale-110 transition-all duration-200">
                        {mode && mode === "manual" ? "4" : "3"}
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="font-semibold text-base">{msg("totpStep3")}</p>
                        <p className="text-sm text-muted-foreground">{msg("totpStep3DeviceName")}</p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            {/* Setup Form - Right Side */}
            <div className="lg:col-span-5">
              <Card className="sticky top-24">
                <CardContent>
                  <form action={url.totpUrl} id="kc-totp-settings-form" method="post" className="space-y-8">
                    <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />
                    <div className="space-y-6">
                      <Field>
                        <FieldLabel htmlFor="totp" className="text-base font-medium">
                          {msg("authenticatorCode")}
                          <span className="text-destructive ml-1">*</span>
                        </FieldLabel>
                        <Input
                          type="text"
                          id="totp"
                          name="totp"
                          autoComplete="off"
                          className="font-mono text-lg tracking-widest h-12 transition-all duration-200 focus:scale-[1.01]"
                          aria-invalid={messagesPerField.existsError("totp")}
                        />
                        {messagesPerField.existsError("totp") && (
                          <FieldError className="animate-in slide-in-from-top-1 duration-300">
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
                        <FieldLabel htmlFor="userLabel" className="text-base font-medium">
                          {msg("totpDeviceName")}
                          {totp.otpCredentials.length >= 1 && <span className="text-destructive ml-1">*</span>}
                        </FieldLabel>
                        <Input
                          type="text"
                          id="userLabel"
                          name="userLabel"
                          autoComplete="off"
                          aria-invalid={messagesPerField.existsError("userLabel")}
                          className="h-11 transition-all duration-200 focus:scale-[1.01]"
                        />
                        {messagesPerField.existsError("userLabel") && (
                          <FieldError className="animate-in slide-in-from-top-1 duration-300">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("userLabel"))
                              }}
                            />
                          </FieldError>
                        )}
                      </Field>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button type="submit" variant="outline" id="cancelTOTPBtn" name="submitAction" value="Cancel" className="min-w-[100px] transition-all duration-200 hover:scale-105">
                        {msg("doCancel")}
                      </Button>
                      <Button type="submit" id="saveTOTPBtn" className="min-w-[100px] transition-all duration-200 hover:scale-105 hover:shadow-md">
                        {msgStr("doSave")}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Template>
  );
}
