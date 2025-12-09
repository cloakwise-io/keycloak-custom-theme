import "../global.css";
import "../custom.css";
import { Suspense, lazy, ComponentType } from "react";
import type { ClassKey } from "keycloakify/account";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/account/DefaultPage";
import CustomTemplate from "./Template";
import Template from "keycloakify/account/Template";

const Password = lazy(() => import("./pages/Password"));
const Account = lazy(() => import("./pages/Account"));
const Sessions = lazy(() => import("./pages/Sessions"));
const Totp = lazy(() => import("./pages/Totp"));
const Applications = lazy(() => import("./pages/Applications"));
const Log = lazy(() => import("./pages/Log"));
const FederatedIdentity = lazy(() => import("./pages/FederatedIdentity"));

const PAGE_COMPONENTS: Partial<Record<KcContext["pageId"], ComponentType<any>>> = {
	"account.ftl": Account,
	"password.ftl": Password,
	"sessions.ftl": Sessions,
	"totp.ftl": Totp,
	"applications.ftl": Applications,
	"log.ftl": Log,
	"federatedIdentity.ftl": FederatedIdentity,
};

export default function KcPage(props: { kcContext: KcContext }) {
	const { kcContext } = props;
	const { i18n } = useI18n({ kcContext });

	const PageComponent = PAGE_COMPONENTS[kcContext.pageId];

	return (
		<Suspense>
			{PageComponent ? (
				<PageComponent
					kcContext={kcContext}
					i18n={i18n}
					classes={classes}
					Template={CustomTemplate}
					doUseDefaultCss={false}
				/>
			) : (
				<DefaultPage
					kcContext={kcContext}
					i18n={i18n}
					classes={classes}
					Template={Template}
					doUseDefaultCss={true}
				/>
			)}
		</Suspense>
	);
}

const classes = {} satisfies { [key in ClassKey]?: string };
