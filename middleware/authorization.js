/** fungsi authorization */
exports.cekUser = (request, response, next) => {
    /** fungsi ini digunakan utk 
     * mengecek data user yg tersimpan 
     * di session 
     * jika datanya tersimpan di session, maka
     * boleh utk mengakses fitur yg diinginkan.
     * 
     * jika datanya tdk tersimpan di session,
     * maka akan dikembalikan ke hlm login
     */

                                    // tidak 
    if(request.session.dataUser === undefined){ 
        return response.redirect(`/auth`)
    } else {
        // lanjut ke fitur yg diinginkan
        next()
    }
}