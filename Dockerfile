FROM node:lts as base-docs
## Disable colour output from yarn to make logs easier to read.
ENV FORCE_COLOR=0
## Enable corepack.
RUN corepack enable
## Set the working directory to `/opt/docusaurus`.
WORKDIR /opt/docusaurus

# Stage 2b: Production build mode.
FROM base-docs as prod-docs
## Set the working directory to `/opt/docusaurus`.
WORKDIR /opt/docusaurus
## Copy over the source code.
COPY docs /opt/docusaurus/
## Install dependencies with `--frozen-lockfile` to ensure reproducibility.
RUN pnpm install --frozen-lockfile
## Build the static site.
RUN pnpm build

FROM node:18-alpine AS build

WORKDIR /app
COPY . .

ENV POCKETBASE_URL="https://lo-bzwu.ch"
RUN npm install
RUN npm run build


FROM alpine:latest

ARG PB_VERSION=0.23.12

RUN apk add --no-cache \
    unzip \
    ca-certificates

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

COPY ./pb_hooks /pb/pb_hooks
COPY --from=build /app/dist /pb/pb_public
COPY --from=prod-docs /opt/docusaurus/build /pb/pb_public/docs

EXPOSE 8080

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]
