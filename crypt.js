/** memanggil library crypto-js */
const crypto = require(`crypto-js`)

/** membuat function utk enkripsi */
exports.enkripsi = (plainText) => {
    /** bikin secret key */
    let secretKey = `YTTA`
   
    /** proses enkripsi */
    /** AES = Advanced Encryption Standart */
    let result = crypto.AES.encrypt(plainText, secretKey).toString()
    return result 
}

/** membuat fungsi deskripsi */
exports.deskripsi = (chiperText) => {
    /** define secretKey */
    let secretKey = `YTTA`

    /** proses deskripsi */
    let byte = crypto.AES.decrypt(chiperText, secretKey)
    let result = byte.toString(crypto.enc.Utf8)

    return result
}
