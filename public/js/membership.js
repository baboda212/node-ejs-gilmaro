// membership.js

let idBtn = document.getElementById('idcheck');
let joninBtn = document.getElementById('join');
let user = document.getElementById('userId');
console.log(idBtn);
idBtn.addEventListener('click', ()=>{
    fetch('/userinfo', {method:'post'}).then((res)=>{
        return res.json()
    }).then((data) => {
        console.log(data);
        let userEl = data.indexOf(user.value);
        console.log(userEl)
        if(userEl < 0 ) {
            alert('사용할수 있는 아이디 입니다.')
        } else if (userEl > -1 ) {
            alert('사용할수 없는 아이디 입니다.')
            user.value = " "
        }
        
    })
})