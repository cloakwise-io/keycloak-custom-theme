import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login.ftl" });

const meta = {
  title: "login/login.ftl",
  component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <KcPageStory />
};

export const WithBackButton: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        client: {
          // @ts-expect-error - baseUrl is not defined in on context type
          baseUrl: "https://example.com"
        }
      }}
    />
  )
};

export const WithInvalidCredential: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        login: {
          username: "johndoe"
        },
        messagesPerField: {
          // NOTE: The other functions of messagesPerField are derived from get() and
          // existsError() so they are the only ones that need to mock.
          existsError: (fieldName: string, ...otherFieldNames: string[]) => {
            const fieldNames = [fieldName, ...otherFieldNames];
            return fieldNames.includes("username") || fieldNames.includes("password");
          },
          get: (fieldName: string) => {
            if (fieldName === "username" || fieldName === "password") {
              return "Invalid username or password.";
            }
            return "";
          }
        }
      }}
    />
  )
};

export const WithoutRegistration: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        realm: { registrationAllowed: false }
      }}
    />
  )
};

export const WithoutRememberMe: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        realm: { rememberMe: false }
      }}
    />
  )
};

export const WithoutPasswordReset: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        realm: { resetPasswordAllowed: false }
      }}
    />
  )
};

export const WithEmailAsUsername: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        realm: { loginWithEmailAllowed: false }
      }}
    />
  )
};

export const WithPresetUsername: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        login: { username: "max.mustermann@mail.com" }
      }}
    />
  )
};

export const WithImmutablePresetUsername: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        auth: {
          attemptedUsername: "max.mustermann@mail.com",
          showUsername: true
        },
        usernameHidden: true,
        message: {
          type: "info",
          summary: "Please re-authenticate to continue"
        }
      }}
    />
  )
};

export const WithSocialProviders: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        social: {
          displayInfo: true,
          providers: [
            {
              loginUrl: "google",
              alias: "google",
              providerId: "google",
              displayName: "Google",
              iconClasses: "fa fa-google"
            },
            {
              loginUrl: "microsoft",
              alias: "microsoft",
              providerId: "microsoft",
              displayName: "Microsoft",
              iconClasses: "fa fa-windows"
            },
            {
              loginUrl: "facebook",
              alias: "facebook",
              providerId: "facebook",
              displayName: "Facebook",
              iconClasses: "fa fa-facebook"
            },
            {
              loginUrl: "instagram",
              alias: "instagram",
              providerId: "instagram",
              displayName: "Instagram",
              iconClasses: "fa fa-instagram"
            },
            {
              loginUrl: "twitter",
              alias: "twitter",
              providerId: "twitter",
              displayName: "Twitter",
              iconClasses: "fa fa-twitter"
            },
            {
              loginUrl: "linkedin",
              alias: "linkedin",
              providerId: "linkedin",
              displayName: "LinkedIn",
              iconClasses: "fa fa-linkedin"
            },
            {
              loginUrl: "stackoverflow",
              alias: "stackoverflow",
              providerId: "stackoverflow",
              displayName: "Stackoverflow",
              iconClasses: "fa fa-stack-overflow"
            },
            {
              loginUrl: "github",
              alias: "github",
              providerId: "github",
              displayName: "Github",
              iconClasses: "fa fa-github"
            },
            {
              loginUrl: "gitlab",
              alias: "gitlab",
              providerId: "gitlab",
              displayName: "Gitlab",
              iconClasses: "fa fa-gitlab"
            },
            {
              loginUrl: "bitbucket",
              alias: "bitbucket",
              providerId: "bitbucket",
              displayName: "Bitbucket",
              iconClasses: "fa fa-bitbucket"
            },
            {
              loginUrl: "paypal",
              alias: "paypal",
              providerId: "paypal",
              displayName: "PayPal",
              iconClasses: "fa fa-paypal"
            },
            {
              loginUrl: "openshift",
              alias: "openshift",
              providerId: "openshift",
              displayName: "OpenShift",
              iconClasses: "fa fa-cloud"
            }
          ]
        }
      }}
    />
  )
};

export const WithoutPasswordField: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        realm: { password: false }
      }}
    />
  )
};

export const WithErrorMessage: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        message: {
          summary: "The time allotted for the connection has elapsed.<br/>The login process will restart from the beginning.",
          type: "error"
        }
      }}
    />
  )
};

export const WithOneSocialProvider: Story = {
  render: args => (
    <KcPageStory
      {...args}
      kcContext={{
        social: {
          displayInfo: true,
          providers: [
            {
              loginUrl: "google",
              alias: "google",
              providerId: "google",
              displayName: "Google",
              iconClasses: "fa fa-google"
            }
          ]
        }
      }}
    />
  )
};

