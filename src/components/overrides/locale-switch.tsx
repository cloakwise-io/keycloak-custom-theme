import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export interface LocaleSwitchProps {
  enabledLanguages: Array<{
    languageTag: string;
    label: string;
    href: string;
  }>;
  currentLanguage: {
    label: string;
    languageTag: string;
  };
  ariaLabel: string;
}

export const LocaleSwitch = ({
  enabledLanguages,
  currentLanguage,
  ariaLabel
}: LocaleSwitchProps) => {
  if (enabledLanguages.length <= 1) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1" asChild>
        <Button
          variant="ghost"
          size="icon"
          className="uppercase rounded-full"
          aria-label={ariaLabel}
        >
          <span>{currentLanguage.languageTag}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {enabledLanguages.map(({ languageTag, label, href }, i) => (
          <DropdownMenuItem key={languageTag} asChild>
            <a href={href} role="menuitem" id={`language-${i + 1}`}>
              {label}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
