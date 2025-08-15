SHELL := /bin/bash
ROOT := $(abspath ..)
NS := microservices

.PHONY: help
help:
	@echo "Targets:"
	@echo "  deps         Install npm deps for all services"
	@echo "  build-img    Build Docker images for local cluster"
	@echo "  k8s-apply    Apply K8s manifests"
	@echo "  up           One command: deps + build-img + k8s-apply + port-forward"
	@echo "  down         Delete namespace"
	@echo "  pf           Port-forward gateway to localhost:8080"


.PHONY: deps
deps:
	cd $(ROOT)/product-service && npm ci --no-audit --no-fund
	cd $(ROOT)/order-service && npm ci --no-audit --no-fund
	
	cd $(ROOT)/admin-web && (npm ci --no-audit --no-fund || npm install --no-audit --no-fund)

.PHONY: minikube
minikube:
	@command -v minikube >/dev/null 2>&1 || (echo "minikube not found; attempting to install via Homebrew..." && command -v brew >/dev/null 2>&1 && brew install minikube || (echo "Please install minikube: https://minikube.sigs.k8s.io/docs/start/" && exit 1))
	@command -v kubectl >/dev/null 2>&1 || (echo "kubectl not found; attempting to install via Homebrew..." && command -v brew >/dev/null 2>&1 && brew install kubernetes-cli || (echo "Please install kubectl: https://kubernetes.io/docs/tasks/tools/" && exit 1))
	@minikube status >/dev/null 2>&1 || minikube start --driver=docker

.PHONY: build-img
build-img: minikube
	
	eval $$(minikube docker-env) && \
	  docker build -t product-service:local $(ROOT)/product-service && \
	  docker build -t order-service:local $(ROOT)/order-service && \
	  docker build -t admin-web:local $(ROOT)/admin-web

.PHONY: k8s-apply
k8s-apply:
	kubectl apply -k $(ROOT)/infra/k8s

.PHONY: up
up: deps build-img k8s-apply pf

.PHONY: down
down:
	kubectl delete namespace $(NS) --ignore-not-found

.PHONY: pf
pf:
	
	@echo "Port-forwarding api-gateway to http://localhost:8080 ... (Ctrl+C to stop)"
	kubectl -n $(NS) port-forward svc/api-gateway 8080:80

.PHONY: status
status:
	kubectl -n $(NS) get pods -o wide
	kubectl -n $(NS) get svc -o wide




