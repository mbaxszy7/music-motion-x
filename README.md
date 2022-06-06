## App Architecture

---------- src

-------------- client: client revelant

-------------- server: client revelant

-------------- utils: app utils

-------------- components: page components

-------------- hooks: react hooks

-------------- interfaces: ts interfaces

-------------- pages: app pages

## production

- npm run build
- npm run build:start

## ssr development

- npm run dev:client
- npm run dev:server
- npm run dev:start

## csr development

- npm run dev:csr

## husky setup

- npx husky install
- chmod 700 .husky/prepare-commit-msg
- chmod 700 .husky/pre-commit
