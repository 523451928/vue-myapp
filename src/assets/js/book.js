export default class Book{
  constructor({id,name,imgurl}){
    this.id=id
    this.name=name
    this.imgurl=imgurl
    this.readTime=new Date().getTime()
  }
}
