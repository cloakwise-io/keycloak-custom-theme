import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";
import { TemplateContent } from "@/login/TemplateComponents";

export default function LoginPageExpired(props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url } = kcContext;
  const { msg } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("pageExpiredTitle")}
    >
      <TemplateContent>
        <p id="instruction1" className="text-sm text-muted-foreground space-y-2">
          <span>
            {msg("pageExpiredMsg1")}{" "}
            <a id="loginRestartLink" href={url.loginRestartFlowUrl} className="underline underline-offset-4">
              {msg("doClickHere")}
            </a>
            .
          </span>
          <br />
          <span>
            {msg("pageExpiredMsg2")}{" "}
            <a id="loginContinueLink" href={url.loginAction} className="underline underline-offset-4">
              {msg("doClickHere")}
            </a>
            .
          </span>
        </p>
      </TemplateContent>
    </Template>
  );
}

