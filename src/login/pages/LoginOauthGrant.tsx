import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";
import { Button } from "@/components/ui";
import { TemplateContent } from "@/login/TemplateComponents";

export default function LoginOauthGrant(props: PageProps<Extract<KcContext, { pageId: "login-oauth-grant.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, oauth, client } = kcContext;
  const { msg, msgStr, advancedMsg, advancedMsgStr } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      bodyClassName="oauth"
      headerNode={
        <div className="flex flex-col items-center gap-4">
          {client.attributes.logoUri && (
            <img src={client.attributes.logoUri} alt={client.name || client.clientId} className="h-16 w-16 object-contain" />
          )}
          <p className="text-center">
            {client.name ? msg("oauthGrantTitle", advancedMsgStr(client.name)) : msg("oauthGrantTitle", client.clientId)}
          </p>
        </div>
      }
    >
      <TemplateContent className="space-y-6">
        <div id="kc-oauth" className="space-y-6">
          <h3 className="text-lg font-semibold">{msg("oauthGrantRequest")}</h3>
          <ul className="space-y-2 list-disc list-inside">
            {oauth.clientScopesRequested.map((clientScope, index) => (
              <li key={index} className="text-sm">
                <span>
                  {advancedMsg(clientScope.consentScreenText)}
                  {clientScope.dynamicScopeParameter && (
                    <>
                      : <b>{clientScope.dynamicScopeParameter}</b>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>

          {(client.attributes.policyUri || client.attributes.tosUri) && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {client.name ? msg("oauthGrantInformation", advancedMsgStr(client.name)) : msg("oauthGrantInformation", client.clientId)}
              </h3>
              <div className="text-sm space-y-1">
                {client.attributes.tosUri && (
                  <p>
                    {msg("oauthGrantReview")}{" "}
                    <a href={client.attributes.tosUri} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                      {msg("oauthGrantTos")}
                    </a>
                  </p>
                )}
                {client.attributes.policyUri && (
                  <p>
                    {msg("oauthGrantReview")}{" "}
                    <a href={client.attributes.policyUri} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                      {msg("oauthGrantPolicy")}
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}

          <form action={url.oauthAction} method="POST" className="space-y-4">
            <input type="hidden" name="code" value={oauth.code} />
            <div className="flex gap-3">
              <Button type="submit" name="accept" id="kc-login" className="flex-1">
                {msgStr("doYes")}
              </Button>
              <Button type="submit" name="cancel" id="kc-cancel" variant="outline" className="flex-1">
                {msgStr("doNo")}
              </Button>
            </div>
          </form>
        </div>
      </TemplateContent>
    </Template>
  );
}

