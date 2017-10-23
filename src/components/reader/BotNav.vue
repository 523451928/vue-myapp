<template>
  <div class="bot-nav">
    <ul>
      <li @click="showCatalog">
        <p><i class="iconfont icon-caidan"></i></p>
        目录
      </li>
      <li @click="toggleProgress" :class="{'active':proShow}">
        <p>
          <i class="iconfont icon-jindu"></i>
        </p>
        进度
      </li>
      <li @click="toggleFace" :class="{'active':faceShow}">
        <p>
          <i class="iconfont icon-icon-yxj-font"></i>
        </p>
        字体
      </li>
      <li @click="toggleType">
        <p>
          <i class="iconfont icon-yejian" :class="{'icon-baitian':isNight}"></i>
        </p>
        {{isNight?'白天':'夜间'}}
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default{
      data(){
          return {
            faceShow:false,
            proShow:false
          }
      },
      computed:{
        ...mapState([
            'isNight'
        ])
      },
      methods:{
        ...mapMutations([
            'setNight'
        ]),
        toggleProgress(){
          if(this.faceShow){
            this.faceShow=false
            this.$emit('toggleFace',this.faceShow)
          }
          this.proShow=!this.proShow
          this.$emit('toggleProgress',this.proShow)
        },
        showCatalog(){
            this.$emit('showCatalog')
        },
        toggleType(){
            this.setNight(!this.isNight)
        },
        toggleFace(){
          this.faceShow=!this.faceShow
          this.$emit('toggleFace',this.faceShow)
          if(this.proShow){
            this.proShow=false
            this.$emit('toggleProgress',this.proShow)
          }
        }
      }
  }
</script>

<style lang="less" type="text/less">
  .bot-nav{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 0.5rem;
    background: rgba(0,0,0,0.9);
    color: #fff;
    z-index: 10;
    ul{
      display: flex;
      height: 100%;
      li{
        flex: 1;
        position: relative;
        height: 100%;
        line-height: 300%;
        text-align: center;
        i{
          line-height: 100%;
          font-size: 0.16rem;
        }
        .icon-caidan{
          margin-left: 0;
        }
        p{
          text-align: center;
          position: relative;
          top:0.12rem;
          line-height: 100%;
        }
        .catalog-icon{
          /*background: url("../../assets/img/");*/
        }
      }
      .active{
        color: #f63;
      }
    }
  }
</style>
