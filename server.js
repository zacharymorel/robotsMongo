const express = require('express')
const mustacheExpress = require('mustache-express')
const mongoDb = require('mongodb').MongoClient, assert = require('assert')
const bodyParser = require('body-parser')
const app = express()

app.set("views", "./views")
app.set("view engine", "mustache")
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var url = 'mongodb://localhost:27017/userMongoRobot'
mongoDb.connect(url, (err, db) => {
  assert.equal(null, err)
  console.log('Successfully connected with mongo server.')
})




app.listen(3000, () => {
  console.log('May the force be with you');
})
