/** load model admin */
const adminModel = require(`../models/admin.model`)

/** load crypt */
const crypt = require(`../crypt`)

/** function utk menampilkan halaman login */
exports.showLogin = (request, response) => {
    try {
        return response.render(`../views/pages/login`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** function utk proses authentication */
exports.authentication = async (request, response) => {
    try {
        /** tampung data username & password yg diisikan*/
        let username = request.body.username // diambil dari login (data yg diinputkan)
        let password = request.body.password

        /** check kecocokan username */
        let result = await adminModel.ambilDataDenganParameter({ username: username })
                     // admin karena user ada di admin          kolom db : let user atas

        /** cek keberadaan data apoteker */
        if (result.length > 0) { // length: panjang 
            /** kita cek dulu kecocokan password-nya */
            /** 123 === deskripsi(shjkshjksjkf) */
            if (password === crypt.deskripsi(result[0].password)) {
                /** login berhasil */               //[0] karena ambil array data yg pertama
                /** menyimpan data user ke session */
                /** 'dataUser' = label of session*/
                request.session.dataUser = result[0]

                /** definisi cart di session */
                request.session.cart = [] // karena banyak data

                return response.redirect(`/telur`)
            } else {
                /** login gagal */
                return response.redirect(`/auth`)
            }
        } else {
            /** data apoteker tidak ada */
            return response.redirect(`/auth`)
        }

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** membuat function utk logout */
exports.logout = async (request, response) => {
    try {
        /** menghapus data user dari session */
        request.session.dataUser = undefined

        /** kembali ke halaman login */
        return response.redirect(`/auth`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

