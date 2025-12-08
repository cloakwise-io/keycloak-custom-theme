import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";
import { buttonVariants } from "@/components/ui";
import { TemplateContent } from "@/login/TemplateComponents";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { message, client, skipLink } = kcContext;
  const { msg } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={false}
      headerNode={msg("errorTitle")}
    >
      <TemplateContent className="space-y-4">
        <div id="kc-error-message" className="space-y-4">
          <p
            className="text-sm text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }}
          />
          {!skipLink && client !== undefined && client.baseUrl !== undefined && (
            <a id="backToApplication" href={client.baseUrl} className={buttonVariants({ variant: "link" })}>
              {msg("backToApplication")}
            </a>
          )}
        </div>
      </TemplateContent>
    </Template>
  );
}

