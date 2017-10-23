<template>
  <transition name="slide">
    <musiclist :songs="songs" :title="title" :bgimg="bgimg" :isRank="false"></musiclist>
  </transition>
</template>

<script>
  import Musiclist from './MusicList.vue'
  import {getSingerSong} from '../../api/api'
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
      getSingerSong(this.$route.query.singermid).then((res)=>{
        this.title=res.data.singer_name
        this.bgimg=`https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.$route.query.singermid}.jpg?max_age=2592000`
        var ret=[]
        res.data.list.forEach((item)=>{
          ret.push(createSong(item.musicData))
        })
        this.songs=ret
      })
    }
  }
</script>

<style>

</style>
