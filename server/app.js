if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');
const router = require('./routers');
const app = express()
// const port = 4000
const cors = require('cors');

app.use(cors(corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}))




app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use(router)

module.exports = app

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })