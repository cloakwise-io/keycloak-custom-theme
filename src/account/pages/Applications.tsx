import * as React from "react";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal } from "lucide-react";

export default function Applications(props: PageProps<Extract<KcContext, { pageId: "applications.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;

  const {
    url,
    applications: { applications },
    stateChecker
  } = kcContext;

  const { msg, advancedMsg } = i18n;

  const renderAvailableRoles = (application: any) => {
    const roles: Array<{ element: React.ReactNode; key: string }> = [];

    // Collect realm roles
    if (!isArrayWithEmptyObject(application.realmRolesAvailable)) {
      application.realmRolesAvailable.forEach((role: any) => {
        roles.push({
          element: role.description ? advancedMsg(role.description) : advancedMsg(role.name),
          key: `realm-${role.name}`
        });
      });
    }

    // Collect resource roles
    if (application.resourceRolesAvailable) {
      Object.keys(application.resourceRolesAvailable).forEach(resource => {
        application.resourceRolesAvailable[resource].forEach((clientRole: any) => {
          const roleText = clientRole.roleDescription
            ? advancedMsg(clientRole.roleDescription)
            : advancedMsg(clientRole.roleName);
          const clientName = clientRole.clientName
            ? advancedMsg(clientRole.clientName)
            : clientRole.clientId;
          roles.push({
            element: (
              <>
                {roleText} {msg("inResource")} {clientName}
              </>
            ),
            key: `resource-${resource}-${clientRole.roleName}`
          });
        });
      });
    }

    if (roles.length === 0) {
      return null;
    }

    if (roles.length <= 2) {
      return (
        <div className="flex flex-wrap gap-1">
          {roles.map((role, index) => (
            <span key={role.key}>
              {role.element}
              {index < roles.length - 1 && ", "}
            </span>
          ))}
        </div>
      );
    }

    // Show first 2 roles + badge with popover for remaining
    return (
      <div className="flex flex-wrap items-center gap-1">
        <span>
          {roles[0].element}, {roles[1].element}
        </span>
        <Popover>
          <PopoverTrigger asChild>
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
            >
              +{roles.length - 2}
            </Badge>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">{msg("availableRoles")}</h4>
              <div className="mt-3 space-y-1.5 text-sm">
                {roles.map((role) => (
                  <div key={role.key} className="text-muted-foreground">
                    • {role.element}
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  };

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="applications">
      <Card>
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Terminal className="h-5 w-5" />
            </div>
            <span className="text-2xl">{msg("applicationsHtmlTitle")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={url.applicationsUrl} method="post">
            <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />
            <input type="hidden" id="referrer" name="referrer" value={stateChecker} />

            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader className="bg-muted">
                  <TableRow className="hover:bg-muted">
                    <TableHead className="font-semibold">{msg("application")}</TableHead>
                    <TableHead className="font-semibold">{msg("availableRoles")}</TableHead>
                    <TableHead className="font-semibold">{msg("grantedPermissions")}</TableHead>
                    <TableHead className="font-semibold">{msg("additionalGrants")}</TableHead>
                    <TableHead className="font-semibold">{msg("action")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map(application => (
                    <TableRow
                      key={application.client.clientId}
                      className="transition-colors duration-150 hover:bg-muted/30"
                    >
                      <TableCell className="font-medium">
                        {application.effectiveUrl && (
                          <a
                            href={application.effectiveUrl}
                            className="text-primary hover:underline transition-all duration-200 hover:text-primary/80"
                          >
                            {(application.client.name && advancedMsg(application.client.name)) || application.client.clientId}
                          </a>
                        )}
                        {!application.effectiveUrl && ((application.client.name && advancedMsg(application.client.name)) || application.client.clientId)}
                      </TableCell>

                      <TableCell className="text-sm">
                        {renderAvailableRoles(application)}
                      </TableCell>

                      <TableCell className="text-sm">
                        {application.client.consentRequired ? (
                          application.clientScopesGranted.map((claim: string) => (
                            <span key={claim}>
                              {advancedMsg(claim)}
                              {claim !== application.clientScopesGranted[application.clientScopesGranted.length - 1] && ", "}
                            </span>
                          ))
                        ) : (
                          <strong className="text-primary">{msg("fullAccess")}</strong>
                        )}
                      </TableCell>

                      <TableCell className="text-sm">
                        {application.additionalGrants.map((grant: string) => (
                          <span key={grant}>
                            {advancedMsg(grant)}
                            {grant !== application.additionalGrants[application.additionalGrants.length - 1] && ", "}
                          </span>
                        ))}
                      </TableCell>

                      <TableCell>
                        {(application.client.consentRequired && application.clientScopesGranted.length > 0) || application.additionalGrants.length > 0 ? (
                          <Button
                            type="submit"
                            variant="destructive"
                            size="sm"
                            id={`revoke-${application.client.clientId}`}
                            name="clientId"
                            value={application.client.id}
                            className="transition-all duration-200 hover:scale-105 hover:shadow-md"
                          >
                            {msg("revoke")}
                          </Button>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </form>
        </CardContent>
      </Card>
    </Template>
  );
}

function isArrayWithEmptyObject(variable: any): boolean {
  return Array.isArray(variable) && variable.length === 1 && typeof variable[0] === "object" && Object.keys(variable[0]).length === 0;
}
