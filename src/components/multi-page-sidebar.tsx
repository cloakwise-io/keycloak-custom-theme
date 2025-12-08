import * as React from "react"
import {
  User,
  Lock,
  Smartphone,
  Link,
  Clock,
  FileText,
  Terminal,
} from "lucide-react"

import { NavMain } from "@/components/multi-page-nav-main"
import { NavUser } from "@/components/muit-page-nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import type { KcContext } from "@/account/KcContext"
import type { I18n } from "@/account/i18n"

type MultiPageSidebarProps = React.ComponentProps<typeof Sidebar> & {
  kcContext: KcContext
  i18n: I18n
  active?: string
}

export function MultiPageSidebar({ kcContext, i18n, active, ...props }: MultiPageSidebarProps) {
  const { url, features, account, referrer } = kcContext
  const { msgStr, currentLanguage, enabledLanguages } = i18n

  // Build navigation items
  const navItems = [
    {
      title: msgStr("account"),
      url: url.accountUrl,
      icon: User,
      isActive: active === "account",
    },
    ...(features.passwordUpdateSupported
      ? [
        {
          title: msgStr("password"),
          url: url.passwordUrl,
          icon: Lock,
          isActive: active === "password",
        },
      ]
      : []),
    {
      title: msgStr("authenticator"),
      url: url.totpUrl,
      icon: Smartphone,
      isActive: active === "totp",
    },
    ...(features.identityFederation
      ? [
        {
          title: msgStr("federatedIdentity"),
          url: url.socialUrl,
          icon: Link,
          isActive: active === "social",
        },
      ]
      : []),
    {
      title: msgStr("sessions"),
      url: url.sessionsUrl,
      icon: Clock,
      isActive: active === "sessions",
    },
    {
      title: msgStr("applications"),
      url: url.applicationsUrl,
      icon: Terminal,
      isActive: active === "applications",
    },
    ...(features.log
      ? [
        {
          title: msgStr("log"),
          url: url.logUrl,
          icon: FileText,
          isActive: active === "log",
        },
      ]
      : []),
  ]

  // Get user display name
  const userDisplayName =
    account.firstName && account.lastName
      ? `${account.firstName} ${account.lastName}`
      : account.username || account.email || "User"

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarHeaderContent />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: userDisplayName,
            email: account.email || "",
            avatar: "/img_avatar.svg",
          }}
          logoutUrl={url.getLogoutUrl()}
          logoutLabel={msgStr("doSignOut")}
          enabledLanguages={enabledLanguages}
          currentLanguage={currentLanguage}
          referrer={referrer}
          referrerLabel={referrer ? msgStr("backTo", referrer.name) : undefined}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

function SidebarHeaderContent() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <div
      className="size-full flex items-center justify-center"
    >
      {isCollapsed ? (
        <img src="/icon.svg" alt="Keycloak" className="size-8 object-contain" />
      ) : (
        <img src="/logo.svg" alt="Keycloak" className="h-8 w-auto object-contain" />
      )}
    </div>
  )
}
