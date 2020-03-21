module.exports= app =>{
    const express = require("express");
    const router = express.Router();
    const Category = require("../../models/Category");
    const Article = require("../../models/Article")
    
    router.get('/news/list', async (req, res) => {   

        const parent = await Category.findOne({
            name:'官方消息'
        })

        const cats = await Category.aggregate([
            {$match:{parent:parent._id}},
            {
                // 關連查詢
                $lookup:{
                    from:'articles',
                    localField:'_id',
                    foreignField:'categories',
                    as:'newsList'
                }
            },{
                // 只要顯示5調數據
                $addFields:{
                    newsList:{$slice:['$newsList',5]}
                }
            }
        ])

        // 獲取子分類ID
        const subCats = await cats.map( v => v._id)
       
        // 新增熱門分類
        cats.unshift({
            name:'熱門',
            newsList: await Article.find().where({
                categories : {$in:subCats}
            }).limit(5).populate('categories').lean() 
        })

        // 如果分類是 熱門，則用原來分類名稱
        cats.map( cat =>{
            cat.newsList.map(news=>{
                news.categoryName = cat.name=="熱門" ? news.categories[0].name : cat.name;
                return news
            })

            return cat
        })
     
        res.send(cats)
    })

    

    app.use('/web/api', router)
}