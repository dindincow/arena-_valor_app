module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const Hero = require("../../models/Hero");
    const WeekHero = require("../../models/WeekHero");
    const ObjectId = require('mongodb').ObjectID;
    const Item = require("../../models/Item")

    router.post('/heroes', async (req, res) => {
        const category = await Hero.create(req.body);
        res.send(category)
    })

    router.post('/weekheroes', async (req, res) => {
        const hero = await Hero.findOne({_id:ObjectId(req.body.id)})
        await new WeekHero({ heroId: req.body.id , icon: hero.icon, name: hero.name }).save()
        res.send("success")
    })

    router.put('/weekheroes/:id', async (req, res) => {

        const hero = await Hero.findOne({_id:req.body.heroId})
        let saveHero = {
            heroId: req.body.heroId , 
            icon: hero.icon, 
            name: hero.name 
        }

        const model = await WeekHero.findByIdAndUpdate(req.params.id, saveHero);
        res.send("success")
        
    })

    router.put('/heroes/:id', async (req, res) => {
        console.log("req.body",req.body)

        const model = await Hero.findByIdAndUpdate(req.params.id, req.body);
        res.send(model)
    })

    router.delete('/heroes/:id', async (req, res) => {
        await Hero.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success: true
        })
    })

    router.get('/weekheroes', async (req, res) => {
        const weekheroes = await WeekHero.find()
        res.send(weekheroes)
    })

    router.get('/heroes', async (req, res) => {
        
        const pageSize = parseInt(req.query.pageSize) || 5;
        const pageIndex = parseInt(req.query.pageIndex) || 1;
        const catecory = req.query.catecory || '';

        console.log("catecory",catecory)
       
        // const totalCount = await Hero.find().count();
        // const totalPage = Math.round( totalCount / pageSize);

        // const list = await Hero.aggregate([

        //     {
        //         $lookup: {
        //             from: "categories",
        //             localField: "categories", 
        //             foreignField: "_id",
        //             as: "categoryName"
        //         }
        //     }, 
        //     { $skip: pageSize * ( pageIndex-1) },
        //     { $limit : pageSize }, 
        // ]);


        let list ;
        let totalCount ; 
        let totalPage ;

        if(catecory != ''){
            list = await Hero.aggregate([
                {$match:{ categories:ObjectId(catecory)}},
                {
                    $lookup: {
                        from: "categories",
                        localField: "categories", 
                        foreignField: "_id",
                        as: "categoryName"
                    },
                },
                { $skip: pageSize * ( pageIndex-1) },
                { $limit : pageSize }, 
            ])

            totalCount = await Hero.find({categories:ObjectId(catecory)}).count();
            totalPage = Math.round( totalCount / pageSize)
        }else{
      
            list = await Hero.aggregate([
                {
                    $lookup: {
                        from: "categories",
                        localField: "categories", 
                        foreignField: "_id",
                        as: "categoryName"
                    }
                },
                { $skip: pageSize * ( pageIndex-1) },
                { $limit : pageSize }, 
            ])

            totalCount = await Hero.find().count();
            totalPage = Math.round( totalCount / pageSize)
        }

        res.send({
            list:list,
            totalPage:totalPage,
            totalCount:totalCount
        })
    })


    router.get('/heroes/:id', async (req, res) => {

        const model = await Hero.findById(req.params.id);

        res.send(model)
    })

    router.get('/allHeroes', async (req, res) => {

        const herose = await Hero.find();

        res.send(herose)
    })

   

    app.use('/admin/api', router)
}