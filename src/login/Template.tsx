import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { DisplayMessage } from "@/components/overrides/display-message";
import AuthPageLayout from "@/components/overrides/auth-page-layout";
import { ThemeProvider } from "next-themes";
import { RestartLoginAttempt } from "@/components/overrides/restart-login-attempt";
import { TemplateShell, TemplateHeader, TemplateTitle } from "./TemplateComponents";

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    headerNode,
    socialProvidersNode = null,
    infoNode = null,
    documentTitle,
    bodyClassName,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    children
  } = props;

  const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

  const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

  const { auth, url, client, message, isAppInitiatedAction } = kcContext;

  useEffect(() => {
    document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
  }, []);

  useSetClassName({
    qualifiedName: "html",
    className: kcClsx("kcHtmlClass")
  });

  useSetClassName({
    qualifiedName: "body",
    className: bodyClassName ?? kcClsx("kcBodyClass")
  });

  const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

  if (!isReadyToRender) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthPageLayout
      // @ts-expect-error - client baseUrl is not defined in on context type
        clientURL={client.baseUrl}
        localeOptions={{
          enabledLanguages,
          currentLanguage,
          ariaLabel: msgStr("languages")
        }}
      >
        <div className={kcClsx("kcLoginClass")}>
          <div className="space-y-4">
            {auth !== undefined && auth.showUsername && !auth.showResetCredentials && (
              <header className={kcClsx("kcFormHeaderClass")}>
                {displayRequiredFields ? (
                  <div className={kcClsx("kcContentWrapperClass")}>
                    <div className={clsx(kcClsx("kcLabelWrapperClass"), "subtitle")}>
                      <span className="subtitle">
                        <span className="required">*</span>
                        {msg("requiredFields")}
                      </span>
                    </div>
                    <div className="col-md-10">
                      <RestartLoginAttempt
                        attemptedUsername={auth.attemptedUsername}
                        loginRestartFlowUrl={url.loginRestartFlowUrl}
                        restartLoginTooltip={msgStr("restartLoginTooltip")}
                      />
                    </div>
                  </div>
                ) : (
                  <RestartLoginAttempt
                    attemptedUsername={auth.attemptedUsername}
                    loginRestartFlowUrl={url.loginRestartFlowUrl}
                    restartLoginTooltip={msgStr("restartLoginTooltip")}
                  />
                )}
              </header>
            )}
            <div id="kc-content">
              <div id="kc-content-wrapper" className="space-y-4">
                {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                  <div className="mx-4 md:mx-0">
                    <DisplayMessage message={message} />
                  </div>
                )}
                <TemplateShell className="w-full rounded-none md:rounded-xl border-0 md:border shadow-none md:shadow-sm">
                  {headerNode && !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) && (
                    <TemplateHeader>
                      <TemplateTitle>{headerNode}</TemplateTitle>
                    </TemplateHeader>
                  )}
                  {children}
                </TemplateShell>
                {auth !== undefined && auth.showTryAnotherWayLink && (
                  <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                    <div className={kcClsx("kcFormGroupClass")}>
                      <input type="hidden" name="tryAnotherWay" value="on" />
                      <a
                        href="#"
                        id="try-another-way"
                        onClick={() => {
                          document.forms["kc-select-try-another-way-form" as never].submit();
                          return false;
                        }}
                      >
                        {msg("doTryAnotherWay")}
                      </a>
                    </div>
                  </form>
                )}
                {socialProvidersNode}
                {displayInfo && (
                  <div id="kc-info" className={kcClsx("kcSignUpClass")}>
                    <div id="kc-info-wrapper" className={kcClsx("kcInfoAreaWrapperClass")}>
                      {infoNode}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </AuthPageLayout>
    </ThemeProvider>
  );
}
