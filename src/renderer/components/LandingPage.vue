<template>
  <div id="wrapper">
    <h2 id="mainHeader">Electron Portfolio</h2>
    <main>
      <div class="top-side">
        <div id="prices">
          <div id="fullname" class="title">Mpere Annor</div>
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
         <div class="doc">
          <div class="title">Live Twitter Feeds</div>
          <div class="feed">
          <div class="item">
            <timeline
              id="ethereum"
              sourceType="profile"
              :options="{ tweetLimit: '1' }"
            ></timeline>
          </div>
          <div class="item">
            <timeline
              id="BBCAfrica"
              sourceType="profile"
              :options="{ tweetLimit: '1' }"
            ></timeline>
          </div>
          </div>
        </div>
      </div>

      <div class="right-side">
       
      </div>

    </main>
      <div>
        <h3>Let's Keep in touch</h3>
        <ul>
          <li
            @click="open('https://github.com/mpereannor')"
          >
            <p>Github</p>
          </li>
          <li
            @click="open('https://www.linkedin.com/in/mpereannor/')"
          >
            <p>LinkedIn</p>
          </li>
          <li
            @click="open('mailto:mpereannor@gmail.com')"
          >
            <p>Email</p>
          </li>
          <li
            @click="open('https://drive.google.com/file/d/1Oi6Jjog2MGvCf5TOryp_D8cfa0miA0I-/view?usp=sharing')"
          >
            <p>Resume</p>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
const axios = require("axios");
import * as QRCode from "easyqrcodejs";
import { Timeline } from "vue-tweet-embed";

const axiosWithKey = axios.create({ 
        headers: { "x-messari-api-key": "3f8e7226-a33e-4208-a131-2224b858b119" },

})
export default {
  name: "landing-page",
  data() {
    return {
      tezPrice: "",
      tezSymbol: "XTZ",
      tezLogo: "",
      burstPrice: "",
      burstSymbol: "BURST",
      burstLogo: "",
      cardanoPrice: "",
      cardanoSymbol: "ADA",
      cardanoLogo: "",
    };
  },

  mounted() {
    var options = {
      text: this.tezPrice,
      width: 10,
      height: 10,
      logo: this.tezLogo
    };

    new QRCode(this.$refs.qrcode, options);

    var options1 = {
      text: this.burstPrice,
      width: 10,
      height: 10,
      logo: this.burstLogo
    };

    new QRCode(this.$refs.qrcode1, options1);

    var options2 = {
      text: this.cardanoPrice,
      width: 10,
      height: 10,
      logo: this.cardanoLogo
    };
    new QRCode(this.$refs.qrcode2, options2);

    var options3 = {
      text: "Mpere Annor",
      width: 8,
      height: 8,
    };

    new QRCode(this.$refs.qrcodename, options3);
  },
  created() {
    axios
      .all([
        axiosWithKey.get("https://data.messari.io/api/v1/assets/xtz/metrics"),
        axiosWithKey.get("https://data.messari.io/api/v1/assets/burst/metrics"),
        axiosWithKey.get("https://data.messari.io/api/v1/assets/ada/metrics"),
        axiosWithKey.get(
          "https://data.messari.io/api/v2/assets/xtz/profile"
        ),
        axiosWithKey.get(
          "https://data.messari.io/api/v2/assets/burst/profile"
        ),
        axiosWithKey.get(
          "https://data.messari.io/api/v2/assets/ada/profile"
        ),
      ])
      .then(
        axios.spread((res1, res2, res3, res4, res5, res6) => {
          console.log("newton", res1, res2, res3, res4, res5, res6);
          this.tezPrice =
            (Math.round(res1.data.data.market_data.price_usd * 100) / 100).toString();
          this.tezLogo = res4.data.data.profile.general.background.issuing_organizations['0'].logo;
          this.burstPrice =
            (Math.round(res2.data.data.market_data.price_usd * 100) / 100).toString();
          this.burstLogo = res5.data.data.profile.general.background.issuing_organizations['0'].logo;
          this.cardanoPrice =
            (Math.round(res3.data.data.market_data.price_usd * 100) / 100).toString();
          this.cardanoLogo = res6.data.data.profile.general.background.issuing_organizations['0'].logo;
        })
      )
      .catch((error) => {
        console.log(error);
      });
  },
  components: {
    timeline: Timeline,
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
  max-height: 100vh;
  padding: 15px 20px;
  max-width: 100vw;
}

#mainHeader { 
  text-align: center;
}
main {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  max-height: 80vh;
}

main > div {
  flex-basis: 50%;
}

#prices { 
  width: 50%;
}

.top-side { 
  display: flex;
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
.feed { 
  display: flex;
  max-height: 100%;
}

.doc { 
  width: 50%;
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

ul { 
  list-style-type: none;
}

ul:hover { 
  text-decoration: none;
  color: #4fc08d;
  cursor: pointer;
}

ul>li{ 
  display: inline-block;
}
</style>
