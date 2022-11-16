/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load pack controller */
const packController = require(`../controllers/pack.controller`)

/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))

// /** load authorization from middleware */
// const authorization = require(`../middleware/authorization`)

/** create route for acces pack's data */
app.get("/", packController.showDataPack)

/** create route for show add pack view */
app.get("/add", packController.showAddPage)

/** create route for process of add new pack */
app.post("/add", packController.processInsert)

/** create route for show edit pack view */
app.get("/edit/:id", packController.showEditPage)

/** create route for process update pack */
app.post("/edit/:id", packController.processUpdate)

/** create route for process delete obat */
app.get("/delete/:id", packController.processDelete)

/** export object "app" to another file */
module.exports = app