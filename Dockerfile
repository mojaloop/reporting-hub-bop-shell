# First part, build the app
FROM node:lts-alpine as builder
LABEL stage=reporting-hub-bop-shell-builder

USER root
WORKDIR /opt/reporting-hub-bop-shell

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen-lockfile

COPY . .

# Provide environment build variables for setting endpoints dynamically
# TODO: figure out how we are hosting the api to return remote urls
#       figure out kratos auth
ARG PUBLIC_PATH
ENV PUBLIC_PATH=$PUBLIC_PATH

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

ARG REACT_APP_AUTH_ENABLED
ENV REACT_APP_AUTH_ENABLED=$REACT_APP_AUTH_ENABLED

ARG REACT_APP_MOCK_API
ENV REACT_APP_MOCK_API=$REACT_APP_MOCK_API

ARG REMOTE_1_URL
ENV REMOTE_1_URL=$REMOTE_1_URL

ARG REMOTE_2_URL
ENV REMOTE_2_URL=$REMOTE_2_URL

# RUN yarn build
RUN yarn build

FROM node:lts-alpine
WORKDIR /opt/reporting-hub-bop-shell

# Create empty log file & link stdout to the application log file
RUN mkdir ./logs && touch ./logs/combined.log
RUN ln -sf /dev/stdout ./logs/combined.log

# Create a non-root user: shell-user
RUN adduser -D shell-user
USER shell-user

COPY --chown=shell-user --from=builder /opt/reporting-hub-bop-shell .

EXPOSE 3010
CMD ["npm", "run", "serve"]
