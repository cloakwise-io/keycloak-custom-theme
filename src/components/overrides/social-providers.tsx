/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { getProviderIcon } from "./provider-icons";
import { Button } from "@/components/ui/button";

type SocialProvidersProps = {
  providers?: Array<{
    alias: string;
    loginUrl: string;
    displayName: string;
    iconClasses?: string;
  }>;
  label: string;
};

export const SocialProviders: React.FC<SocialProvidersProps> = ({
  providers = [],
  label
}) => (
  <Fragment>
    {providers.length > 0 && (
      <Fragment>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border uppercase">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            {label}
          </span>
        </div>
        <div
          className={cn(
            "text-lg grid gap-2 grid-cols-1",
            providers.length > 1 && "md:grid-cols-2"
          )}
        >
          {providers.map(p => (
            <Button key={p.alias} variant="outline" className="w-full" asChild>
              <a href={p.loginUrl}>
                {getProviderIcon(p.alias)}
                <span className="ml-2">{p.displayName}</span>
              </a>
            </Button>
          ))}
        </div>
      </Fragment>
    )}
  </Fragment>
);
