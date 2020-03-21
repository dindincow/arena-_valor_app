module.exports= app =>{
    const express = require("express");
    const router = express.Router();
    const Ad = require("../../models/Ad")
    
    router.post('/ads', async (req, res) => {
        const ad = await Ad.create(req.body);
        res.send(ad)   
    })
    
    router.put('/ads/:id', async (req, res) => {
          const model = await Ad.findByIdAndUpdate(req.params.id, req.body);
         res.send(model)
    })

    router.delete('/ads/:id', async (req, res) => {
        await Ad.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success:true
        })
    })

    router.get('/ads', async (req, res) => {
        const list = await Ad.find().populate('parent').limit(10);
        res.send(list)
    })

    router.get('/ads/:id', async (req, res) => {
        const model = await Ad.findById(req.params.id);
        res.send(model)
    })

    app.use('/admin/api', router)
}