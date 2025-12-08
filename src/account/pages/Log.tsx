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
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {msg("accountLogHtmlTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>{msg("date")}</TableHead>
                  <TableHead>{msg("event")}</TableHead>
                  <TableHead>{msg("ip")}</TableHead>
                  <TableHead>{msg("client")}</TableHead>
                  <TableHead>{msg("details")}</TableHead>
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
                    <TableRow key={index}>
                      <TableCell>{event.date ? new Date(event.date).toLocaleString() : ""}</TableCell>
                      <TableCell>{event.event}</TableCell>
                      <TableCell>{event.ipAddress}</TableCell>
                      <TableCell>{event.client || ""}</TableCell>
                      <TableCell>
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
