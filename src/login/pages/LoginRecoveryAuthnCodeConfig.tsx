import { useState } from "react";
import { AlertTriangle, Printer, Download, Copy } from "lucide-react";
import { useScript } from "keycloakify/login/pages/LoginRecoveryAuthnCodeConfig.useScript";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";
import { Button, Checkbox } from "@/components/ui";
import { TemplateContent, TemplateFooter } from "@/login/TemplateComponents";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";

export default function LoginRecoveryAuthnCodeConfig(
  props: PageProps<Extract<KcContext, { pageId: "login-recovery-authn-code-config.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes
  });

  const { recoveryAuthnCodesConfigBean, isAppInitiatedAction, url } = kcContext;
  const { msg, msgStr } = i18n;

  const olRecoveryCodesListId = "kc-recovery-codes-list";
  const [isConfirmationChecked, setIsConfirmationChecked] = useState(false);

  useScript({ olRecoveryCodesListId, i18n });

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("recovery-code-config-header")}
    >
      <TemplateContent className="space-y-6">
        <div className="flex items-start gap-3 p-4 border border-yellow-500/50 bg-yellow-500/10 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-yellow-900 dark:text-yellow-100">
              {msg("recovery-code-config-warning-title")}
            </h4>
            <p className="text-sm text-yellow-900 dark:text-yellow-100">{msg("recovery-code-config-warning-message")}</p>
          </div>
        </div>

        <ol id={olRecoveryCodesListId} className="list-decimal list-outside ml-6 space-y-2 font-mono text-sm">
          {recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesList.map((code, index) => (
            <li key={index} className="pl-2">
              <span className="font-semibold">{index + 1}:</span> {code.slice(0, 4)}-{code.slice(4, 8)}-{code.slice(8)}
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap gap-3">
          <Button id="printRecoveryCodes" type="button" variant="outline" size="sm" className="gap-2">
            <Printer className="w-4 h-4" />
            {msg("recovery-codes-print")}
          </Button>
          <Button id="downloadRecoveryCodes" type="button" variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            {msg("recovery-codes-download")}
          </Button>
          <Button id="copyRecoveryCodes" type="button" variant="outline" size="sm" className="gap-2">
            <Copy className="w-4 h-4" />
            {msg("recovery-codes-copy")}
          </Button>
        </div>

        <div className="flex items-start space-x-2 p-4 border rounded-lg">
          <Checkbox
            id="kcRecoveryCodesConfirmationCheck"
            name="kcRecoveryCodesConfirmationCheck"
            checked={isConfirmationChecked}
            onCheckedChange={(checked: boolean) => setIsConfirmationChecked(checked)}
          />
          <label htmlFor="kcRecoveryCodesConfirmationCheck" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {msg("recovery-codes-confirmation-message")}
          </label>
        </div>

        <form action={url.loginAction} id="kc-recovery-codes-settings-form" method="post" className="space-y-4">
          <input type="hidden" name="generatedRecoveryAuthnCodes" value={recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesAsString} />
          <input type="hidden" name="generatedAt" value={recoveryAuthnCodesConfigBean.generatedAt} />
          <input type="hidden" id="userLabel" name="userLabel" value={msgStr("recovery-codes-label-default")} />

          <div className="flex items-start space-x-2 p-4 border rounded-lg">
            <Checkbox id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} />
            <label htmlFor="logout-sessions" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {msg("logoutOtherSessions")}
            </label>
          </div>
        </form>
      </TemplateContent>
      <TemplateFooter className="flex flex-row gap-3 justify-end">
        {isAppInitiatedAction ? (
          <>
            <Button
              type="submit"
              form="kc-recovery-codes-settings-form"
              id="cancelRecoveryAuthnCodesBtn"
              name="cancel-aia"
              value="true"
              variant="outline"
            >
              {msg("recovery-codes-action-cancel")}
            </Button>
            <Button
              type="submit"
              form="kc-recovery-codes-settings-form"
              id="saveRecoveryAuthnCodesBtn"
              disabled={!isConfirmationChecked}
            >
              {msgStr("recovery-codes-action-complete")}
            </Button>
          </>
        ) : (
          <Button type="submit" form="kc-recovery-codes-settings-form" id="saveRecoveryAuthnCodesBtn" disabled={!isConfirmationChecked} className="w-full">
            {msgStr("recovery-codes-action-complete")}
          </Button>
        )}
      </TemplateFooter>
    </Template>
  );
}

