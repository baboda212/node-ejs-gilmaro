/* splash screen */
const splash = document.querySelector('.splash-logo');
document.addEventListener('DOMContentLoaded', function(e) {
    setTimeout(() => {
      // splash.classList.add('display-none');
      splash.setAttribute('style', 'opacity:0; top:-670px')
    }, 3000);  
  }); 

/* 슬라이드쇼 */
let curPos = 0;
let postion = 0;
let start_x, end_x;
const IMAGE_WIDTH = 375;
const images = document.querySelector(".images") 
 
images.addEventListener('touchstart', touch_start);
images.addEventListener('touchmove', touch_move);
images.addEventListener('touchend', touch_end);
 
function prev(){
  if(curPos > 0){
    postion += IMAGE_WIDTH;
    images.style.transform = `translateX(${postion}px)`;
    curPos = curPos - 1;
  }
}
function next(){
  if(curPos < 4){
    postion -= IMAGE_WIDTH;
    images.style.transform = `translateX(${postion}px)`;
    curPos = curPos + 1;
  }
}
 
function touch_start(event) {
  start_x = event.touches[0].pageX
}
function touch_move(event) {
  start_x = event.touches[0].pageX
}
 
function touch_end(event) {
  end_x = event.changedTouches[0].pageX;
  if(start_x > end_x){
    next();
  }else{
    prev();
  }
}

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


