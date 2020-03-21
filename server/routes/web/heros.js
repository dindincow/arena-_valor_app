module.exports= app =>{
    const express = require("express");
    const router = express.Router();
    const Category = require("../../models/Category");
    const WeekHero = require("../../models/WeekHero");
    const Hero = require("../../models/Hero")
    const ObjectId = require('mongodb').ObjectID;
  
    router.get('/herose/list', async (req, res) => {   

        const parent = await Category.findOne({
            name:'英雄分類'
        })

        const cats = await Category.aggregate([
            {$match:{parent:parent._id}},
            {
                // 關連查詢
                $lookup:{
                    from:'heros',
                    localField:'_id',
                    foreignField:'categories',
                    as:'heroList'
                }
            }
        ])

        // 獲取子分類ID
        const subCats = await cats.map( v => v._id)
       
        // 新增熱門分類
        cats.unshift({
            name:'熱門',
            heroList: await Hero.find().where({
                categories : {$in:subCats}
            }).limit(10).lean() 
        })

        res.send(cats)
    })

    router.get('/heroseList', async (req, res) => {
        const herose = await Hero.find()
        res.send(herose)
    })
   

    router.get('/herose/:id', async (req, res) => {   
        const role = await Hero.aggregate([
            {$match: {_id: ObjectId(req.params.id)}},
            {
                $lookup: { 
                    from: "items", 
                    localField: "items1",
                    foreignField: "_id", 
                    as: "outfit1"
                }
            }
        ]);
       
        res.send(role[0])
        
    })

    router.get('/weekheroes', async (req, res) => {
        const weekheroes = await WeekHero.find()
        res.send(weekheroes)
    })

    app.use('/web/api', router)
}