const express = require('express');
const app = express();
const ejs = require('ejs');
let {sequelize, Products} = require('./products.js');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//ejs 를  view엔진으로 설정하기
app.set('view engine', 'ejs');
//정적파일 경로 지정(외부css파일 불러오기)
app.use(express.static("public"));

sequelize.sync().then((res)=> {
    console.log("데이터 모델 연결됨")
 })

//data 라우팅
app.get('/create', async(req,res)=>{
    let imgUrl = req.query.imgUrl;
    let brand_kr = req.query.brand_kr;
    let brand_en = req.query.brand_en;
    let name = req.query.name;
    let type_1 = req.query.type_1;
    let type_2 = req.query.type_2;
    let auto = req.query.auto;
    let price = req.query. price;
    let color = req.query.color;
    let selling = req.query.selling;
    console.log(imgUrl, brand_en, brand_kr, name, type_1, type_2, auto, price, color, selling)
    await Products.create({
        imgUrl: imgUrl,
        brand_en : brand_en,
        brand_kr: brand_kr,
        name : name,
        type_1 : type_1,
        type_2: type_2,
        auto : auto,
        price : price,
        color : color,
        selling: selling
    })
    res.redirect('/')
})

//home 라우팅
app.get('/',async (req, res) => {
    let products = await Products.findAll();
    console.log(JSON.stringify(products,null,2));
    res.render('pages/index.ejs', {products});
})

//about 라우팅
app.get('/about', function(req, res){
    res.render('pages/about.ejs');
})

//brands 라우팅
app.get('/brands', function(req, res){
    res.render('pages/brands.ejs');
})

//pay 라우팅
app.get('/pay', function(req, res){
    res.render('pages/pay.ejs');
})

//orderdetail 라우팅
app.get('/orderdetail', function(req, res){
    res.render('pages/orderdetail.ejs');
})

const port = 3001;
app.listen(port,() =>{
    console.log(`sever running at ${port}`);
});