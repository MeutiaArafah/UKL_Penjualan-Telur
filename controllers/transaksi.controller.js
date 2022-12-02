/** memanggil model telur */
const telurModel = require(`../models/telur.model`)

/** memanggil model member */
const memberModel = require(`../models/member.model`)

/** memanggil model transaksi */
const transaksiModel = require(`../models/transaksi.model`)

/** memanggil model detail transaksi */
const detailModel = require(`../models/detail_transaksi.model`)

/** memanggil model pack */
const packModel = require(`../models/pack.model`)

/** function utk menampilkan form transaksi */
exports.showFormTransaksi = async (request, response) => {
    try {
        /** ambil data telur */
        let telur = await telurModel.findAll()
        /** ambil data member */
        let member = await memberModel.ambilDataMember() // ambil data dari database melalui modelnya
        /** ambil data pack */
        let pack = await packModel.findAll()

        /** prepare data yg akan dipassing ke view */
        let sendData = {
            tgl_transaksi: ``, // array object
            dataTelur: telur,
            dataMember: member,
            dataPack: pack,
            page: `form-transaksi`,
            dataTelurString: JSON.stringify(telur), // mengubah array menjadi string
            dataPackString: JSON.stringify(pack),
            // JavaScriptObjectNotation = JSON 
            dataUser: request.session.dataUser,
            cart: request.session.cart
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** membuat fungsi utk menambahkan telur ke keranjang */
exports.addToCart = async (request, response) => {
    try {
        /** dapetin data telur berdasarkan id_telur 
         * yg dikirimkan
         */
        let selectedTelur = await telurModel.findByCriteria({
            id: request.body.id_telur
        })  
        
        /** dapetin data pack berdasarkan id_pack 
        * yg dikirimkan
        */
       let selectedPack = await packModel.findByCriteria({
           id: request.body.id_pack
           })

        /** tampung / receive data yg dikirimkan  */
        let storeData = {
            id_telur: request.body.id_telur,
            jenis_telur: selectedTelur[0].jenis_telur,
            jumlah_telur: request.body.jumlah_telur,
            id_pack: request.body.id_pack,
            nama_pack: selectedPack[0].nama_pack,
            jumlah_pack: request.body.jumlah_pack,
            harga_telur: request.body.harga_telur,
            harga_pack: request.body.harga_pack
        }

        /** masukkan data ke keranjang menggunakan session */
        request.session.cart.push(storeData)
        /** push() -> menambah/memasukkan data ke dalam array */

        /** direct ke halaman form-transaksi */
        return response.redirect(`/transaksi/add`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** function utk menghapus data item pada cart (keranjang) */
exports.hapusCart = async (request, response) => {
    try {
        /** ambil seluruh data cart pada session */
        let cart = request.session.cart

        /** ambil id_obat yg akan dihapus dari cart */
        let id_telur = request.params.id //karena id yg dihapus tampil di url

        /** cari tau posisi index dari data yg akan dihapus */
        let index = cart.findIndex(item => item.id_telur == id_telur)

        /** hapus data sesuai index yg ditemukan */
        cart.splice(index, 1) // splice utk menghapus data pada array

        /** kembalikan data cart ke dalam session */
        request.session.cart = cart

        /** direct ke halaman form transaksi */
        return response.redirect(`/transaksi/add`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** function utk menyimpan data transaksi */
exports.simpanTransaksi = async (request, response) => {
    try {
        /** tampung data yg dikirimkan */
        let newTransaksi = {
            tgl_transaksi: request.body.tgl_transaksi,
            id_member: request.body.id_member,
            id_admin: request.session.dataUser.id
        }

        /** simpan transaksi */
        let resultTransaksi = await transaksiModel.add(newTransaksi)
        // disimpan ke database melaluo transaksiModel

        /** menampung isi cart */
        let cart = request.session.cart

        for (let i = 0; i < cart.length; i++) { // loop sesuai data cart yg dimasukkan
            /** hapus dulu key dari cart karena di db detail gaada */
            delete cart[i].jenis_telur
            delete cart[i].nama_pack

            /** tambahi key "id_transaksi" ke dlm cart dari transaksi yg baru disimpan/autoincrement */
            cart[i].id_transaksi = resultTransaksi.insertId 
            // karena ada kolom transaksi di detail transaksi

            /** eksekusi simpan cart ke detail_transaksi */
            await detailModel.add(cart[i])
        }

        /** dikosongi cart nya */
        request.session.cart = []

        /** direct ke hlm form transaksi lagi */
        return response.redirect(`/transaksi/add`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** membuat fungsi utk menampilkan data transaksi */
exports.showTransaksi = async (request, response) => {
    try {
        /** ambil data transaksi */
        let transaksi = await transaksiModel.findAll()

        /** sisipin data detail dari setiap transaksi */
        for (let i = 0; i < transaksi.length; i++) {
            // ambil id transaksi
            let id = transaksi[i].id

            // ambil data detailnya sesuai id 
            let detail = await detailModel.findByCriteria({ id_transaksi: id }) // karena ambil sesuai id

            //sisipin detail ke transaksinya
            transaksi[i].detail = detail
        }

        /** prepare data yg akan dikirim ke view */
        let sendData = {
            page: `transaksi`,
            dataUser: request.session.dataUser,
            transaksi: transaksi
        }

        return response.render(`../views/index`, sendData)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** function utk menghapus data transaksi */
exports.hapusTransaksi = async (request, response) => {
    try {
        /** menampung data id yg akan dihapus */
        let id = request.params.id

        /** menghapus data detail_transaksi */
        await detailModel.delete({ id_transaksi: id })

        /** menghapus data transaksi */
        await transaksiModel.delete({ id: id })

        /** kembali lagi ke halaman transaksi */
        return response.redirect(`/transaksi`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

