export function lastTime(val){

  var date=typeof(val)=='string'?new Date(val).getTime():typeof(val)=='number'?new Date(val).getTime():val
  var now=new Date().getTime()
  var disTime=typeof(val)=='string'?(now-date)/1000/60:typeof(val)=='number'?(now-date)/1000/60:(now-date/1000)/1000/60

  if(disTime<60){
    return Math.ceil(disTime)+"分钟前"
  }else if(disTime>60&&disTime<1440){
    return Math.ceil(disTime/60)+"小时前"
  }else if(disTime>1440&&disTime<43200){
    return Math.ceil(disTime/60/24)+"天前"
  }else{
    return Math.ceil(disTime/60/24/31)+"个月前"
  }
}
