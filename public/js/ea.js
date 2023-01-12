// ea.js
for(i=0;i<document.getElementById('count');i++){
// 결과를 표시할 element
let resultElement =[]
let priceElement =[]
let paycheckElement =[]
let allpriceElement =[]
resultElement.push(document.getElementById(`ea[${i}]`))
// 위에 금액 ( 변동되지 않는 값) 가져옴
priceElement.push(document.getElementById(`price[${i}]`))
// 밑에 대입하는 것 얘는 변동됨
paycheckElement.push(document.getElementById(`paycheck[${i}]`)) 
allpriceElement.push(document.getElementById(`allprice[${i}]`))
allpriceElement2.push(document.getElementById(`allprice2[${i}]`))
}

let eaplus = document.querySelectorAll('.eaplus');
let eaminus = document.querySelectorAll('.eaminus');

let reAllEl = document.getElementsByClassName('reAll');
let totalEl = document.getElementById('total');
console.log(Object.values(reAllEl));

let reAllElArr = [...reAllEl];
let p = 0;
reAllElArr.forEach(e=>{ 
   p+=eval(e.value )
   console.log('p는',p)
})
totalEl.innerHTML=(`${p}`).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';
let  realtotalEl = document.getElementById('realtotal');
        realtotalEl.innerHTML = (`${p+3000}`).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';

// 플러스 버튼 함수
eaplus.forEach(e=>{
    e.addEventListener('click',(e)=>{
        let eaEl= document.getElementById(`ea${e.target.dataset.item}`);
        console.log(eaEl.innerHTML)
        let nowEa = eval(eaEl.innerText)+1
        eaEl.innerHTML = nowEa

        let allprice = document.getElementById(`price${e.target.dataset.item}`);
        let allprice1 = document.getElementById(`allprice${e.target.dataset.item}`);
        let allprice2 = document.getElementById(`allprice2${e.target.dataset.item}`);
        console.log(allprice.innerHTML)
        let newPrice= eval(allprice.innerHTML)*nowEa
        // newPrice = newPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    
        allprice1.innerHTML = newPrice+"원"
        allprice2.value = newPrice ;
        
        let p = 0;
        reAllElArr.forEach(e=>{ 
           p+=eval(e.value )
           console.log('p는',p)
        })
        totalEl.innerHTML=(`${p}`).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';
        realtotalEl.innerHTML = (`${p+3000}`).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +'원';
    })
})
// 마이너스 버튼 함수
eaminus.forEach(e=>{
    e.addEventListener('click',(e)=>{
        
        let eaEl= document.getElementById(`ea${e.target.dataset.item}`);
        console.log(eaEl)
        if(eaEl.innerHTML > 1) {
            let nowEa = eval(eaEl.innerHTML)-1
            eaEl.innerText = nowEa
            console.log(eaEl.innerHTML, nowEa)
            let allprice = document.getElementById(`price${e.target.dataset.item}`);
            let allprice1 = document.getElementById(`allprice${e.target.dataset.item}`);
            let allprice2 = document.getElementById(`allprice2${e.target.dataset.item}`);
            console.log(allprice.innerHTML)
            let newPrice= eval(allprice.innerHTML)*nowEa
            // newPrice = newPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        
            allprice1.innerText = newPrice+"원"
            allprice2.value = newPrice
            allprice2.dataset.item = newPrice;

        } else {
            return false
        }
        
        let p = 0;
        reAllElArr.forEach(e=>{ 
           p+=eval(e.value )
           console.log('p는',p)
        })
        totalEl.innerHTML=(`${p}`).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';
        realtotalEl.innerHTML = (`${p+3000}`).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';
    })
})


