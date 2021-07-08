# MpereAnnor.ElectronPortfolio

> A 'Hello World' ElectronJS application using VueJS and NodeJS

#### Operating System
Windows 10 x64

#### Node Version
14.16
#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8d4ed60](https://github.com/SimulatedGREG/electron-vue/tree/8d4ed607d65300381a8f47d97923eb07832b1a9a) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).


#### LIMITATIONS AND CHALLENGES


##### SCREENSHOT AND SAVE FUNCTIONALITY
one major challenge i faced was trying to get the default methods of `BrowserWindow` ie `webContents.getAllWebContents()` to work inside the `LandingPage.vue` component due to the fact that such a component can only accept a remote extension of `BrowserWindow`.

I am very certain a solution can be found in the electron documentation.


##### UNRELIABLE MESSARI CRYPTO API
i opted for the messaricrypto.io api since is free to use and has a myriad of data on all cryptocurrencies.

However, due to the poor design and unresponsive data. It's quite difficult to synchronously display the prices of all three currencies, as well as their corresponding QR Codes.

Hopefully, I paid service such as CoinMarketCap api can be used. Moreover employing a loading mechanisms into `LandingPage.vue` component lifecycle might do the trick.