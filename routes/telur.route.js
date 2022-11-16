/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load telur controller */
const telurController = require(`../controllers/telur.controller`)

/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))

// /** load authorization from middleware */
// const authorization = require(`../middleware/authorization`)

/** create route for access telur's data */
app.get("/", telurController.showDataTelur)

/** create route for show add telur view */
app.get("/add", telurController.showAddPage)

/** create route for process of add new telur */
app.post("/add", telurController.processInsert)

/** create route for show edit telur view */
app.get("/edit/:id", telurController.showEditPage)

/** create route for process update telur */
app.post("/edit/:id", telurController.processUpdate)

/** create route for process delete telur */
app.get("/delete/:id", telurController.processDelete)

/** export object "app" to another file */
module.exports = app