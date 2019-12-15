// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {//这个api接口不好用
  return rp(`http://api.douban.com/v2/movie/subject/${event.movieid}?apikey=0df993c66c0c636e29ecbb5344252a4a`)
    .then(res=>{
      return res;
      console.log(event.movieid);
      console.log(res);
    })
    .catch(err=>{
      console.log(err);
    });
}