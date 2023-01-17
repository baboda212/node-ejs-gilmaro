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
//splash
app.get('/',async (req, res) => {
    res.render('pages/splashScreen.ejs')
    
})


//home 라우팅
app.get('/index',async (req, res) => {
    let products = await Products.findAll();
    // console.log(JSON.stringify(products,null,2));
    
    // console.log('Cookies:', req.cookies) // 쿠키가 서버에떠다니는가?
    const cookie = req.cookies
    let re = Object.values(cookie); // 쿠키의 value 값 반환 여기선 true(로그인해서 id가 참이라)
    //console.log(re);
    
    res.render('pages/index.ejs', {products});
})

app.get('/admin', async function(req, res){
    let products = await Products.findAll();
    // console.log(JSON.stringify(products,null,2));
    
    // console.log('Cookies:', req.cookies) // 쿠키가 서버에떠다니는가?
    const cookie = req.cookies
    let re = Object.values(cookie); // 쿠키의 value 값 반환 여기선 true(로그인해서 id가 참이라)
    //console.log(re);
    
    res.render('pages/admin.ejs', {products});
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
    //console.log('Cookies:', req.cookies)
    res.render('pages/productsdetail.ejs', {products})
})

//pay 라우팅 =>장바구니
app.get('/pay', async function(req, res){
    const cookie = req.cookies.user;
    if(cookie==undefined) {
        res.send('<script>alert("로그인이 필요한 페이지입니다."); window.location.replace("/index");</script>')
    }else {
        const userCart = await User.findAll({where: {userIds:cookie}})
 
        const cartArr = userCart[0].userCart.split(',')
        // console.log(cartArr);
        const products = [];
        let arr = await Products.findAll({raw : true});
        //console.log(Boolean(cartArr[1]), cartArr.length)
        if(Boolean(cartArr[1]) == false){
            res.render('pages/pay.ejs', {products} );
        } else{
            for (let i = 1; i < cartArr.length; i++) {
                //console.log(cartArr[i], arr.length)
                products.push(arr[cartArr[i]-1])

           }
            res.render('pages/pay.ejs', {products} );
            //console.log(products.length)
        }

       
        //console.log(products);
       /*  if(checkId == cookie) {
            res.render('pages/orderdetail.ejs');    
        } else {
            res.send(`<script>alert("로그인이 필요한 페이지입니다.");window.location.replace('/products')</script>`)
        } */

    }
    
})

// pay-제품삭제
app.post('/delete/:id', async function(req, res) {
    const payCart =  req.params.id
    const cookie = req.cookies.user;
    
    const userCart = await User.findAll({where: {userIds:cookie}})
 
        const cartArr = userCart[0].userCart.split(',')
        console.log('cart',cartArr,payCart)
        
        let delCartArr=cartArr.splice(cartArr.indexOf(payCart), 1)
        console.log(cartArr)
        console.log('del=',delCartArr, 'cart=',cartArr)
        let string = cartArr.join()
        console.log('str',string)

        await User.update({
            userCart: string
    
           },{where: {userIds:cookie}});

    res.redirect('/pay')
})


// cart
app.post('/cart/:id', async function(req, res){
    const cookie = req.cookies.user;
    console.log('사용자',cookie)
    const cartEl = req.params.id;

    const userCart = await User.findAll({where: {userIds:cookie}})
    console.log('카트',userCart[0].userCart);
    const cartArr = []

    cartArr.push(userCart[0].userCart)
     if(userCart == ''){
        cartArr;
     }
    if(cartArr.indexOf(cartEl) < 0 ) {
       const uCart =  userCart[0].userCart + ',' + cartEl;
       await User.update({
        userCart: uCart
       },{where: {userIds:cookie}});
       res.redirect('/index')  
    } else {
        res.redirect('/index');
    }
    
    
    // let re = Object.values(cookie); // 쿠키의 value 값 반환 여기선 true(로그인해서 id가 참이라)
    //console.log(cookie);
    
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
    const detail = req.body.detailpost;
    

    /* 테이블db에 내용 보내주면서 만들기 */
    const newOrder = await Order.create({name: name, email: email, phone: phone, title: title, detail: detail})
    res.redirect('/manager')
})


// 관리자페이지-주문제작게시판
app.get('/manager',  async function(req, res){
    let order = await Order.findAll();
    const cookie = req.cookies
    let re = Object.values(cookie); // 쿠키의 value 값 반환 여기선 실제db에있는 id(로그인해서 id가 참이라)
    let checkId_m = await User.findAll({where: {userIds:re}}); // 등록된 id가 db와맞는가??
    let reviewId_m =Boolean(checkId_m[0]); // 찾는값 배열변환
    // console.log(re, reviewId);
    if(re == 'dididididi') {
        res.render('pages/manager.ejs',{order})
        //console.log(reviewId_m);
    } else {
        res.send(`<script>alert("관리자로그인이 필요한 페이지입니다.");window.location.replace('/products')</script>`)
    }
   
})

// orderdetail = 주문제작의뢰서 내용더보기 클릭시 이동
app.get('/orderdetail/:id', async function(req, res){
    let id = req.params.id;
    let order = await Order.findAll({where: {id:id}});
    res.render('pages/orderdetail.ejs', {order})
})


// membership 라우팅
app.get('/membership', function(req, res) {
    res.render('pages/membership.ejs')
})

// 내정보 홈페이지
app.get('/mypage', async function(req, res) {
    const id = req.cookies;
    let re = Object.values(id);
    let user = await User.findAll({where: {userIds: re}});
    //console.log(user[0].id)
    let reviewId_m =Boolean(user[0]); // 찾는값 배열변환
    // console.log(re, reviewId);
    if(reviewId_m == false) {
        res.send(`<script>alert("로그인이 필요한 페이지입니다.");window.location.replace('/products')</script>`)
    } else {
        res.render('pages/mypage.ejs',{user})
        console.log(reviewId_m);
    }
})

// 내정보 수정
app.post('/userupdate', async function(req, res) {
    let userPhone = req.body.tell;
    let userEmail = req.body.email;
    // console.log(userPhone, userEmail)
    const id = req.cookies;
    let re = Object.values(id);
    let user = await User.findAll({where: {userIds: re}});
    // console.log("mypages= ",re);
    await User.update({
            userPhone: userPhone,
            userEmail: userEmail  
    }, {
        where: {userIds:re}
    })
    res.redirect('/mypage')
})

// 회원탈퇴
app.post('/userdelete', async function(req, res){
    const id = req.cookies;
    let re = Object.values(id);
    let user = await User.findAll({where: {userIds: re}});
    await User.destroy({
        where: {
            id: user[0].id
        }    
    });
    res.redirect('/index')
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

    res.redirect('/index')
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
            res.send("<script>alert('비밀번호가 옳지 않습니다.'); window.location.replace('/index');</script>")
        }
        
    }
     // res.redirect('/membership')
})

// 로그아웃
app.get('/logout', function(req,res) {
    res.clearCookie("user")
    res.redirect("/index")
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