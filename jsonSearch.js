const JSONPATH = './data/data.json'
const MATCHWORD = /お見事/gi

const fs = require('fs')

let json = JSON.parse(fs.readFileSync(JSONPATH,'utf8'))
let ans = []
for(let i=0;i<json.length;i++){
  if(json[i].text.match(MATCHWORD)){
    ans.push(json[i])
  }
}
fs.writeFileSync('./data/searchAns.json',JSON.stringify(ans),'utf8')