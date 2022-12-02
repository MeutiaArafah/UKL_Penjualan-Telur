/** panggil si express */
const express = require(`express`)

/** buat object utk express */
const app = express()

/** minta izin utk membaca request dari user */
app.use(express.urlencoded({extended: true}))

/** panggil controller auth */
const authController = require(`../controllers/auth.controller`)

/** membuat route utk menampilkan halaman login */
app.get(`/`, authController.showLogin)

/** membuat route utk proses login */
app.post(`/`, authController.authentication)

/** membuat route utk proses logout */
app.get(`/logout`, authController.logout)

/** export object app */
module.exports = app 