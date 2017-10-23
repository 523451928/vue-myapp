<template>
  <transition name="slide">
    <musiclist :songs="songs" :title="title" :bgimg="bgimg" :isRank="true"></musiclist>
  </transition>
</template>

<script>
  import Musiclist from './MusicList.vue'
  import {getRank} from '../../api/api'
  import {createSong} from '../../assets/js/song'
  export default{
    data(){
        return {
          songs:[],
          title:'',
          bgimg:''
        }
    },
    methods:{

    },
    components:{
        Musiclist
    },
    mounted(){
      this.$loading('加载中...')
      getRank(this.$route.query.rank).then((res)=>{
        this.title=res.topinfo.ListName
        this.bgimg=res.topinfo.pic_album
        this.$loading.close()
        var ret=[]
        res.songlist.forEach((item)=>{
            ret.push(createSong(item.data))
        })
        this.songs=ret
      })
    }
  }
</script>

<style>

</style>
