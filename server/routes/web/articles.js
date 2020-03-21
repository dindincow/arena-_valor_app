module.exports= app =>{
    const express = require("express");
    const router = express.Router();
    const Category = require("../../models/Category");
    const Article = require("../../models/Article");
    const Hero = require("../../models/Hero")
  
    router.get('/articles/:id', async (req, res) => { 

        const data = await Article.findById(req.params.id);

        res.send(data)
    })

    app.use('/web/api', router)
}