const express = require('express')
const mustacheExpress = require('mustache-express')
const MongoClient = require('mongodb').MongoClient, assert = require('assert')
const bodyParser = require('body-parser')
const app = express()
let database

var url = 'mongodb://localhost:27017/robots'


app.engine("mustache", mustacheExpress())

app.set("views", "./views")
app.set("view engine", "mustache")
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


const getAllRobots = (db, callback) => {
  let collection = db.collection("robots")
  collection.find({}).toArray((err, docs) => {
    // console.log({ err: docs })
    callback(err, docs)
  })
}

const getOneRobot = (db, id, callback) => {
  let collection = db.collection("robots")
  collection.findOne({id: id}) => {
    callback(err, robot)
    // Do I tell it to query for _id? And how does that match up to the url id?
  }
}

MongoClient.connect(url, (err, db) => {
  assert.equal(null, err)
  database = db
  console.log('Successfully connected with mongo server.')

    getAllRobots(db, (err, robots) => {
      console.log("success")
      // console.log({err, robots});
    })
})


app.get('/', (request, response) => {
  getAllRobots(database, (err, robots) => {
    response.render('home', {robots: robots})
  })
})

app.get('/robots/:id', (request, response) => {
  let id = parseInt(request.params.id)
  getOneRobot(database, id, (err, robot) => {
    response.render('personal', {robot: robot})
  })
})

app.listen(3000, () => {
  console.log('May the force be with you');
})
