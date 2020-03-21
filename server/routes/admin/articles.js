module.exports= app =>{
    const express = require("express");
    const router = express.Router();
    const Article = require("../../models/Article")
    
    router.post('/articles', async (req, res) => {
        const article = await Article.create(req.body);
        res.send(article)
        
    })
    router.put('/articles/:id', async (req, res) => {
          const model = await Article.findByIdAndUpdate(req.params.id, req.body);
         res.send(model)
    })

    router.delete('/articles/:id', async (req, res) => {
        await Article.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success:true
        })
    })

    router.get('/articles', async (req, res) => {

        const list = await Article.aggregate([
            {
              $lookup: {
                    from: "categories",
                    localField: "categories", 
                    foreignField: "_id",
                    as: "categoryName"
                }
            }
        ]);
        //const list = await Article.find().populate('parent').limit(100);
        res.send(list)
    })

    router.get('/articles/:id', async (req, res) => {
        const model = await Article.findById(req.params.id);
        res.send(model)
    })

    app.use('/admin/api', router)
}