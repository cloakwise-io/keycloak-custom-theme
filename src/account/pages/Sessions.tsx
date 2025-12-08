import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Monitor, Clock, Globe, LogOut } from "lucide-react";

export default function Sessions(props: PageProps<Extract<KcContext, { pageId: "sessions.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { url, stateChecker, sessions } = kcContext;

  const { msg } = i18n;

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "—";
    try {
      const date = new Date(dateString);
      return date.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };


  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="sessions">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              {msg("sessionsHtmlTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        {msg("ip")}
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {msg("started")}
                      </div>
                    </TableHead>
                    <TableHead>{msg("lastAccess")}</TableHead>
                    <TableHead>{msg("expires")}</TableHead>
                    <TableHead>{msg("clients")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.sessions.map((session, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {session.ipAddress}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{formatDateTime(session?.started)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{formatDateTime(session?.lastAccess)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{formatDateTime(session?.expires)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1.5">
                          {session.clients.map((client: string, clientIndex: number) => (
                            <Badge key={clientIndex} variant="outline" className="text-xs font-normal">
                              {client}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <form action={url.sessionsUrl} method="post" className="flex justify-end">
          <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />
          <Button
            id="logout-all-sessions"
            type="submit"
            variant="destructive"
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            {msg("doLogOutAllSessions")}
          </Button>
        </form>
      </div>
    </Template>
  );
}
