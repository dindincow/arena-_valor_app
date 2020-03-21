const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const schema = mongoose.Schema({
    username:{
        type:String
    },
  
    password: {
        type:String,
        select:false, // 查詢時，密碼時不要查出來
        set(val){
            return bcrypt.hashSync(val,10)
        }
    }

})

module.exports = mongoose.model("AdminUser",schema,'adminusers')