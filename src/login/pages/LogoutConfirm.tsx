import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";
import { Button, buttonVariants } from "@/components/ui";
import { TemplateContent, TemplateFooter } from "@/login/TemplateComponents";

export default function LogoutConfirm(props: PageProps<Extract<KcContext, { pageId: "logout-confirm.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, client, logoutConfirm } = kcContext;
  const { msg, msgStr } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("logoutConfirmTitle")}
    >
      <TemplateContent className="space-y-6">
        <div id="kc-logout-confirm" className="space-y-6">
          <p className="text-sm text-muted-foreground">{msg("logoutConfirmHeader")}</p>
          <form action={url.logoutConfirmAction} method="POST" className="space-y-4">
            <input type="hidden" name="session_code" value={logoutConfirm.code} />
            <Button type="submit" name="confirmLogout" id="kc-logout" tabIndex={4} className="w-full">
              {msgStr("doLogout")}
            </Button>
          </form>
        </div>
      </TemplateContent>
      {!logoutConfirm.skipLink && client.baseUrl && (
        <TemplateFooter>
          <a href={client.baseUrl} className={buttonVariants({ variant: "link" })}>
            {msg("backToApplication")}
          </a>
        </TemplateFooter>
      )}
    </Template>
  );
}

