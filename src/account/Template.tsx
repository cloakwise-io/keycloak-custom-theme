import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { getKcClsx } from "keycloakify/account/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/account/Template.useInitialize";
import type { TemplateProps } from "keycloakify/account/TemplateProps";
import { ThemeProvider } from "next-themes";
import { MultiPageSidebar } from "@/components/multi-page-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/overrides/theme-toggle"
import { LocaleSwitch } from "@/components/overrides/locale-switch"
import { DisplayMessage } from "@/components/overrides/display-message"
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";

// export default function Template(props: TemplateProps<KcContext, I18n>) {
//   const { kcContext, i18n, doUseDefaultCss, active, classes, children } = props;

//   const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

//   const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

//   const { url, features, realm, message, referrer } = kcContext;

//   useEffect(() => {
//     document.title = msgStr("accountManagementTitle");
//   }, []);

//   useSetClassName({
//     qualifiedName: "html",
//     className: kcClsx("kcHtmlClass")
//   });

//   useSetClassName({
//     qualifiedName: "body",
//     className: clsx("admin-console", "user", kcClsx("kcBodyClass"))
//   });

//   const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

//   if (!isReadyToRender) {
//     return null;
//   }

//   return (
//     <>
//       <header className="navbar navbar-default navbar-pf navbar-main header">
//         <nav className="navbar" role="navigation">
//           <div className="navbar-header">
//             <div className="container">
//               <h1 className="navbar-title">Keycloak</h1>
//             </div>
//           </div>
//           <div className="navbar-collapse navbar-collapse-1">
//             <div className="container">
//               <ul className="nav navbar-nav navbar-utility">
//                 {enabledLanguages.length > 1 && (
//                   <li>
//                     <div className="kc-dropdown" id="kc-locale-dropdown">
//                       <a href="#" id="kc-current-locale-link">
//                         {currentLanguage.label}
//                       </a>
//                       <ul>
//                         {enabledLanguages.map(({ languageTag, label, href }) => (
//                           <li key={languageTag} className="kc-dropdown-item">
//                             <a href={href}>{label}</a>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </li>
//                 )}
//                 {referrer?.url && (
//                   <li>
//                     <a href={referrer.url} id="referrer">
//                       {msg("backTo", referrer.name)}
//                     </a>
//                   </li>
//                 )}
//                 <li>
//                   <a href={url.getLogoutUrl()}>{msg("doSignOut")}</a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>
//       </header>

//       <div className="container">
//         <div className="bs-sidebar col-sm-3">
//           <ul>
//             <li className={clsx(active === "account" && "active")}>
//               <a href={url.accountUrl}>{msg("account")}</a>
//             </li>
//             {features.passwordUpdateSupported && (
//               <li className={clsx(active === "password" && "active")}>
//                 <a href={url.passwordUrl}>{msg("password")}</a>
//               </li>
//             )}
//             <li className={clsx(active === "totp" && "active")}>
//               <a href={url.totpUrl}>{msg("authenticator")}</a>
//             </li>
//             {features.identityFederation && (
//               <li className={clsx(active === "social" && "active")}>
//                 <a href={url.socialUrl}>{msg("federatedIdentity")}</a>
//               </li>
//             )}
//             <li className={clsx(active === "sessions" && "active")}>
//               <a href={url.sessionsUrl}>{msg("sessions")}</a>
//             </li>
//             <li className={clsx(active === "applications" && "active")}>
//               <a href={url.applicationsUrl}>{msg("applications")}</a>
//             </li>
//             {features.log && (
//               <li className={clsx(active === "log" && "active")}>
//                 <a href={url.logUrl}>{msg("log")}</a>
//               </li>
//             )}
//             {realm.userManagedAccessAllowed && features.authorization && (
//               <li className={clsx(active === "authorization" && "active")}>
//                 <a href={url.resourceUrl}>{msg("myResources")}</a>
//               </li>
//             )}
//           </ul>
//         </div>

//         <div className="col-sm-9 content-area">
//           {message !== undefined && (
//             <div className={clsx("alert", `alert-${message.type}`)}>
//               {message.type === "success" && <span className="pficon pficon-ok"></span>}
//               {message.type === "error" && <span className="pficon pficon-error-circle-o"></span>}
//               <span
//                 className="kc-feedback-text"
//                 dangerouslySetInnerHTML={{
//                   __html: kcSanitize(message.summary)
//                 }}
//               />
//             </div>
//           )}

//           {children}
//         </div>
//       </div>
//     </>
//   );
// }

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, active, classes, children } = props;
  const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
  const { msgStr, currentLanguage, enabledLanguages } = i18n;
  const { message, url } = kcContext;

  // Get current page title based on active page
  const getPageTitle = () => {
    switch (active) {
      case "account":
        return msgStr("account");
      case "password":
        return msgStr("password");
      case "totp":
        return msgStr("authenticator");
      case "social":
        return msgStr("federatedIdentity");
      case "sessions":
        return msgStr("sessions");
      case "applications":
        return msgStr("applications");
      case "log":
        return msgStr("log");
      default:
        return msgStr("account");
    }
  };

  useEffect(() => {
    document.title = msgStr("accountManagementTitle");
  }, []);

  useSetClassName({
    qualifiedName: "html",
    className: clsx(kcClsx("kcHtmlClass"), "h-full")
  });

  useSetClassName({
    qualifiedName: "body",
    className: clsx(kcClsx("kcBodyClass"), "h-full")
  });

  const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

  if (!isReadyToRender) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        <MultiPageSidebar kcContext={kcContext} i18n={i18n} active={active} />
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
            <div className="flex items-center gap-2 px-4 flex-1">
              <SidebarTrigger className="-ml-1 transition-all duration-200 hover:scale-110" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink
                      href={url.accountUrl}
                      className="transition-colors duration-200 hover:text-primary"
                    >
                      {msgStr("accountManagementTitle")}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-medium">{getPageTitle()}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-2 px-4">
              <LocaleSwitch
                enabledLanguages={enabledLanguages}
                currentLanguage={currentLanguage}
                ariaLabel="Select language"
              />
              <ThemeToggle />
            </div>
          </header>
        <div className="flex flex-1 flex-col gap-6 p-6 pt-6">
          {message !== undefined && (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <DisplayMessage message={message} />
            </div>
          )}
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
    </ThemeProvider>
  )
}
