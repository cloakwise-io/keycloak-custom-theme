import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";
import { Button } from "@/components/ui";
import { TemplateContent } from "@/login/TemplateComponents";

export default function LinkIdpAction(props: PageProps<Extract<KcContext, { pageId: "link-idp-action.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { idpDisplayName, url } = kcContext;
  const { msg, msgStr } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("linkIdpActionTitle", idpDisplayName)}
      displayMessage={false}
    >
      <TemplateContent className="space-y-6">
        <div id="kc-link-text" className="text-sm text-muted-foreground">
          {msg("linkIdpActionMessage", idpDisplayName)}
        </div>

        <form action={url.loginAction} method="post" className="space-y-4">
          <div className="flex gap-3">
            <Button type="submit" name="continue" id="kc-continue" className="flex-1">
              {msgStr("doContinue")}
            </Button>
            <Button type="submit" name="cancel-aia" id="kc-cancel" variant="outline" className="flex-1">
              {msgStr("doCancel")}
            </Button>
          </div>
        </form>
      </TemplateContent>
    </Template>
  );
}

