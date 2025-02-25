import { CheckCircle2, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { kcSanitize } from "keycloakify/lib/kcSanitize";

type Message = {
  type: "success" | "warning" | "error" | "info";
  summary: string;
};

export function DisplayMessage({ message }: { message: Message }) {
  const variantMap: { [key in Message["type"]]: "default" | "destructive" } = {
    success: "default",
    warning: "default",
    error: "destructive",
    info: "default"
  };

  const IconComponent =
    {
      success: CheckCircle2,
      warning: AlertTriangle,
      error: AlertCircle,
      info: Info
    }[message.type] || AlertCircle;

  return (
    <Alert variant={variantMap[message.type] || "default"}>
      <IconComponent className="h-4 w-4" />
      <AlertDescription>
        <span dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
      </AlertDescription>
    </Alert>
  );
}
