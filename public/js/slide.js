/* splash screen */
const splash = document.querySelector('.splash-logo');
document.addEventListener('DOMContentLoaded', function(e) {
    setTimeout(() => {
      // splash.classList.add('display-none');
      splash.setAttribute('style', 'opacity:0; top:-670px')
    }, 3000);  
  }); 

/* 슬라이드쇼 */
$(function () {
  let bgImg = [
    "images/visual01.jpg",
    "images/visual02.jpg",
    "images/visual03.jpg",
    "images/visual04.jpg",
    "images/visual05.jpg",
  ];
  let bgImgNum = 0;
  setInterval(function () {
    bgImgNum++;
    if (bgImgNum >= bgImg.length) {
      bgImgNum = 0;
    }
    $(".main-visual").css({
      "background-image": `url(${bgImg[bgImgNum]})`
    });
  }, 5000);
});

/* 좋아요하트 */
$(function(){
  var $likeBtn =$('.icon');

      $likeBtn.click(function(){
      $likeBtn.toggleClass('active');

      if($likeBtn.hasClass('active')){          
         $(this).find('img').attr({
            'src': '/images/ri_heart-fill.svg',
             alt:'좋아요'
              });
        
       }else{
          /* $(this).find('icon-heart').removeClass('fas').addClass('far') */
         $(this).find('img').attr({
            'src': '/images/ri_heart-line.svg',
            alt:"좋아요"
         })
       }
   })
})