export const WithSocialProviderWithCustomIcon: Story = {
  render: args => (
    <KcPageStory
      {...args}
      kcContext={{
        social: {
          displayInfo: true,
          providers: [
            {
              loginUrl: "reddit",
              alias: "reddit",
              providerId: "reddit",
              displayName: "Reddit",
              iconClasses:
                "data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' class='VqTiKUi7JTOk5uw6VjTI' height='16' width='16'%3E%3Cg clip-path='url(%23reddit-16_svg__a)'%3E%3Cpath d='M8 0a8 8 0 0 0-5.657 13.657L.82 15.18a.48.48 0 0 0 .34.819H8A8 8 0 0 0 8 0Z' fill='%23FF4500' style='fill: color(display-p3 1 0.2706 0); fill-opacity: 1;'%3E%3C/path%3E%3Cpath d='M9.627 3.773a1.334 1.334 0 1 0-.008-.577A2.153 2.153 0 0 0 7.7 5.334v.007c-1.172.049-2.243.383-3.093.91a1.868 1.868 0 1 0-1.934 3.17c.062 2.168 2.425 3.913 5.332 3.913s5.273-1.746 5.332-3.917a1.868 1.868 0 1 0-1.94-3.169c-.857-.53-1.94-.864-3.123-.909v-.005c0-.793.59-1.452 1.354-1.56v-.001ZM4.531 8.914c.032-.677.482-1.197 1.005-1.197.523 0 .923.55.892 1.227-.032.677-.422.924-.946.924s-.982-.276-.95-.954Zm5.942-1.197c.523 0 .973.52 1.004 1.197.031.678-.428.954-.95.954-.524 0-.915-.246-.946-.924-.032-.678.368-1.227.892-1.227Zm-.623 2.765c.098.01.16.112.123.203a2.133 2.133 0 0 1-3.938 0 .148.148 0 0 1 .122-.203 18.47 18.47 0 0 1 1.847-.09c.65 0 1.27.032 1.846.09Z' fill='%23fff' style='fill: rgb(255, 255, 255); fill-opacity: 1;'%3E%3C/path%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='reddit-16_svg__a'%3E%3Cpath fill='%23fff' style='fill: rgb(255, 255, 255); fill-opacity: 1;' d='M0 0h16v16H0z'%3E%3C/path%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E"
            }
          ]
        }
      }}
    />
  )
};

export const WithTwoSocialProviders: Story = {
  render: args => (
    <KcPageStory
      {...args}
      kcContext={{
        social: {
          displayInfo: true,
          providers: [
            {
              loginUrl: "google",
              alias: "google",
              providerId: "google",
              displayName: "Google",
              iconClasses: "fa fa-google"
            },
            {
              loginUrl: "microsoft",
              alias: "microsoft",
              providerId: "microsoft",
              displayName: "Microsoft",
              iconClasses: "fa fa-windows"
            }
          ]
        }
      }}
    />
  )
};
export const WithNoSocialProviders: Story = {
  render: args => (
    <KcPageStory
      {...args}
      kcContext={{
        social: {
          displayInfo: true,
          providers: []
        }
      }}
    />
  )
};
export const WithMoreThanTwoSocialProviders: Story = {
  render: args => (
    <KcPageStory
      {...args}
      kcContext={{
        social: {
          displayInfo: true,
          providers: [
            {
              loginUrl: "google",
              alias: "google",
              providerId: "google",
              displayName: "Google",
              iconClasses: "fa fa-google"
            },
            {
              loginUrl: "microsoft",
              alias: "microsoft",
              providerId: "microsoft",
              displayName: "Microsoft",
              iconClasses: "fa fa-windows"
            },
            {
              loginUrl: "facebook",
              alias: "facebook",
              providerId: "facebook",
              displayName: "Facebook",
              iconClasses: "fa fa-facebook"
            },
            {
              loginUrl: "twitter",
              alias: "twitter",
              providerId: "twitter",
              displayName: "Twitter",
              iconClasses: "fa fa-twitter"
            }
          ]
        }
      }}
    />
  )
};
export const WithSocialProvidersAndWithoutRememberMe: Story = {
  render: args => (
    <KcPageStory
      {...args}
      kcContext={{
        social: {
          displayInfo: true,
          providers: [
            {
              loginUrl: "google",
              alias: "google",
              providerId: "google",
              displayName: "Google",
              iconClasses: "fa fa-google"
            }
          ]
        },
        realm: { rememberMe: false }
      }}
    />
  )
};

/**
 * WithAuthPassKey:
 * - Purpose: Test usage of Sign In With Pass Key integration
 * - Scenario: Simulates a scenario where the `Sign In with Passkey` button is rendered below `Sign In` button.
 * - Key Aspect: Ensure that it is displayed correctly.
 */
export const WithAuthPassKey: Story = {
  render: args => (
    <KcPageStory
      {...args}
      kcContext={{
        url: {
          loginAction: "/mock-login-action"
        },
        enableWebAuthnConditionalUI: true
      }}
    />
  )
};

