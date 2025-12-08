import { AlertCircle } from "lucide-react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { Button } from "@/components/ui";
import { TemplateContent, TemplateFooter } from "@/login/TemplateComponents";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";

export default function WebauthnError(props: PageProps<Extract<KcContext, { pageId: "webauthn-error.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, isAppInitiatedAction } = kcContext;
  const { msg, msgStr } = i18n;

  const handleTryAgain = () => {
    const isSetRetryInput = document.getElementById("isSetRetry") as HTMLInputElement;
    const executionValueInput = document.getElementById("executionValue") as HTMLInputElement;
    const form = document.getElementById("kc-error-credential-form") as HTMLFormElement;

    if (isSetRetryInput && executionValueInput && form) {
      isSetRetryInput.value = "retry";
      // The execution value is typically provided by Keycloak server-side
      // This will be set by the server-rendered template
      executionValueInput.value = "${execution}";
      form.requestSubmit();
    }
  };

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage
      headerNode={
        <>
          <AlertCircle className="w-5 h-5 inline-block mr-2" />
          {msg("webauthn-error-title")}
        </>
      }
    >
      <TemplateContent className="space-y-6">
        <form id="kc-error-credential-form" action={url.loginAction} method="post" className="hidden">
          <input type="hidden" id="executionValue" name="authenticationExecution" />
          <input type="hidden" id="isSetRetry" name="isSetRetry" />
        </form>

        <Button
          type="button"
          tabIndex={4}
          onClick={handleTryAgain}
          name="try-again"
          id="kc-try-again"
          className="w-full"
        >
          {msgStr("doTryAgain")}
        </Button>
      </TemplateContent>

      {isAppInitiatedAction && (
        <TemplateFooter>
          <form action={url.loginAction} id="kc-webauthn-settings-form" method="post" className="w-full">
            <Button
              type="submit"
              variant="outline"
              id="cancelWebAuthnAIA"
              name="cancel-aia"
              value="true"
              className="w-full"
            >
              {msgStr("doCancel")}
            </Button>
          </form>
        </TemplateFooter>
      )}
    </Template>
  );
}

