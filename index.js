var getName = require('./get-name')
var serverMode = process.env.SERVER_MODE
if(serverMode) {
  require('./server.js')
} else {
  // Just convert the arg...
  var inputStr = process.argv[2]
  if(!inputStr) {
    console.log('No input string provided!')
    console.log('Usage: docker run --rm ponelat/swagger-names <input-string>')
    console.log('Or')
    console.log('Usage: docker run --rm -e "SERVER_MODE=1" ponelat/swagger-names')
    process.exit(1)
  }
  console.log(getName(inputStr))
}
