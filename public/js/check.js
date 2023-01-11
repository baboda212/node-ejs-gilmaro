/* check.js */

/* 색상 선택 */
$('.wrap .cashier .colors').on('click', function(){
    $('.wrap .cashier .colors-more').toggleClass('show')
})

/* 색상 옵션 선택시 */
$('.wrap .cashier .colors-more .colors-select').on('click', function(){
  let text = $(this).html()
  let pEl = $(this).text()
  console.log(text)
  console.log(pEl)
  $('.wrap .cashier .colors p').html(text);
  $('.wrap .check .check-text #bringcolor').html(pEl);
  /* 색상 옵션 선택시 선택창 사라지기 */
  $('.wrap .cashier .colors-more').removeClass('show')
})




/* 수량 변경 */
function count(type)  {
    // 결과를 표시할 element
    const resultElement = document.getElementById('ea');
    // 위에 금액 ( 변동되지 않는 값) 가져옴
    const priceElement = document.getElementById('price');
    // 밑에 대입하는 것 얘는 변동됨
    const paycheckElement = document.getElementById('paycheck')
    const allpriceElement = document.getElementById('allprice');
    // 현재 화면에 표시된 값
    let number = resultElement.innerText;
    //let pay = paycheackElement.innerText;
    let pay = priceElement.innerText;
    
    
    // 더하기/빼기
    if(type === 'plus') {
      number = parseInt(number) + 1;
      // 가져온값에서 , 제거
      pay = pay.split(',').join("");
      pay = (pay * number) + '원'
      pay = pay.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      // 10개부터는 대량주문 취급 경고문 등장
      if(number >= 10) {
        alert('대량주문은 제작주문을 이용해주세요');
        return
      }
    }else if(type === 'minus')  {
      number = parseInt(number) - 1;
      pay = pay.split(',').join("");
      pay = (pay * number) + '원'
      pay = pay.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      // 수량변경 음수 방지
      if(number <= 0 ) {
        console.log('실행')
        number = 1;
        pay = 20000 + '원'
        pay = pay.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        
    }
    }

    
    // 결과 출력
    resultElement.innerText = number;
    paycheckElement.innerText = pay;
    allpriceElement.innerText = pay;
    pay = pay.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");


    // 결과값 총 결제금액에 넣기
   
  }