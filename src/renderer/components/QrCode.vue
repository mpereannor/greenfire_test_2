<template>
  <div ref="qrcode"></div>
</template>

<script>
import * as QRCode from "easyqrcodejs";

export default {
  mounted() {
    // Options
    var options = {
      props: {
        text: String,
      width: Number,
      height: Number,
      },
    };
  

    // Create new QRCode Object
    new QRCode(this.$refs.qrcode, options);
  },
  methods: {
    btnClick() {},
  },
};
</script>

   

