module.exports= app =>{
    const express = require("express");
    const router = express.Router();
    const Ad = require("../../models/Ad");
    
    router.get('/banners/list', async (req, res) => {   
        const banners = await Ad.find()
        res.send(banners)
    })


    app.use('/web/api', router)
}