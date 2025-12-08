import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";
import { Input } from "@/components/ui";
import { TemplateContent } from "@/login/TemplateComponents";

export default function Code(props: PageProps<Extract<KcContext, { pageId: "code.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { code } = kcContext;
  const { msg } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={code.success ? msg("codeSuccessTitle") : msg("codeErrorTitle", code.error)}
    >
      <TemplateContent className="space-y-4">
        <div id="kc-code" className="space-y-4">
          {code.success ? (
            <>
              <p className="text-sm text-muted-foreground">{msg("copyCodeInstruction")}</p>
              <Input id="code" defaultValue={code.code} readOnly className="font-mono" />
            </>
          ) : (
            code.error && (
              <p
                id="error"
                className="text-sm text-destructive"
                dangerouslySetInnerHTML={{
                  __html: kcSanitize(code.error)
                }}
              />
            )
          )}
        </div>
      </TemplateContent>
    </Template>
  );
}

