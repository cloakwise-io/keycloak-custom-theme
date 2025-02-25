import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocaleSwitch, LocaleSwitchProps } from "./locale-switch";
import { PropsWithChildren } from "react";
import { ThemeToggle } from "./theme-toggle";

export default function AuthPageLayout({
  children,
  localeOptions,
  displayNameHtml
}: PropsWithChildren<{
  displayNameHtml: string;
  localeOptions: LocaleSwitchProps;
}>) {
  return (
    <div className="grid min-h-svh lg:grid-cols-[1fr_2fr]">
      <div className="relative hidden bg-muted lg:block">
        {/* Text container with absolute positioning */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <h1 className="text-4xl font-bold drop-shadow-md">{displayNameHtml}</h1>
        </div>

        {/* Image */}
        {/* <img
          src="https://ui.shadcn.com/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex gap-2 justify-between">
          <Button variant="ghost">
            <ArrowLeft className="size-4" />
            <span className="hidden md:block">Back</span>
          </Button>

          <div className="flex gap-2">
            <LocaleSwitch {...localeOptions} />
            <ThemeToggle />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
    </div>
  );
}
