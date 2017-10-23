import axios from "axios"
import jsonp from '../assets/js/jsonp'
import {commonParams,options} from '../assets/js/config'

export function getBookTitle(id){
  const url="http://39.108.14.248:3333/titles"

  return axios.get(url,{
    params:{
      id:id
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getBookContent(book,id){
  const url="http://39.108.14.248:3333/book"

  return axios.get(url,{
    params:{
      book:book,
      id:id
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getBookList(){
  const url="http://39.108.14.248:3333/booklist"

  return axios.get(url).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getBookDetail(id){
  const url="http://39.108.14.248:3333/booklist"

  return axios.get(url,{
    params:{
      id:id
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getBookType(type){
  const url="http://39.108.14.248:3333/type"
  return axios.get(url,{
    params:{
      type:type
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function searchMovie(query,start,count){
  const url="https://api.douban.com/v2/movie/search"

  const data={
    q:query,
    start:start,
    count:count
  }

  return jsonp(url,data)
}

export function getMovie(urltype,count,start){
  const url=`https://api.douban.com/v2/movie/${urltype}`

  const data={
    count:count,
    start:start
  }

  return jsonp(url,data)
}

export function getMovieReviews(count,start){
  const url="https://api.douban.com/v2/movie/subject/1054395/reviews"

  const data={
    count:count,
    start:start
  }

  return jsonp(url)
}

export function getMovieDetail(id){
  const url=`https://api.douban.com/v2/movie/subject/${id}`

  return jsonp(url)
}

export function getStarCelebrity(id){
  const url=`https://api.douban.com/v2/movie/celebrity/${id}`

  return jsonp(url)
}

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

export function getRank(id){
  const url="https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg"

  const data=Object.assign({},commonParams,{
    topid:id,
    needNewCode:1,
    uin:0,
    tpl:3,
    page:'detail',
    type:'top'
  })
  return jsonp(url,data,options)
}

export function getSingerSong(id){
  const url="https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg"

  const data=Object.assign({},commonParams,{
    platform:'yqq',
    order:'listen',
    begin:0,
    num:80,
    songstatus:1,
    singermid:id
  })

  return jsonp(url,data,options)
}

export function getTopList(){
  const url="https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg"

  const data=Object.assign({},commonParams,{
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url,data,options)
}

export function search(query, page, zhida, perpage) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    perpage,
    n: perpage,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

export  function getInterests(id,count,start){
  const url= `api/${id}/interests`
  return axios.get(url,{
    params:{
      count:count,
      order_by:'hot',
      start:start,
      for_mobile:1,
      ck:''
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getTopicList(){
  return axios.get("http://139.196.32.78:3537/api/v1/topics").then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getCnodeTopics(tab,page){
  const url="https://cnodejs.org/api/v1/topics"
  return axios.get(url,{
    params:{
      tab:tab,
      mdrender:false,
      limit:20,
      page:page
    }
  }).then((res)=>{
     return Promise.resolve(res.data)
  })
}

export function getCnodeDetail(id){
  const url=`https://cnodejs.org/api/v1/topic/${id}?accesstoken=`

  return axios.get(url,{
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getNbaFocus(){
  const url="https://live.3g.qq.com/g/s?aid=action_api&module=nba&action=index_basic_new%2Cindex_live"

  return axios.get(url).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getNbaRank(){
  const url="https://live.3g.qq.com/g/s"

  return axios.get(url,{
    params:{
      aid:"action_api",
      module:"nba",
      action:"team_rank",
      rt:"w,e,d"
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getNbaStatistics(){
  const url="https://live.3g.qq.com/g/s"

  return axios.get(url,{
    params:{
      aid:"action_api",
      module:"nba",
      action:"player_top2"
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getNbaPlayer(id){
  const url="https://live.3g.qq.com/g/s"

  return axios.get(url,{
    params:{
      aid:"action_api",
      module:"nba",
      action:"player_detail",
      playerId:id
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getNbaPlayoff(){
  const url="https://live.3g.qq.com/g/s"

  return axios.get(url,{
    params:{
      aid:"action_api",
      module:"nba",
      action:"get_playoff_vs"
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getNbaImg(pageNo){
  const url="http://nb.3g.qq.com/nba/api/pic@getList"

  return axios.get(url,{
    params:{
      pic_pos:"sports_nbapp",
      pic_pageNo:pageNo,
      pic_pageSize:12,
      sid:""
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getNbaSchedule(md){
  const url="https://nb.3g.qq.com/nba/api/schedule@getList"

  return axios.get(url,{
    params:{
      md:md,
      sid:""
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getNbaVideo(){
  const url="https://nb.3g.qq.com/nba/api/video@getIndexData"

  return axios.get(url,{
    params:{
      useCircle:true
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getNbaCircle(hl_cid='q_11035040216_1446874992233390',nl_cid='q_11035040216_1446874992233390'){
  const url="https://nb.3g.qq.com/nba/api/community@getNewList,community@getHotList,community@getMyCircles,community@getSportsCircleList,community@getActivity"

  return axios.get(url,{
    params:{
      hl_cid:hl_cid,
      nl_cid:nl_cid,
      nl_count:10
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getNbaNewList(nl_count,nl_lid,nl_ltime){
  const url="https://nb.3g.qq.com/nba/api/community@getNewList"

  return axios.get(url,{
    params:{
      nl_cid:'q_11035040216_1446874992233390',
      nl_count:nl_count,
      nl_lid:nl_lid,
      nl_ltime:nl_ltime,
      sid:''
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getCircleTopInfo(circleId){
  const url = '/api/getCircleTopInfo'

  const data={
    circleId:circleId,
    _from:'015',
    ch:'01',
    ich:'',
    env:''
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getTeamDetail(teamId){
  const url="https://live.3g.qq.com/g/s"

  return axios.get(url,{
    params:{
      aid:'action_api',
      module:'nba',
      action:'team_detail',
      teamId:teamId,
      sid:''
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getTeamNews(teamId){
  const url="https://live.3g.qq.com/g/s"

  return axios.get(url,{
    params:{
      aid:'action_api',
      module:'nba',
      action:'team_news_new',
      tn_ids:teamId,
      tn_size:12
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getMonthListByTeam(teamId,month){
  const url="https://nb.3g.qq.com/nba/api/schedule@getMonthListByTeam"

  return axios.get(url,{
    params:{
      teamid:teamId,
      mouth:month,
      sid:""
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getNbaTeamPlayer(teamid){
  const url="https://live.3g.qq.com/g/s"

  return axios.get(url,{
    params:{
      aid:"action_api",
      module:"nba",
      action:"team_player",
      teamId:teamid
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getImgInfo(sportid){
  const url="https://yuetu.3g.qq.com/photo/s"

  return axios.get(url,{
    params:{
      aid:"action_api",
      module:"muti_photo",
      action:"photo_info",
      ii_newsid:sportid,
      ii_docid:""
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}
