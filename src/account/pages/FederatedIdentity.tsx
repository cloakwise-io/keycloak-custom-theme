import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Field, FieldLabel } from "@/components/ui/field";
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
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Link className="h-5 w-5" />
            </div>
            <span className="text-2xl">{msg("federatedIdentitiesHtmlTitle")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {federatedIdentity.identities.map(identity => (
              <Field key={identity.providerId} orientation="horizontal" className="items-center p-4 rounded-lg border hover:bg-muted/20 transition-all duration-200">
                <FieldLabel htmlFor={identity.providerId} className="min-w-[140px] text-base font-medium">
                  {identity.displayName}
                </FieldLabel>
                <div className="flex-1 flex gap-3 items-center">
                  <Input disabled value={identity.userName} className="flex-1 h-11" />
                  {identity.connected ? (
                    federatedIdentity.removeLinkPossible && (
                      <form action={url.socialUrl} method="post" className="inline">
                        <input type="hidden" name="stateChecker" value={stateChecker} />
                        <input type="hidden" name="action" value="remove" />
                        <input type="hidden" name="providerId" value={identity.providerId} />
                        <Button
                          id={`remove-link-${identity.providerId}`}
                          type="submit"
                          variant="destructive"
                          size="sm"
                          className="transition-all duration-200 hover:scale-105 hover:shadow-md"
                        >
                          {msg("doRemove")}
                        </Button>
                      </form>
                    )
                  ) : (
                    <form action={url.socialUrl} method="post" className="inline">
                      <input type="hidden" name="stateChecker" value={stateChecker} />
                      <input type="hidden" name="action" value="add" />
                      <input type="hidden" name="providerId" value={identity.providerId} />
                      <Button
                        id={`add-link-${identity.providerId}`}
                        type="submit"
                        variant="outline"
                        size="sm"
                        className="transition-all duration-200 hover:scale-105 hover:shadow-md"
                      >
                        {msg("doAdd")}
                      </Button>
                    </form>
                  )}
                </div>
              </Field>
            ))}
          </div>
        </CardContent>
      </Card>
    </Template>
  );
}
