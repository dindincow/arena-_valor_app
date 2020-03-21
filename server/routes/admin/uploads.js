module.exports= app =>{
    const express = require("express");
    const router = express.Router();
    const multer = require('multer')
    const AuthMiddleWare = require('../../middleware/auth');
    
    app.use('/admin/api', router)

    const upload = multer({
        dest: __dirname + '/../../uploads'
    })

    app.post('/admin/api/uploads',upload.single('file'), async (req, res) => {
       
        const file = req.file;
        //遠端測試
        //file.url = `https://arena-valor-app-demo.herokuapp.com/uploads/${file.filename}`
        //本地測試
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

}