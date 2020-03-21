module.exports= app =>{
    const express = require("express");
    const router = express.Router();
    const Category = require("../../models/Category")
    const AuthMiddleWare = require('../../middleware/auth');
 
    router.post('/categories',AuthMiddleWare(), async (req, res) => {
        const category = await Category.create(req.body);
        res.send(category)
        
    })
    router.put('/categories/:id', AuthMiddleWare(),async (req, res) => {
          const model = await Category.findByIdAndUpdate(req.params.id, req.body);
         res.send(model)
    })

    router.delete('/categories/:id',AuthMiddleWare(), async (req, res) => {
        await Category.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success:true
        })
    })

    router.get('/categories',AuthMiddleWare(), async (req, res) => {
        const list = await Category.find().populate('parent').limit(100);
        res.send(list)
    })

    router.get('/categories/heroes', async (req, res) => {
        const parent = await Category.findOne({
            name:'英雄分類'
        })

        const list = await Category.find({parent:parent._id})
        res.send(list)

    })



    router.get('/categories/:id', AuthMiddleWare(),async (req, res) => {
        const model = await Category.findById(req.params.id);
        res.send(model)
    })


    app.use('/admin/api', router)
}