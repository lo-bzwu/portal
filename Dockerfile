FROM node:18-alpine AS build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build


FROM alpine:latest

ARG PB_VERSION=0.21.1

RUN apk add --no-cache \
    unzip \
    ca-certificates

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

COPY ./pb_hooks /pb/pb_hooks
COPY --from=build /app/dist /pb/pb_public

EXPOSE 8080

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]