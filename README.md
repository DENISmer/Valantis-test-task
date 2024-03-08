Hi! 
## Initially, a project was made according to [this article](https://habr.com/ru/articles/597389/), and also described in [this repository](https://github.com/eadenink/webpack-5-react-config) and [this](https://github.com/DENISmer/webpack5-react-config), but the configuration described in these links did not suit me for several reasons:

1. no TS support.
1. no support for scss modules.
1. and etc.

## This webpack5 configuration will allow you to use the following core technology stack:
1. React
1. TS
1. CSS
1. SCSS
1. SCSS modules
1. support for the following file extensions:
(png|jpe?g|gif|svg|webp|ico) and (woff2?|eot|ttf|otf)
1. and etc.

## All you need to use this config:

1. clone this repository
```
git clone https://github.com/DENISmer/webpack5-react-ts-config
```
2. installing dependencies
```
npm install
```
3. run the required script:
```js
    "start": "cross-env SERVE=true webpack serve --mode development" // run dev-server
    "docs": "webpack" // simple docs
    "docs-prod": "webpack --mode=production" // create production docs
    "local-deploy": "npx serve -s docs" // local deploying (if a docs was previously made)
    "deploy": "gh-pages -d docs" // deploying on gh-pages (if a docs was previously made)
    "clean": "rd /s /q docs" // clean the docs derictory
    "cb-dep": "npm run clean && npm run docs-prod && npm run deploy" // clean ./docs -> create production docs -> deploy on gh-pages
```
