/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load telur controller */
const telurController = require(`../controllers/telur.controller`)

/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))

// /** load authorization from middleware */
const authorization = require(`../middleware/authorization`)

/** create route for access telur's data */
app.get("/", authorization.cekUser, telurController.showDataTelur)

/** create route for show add telur view */
app.get("/add", authorization.cekUser, telurController.showAddPage)

/** create route for process of add new telur */
app.post("/add", authorization.cekUser, telurController.processInsert)

/** create route for show edit telur view */
app.get("/edit/:id", authorization.cekUser, telurController.showEditPage)

/** create route for process update telur */
app.post("/edit/:id", authorization.cekUser, telurController.processUpdate)

/** create route for process delete telur */
app.get("/delete/:id", authorization.cekUser, telurController.processDelete)

/** export object "app" to another file */
module.exports = app