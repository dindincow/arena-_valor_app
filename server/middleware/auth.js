module.exports = app =>{
    const assert = require('http-assert');
    const jwt = require('jsonwebtoken');
    const AdminUser = require("../models/AdminUser")

    return  async (req, res,next) => {
       
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token,401,'沒有TOKEN');
        
        const {id} = jwt.verify(token,req.app.get('secret'))
        assert(id,401,'沒有id');

        req.user = await AdminUser.findById({_id:id})
        assert(req.user,401,'請先登入');

        await next()

        
    }

    
    //錯誤處理函數,會依據  assert(user,412,'用戶不存在!'); 來調用
    app.use(async(err,req,res,next)=>{
        console.log("123333")
    res.status(err.statusCode || 500).send({
        message:err.message
    })
})

    
}