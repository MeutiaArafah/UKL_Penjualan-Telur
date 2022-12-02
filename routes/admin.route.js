/** panggil express */
const express = require(`express`)

/** buat object 'app' */
const app = express()

/** minta izin untuk membaca data yg dikirimkan melalui form */
app.use(express.urlencoded({ extended: true}))

/** panggil controller admin */
const adminController = require(`../controllers/admin.controller`)

/** load authorization from middleware */
const authorization = require(`../middleware/authorization`)

/** define route utk akses data admin */
app.get(`/`, authorization.cekUser, adminController.showDataAdmin)

/** define route utk nampilin form admin */
app.get(`/add`, authorization.cekUser, adminController.showTambahAdmin)

/** define route utk  memproses tambah data admin */
app.post(`/add`, authorization.cekUser, adminController.prosesTambahData)

/** define route utk tampilkan form admin dg data yg akan diubah */
app.get(`/edit/:id`, adminController.showEditAdmin)

/** define route utk memproses perubahan data */
app.post(`/edit/:id`, authorization.cekUser, adminController.prosesUbahData)

/** define route utk proses hapus admin */
app.get(`/delete/:id`, authorization.cekUser, adminController.processDelete)

/** export object app */
module.exports = app 