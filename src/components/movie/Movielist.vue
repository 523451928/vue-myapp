<template>
  <div class="movie-list">
    <ul class="row items">
      <li class="item" v-for="(item,index) in list" @click="toDetail(item)">
        <div class="item-post">
          <img v-lazy="item.images.small" >
        </div>
        <span class="item-title">{{item.title}}</span>
        <star :score="item.rating.average" :showScore="true" :size="starSize"></star>
      </li>
    </ul>
  </div>
</template>

<script>
  import Star from '../../pubulic/Star.vue'
  export default{
    props:["list"],
    data(){
      return {
        starSize:"Small"
      }
    },
    methods:{
      toDetail(item){
        this.$router.push({
          path:`/movie/${item.id}`
        })

      }
    },
    components:{
      Star
    }
  }
</script>

<style scoped>

  .item-title{
    display: block;
    margin: .06rem 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }
  .items{
    white-space: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .item-post{
    width: 100%;
    min-height: 1.5rem;
    background: #f5f5f5;
  }
  .item-post img{
    width: 100%;
    box-shadow: 0 1px 3px rgba(0,0,0,.3)
  }
  .row {
    border-bottom: 1px solid #F2F2F2;
    padding: 15px 0 43px 0;
  }
  .item {
    display: inline-block;
    vertical-align: top;
    width: 27%;
    text-align: center;
    margin-left: 0.1rem;
  }

  .item:first-child {
    margin-left: .14rem;
  }

</style>
