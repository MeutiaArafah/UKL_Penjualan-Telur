/** load library express */
const express = require(`express`)

/** load library express-session */
const session = require(`express-session`)

/** instance "app" object */
const app = express()

/** define port of the server */
const PORT = `9000`

/** set view engine to ejs */
app.set(`view engine`, `ejs`)

/** session configuration */
app.use(session({
    secret: `i love javascript`,
    resave: false,
    saveUnitialized: false
}))

/** load routes */
const telur = require(`./routes/telur.route`)
const pack = require(`./routes/pack.route`)
const member = require(`./routes/member.route`)
const admin = require(`./routes/admin.route`)
const auth = require(`./routes/auth.route`)
const transaksi = require(`./routes/transaksi.route`)
const cart = require(`./routes/cart.route`)

/** define prefix for route obat */
app.use(`/telur`, telur)

/** define prefix for route pack */
app.use(`/bungkus`, pack)

/** define prefix for route member */
app.use(`/member`, member)

/** define prefix for route admin */
app.use(`/admin`, admin)

/** define prefix for route auth */ 
app.use(`/auth`, auth)

/** define prefix for route transaksi */
app.use(`/transaksi`, transaksi)

/** define prefix for route cart */
app.use(`/cart`, cart)

/** running web server based on defined PORT */
app.listen(PORT, () => {
    console.log(`Server Telur is running on port ${PORT}`);
})