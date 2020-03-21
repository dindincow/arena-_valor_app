const express = require("express");
const cors = require("cors");
const app = express();
const key = require("./config/key");
const path = require("path");

// 設定秘鑰
app.set('secret',key.secretOrKey)

app.use(cors());
app.use(express.json())

// 執行前端靜態頁面
// if(process.env.NODE_ENV === "production"){
   
//     app.use(express.static("admin/dist"));
//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname,"admin","dist","index.html"))
//     })
// }

// // app.use(express.static(__dirname +"/admin/dist/"));
// // app.get(/.*/,(req,res)=>{
// //     res.sendFile(path.resolve(__dirname,"admin/dist/index.html"))
// // })



//讓外部透過 /uploads 路徑，來訪問 /uploads 資料夾下的東西 (靜態資源)
app.use('/uploads', express.static(__dirname + '/uploads'))

// 引用 DB
require("./pluging/db")(app);

// 使用 routes
require("./routes/admin/categories")(app);
require("./routes/admin/item")(app);
require("./routes/admin/herose")(app);
require("./routes/admin/articles")(app);
require("./routes/admin/ads")(app);
require("./routes/admin/admin_users")(app);
require("./routes/admin/uploads")(app);
require("./routes/admin/login")(app);

require("./routes/web/news")(app);
require("./routes/web/heros")(app);
require("./routes/web/articles")(app);
require("./routes/web/banners")(app);

// process.env.PORT
app.listen(process.env.PORT || 3000,()=>{
    console.log("server is running!")
})