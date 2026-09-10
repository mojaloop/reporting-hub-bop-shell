ARG NODE_VERSION=24.19.0-alpine3.24
ARG NGINX_VERSION=1.31.3-alpine

FROM node:${NODE_VERSION} AS builder
WORKDIR /opt/reporting-hub-bop-shell
ENV PATH=/opt/reporting-hub-bop-shell/node_modules/.bin:$PATH

COPY package.json /opt/reporting-hub-bop-shell/
COPY yarn.lock /opt/reporting-hub-bop-shell/
RUN yarn --frozen-lockfile

COPY ./ /opt/reporting-hub-bop-shell/

# Adds the package version and commit hash
ARG REACT_APP_VERSION
ENV REACT_APP_VERSION=$REACT_APP_VERSION

ARG REACT_APP_COMMIT
ENV REACT_APP_COMMIT=$REACT_APP_COMMIT

# Build production application files
RUN yarn build

# Second part, serve the built files. config.json and remotes.json are supplied
# by the deployment
ARG NGINX_VERSION
FROM nginx:${NGINX_VERSION}

# Create user with uid 1001. Mojaloop helm templates default to uid 1001 for
# running containers as non-root for better security
RUN addgroup -g 1001 appuser && \
    adduser -S -u 1001 -g appuser appuser

# Give user permission to clean up ngnix configuration files
RUN chown -R appuser:appuser /etc/nginx
WORKDIR /usr/share/nginx/html

# Copy build over from builder
COPY --from=builder /opt/reporting-hub-bop-shell/dist/ /usr/share/nginx/html

# The document the platform composes this service's authorization from, at the
# path a deployment names it by
COPY --from=builder /opt/reporting-hub-bop-shell/src/api /opt/app/src/api

# Remove nginx config
RUN rm /etc/nginx/conf.d/default.conf /etc/nginx/nginx.conf

# Copy over local config
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Give appuser permissions to nginx
RUN chown -R appuser:appuser \
    /usr/share/nginx \
    /var/cache/nginx \
    /var/run/

USER appuser
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
# TODO: Need to add 8080 to image-scan whitelist
#       Investigate Feed data unavailable, cannot perform CVE scan for distro: alpine:3.14.2
