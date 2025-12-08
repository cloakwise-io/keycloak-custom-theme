/* eslint-disable react/prop-types */
import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";

const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({
      passwordInputId: `${props.name}`
    });

    return (
      <div className="relative">
        <Input
          type={isPasswordRevealed ? "text" : "password"}
          // aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
          className={cn("hide-password-toggle pr-10", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent z-50"
          onClick={toggleIsPasswordRevealed}
        >
          {isPasswordRevealed ? (
            <EyeIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {isPasswordRevealed ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
