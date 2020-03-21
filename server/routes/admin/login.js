module.exports= app =>{
    const express = require("express");
    const router = express.Router();
    const AdminUser = require("../../models/AdminUser")
    const Bcrypt = require("bcrypt")
    const jwt = require('jsonwebtoken');
 
    router.post('/login', async (req, res) => {
        const {username,password} = req.body;
        const user = await AdminUser.findOne({username}).select('+password');

        if(!user){
            return res.status(422).send({
                message:"用戶不存在!"
            })
        }

        // 驗正密碼
        const isVaild = Bcrypt.compareSync(password,user.password)

        if(!isVaild){
            return res.status(422).send({
                message:"密碼錯誤!"
            })
        }

        // 返回token
        const token = jwt.sign({ id: user._id }, app.get('secret'));
        res.send({
            token,
            id:user._id
        })
      
    })
    
    app.use('/admin/api', router)

   
}










