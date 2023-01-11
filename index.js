const express = require('express');
const app = express();
const ejs = require('ejs');
let {sequelize, Products, Order, User} = require('./products.js');
const { where } = require('sequelize');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//ejs 를  view엔진으로 설정하기
app.set('view engine', 'ejs');
//정적파일 경로 지정(외부css파일 불러오기)
app.use(express.static("public"));

sequelize.sync().then((res)=> {
    console.log("데이터 모델 연결됨")
 })


//search 라우팅
app.post('/search', async(req, res)=>{
    let brand = req.body.brand;
    // console.log(brand)
    if(brand=='MUSPORTS'||brand=='anthology') {
        res.send("<script>alert('제품이 없습니다.'); window.location.replace('products');</script>")
    }else {
        let products = await Products.findAll({
            where:{
                brand_en: brand
            }
        })
        // console.log(products)
        res.render('pages/products.ejs', {products})
    }
})

//home 라우팅
app.get('/',async (req, res) => {
    let products = await Products.findAll();
    // console.log(JSON.stringify(products,null,2));
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

//products 라우팅
app.get('/products', async(req, res) => {
    let products = await Products.findAll();
    res.render('pages/products.ejs', {products})
})

//productsdetail 라우팅
app.get('/productsdetail/:id', async(req,res) => {
    let id = req.params.id;
    let products = await Products.findAll({where: {id:id}});
    /* console.log(JSON.stringify(products,null,2))
    console.log(products[0]) */
    
    res.render('pages/productsdetail.ejs', {products})
})

//pay 라우팅
app.get('/pay', function(req, res){
    res.render('pages/pay.ejs', );
})

//orderdetail 라우팅
app.get('/orderdetail', function(req, res){
    res.render('pages/orderdetail.ejs');
})

app.post('/data', async(req,res)=>{
    let data= await Products.findAll()
    res.json(data)
})




/* 주문제작페이지 */
app.get('/order', function(req, res){
    res.render('pages/order.ejs',{})
})

/* 주문제작의뢰시 받을곳 */
app.post('/order-product', async function(req,res){
    /* 내용받기 */
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const title = req.body.title;

    /* 테이블db에 내용 보내주면서 만들기 */
    const newOrder = await Order.create({name: name, email: email, phone: phone, title: title})
    res.redirect('/manager')
})


/* 관리자페이지 */
app.get('/manager',  async function(req, res){
    let order = await Order.findAll();
    res.render('pages/manager.ejs',{order})
})

// membership 라우팅
app.get('/membership', function(req, res) {
    res.render('pages/membership.ejs')
})

// 회원가입
app.post('/create', async function(req, res){
    let name = req.body.info;
    let tell = req.body.tell;
    let email = req.body.email;
    let userId = req.body.userId;
    let pwd = req.body.pwd;

    let user = await User.create({
        userName: name,
        userPhone: tell,
        userEmail: email,
        userIds: userId,
        userPwd: pwd
    })

    res.redirect('/')
})

// 회원가입마지막확인
app.post('/userinfo', async function(req, res){
    let info = await User.findAll()
    let infoId = info.map(e=>e.userIds)
    res.json(infoId)
})

// 로그인
app.post('/login' , async function(req, res){
    let login_userId = req.body.login_userId;
    let login_userPwd = req.body.login_userPwd;
    let checkId = await User.findAll({where: {userIds:login_userId}});
    let reviewId =Boolean(checkId[0]);
    // console.log(reviewId);
    if(reviewId == false) {
        res.send("<script>alert('존재하지 않는 아이디입니다.'); window.location.replace('/');</script>")
    } else {
        let checkPwd = checkId[0].userPwd;
        console.log(checkPwd);
        if(checkPwd == login_userPwd) {
            res.redirect('/')
        } else {
            res.send("<script>alert('비밀번호가 옳지 않습니다.'); window.location.replace('/');</script>")
        }
        
    }

     // res.redirect('/membership')
})



// 장바구니담기

//검색


const port = 3001;
app.listen(port,() =>{
    console.log(`sever running at ${port}`);
});