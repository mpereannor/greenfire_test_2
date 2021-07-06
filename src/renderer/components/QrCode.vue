<template>
  <div ref="qrcode"></div>
</template>

<script>
import * as QRCode from "easyqrcodejs";

export default {
  mounted() {
    // Options
    var options = {
      text: "dea",
      width: 32,
      height: 32
    };

    // Create new QRCode Object
    new QRCode(this.$refs.qrcode, options);
  },
  methods: {
    btnClick() {},
  },
};
</script>

   

