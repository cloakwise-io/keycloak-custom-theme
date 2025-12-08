import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "lucide-react";

export default function FederatedIdentity(props: PageProps<Extract<KcContext, { pageId: "federatedIdentity.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;

  const { url, federatedIdentity, stateChecker } = kcContext;
  const { msg } = i18n;
  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="social">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            {msg("federatedIdentitiesHtmlTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            {federatedIdentity.identities.map(identity => (
              <Field key={identity.providerId} orientation="horizontal">
                <FieldLabel htmlFor={identity.providerId} className="min-w-[120px]">
                  {identity.displayName}
                </FieldLabel>
                <div className="flex-1 flex gap-2">
                  <Input disabled value={identity.userName} className="flex-1" />
                  {identity.connected ? (
                    federatedIdentity.removeLinkPossible && (
                      <form action={url.socialUrl} method="post" className="inline">
                        <input type="hidden" name="stateChecker" value={stateChecker} />
                        <input type="hidden" name="action" value="remove" />
                        <input type="hidden" name="providerId" value={identity.providerId} />
                        <Button id={`remove-link-${identity.providerId}`} type="submit" variant="destructive" size="sm">
                          {msg("doRemove")}
                        </Button>
                      </form>
                    )
                  ) : (
                    <form action={url.socialUrl} method="post" className="inline">
                      <input type="hidden" name="stateChecker" value={stateChecker} />
                      <input type="hidden" name="action" value="add" />
                      <input type="hidden" name="providerId" value={identity.providerId} />
                      <Button id={`add-link-${identity.providerId}`} type="submit" variant="outline" size="sm">
                        {msg("doAdd")}
                      </Button>
                    </form>
                  )}
                </div>
              </Field>
            ))}
          </FieldGroup>
        </CardContent>
      </Card>
    </Template>
  );
}
