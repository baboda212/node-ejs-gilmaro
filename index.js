const express = require('express');
const app = express();
const ejs = require('ejs');
const cookieParser = require('cookie-parser'); // 쿠키추출 및 사용 모듈
let {sequelize, Products, Order, User} = require('./products.js');
const { where } = require('sequelize');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser()); // 쿠키사용

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
    
    // console.log('Cookies:', req.cookies) // 쿠키가 서버에떠다니는가?
    const cookie = req.cookies
    let re = Object.values(cookie); // 쿠키의 value 값 반환 여기선 true(로그인해서 id가 참이라)
    console.log(re);
    
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
    console.log('Cookies:', req.cookies)
    res.render('pages/productsdetail.ejs', {products})
})

//pay 라우팅 =>장바구니
app.get('/pay', async function(req, res){
    const cookie = req.cookies.user;
    if(cookie==undefined) {
        res.send('<script>alert("로그인이 필요한 페이지입니다."); window.location.replace("/");</script>')
    }else {
        const userCart = await User.findAll({where: {userIds:cookie}})
 
        const cartArr = userCart[0].userCart.split(',')
        // console.log(cartArr);
        const products = [];
        let arr = await Products.findAll({raw : true});
        
        for (let i = 0; i < cartArr.length; i++) {
             products.push(arr[[i]])
        }
        console.log(products);
       /*  if(checkId == cookie) {
            res.render('pages/orderdetail.ejs');    
        } else {
            res.send(`<script>alert("로그인이 필요한 페이지입니다.");window.location.replace('/products')</script>`)
        } */
        res.render('pages/pay.ejs', {products} );
    }
    
})


// cart
app.post('/cart/:id', async function(req, res){
    const cookie = req.cookies.user;
    console.log(cookie)
    const cartEl = req.params.id;

    const userCart = await User.findAll({where: {userIds:cookie}})
    console.log(userCart[0].userCart);
    const cartArr = []

    cartArr.push(userCart[0].userCart)
    if(cartArr.indexOf(cartEl) < 0 ) {
       const uCart =  userCart[0].userCart + ',' + cartEl;
       await User.update({
        userCart: uCart

       },{where: {userIds:cookie}});
       res.redirect('/')  
    } else {
        res.redirect('/');
    }
    
    
    // let re = Object.values(cookie); // 쿠키의 value 값 반환 여기선 true(로그인해서 id가 참이라)
    console.log(cookie);
    
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


// 관리자페이지
app.get('/manager',  async function(req, res){
    let order = await Order.findAll();
    const cookie = req.cookies
    let re = Object.values(cookie); // 쿠키의 value 값 반환 여기선 실제db에있는 id(로그인해서 id가 참이라)
    let checkId_m = await User.findAll({where: {userIds:re}}); // 등록된 id가 db와맞는가??
    let reviewId_m =Boolean(checkId_m[0]); // 찾는값 배열변환
    // console.log(re, reviewId);
    if(reviewId_m == false) {
        res.send(`<script>alert("로그인이 필요한 페이지입니다.");window.location.replace('/products')</script>`)
    } else {
        res.render('pages/manager.ejs',{order})
        console.log(reviewId_m);
    }
   
})

// orderdetail = 주문제작의뢰서 내용더보기 클릭시 이동


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
    let urlEl = req.body.url
    let checkId = await User.findAll({where: {userIds:login_userId}});
    let reviewId =Boolean(checkId[0]);
    // console.log(reviewId);
    if(reviewId == false) {
        res.send(`<script>alert('존재하지 않는 아이디입니다.'); window.location.replace('${urlEl}');</script>`)
    } else {
        let checkPwd = checkId[0].userPwd;
        console.log(checkPwd);
        if(checkPwd == login_userPwd) {
            console.log('로그인성공')
            res.cookie("user", login_userId, { // res에 쿠키속성부여 .cookie('쿠키이름', 가져갈값, {속성})
                // expires: new Date(Date.now() + 900000), // 얼마의시간동안 가지고있을것인가
                // httpOnly: true // js접근 막음 오로지 웹서버데이터로만 움직일수있음
            });
            res.send(`<script>alert('로그인 되었습니다.'); window.location.replace('${urlEl}');</script>`) // 로그인성공

        } else {
            res.send("<script>alert('비밀번호가 옳지 않습니다.'); window.location.replace('/');</script>")
        }
        
    }
     // res.redirect('/membership')
})

// 로그아웃
app.get('/logout', function(req,res) {
    res.clearCookie("user")
    res.redirect("/")
})



// 장바구니담기

//검색
app.post('/search1', async(req, res)=>{
    let find = req.body.search;
    // console.log(brand)
    if(find =='') {
        res.send("<script>alert('제품을 입력해 주세요'); window.location.replace('products');</script>")
    }else {
        let products = await Products.findAll({
            where: {type_1:find}
        })
        // console.log(products)
        res.render('pages/products.ejs', {products}) 
    }
})



const port = 3001;
app.listen(port,() =>{
    console.log(`sever running at ${port}`);
});