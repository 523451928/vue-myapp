<template>
  <div class="song-list">
    <ul>
      <li class="list" v-for="(song,index) in songList" @click="selectSong(song,index,true)">
        <div class="rank" v-if="isRank">
          {{index+1}}
        </div>
        <div>
          <h2> {{song.name}}</h2>
          <p>{{song.singer}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapActions,mapMutations} from  "vuex"
  export default{
      props:{
        songList:{
          type:Array,
          default:[]
        },
        isRank:{
          type:Boolean,
          default:false
        }
      },
      methods:{
        ...mapActions([
            "selectPlay"
        ]),
        ...mapMutations([
            'setPlayerShow','setCurrentIndex'
        ]),
        selectSong(item,index,flag){
            this.setPlayerShow(true)
            this.setCurrentIndex(0)
            this.selectPlay({
              item,
              index,
              flag
            })
        }
      }
  }
</script>

<style scoped>
  ul{
    padding-left: 0;
  }
  .list{
    padding: 0 0.2rem;
    display: flex;
    height: 0.6rem;
  }
  .rank{
    color: #ffc107;
    width: 0.4rem;
    line-height: 0.6rem;
    margin-left: 0.02rem;
  }
  .list h2{
    font-weight: normal;
    line-height: 0.26rem;
    margin-top: 0.04rem;
    height: 0.26rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .list p{
    line-height: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 0.2rem;
    color: #ccc;
  }
</style>
