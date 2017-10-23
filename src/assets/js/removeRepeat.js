export function removeRepeat(json,id){
  var tem={},arr=[];
  for(var i=0;i<json.length;i++){
    if(!tem[json[i][id]]){
      arr.push(json[i]);
      tem[json[i][id]]=1;
    }
  }
  return arr;
}
export function removeRepeatArr(arr){
  for(var i=0;i<arr.length;i++){
    for(var j=i+1;j<arr.length;j++){
      if(arr[i]===arr[j]){
        arr.splice(j,1);
        j--;
      }
    }
  }
  return arr;
};
