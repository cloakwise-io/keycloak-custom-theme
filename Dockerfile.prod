ARG KEYCLOAK_VERSION=26.1

# Stage 1: Build Keycloak theme JAR
FROM node:18-alpine AS keycloakify_jar_builder

# Install JDK and Maven
RUN apk update && \
    apk add --no-cache openjdk17-jdk maven

# Install dependencies first for better layer caching
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source and build
COPY . .
RUN yarn build-keycloak-theme

# Stage 2: Build Keycloak server with the theme
FROM quay.io/keycloak/keycloak:${KEYCLOAK_VERSION} AS builder

# Copy theme JAR
COPY --from=keycloakify_jar_builder /opt/app/dist_keycloak/*.jar /opt/keycloak/providers/

# Configure the database vendor and enable health and metrics endpoints.
ENV KC_DB=postgres
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# For demonstration purposes only. Use signed certificates in production!
WORKDIR /opt/keycloak

# Create the optimized configuration
RUN /opt/keycloak/bin/kc.sh build

# Defines the runtime container image
FROM quay.io/keycloak/keycloak:${KEYCLOAK_VERSION}

# Copy the configuration files from the builder image to this runtime image
COPY --from=builder /opt/keycloak/ /opt/keycloak/

# Set default values db pool/configs
ENV KC_DB=postgres
ENV KC_DB_POOL_INITIAL_SIZE=50
ENV KC_DB_POOL_MIN_SIZE=50
ENV KC_DB_POOL_MAX_SIZE=50
ENV QUARKUS_TRANSACTION_MANAGER_ENABLE_RECOVERY=true

# Default hostname value. This should be updated when deployed.
ENV KC_HOSTNAME="localhost"

# Default to enable listening on HTTP, and accept edge TLS termination. In
# other words we trust the load balancer in front of keycloak.
ENV KC_HTTP_ENABLED=true
ENV KC_PROXY=edge

# Use recommended production entrypoint
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start", "--optimized", "--import-realm"]
