import { Button } from "@/components/ui/button";
import { getProviderIcon } from "./provider-icons";
import { cn } from "@/lib/utils";

import '@fortawesome/fontawesome-free/css/all.min.css';

type SocialProviderButtonProps = {
  alias: string;
  displayName: string;
  loginUrl: string;
  id?: string;
  iconClasses?: string;
};

const getProviderStyles = (alias: string) => {
  const provider = alias.toLowerCase();

  switch (provider) {
    case "google":
      return "hover:bg-[#4285F4]/10 hover:border-[#4285F4]/50 hover:text-[#4285F4] dark:hover:bg-[#4285F4]/20";
    case "github":
      return "hover:bg-[#181717]/10 hover:border-[#181717]/50 hover:text-[#181717] dark:hover:bg-[#ffffff]/20 dark:hover:text-[#ffffff] dark:hover:border-[#ffffff]/50";
    case "microsoft":
      return "hover:bg-[#00A4EF]/10 hover:border-[#00A4EF]/50 hover:text-[#00A4EF] dark:hover:bg-[#00A4EF]/20";
    case "facebook":
      return "hover:bg-[#1877F2]/10 hover:border-[#1877F2]/50 hover:text-[#1877F2] dark:hover:bg-[#1877F2]/20";
    case "x":
    case "twitter":
      return "hover:bg-[#000000]/10 hover:border-[#000000]/50 hover:text-[#000000] dark:hover:bg-[#ffffff]/20 dark:hover:text-[#ffffff] dark:hover:border-[#ffffff]/50";
    case "linkedin":
      return "hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/50 hover:text-[#0A66C2] dark:hover:bg-[#0A66C2]/20";
    case "gitlab":
      return "hover:bg-[#FC6D26]/10 hover:border-[#FC6D26]/50 hover:text-[#FC6D26] dark:hover:bg-[#FC6D26]/20";
    case "bitbucket":
      return "hover:bg-[#0052CC]/10 hover:border-[#0052CC]/50 hover:text-[#0052CC] dark:hover:bg-[#0052CC]/20";
    case "instagram":
      return "hover:bg-gradient-to-r hover:from-[#E4405F] hover:via-[#FCAF45] hover:to-[#833AB4] hover:border-transparent hover:text-white";
    case "stackoverflow":
      return "hover:bg-[#F48024]/10 hover:border-[#F48024]/50 hover:text-[#F48024] dark:hover:bg-[#F48024]/20";
    default:
      return "hover:bg-primary/10 hover:border-primary/50 hover:text-primary";
  }
};

export function SocialProviderButton({ alias, displayName, loginUrl, id, iconClasses }: SocialProviderButtonProps) {
  return (
    <Button
      variant="outline"
      type="button"
      className={cn(
        "w-full transition-all duration-200 group relative overflow-hidden",
        "hover:shadow-md hover:shadow-primary/10",
        getProviderStyles(alias)
      )}
      asChild
    >
      <a href={loginUrl} id={id} className="flex items-center justify-center gap-2">
        {getProviderIcon(alias, iconClasses)}
        <span className="ml-2 font-medium">{displayName}</span>
      </a>
    </Button>
  );
}

