<template>
  <div class="search-list">
    <b-scroll :data="resultArr" :pullup="true" @scrollToEnd="searchMore">
      <div>
        <ul>
          <div class="singer" v-if="singer.singername" @click="toSinger(singer)">
            <i></i>{{singer.singername}}
          </div>
          <li v-for="(item,index) in resultArr" v-if="item.name" @click="selectItem(item)">
            <i></i> <span>{{item.name}}</span> -{{item.singer}}
          </li>
        </ul>
        <slot></slot>
      </div>
    </b-scroll>
  </div>
</template>

<script>
  import BScroll from '../../pubulic/Bscroll.vue'
  import {mapMutations} from 'vuex'
  import {removeRepeatArr} from '../../assets/js/removeRepeat'
  export default{
    props:[
        'resultArr','query','historyArr'
    ],
    data(){
      return {

      }
    },
    computed:{
      singer(){
        if(this.resultArr[0] && this.resultArr[0].singername){
          return this.resultArr[0]
        }else{
          return {}
        }
      }
    },
    methods:{
      ...mapMutations([
          'setMusiclist','setCurrentIndex','setPlayerShow','setAutoPlay'
      ]),
      searchMore(){
        this.$emit('searchMore')
      },
      selectItem(item){
        this.jionHistory()
        this.setMusiclist(item)
        this.setCurrentIndex(0)
        this.setPlayerShow(true)
        this.setAutoPlay(true)
      },
      toSinger(item){
        this.jionHistory()
        this.$router.push({
          path:"/music/singer",
          query:{'singermid':item.singermid}
        })
      },
      jionHistory(){
        this.historyArr.unshift(this.query)
        this.historyArr=removeRepeatArr(this.historyArr)
        this.$emit("updateHistory",this.historyArr)
        window.localStorage.setItem("historyQuery",JSON.stringify(this.historyArr))
      },
    },
    components:{
      BScroll
    },
    mounted(){
    }
  }
</script>

<style scoped>
  .search-list{
    background: -webkit-linear-gradient(30deg,#737373,#333,#666);
    min-height: 5.7rem;
    color: #ccc;
  }
  .search-list .singer{
    color: #f5f5f5;
    position: relative;
  }
  .singer i{
    display: inline-block;
    width: 0.18rem;
    height: 0.18rem;
    background: url("../../assets/img/my1.png");
    background-size: contain;
    position: relative;
    top:0.04rem;
    margin-right: 0.1rem;
  }
  .search-list li{
    position: relative;
    overflow: hidden;
    height: 0.34rem;
    text-overflow: ellipsis;
  }
  .search-list li i{
    display: inline-block;
    width: 0.16rem;
    height: 0.16rem;
    background: url("../../assets/img/music1.png");
    background-size: contain;
    position: relative;
    top:0.04rem;
    margin-right: 0.04rem;
  }
  .search-list li span{
    color: #f5f5f5;
  }
  ul{
    padding-left: 0.2rem;
    line-height: 0.32rem;
  }
</style>
