<template>
  <div ref="myCharts" class="echart" style="width: 600px; height: 600px">
    图片内容
  </div>
</template>
<script>
import { option } from "../utils/radar-option";
import axios from "axios";
export default {
  name: "Radar",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    //base64转Blob
    convertBase64UrlToBlob(urlData) {
      //去掉url的头，并转换为byte
      var split = urlData.split(",");
      var bytes = window.atob(split[1]);
      //处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], { type: split[0] });
    },
    uploadImg(id, picUrl) {
      //步骤1:将base64位图片转为formData上传格式
      //let f = convertBase64UrlToBlob(picUrl); //data为裁剪后的base64位图片
      const fd = new FormData();
      fd.append("picUrl", picUrl);
      fd.append("id",id);
      //步骤2：通过ajax请求将formData传给服务器
      axios
        .post("http://localhost:9291/api/Upload/Charts", fd) //填写服务器的url
        .then((data) => {
          //注意这里的代码
          console.log(data.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    drawLine() {
      // debugger
      // 基于准备好的dom，初始化echarts实例
      var that = this;
      let myChart = this.$echarts.init(this.$refs.myCharts);
      // 绘制图表
      myChart.setOption(option);
      var snapshotImage = new Image();
      document.body.append(snapshotImage);
      myChart.on("finished", function () {
        // snapshotImage.src = myChart.getDataURL({
        //   pixelRatio: 2,
        //   backgroundColor: "#fff",
        // });
        var pic = myChart.getDataURL({
          pixelRatio: 2,
          backgroundColor: "#fff",
        });
        that.uploadImg(new Date().getTime(),pic);
      });
    },
  },
};
</script>