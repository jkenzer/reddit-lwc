# Reddit Client using the Lightning Web Components Open Source

Using [lighting base components](https://www.npmjs.com/package/lightning-base-components) with [LWC OSS](https://lwc.dev/) to create a reddit client. This is just to stay familiar with and see what can be done with LWC OSS.

Using a custom wire adapter based on [subrajp's repo](https://github.com/surajp/lwc-oss-wire)

## Todo

-   [ ] Set default sub-reddit in ENV var
-   [ ] Add pagination

## How to start?

-   Clone this repo
-   Start simple by running `yarn watch` (or `npm run watch`, if you set up the project with `npm`). This will start the project with a local development server.

The source files are located in the [`src`](./src) folder. All web components are within the [`src/client/modules`](./src/modules) folder. The folder hierarchy also represents the naming structure of the web components. The entry file for the custom Express configuration can be found in the ['src/server'](./src/server) folder.

Find more information on the main repo on [GitHub](https://github.com/muenzpraeger/create-lwc-app).
