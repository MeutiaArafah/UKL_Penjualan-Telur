/** panggil express */
const express = require(`express`)

/** bikin object express */
const app = express()

/** minta ijin utk membaca data */
app.use(express.urlencoded({ extended: true }))

/** panggil controller transaksi */
const transaksiController = require(`../controllers/transaksi.controller`)

/** panggil auhtorization dari middleware */
const authorization = require(`../middleware/authorization`)

/** definisikan route utk menambah isi cart */
app.post(`/`, authorization.cekUser, transaksiController.addToCart)

/** definisikan route utk menghapus item pada cart */
app.get(`/:id`, authorization.cekUser, transaksiController.hapusCart)

/** export object app */
module.exports = app 