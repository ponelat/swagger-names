// content of index.js
const http = require('http')
const port = process.env.PORT || 3000
const getName = require('./get-name')

const requestHandler = (req, res) => {
  var str = req.url.slice(1)
  var name = getName(str)
  console.log(`${str} = ${name}`)
  res.end(name)
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
