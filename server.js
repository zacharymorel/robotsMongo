const express = require('express')
const mustacheExpress = require('mustache-express')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const bodyParser = require('body-parser')
const app = express()
let database

var url = 'mongodb://localhost:27017/robots'

app.engine('mustache', mustacheExpress())

app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const getAllRobots = callback => {
  let collection = database.collection('robots')
  // console.log(collection)
  collection.find({}).toArray(callback)
}

const getOneRobot = (id, callback) => {
  let collection = database.collection('robots')
  // console.log(id)
  collection.findOne({ id: id }, callback)
}
const getAllAvailbleHire = callback => {
  let collection = database.collection('robots')
  collection.find({ job: null }).toArray(callback)
}

MongoClient.connect(url, (err, db) => {
  assert.equal(null, err)
  database = db
  console.log('Successfully connected with mongo server.')

  getAllRobots((err, robots) => {
    console.log('success')
    // console.log({err, robots});
  })
})

app.get('/', (request, response) => {
  getAllRobots((err, robots) => {
    response.render('home', { robots: robots })
  })
})

app.get('/robots/:id', (request, response) => {
  let id = parseInt(request.params.id)
  getOneRobot(id, (err, robot) => {
    // console.log(robot)
    response.render('personal', robot)
    // Ask about this "robot" not an object, lately
  })
})

app.get('/availableforhire', (request, response) => {
  getAllAvailbleHire((err, robots) => {
    response.render('availableforhire', { robots: robots })
  })
})

app.listen(3000, () => {
  console.log('May the force be with you')
})
