import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocaleSwitch, LocaleSwitchProps } from "./locale-switch";
import { PropsWithChildren } from "react";
import { ThemeToggle } from "./theme-toggle";

export default function AuthPageLayout({
  children,
  clientURL,
  localeOptions
}: PropsWithChildren<{
  clientURL?: string;
  localeOptions: LocaleSwitchProps;
}>) {
  return (
    <div className="relative min-h-svh overflow-hidden bg-card md:bg-transparent">
      {/* Gradient background */}
      <div className="hidden md:block fixed inset-0 bg-gradient-to-br from-primary/20 via-background to-primary/10 dark:from-primary/10 dark:via-background dark:to-primary/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Top left back button */}
      {clientURL && (
        <div className="fixed top-4 left-4 z-50">
          <Button
            variant="ghost"
            onClick={() => window.location.replace(clientURL)}
            className="hover:bg-primary/10 transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="size-4" />
            <span className="sr-only">Back</span>
          </Button>
        </div>
      )}

      {/* Top right controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <LocaleSwitch {...localeOptions} />
        <ThemeToggle />
      </div>

      <div className="relative flex min-h-svh items-center justify-center">
        {/* Centered Auth form */}
        <div className="relative flex flex-col gap-4 py-6 px-0 md:p-6 md:px-6 lg:p-10 lg:px-12 w-full md:max-w-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
