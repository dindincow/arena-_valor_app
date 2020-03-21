module.exports= app =>{
    const express = require("express");
    const router = express.Router();
    const AdminUser = require("../../models/AdminUser")
    
    router.post('/admin_users', async (req, res) => {
        console.log("req.body",req.body);
        const ad = await AdminUser.create(req.body);
        res.send(ad)    
    })
    router.put('/admin_users/:id', async (req, res) => {
        const model = await AdminUser.findByIdAndUpdate(req.params.id, req.body);
        res.send(model)
    })

    router.delete('/admin_users/:id', async (req, res) => {
        await AdminUser.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success:true
        })
    })

    router.get('/admin_users', async (req, res) => {
        const list = await AdminUser.find().populate('parent').limit(10);
        res.send(list)
    })

    router.get('/admin_users/:id', async (req, res) => {
        const model = await AdminUser.findById(req.params.id);
        console.log("model",model)
        res.send(model)
    })

    app.use('/admin/api', router)
   
}