let btnEls = document.querySelectorAll('.products_btn');
let items = document.querySelectorAll('.item_box');

btnEls[0].addEventListener('click',()=>{
    btnText = btnEls[0].innerText;
    if(btnText=='더보기') {
        items[0].style.height = "1080px";
        btnEls[0].innerText='접기'
    }else if(btnText=='접기'){
        items[0].style.height="540px"
        btnEls[0].innerText='더보기'
    }
    
})

btnEls[1].addEventListener('click',()=>{
    btnText = btnEls[1].innerText;
    if(btnText=='더보기') {
        items[1].style.height = "1080px";
        btnEls[1].innerText='접기'
    }else if(btnText=='접기'){
        items[1].style.height="540px"
        btnEls[1].innerText='더보기'
    }
    
})

let num = Math.ceil((document.getElementsByClassName('sale')[0].dataset.item)/4);
let numVar = 2;


btnEls[2].addEventListener('click',()=>{
    btnText = btnEls[2].innerText;
    if(numVar<num-1) {
        items[2].style.height = `${535*numVar}px`;
        btnEls[2].innerText="더보기"
        numVar++
    }else if(numVar = num){
        items[2].style.height = `${535*numVar}px`;
        btnEls[2].innerText="접기"
        numVar=1;
    }
})