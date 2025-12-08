# Architecture configuration - defaults to host architecture
ARCH ?= amd64

IMAGE_VERSION ?= latest
IMAGENAME ?= keycloak-custom-theme
REGISTRY ?= ghcr.io/cloakwise-io
IMAGE_TAG = $(REGISTRY)/$(IMAGENAME):$(IMAGE_VERSION)
IMAGE_TAG_LATEST = $(REGISTRY)/$(IMAGENAME):latest
KEYCLOAK_VERSION ?= 26.4.7

.PHONY: local-build-push
local-build-push:
	docker build -t $(LOCAL_USER)/keycloak-custom-theme:latest \
		--build-arg KEYCLOAK_VERSION=$(KEYCLOAK_VERSION) .
	docker push $(LOCAL_USER)/keycloak-custom-theme:latest

.PHONY: container-build
container-build:
	docker buildx build --pull --load \
		--platform linux/$(ARCH) \
		--provenance=false --sbom=false \
		-t $(IMAGE_TAG) \
		--build-arg KEYCLOAK_VERSION=$(KEYCLOAK_VERSION) .

.PHONY: container-build-multiarch
container-build-multiarch:
	docker buildx build --pull --output=type=image \
		--platform linux/amd64,linux/arm64 \
		--provenance=false --sbom=false \
		-t $(IMAGE_TAG) \
		--build-arg KEYCLOAK_VERSION=$(KEYCLOAK_VERSION) .

.PHONY: container
container:
	@MULTIARCH_VALUE=$${MULTIARCH:-true}; \
	if [ "$$MULTIARCH_VALUE" = "true" ]; then \
		echo "🏗️ Building multi-architecture image (default)..."; \
	else \
		echo "🏗️ Building single-architecture image..."; \
	fi; \
	docker buildx rm container-builder || true; \
	docker buildx create --use --name=container-builder; \
	# enable qemu for arm64 build
	docker run --privileged --rm tonistiigi/binfmt --uninstall qemu-aarch64; \
	docker run --rm --privileged tonistiigi/binfmt --install all; \
	if [ "$$MULTIARCH_VALUE" = "true" ]; then \
		$(MAKE) container-build-multiarch; \
	else \
		$(MAKE) container-build; \
	fi

.PHONY: push
push:
	docker push $(IMAGE_TAG)

.PHONY: push-latest
push-latest:
	docker tag $(IMAGE_TAG) $(IMAGE_TAG_LATEST)
	docker push $(IMAGE_TAG_LATEST)
