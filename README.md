# Keycloak Custom Theme

![build status](https://github.com/paulgrammer/keycloak-custom-theme/actions/workflows/build.yaml/badge.svg)
[![Trivy vulnerability scanner](https://github.com/paulgrammer/keycloak-custom-theme/actions/workflows/trivy.yaml/badge.svg?branch=main)](https://github.com/paulgrammer/keycloak-custom-theme/actions/workflows/trivy.yaml)
<a href="https://ko-fi.com/paulgrammer">
  <img src="https://ko-fi.com/img/githubbutton_sm.svg" width="150" alt="Support on Ko-fi"/>
</a>

A modern, production-ready custom theme for Keycloak built with React, TypeScript, and shadcn/ui components. This theme provides a visually stunning authentication experience with glassmorphism effects, smooth animations, and a fully responsive design.

## Features

- **Component Library**
  - Built with [shadcn/ui](https://ui.shadcn.com/) components
  - Customizable Field components for form inputs
  - Consistent design system using Tailwind CSS

- **Developer Experience**
  - TypeScript for type safety
  - Storybook for component development
  - Hot module replacement with Vite
  - ESLint and Prettier for code quality

## Getting Started

### Prerequisites

- Node.js >= 18.0.0 or >= 20.0.0
- pnpm >= 8.15.2
- Maven >= 3.1.1 (for building the theme)
- Java >= 7 (for Maven)

### Installation

```bash
# Install dependencies
pnpm install
```

**Note**: If you use a different package manager (npm, yarn), make sure to delete `pnpm-lock.yaml` first.

### Development

Start the development server with hot reload:

```bash
pnpm dev
```

The theme will be available at `http://localhost:5173` (or the port Vite assigns).

### Storybook

View and develop components in isolation:

```bash
pnpm storybook
```

Storybook will be available at `http://localhost:6006`.

## Building the Theme

To build the Keycloak theme JAR files, you need Maven installed:

**macOS:**
```bash
brew install maven
```

**Debian/Ubuntu:**
```bash
sudo apt-get install maven
```

**Windows:**
```bash
choco install openjdk
choco install maven
```

Or download Maven from [maven.apache.org](https://maven.apache.org/download.cgi).

Build the theme:

```bash
pnpm run build-keycloak-theme
```

This command will:
1. Build the React application (`pnpm run build`)
2. Generate Keycloak theme JAR files using Keycloakify

By default, Keycloakify generates multiple JAR files for different Keycloak versions. You can customize this behavior in the [Keycloakify documentation](https://docs.keycloakify.dev/targeting-specific-keycloak-versions).

The generated JAR files will be in the `dist_keycloak/` directory:
- `keycloak-theme-for-kc-22-to-25.jar` - For Keycloak 22-25
- `keycloak-theme-for-kc-all-other-versions.jar` - For other versions

## Testing the Theme Locally

For detailed instructions on testing your theme locally, see the [Keycloakify testing documentation](https://docs.keycloakify.dev/testing-your-theme).

## Customization

### Customizing Components

All UI components are located in `src/components/ui/` and can be customized to match your brand:

- **Colors**: Modify Tailwind CSS variables in your CSS files
- **Components**: Edit component files in `src/components/ui/`
- **Layout**: Customize `src/components/overrides/auth-page-layout.tsx`
- **Pages**: Modify page components in `src/login/pages/`

### Adding New Pages

1. Create a new page component in `src/login/pages/`
2. Add a case in `src/login/KcPage.tsx` to route to your new page
3. Use the `Template` component for consistent layout

### Styling

The theme uses Tailwind CSS for styling. Key files:
- `src/login/global.css` - Global styles
- `src/login/custom.css` - Custom theme styles

For more customization strategies, see the [Keycloakify customization documentation](https://docs.keycloakify.dev/customization-strategies).

## Additional Themes

### Account Theme

Initialize the account management theme:

```bash
npx keycloakify initialize-account-theme
```

### Email Theme

Initialize the email theme:

```bash
npx keycloakify initialize-email-theme
```

## Deployment

### Deploy using Docker

Start Keycloak with Docker Compose:

```bash
docker compose up --build
```

Keycloak will be available at `http://localhost:8080` with the admin credentials:
- Username: `admin`
- Password: `adminpassword`

### GitHub Actions

This project includes a GitHub Actions workflow that automatically builds and publishes theme JAR files as GitHub release artifacts.

To enable the workflow:
1. Go to your repository on GitHub
2. Navigate to `Settings` > `Actions` > `Workflow permissions`
3. Select `Read and write permissions`

To release a new version:
1. Update the version in `package.json`
2. Push to the repository
3. The workflow will automatically build and publish the theme

### Kubernetes Deployment

For deploying Keycloak on Kubernetes, follow the official guide:
[Kubernetes Deployment Guide](https://www.keycloak.org/getting-started/getting-started-kube)

### Manual Deployment

1. Build the theme: `pnpm run build-keycloak-theme`
2. Copy the JAR files from `dist_keycloak/` to your Keycloak `themes/` directory
3. Restart Keycloak

## Documentation

- [Keycloakify Documentation](https://docs.keycloakify.dev)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Keycloak Documentation](https://www.keycloak.org/documentation)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `pnpm format`
5. Submit a pull request
