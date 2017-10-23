<template>
  <div class="top-nav-pannel font-container" id="font-container" >
    <!--<div class="child-mod">-->
      <!--<span>字号</span>-->
      <!--<button id="large-font" class="spe-button" @click="add">-->
        <!--大-->
      <!--</button>-->
      <!--<button id="small-font" class="spe-button" @click="sub" style="margin-left:10px;">-->
        <!--小-->
      <!--</button>-->
    <!--</div>-->
    <mt-range
      v-model="fontValue"
      :min="12"
      :max="30"
      :step="2"
      :bar-height="2" ref="range">
      <div slot="start">12</div>
      <div slot="end">30</div>
    </mt-range>
    <div class="font-box">字体大小{{fontValue}}px</div>
    <div class="child-mod" id="bk-container">
      <span>背景</span>
      <div class="bk-container" :class="{'bk-container-current': i==bg_color}" v-for="(n,i) in 6">
        <div class="color_btn" @click="changeColor(i)"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState,mapMutations} from 'vuex'

  export default {
    computed: {
      ...mapState([
         'bg_color'
      ])
    },
    data(){
        return {
          fontValue:14
        }
    },
    methods: {
      ...mapMutations([
          'setBgColor'
      ]),
      changeColor(index) {
        this.setBgColor(index)
        window.localStorage.setItem('bg-color',index)
      },
      add() {
        this.$emit('addFont')
      },
      sub() {
        this.$emit('subFont')
      }
    },
    watch:{
        fontValue(val){
          this.$emit('rangeFont',val)
        }
    },
    mounted(){
      if(this.$refs.range.$el){
        this.$refs.range.$el.addEventListener('drag',function(e){
          e.stopPropagation();
        })
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .top-nav-pannel {
    position: fixed;
    bottom:  0.5rem;
    height: 135px;
    background: none;
    width: 100%;
    color: #fff;
    font-size: 14px;
    background: -webkit-linear-gradient(60deg,#737373,#333,#666);
    z-index: 9;
    button {
      background: none;
      border: 1px #8c8c8c solid;
      padding: 5px 40px;
      color: #fff;
      display: inline-block;
      border-radius: 16px;
      &:focus {
        outline:none;
      }
    }
    .child-mod {
      padding: 5px 20px;
      margin-top: 15px;
      & > span:first-child {
        margin-right: 20px;
      }
    }
    .font-box{
      font-size: 12px;
      color: #f5f5f5;
      text-align: center;
    }
    .mt-range{
      padding: 0.1rem;
    }
    .bk-container {
      position: relative;
      height: 30px;
      width: 30px;
      background: #fff;
      border-radius: 15px;
      display: inline-block;
      vertical-align: -14px;
      margin-left: 10px;

      .color_btn {
        height: 30px;
        width: 30px;
        border-radius: 15px;
        box-sizing: border-box;
        border:1px solid #fff;
      }
    }
    .bk-container-current {
      height: 30px;
      width: 30px;
      border-radius: 16px;
      border: 1px #f63 solid;
    }
    .bac(@color) {
      background-color: @color;
    }
    .bk-container:nth-child(2) .color_btn {
      .bac(#e9dfc7);
    }
    .bk-container:nth-child(3) .color_btn {
      .bac(#e7eee5);
    }
    .bk-container:nth-child(4) .color_btn {
      .bac(#a4a4a4);
    }
    .bk-container:nth-child(5) .color_btn {
      .bac(#cdefcd);
    }
    .bk-container:nth-child(6) .color_btn {
      .bac(#283548);
    }
    .bk-container:nth-child(7) .color_btn {
      .bac(#0f1410);
    }
  }
</style>
