const mongoose = require("mongoose")
const schema = mongoose.Schema({
    
    heroId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Hero',
    },
    icon:{
        type: String
    },
    name: {
        type: String
    },
  
})
   
module.exports = mongoose.model("WeekHero",schema)