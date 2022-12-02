/** panggil express */
const express = require(`express`)

/** buat object 'app' */
const app = express()

/** minta izin untuk membaca data yg dikirimkan melalui form */
app.use(express.urlencoded({ extended: true}))

/** panggil controller member */
const memberController = require(`../controllers/member.controller`)

// /** load authorization from middleware */
const authorization = require(`../middleware/authorization`)

/** define route utk akses data member */
app.get(`/`, authorization.cekUser, memberController.showDataMember)

/** define  route utk nampilin form customer */
app.get(`/add`, authorization.cekUser, memberController.showTambahMember)

/** define routeutk memproses tambah data customer */
app.post(`/add`, authorization.cekUser, memberController.prosesTambahData)

/** define route utk nampilin form customer dg data yg akan diubah */
app.get(`/edit/:id`, authorization.cekUser, memberController.showEditMember)

/** define route utk memproses perubahan data */
app.post(`/edit/:id`, authorization.cekUser, memberController.prosesUbahData)

/** define route utk proses hapus data */
app.get(`/delete/:id`, authorization.cekUser, memberController.processDelete)

/** export object app */
module.exports = app 
