<template>
  <div  class="far_box" >
    <div>显示内容：{{myText}}</div>
    <VueEmoji ref="emoji" :value="myText" @input="onInput" />
    <button @click="clearTextarea">清空</button>
  </div>
</template>
<script>
import VueEmoji from 'emoji-vue'
export default {
  name: "emoji",
  components:{
    VueEmoji
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      myText:'微信表情'
    };
  },
  mounted() {
    
  },
  methods: {
    onInput(event){
      this.myText=event.data
    },
    clearTextarea(){
      this.$refs.emoji.clear()
      this.myText=''
    }
  },
};
</script>
<style lang="scss" scope>
.far_box{
  height: 100vh;
  text-align: center;
}
</style>