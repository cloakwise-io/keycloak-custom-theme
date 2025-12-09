import type { Key } from "react";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function Log(props: PageProps<Extract<KcContext, { pageId: "log.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;
  const { log } = kcContext;
  const { msg } = i18n;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="log">
        <Card>
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-2xl">{msg("accountLogHtmlTitle")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader className="bg-muted">
                  <TableRow className="hover:bg-muted">
                    <TableHead className="font-semibold">{msg("date")}</TableHead>
                    <TableHead className="font-semibold">{msg("event")}</TableHead>
                    <TableHead className="font-semibold">{msg("ip")}</TableHead>
                    <TableHead className="font-semibold">{msg("client")}</TableHead>
                    <TableHead className="font-semibold">{msg("details")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {log.events.map(
                    (
                      event: {
                        date: string | number | Date;
                        event: string;
                        ipAddress: string;
                        client: any;
                        details: any[];
                      },
                      index: Key | null | undefined
                    ) => (
                      <TableRow
                        key={index}
                        className="transition-colors duration-150 hover:bg-muted/30"
                      >
                        <TableCell className="font-medium">{event.date ? new Date(event.date).toLocaleString() : ""}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {event.event}
                          </span>
                        </TableCell>
                        <TableCell>
                          <code className="text-sm bg-muted/80 px-2.5 py-1 rounded-md font-mono border">
                            {event.ipAddress}
                          </code>
                        </TableCell>
                        <TableCell className="font-medium">{event.client || ""}</TableCell>
                        <TableCell className="text-sm">
                          {event.details.map((detail, detailIndex) => (
                            <span key={detailIndex}>
                              {`${detail.key} = ${detail.value}`}
                              {detailIndex < event.details.length - 1 && ", "}
                            </span>
                          ))}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
    </Template>
  );
}
