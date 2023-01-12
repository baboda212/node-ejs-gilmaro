/* footer.js (찜목록) */

let basketEl = document.getElementById('basket');

basketEl.addEventListener('click',()=>{
    console.log(bookArr)
    fetch('/data', {method: "post"}).then((res)=>{return res.json()}).then((data)=>{
       let arr = [];
       for(i=0;i<bookArr.length;i++){
        arr.push(data[i])
       }
       return bookMarkReavile(arr);
    })
})

let bookMarkListEl = document.getElementsByClassName('bookMarkList')[0];
console.log(bookMarkListEl)
function bookMarkReavile(arr) {
    let tf = bookMarkListEl.style.display
    console.log(tf)
    if(tf=='none'){
        for(i=0; i<arr.length; i++) {
            let itemEl = document.createElement('div');
            itemEl.classList.add('item');
            itemEl.setAttribute('style',' margin-bottom: 30px; display: flex; flex-direction: column;')
            let img_boxEl = document.createElement('div');
            img_boxEl.classList.add('img_box');
            img_boxEl.setAttribute('style',"width: 150px; height: 150px; position: relative; margin-bottom: 25px;")
            let bgEl = document.createElement('img');
            bgEl.classList.add('bg')
            bgEl.setAttribute('style','width: 100%; height: 100%;')
            bgEl.setAttribute('src',`${arr[i].imgUrl}`);
            img_boxEl.append(bgEl);
            let bookMarkEl = document.createElement('bookMark');
            bookMarkEl.setAttribute('style',' position: absolute; right: 0; bottom: 0;')
            bookMarkEl.setAttribute('src','./images/bookMark.svg');
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
    console.log(arr);
    
}

let loginBox = document.getElementsByClassName('login')[0];
let userInfoEl = document.getElementById('user-info');

userInfoEl.addEventListener('click', function(){
    const cookie = document.cookie;
    // console.log(Boolean(cookie));
    
    if(Boolean(cookie) == false) {
        loginBox.style.display = 'block'
    } else (
        alert('로그아웃하시겠습니까?'),
        window.location.replace('/logout')
    )
})

