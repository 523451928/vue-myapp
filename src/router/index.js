import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home'
// import Music from '@/components/Music'
// import Rank from '@/components/music/Rank'
// import Singer from '@/components/music/Singer'
// import Read from '@/components/Read'
// import Movie from '@/components/Movie'
// import Movies from '@/components/movie/Movies'
// import Celebrity from '@/components/movie/Celebrity'
// import Moviedetail from '@/components/movie/Detail'
// import HomeDetail from '@/components/home/Detail'
// import Nba from '@/components/Nba'
// import Nbarank from '@/components/nba/Rank'
// import Focus from '@/components/nba/Focus'
// import Playoff from '@/components/nba/Playoff'
// import Image from '@/components/nba/Image'
// import Imageinfo from '@/components/nba/image/Imageinfo'
// import Schedule from '@/components/nba/Schedule'
// import Statistics from '@/components/nba/Statistics'
// import Player from '@/components/nba/player/Player'
// import Video from '@/components/nba/Video'
// import Circle from '@/components/nba/Circle'
// import Circledetail from '@/components/nba/circle/CircleDetail'
// import Team from '@/components/nba/Team'

const Home = resolve => require(['@/components/Home'], resolve)
const Reader =resolve => require(['@/components/Reader'],resolve)
const Category =resolve => require(['@/components/reader/Category'],resolve)
const Bookdetail =resolve => require(['@/components/reader/Bookdetail'],resolve)
const Bookshelf =resolve =>require(['@/components/reader/Bookshelf'],resolve)
const Reading =resolve => require(['@/components/reader/Reading'],resolve)
const Music = resolve => require(['@/components/Music'], resolve)
const Rank = resolve => require(['@/components/music/Rank'], resolve)
const Singer = resolve => require(['@/components/music/Singer'], resolve)
const Read = resolve => require(['@/components/Read'], resolve)
const Movie = resolve => require(['@/components/Movie'], resolve)
const Movies = resolve => require(['@/components/movie/Movies'], resolve)
const Celebrity = resolve => require(['@/components/movie/Celebrity'], resolve)
const Moviedetail = resolve => require(['@/components/movie/Detail'], resolve)
const HomeDetail = resolve => require(['@/components/home/Detail'], resolve)
const Nba = resolve => require(['@/components/Nba'], resolve)
const Nbarank = resolve => require(['@/components/nba/Rank'], resolve)
const Focus = resolve => require(['@/components/nba/Focus'], resolve)
const Playoff = resolve => require(['@/components/nba/Playoff'], resolve)
const Image = resolve => require(['@/components/nba/Image'], resolve)
const Imageinfo = resolve => require(['@/components/nba/image/Imageinfo'], resolve)
const Schedule = resolve => require(['@/components/nba/Schedule'], resolve)
const Statistics = resolve => require(['@/components/nba/Statistics'], resolve)
const Player = resolve => require(['@/components/nba/player/Player'], resolve)
const Video = resolve => require(['@/components/nba/Video'], resolve)
const Circle = resolve => require(['@/components/nba/Circle'], resolve)
const Circledetail = resolve => require(['@/components/nba/circle/CircleDetail'], resolve)
const Team = resolve => require(['@/components/nba/Team'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/reader'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: ':id',
          component: HomeDetail
        }
      ]
    },
    {
      path: '/read',
      name: 'Read',
      component: Read
    },
    {
      path:'/reader',
      name:'Reader',
      component:Reader,
      children:[
        {
          path:"/reader/bookdetail",
          component:Bookdetail
        },
        {
          path:"/reader/reading",
          component:Reading
        },
        {
          path:"/reader/bookshelf",
          component:Bookshelf
        },
        {
          path:":id",
          component:Category
        }
      ]
    },
    {
      path: '/movie',
      name: 'Movie',
      component: Movie,
      children:[
        {
          path:"/movie/more",
          component:Movies
        },
        {
          path:"/movie/celebrity",
          component:Celebrity
        },
        {
          path:":id",
          component:Moviedetail
        }
      ]
    },
    {
      path: '/nba',
      name: 'Nba',
      component: Nba,
      children:[
        {
          path:"/nba/rank",
          component:Nbarank
        },
        {
          path:"/nba/focus",
          component:Focus
        },
        {
          path:"/nba/playoff",
          component:Playoff
        },
        {
          path:"/nba/video",
          component:Video
        },
        {
          path:"/nba/circle",
          component:Circle,
          children:[
            {
              path:":id",
              component:Circledetail
            }
          ]
        },
        {
          path:"/nba/statistics",
          component:Statistics,
          children:[
            {
              path:":id",
              component:Player
            }
          ]
        },
        {
          path:"/nba/schedule",
          component:Schedule
        },
        {
          path:"/nba/image",
          component:Image,
          children:[
            {
              path:":id",
              component:Imageinfo
            }
          ]
        },
        {
          path:"/nba/cavaliers",
          component:Team
        },
        {
          path:"/nba/warriors",
          component:Team,
          children:[
            {
              path:":id",
              component:Player
            }
          ]
        },
        {
          path:"/nba/spurs",
          component:Team
        }
      ]
    },
    {
      path: '/music',
      name: 'Music',
      component: Music,
      children:[
        {
          path:"/music/rank",
          component:Rank
        },
        {
          path:"/music/singer",
          component:Singer
        }
      ]
    }
  ]
})
