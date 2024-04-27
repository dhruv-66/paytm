const express = require("express");
const router = express.Router()
router.post("/",(req,res)=>{
    res.json({"hei":"kaen"})
})
module.exports = router