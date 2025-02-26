import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "@/login/KcContext";
import type { I18n } from "@/login/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { msg } = i18n;
  const { url, user } = kcContext;

  return (
    <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} displayInfo headerNode={msg("emailVerifyTitle")}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <h3 className="text-lg font-semibold">{msg("emailVerifyInstruction2")}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{msg("emailVerifyInstruction1", user?.email ?? "")}</p>
        </CardContent>
        <CardFooter className="flex items-center gap-2">
          <Button asChild>
            <a href={url.loginAction}>{msg("doClickHere")}</a>
          </Button>
          <p className="text-sm text-muted-foreground">{msg("emailVerifyInstruction3")}</p>
        </CardFooter>
      </Card>
    </Template>
  );
}
