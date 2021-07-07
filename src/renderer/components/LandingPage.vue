<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue" />
    <main>
      <div class="left-side">
        <div>
          <div class="title">Mpere Annor</div>
              <div ref="qrcodename"></div>
          <div class="items">
            <div class="item">
              <div class="name">Live Crypto Prices:</div>
            </div>
            <div class="item">
              <div class="name">Tezos:</div>
              <div class="value">{{ tezPrice }} {{ tezSymbol }}</div>
              <div ref="qrcode"></div>
            </div>
            <div class="item">
              <div class="name">Burst:</div>
              <div class="value">{{ burstPrice }} {{ burstSymbol }}</div>
              <div ref="qrcode1"></div>
            </div>
            <div class="item">
              <div class="name">Cardano:</div>
              <div class="value">{{ cardanoPrice }} {{ cardanoSymbol }}</div>
              <div ref="qrcode2"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="right-side">
        <div class="doc">
          <div class="title">Getting Started</div>
          <p>
            electron-vue comes packed with detailed documentation that covers
            everything from internal configurations, using the project
            structure, building your application, and so much more.
          </p>
          <button
            @click="
              open('https://simulatedgreg.gitbooks.io/electron-vue/content/')
            "
          >
            Read the Docs</button
          ><br /><br />
        </div>
        <div class="doc">
          <div class="title alt">Other Documentation</div>
          <button class="alt" @click="open('https://electron.atom.io/docs/')">
            Electron
          </button>
          <button class="alt" @click="open('https://vuejs.org/v2/guide/')">
            Vue.js
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
const axios = require("axios");
// const QrcodeVue = require('qrcode.vue')
// import QrcodeVue from 'qrcode.vue'
// import QrCode from './QrCode.vue';
import * as QRCode from "easyqrcodejs";

export default {
  name: "landing-page",
  data() {
    return {
      tezPrice: "Current Tezos price loading...",
      tezSymbol: "XTZ",
      burstPrice: "Current Burst price loading...",
      burstSymbol: "BURST",
      cardanoPrice: "Current Cardano price loading...",
      cardanoSymbol: "ADA",
    };
  },

  mounted() {
    var options = {
      text: this.tezPrice,
      width: 8,
      height: 8,
      }

    new QRCode(this.$refs.qrcode, options);

    var options1 = { 
      text: this.burstPrice,
      width: 8,
      height: 8

logo: }

    new QRCode(this.$refs.qrcode1, options1);

    var options2 = { 
      text: this.cardanoPrice,
      width: 8,
      height: 8

logo: }
    new QRCode(this.$refs.qrcode2, options2)

  var options3 = { 
      text: 'Mpere Annor',
      width: 8,
      height: 8
    }
  
  new QRCode(this.$refs.qrcodename, options3)
  
  
  },
  created() {
    axios
      .all([
        axios.get("https://data.messari.io/api/v1/assets/xtz/metrics"),
        axios.get("https://data.messari.io/api/v1/assets/burst/metrics"),
        axios.get("https://data.messari.io/api/v1/assets/ada/metrics"),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          console.log("newton", res1, res2, res3);
          this.tezPrice =
            Math.round(res1.data.data.market_data.price_usd * 100) / 100;
          this.tezSymbol = res1.data.data.symbol;
          this.burstPrice =
            Math.round(res2.data.data.market_data.price_usd * 100) / 100;
          this.burstSymbol = res2.data.data.symbol;
          this.cardanoPrice =
            Math.round(res3.data.data.market_data.price_usd * 100) / 100;
          this.cardanoSymbol = res3.data.data.symbol;
        })
      )
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    btnClick() {},
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}

.title {
  color: #888;
  font-size: 18px;
  font-weight: initial;
  letter-spacing: 0.25px;
  margin-top: 10px;
}

.items {
  margin-top: 8px;
}

.item {
  display: flex;
  margin-bottom: 6px;
}

.item .name {
  color: #6a6a6a;
  margin-right: 6px;
}

.item .value {
  color: #35495e;
  font-weight: bold;
}
</style>
