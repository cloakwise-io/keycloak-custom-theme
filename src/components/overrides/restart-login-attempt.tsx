/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Redo2, UserCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface RestartLoginAttemptProps {
  restartLoginTooltip: string;
  attemptedUsername?: string;
  loginRestartFlowUrl: string;
}

export const RestartLoginAttempt: React.FC<RestartLoginAttemptProps> = ({
  restartLoginTooltip,
  attemptedUsername,
  loginRestartFlowUrl
}) => (
  <div className="flex items-center justify-between gap-4 py-2 px-4 rounded-lg bg-muted/50">
    <div className="flex items-center gap-2">
      <Label htmlFor="attempted-username" className="size-4 text-muted-foreground">
        <UserCircle className="size-4" />
      </Label>
      <span id="attempted-username" className="text-sm font-semibold">
        {attemptedUsername}
      </span>
    </div>

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="size-8 p-0 rounded-full hover:bg-muted-foreground/10"
            asChild
          >
            <a href={loginRestartFlowUrl} aria-label={restartLoginTooltip}>
              <Redo2 className="size-4 text-muted-foreground" />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" align="end">
          <p className="text-xs">{restartLoginTooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
);
