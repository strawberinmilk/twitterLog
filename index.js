//起動時の第一引数にid_str、第二引数にmax_id(省略可)を入れると動くよ

const fs = require("fs")
const twitterModule = require("twitter");
require('dotenv').config();
const twitter = new twitterModule({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});

twitter.get("account/verify_credentials", function (error, data) {
  mydata = JSON.stringify(data);
  mydata = JSON.parse(mydata);
  console.log("認証アカウント");
  console.log("@" + mydata.screen_name);
  console.log(mydata.name);
  console.log("\n");
  request()
})
let json = []
let max_id = process.argv[3] ? process.argv[3] : 2000000000000000000
console.log(max_id)
const request = ()=>{
  twitter.get("statuses/user_timeline",
  {
    screen_name : process.argv[2],
    count :200,
    trim_user :true,
    max_id : max_id
  },
  function (error, data) {
    console.log(data.length)
    if(error){
      console.log(error)
      //process.exit()
    }
    for(let i=0;i<data.length;i++){
      json.push({
        "created_at" : data[i].created_at,
        "id_str" : data[i].id_str,
        "text" : data[i].text
      })
    }
    if(max_id === data[data.length-1].id_str) process.exit(0)
    max_id = data[data.length-1].id_str
    fs.writeFileSync("./data/data.json",JSON.stringify(json),"utf8")
    request()

  })
}
