const mongoose = require("mongoose")
const schema = mongoose.Schema({
    name: {
        type: String
    },
    icon: {
        type: String
    },
    banner: {
        type: String
    },
    title: {
        type: String
    },
    story:{
        type: String
    },
    categories:[
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Category',
        }
    ],

    scores:{
        diffcult:{
            type:Number
        },
        skills: {
             type: Number
        },
        attack: {
            type: Number
        },
        survive: {
            type: Number
        },
    },
    skills:[
        {
            icon:{
                type:String
            },
            name: {
                type: String
            },
            description: {
                type: String
            },
            tips:{
                type:String
            }
        }
    ],
    
    items1: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Item"
    }],

    

    // items2: [{
    //     type: mongoose.SchemaType.ObjectId,
    //     ref: "Item"
    // }],
    usageTips:{
        type:String
    },
    // battleTips: {
    //      type: String
    // },
    // teamTips: {
    //     type: String
    // },
    // partners:[{
    //     hero:{
    //         type: mongoose.SchemaType.ObjectID,
    //         ref: "Hero"
    //     },
    //     description:{
    //         type: String
    //     }
      
    // }]

})

module.exports = mongoose.model("Hero", schema,'heros')