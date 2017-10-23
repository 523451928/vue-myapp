import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {removeRepeat} from '../assets/js/removeRepeat'
const store=new Vuex.Store({
  state:{
    maskShow:false,
    musicList:[],
    playing:false,
    playType:0,
    currentIndex:0,
    changeIndex:true,
    autoPlay:false,
    playerShow:false,
    timeSwitch:false,
    bg_color:0,
    isNight:false,
    isContinue:false
  },
  mutations:{
    setContinue(state,flag){
      state.isContinue=flag
    },
    setNight(state,flag){
      state.isNight=flag
    },
    setBgColor(state,num){
      state.bg_color=num
    },
    setAutoPlay(state,flag){
      state.autoPlay=flag
    },
    setTimeSwitch(state,flag){
      state.timeSwitch=flag
    },
    setChangeIndex(state,flag){
      state.changeIndex=flag
    },
    setMusiclist(state,item){
      state.musicList.unshift(item)
      state.musicList=removeRepeat(state.musicList,'id')
    },
    setMusiclists(state,list){
      state.musicList= state.musicList.concat(list)
      state.musicList=removeRepeat(state.musicList,'id')
    },
    delSong(state,index){
      if(index<state.currentIndex || index==state.musicList.length-1&&state.currentIndex==index){
        state.currentIndex--
      }
      if(window.localStorage.getItem('likeSongs')!=null){
        var arr=JSON.parse(window.localStorage.getItem('likeSongs'))
        var song=state.musicList[index]
        for(var i=0;i<arr.length;i++){
          if(song.id==arr[i].id){
            arr.splice(i,1)
          }
        }
        window.localStorage.setItem('likeSongs',JSON.stringify(arr))
      }
      state.musicList.splice(index,1)

    },
    clearMusicList(state){
      state.musicList=[]
      window.localStorage.setItem('likeSongs',JSON.stringify(state.musicList))
    },
    setPlaying(state,flag){
      state.playing=flag
    },
    setCurrentIndex(state,index){
      state.currentIndex=index
    },
    setMaskShow(state,bol){
      state.maskShow=bol
    },
    setPlayerShow(state,bol){
      state.playerShow=bol
    }
  },
  actions:{
    selectPlay({commit, state}, {item, index,flag}){
      commit('setMusiclist',item)
      commit('setPlaying',true)
      commit('setChangeIndex',flag)
      commit('setAutoPlay',true)
    }
  }
})

export default store
