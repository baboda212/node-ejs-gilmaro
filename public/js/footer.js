/* footer.js (찜목록) */

let markEl = document.querySelectorAll('.bookMark');
let basketEl = document.getElementById('basket');
let bookArr = [];

//console.log(localStorage.key(0));



for(i=0; i<localStorage.length;i++){
    bookArr.push(localStorage.getItem(localStorage.key(i)))
    // console.log("bookArr=", bookArr)
}
let locaNum = localStorage.length
markEl.forEach(e=>{
    e.addEventListener('click',()=>{
        // console.log(e.dataset.items, bookArr.indexOf(e.dataset.items))

        if(bookArr.indexOf(e.dataset.items)<0) {
             localStorage.setItem(locaNum,e.dataset.items)
            bookArr.push(localStorage.getItem(locaNum));
            locaNum++
        }else {
            // console.log("local= ", localStorage.key(0))
          localStorage.removeItem(localStorage.key(bookArr.indexOf(e.dataset.items)));
            bookArr.splice((bookArr.indexOf(e.dataset.items)),1);
            // console.log("실행되나요?")
            window.location.reload()


        }
    })
})

basketEl.addEventListener('click',()=>{
    //console.log(bookArr)
    fetch('/data', {method: "post"}).then((res)=>{return res.json()}).then((data)=>{
       let arr = [];
    //    console.log(data)
       for(i=0;i<bookArr.length;i++){
        //console.log(bookArr[i])
        arr.push(data[bookArr[i]-1])
        //console.log(arr)
       }
       return bookMarkReavile(arr);
    })
})

let bookMarkListEl = document.getElementsByClassName('bookMarkList')[0];
// console.log(bookMarkListEl)
function bookMarkReavile(arr) {
    let tf = bookMarkListEl.style.display
    //console.log(tf)
    if(tf=='none'){
        for(i=0; i<arr.length; i++) {
            let itemEl = document.createElement('div');
            itemEl.classList.add('item');
            itemEl.setAttribute('style',' margin-bottom: 30px; display: flex; flex-direction: column;')
            let img_boxEl = document.createElement('div');
            img_boxEl.classList.add('img_box');
            img_boxEl.classList.add('icon');
            img_boxEl.setAttribute('style',"width: 150px; height: 150px; position: relative; margin-bottom: 25px;")
            let bgEl = document.createElement('img');
            bgEl.classList.add('bg')
            bgEl.setAttribute('style','width: 100%; height: 100%;')
            bgEl.setAttribute('src',`${arr[i].imgUrl}`);
            img_boxEl.append(bgEl);
            let bookMarkEl = document.createElement('img');
            bookMarkEl.classList.add('bookMark')
            bookMarkEl.setAttribute('style',' position: absolute; right: 0; bottom: 0;')
            img_boxEl.append(bookMarkEl);
            itemEl.append(img_boxEl);
            let pEl1 = document.createElement('p');
            pEl1.innerHTML=`${arr[i].brand_en}`;
            itemEl.append(pEl1);
            let pEl2 = document.createElement('p');
            pEl2.innerHTML=`${arr[i].type_1} ${arr[i].name}`
            itemEl.append(pEl2);
            let pEl3 = document.createElement('p');
            pEl3.innerHTML=`정상가 : ${arr[i].price}원`
            itemEl.append(pEl3);
            bookMarkListEl.append(itemEl);
         }
         bookMarkListEl.style.display='flex'
    }else if(tf=='flex'){
        bookMarkListEl.style.display='none'
    }
    //console.log(arr);
    
}

markEl.forEach(e=>{
    // console.log(e.dataset.items, bookArr)
        if(bookArr.indexOf(e.dataset.items)==-1) {
            e.setAttribute('src', '/images/ri_heart-line.svg')
        }else {
            e.setAttribute('src','/images/ri_heart-fill.svg')
        }
})






let loginBox = document.getElementsByClassName('login')[0];
let userInfoEl = document.querySelectorAll('.user-info');
let inloginEl = document.getElementsByClassName('inlogin');
let innerLoginEl = document.getElementsByClassName('innerlogin')[0];
let personEl = document.getElementById('person');
function cookie () {
    const cookie = document.cookie;
        // console.log(Boolean(cookie));
        
        if(Boolean(cookie) == false) {
            userInfoEl[0].innerText = "로그인"
            userInfoEl[0].style.color="#fff"

          
            
        } else {
            userInfoEl[0].innerText = "로그아웃"
            userInfoEl[0].style.color="#fff"
            personEl.setAttribute("src", "/images/개인정보.svg")
            
        }
}

cookie();

userInfoEl.forEach(e => {
    e.addEventListener('click', function(){
        const cookie = document.cookie;
        // console.log(Boolean(cookie));
        
        if(Boolean(cookie) == false) {
            loginBox.style.display = 'block'
          
            
        } else {
            if(confirm('로그아웃하시겠습니까?')==true) {
                window.location.replace('/logout')
            }else{
                return false
            }        
        }
    })
    
})

let closeboxEl = document.getElementsByClassName('close-box')[0];

closeboxEl.addEventListener('click', function(){
    loginBox.style.display='none';
})


/* footer 고객센터 */
function getInnerCustomer() {
    alert('02-425-3200으로 문의해 주세요');
  }   


// 
document.getElementById('url').value=location.href
// console.log(location.href)



// sessionStorage.clear()
console.log(sessionStorage)
const sessionArr = [];
const sessionEl = document.getElementsByClassName('session');
const sessionEl2 = [...sessionEl]
console.log("sessionEl=", sessionEl2)

function sessionfunction (){
    for(let i = 0; i<sessionStorage.length; i++) {
        sessionArr.push(sessionStorage.getItem(sessionStorage.key(i)))
    }
    console.log("세션=", sessionArr)
    sessionEl2.forEach(e => {
        e.value=sessionArr;
    })
   
}

sessionfunction();