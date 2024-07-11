const express = require('express')
const userRouter = require('./userRouter')
const selangRouter = require('./selangRouter')

const router = express.Router()

router.use("/", userRouter)
router.use("/", selangRouter)




module.exports = router