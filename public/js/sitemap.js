/* bottom-nav 메뉴 클릭시 */
$('.container .bottom-nav ul #menu a').on('click', function(){
    $('.container .site-map').addClass('show')
})


/* site-map 닫기버튼 클릭시 */
$('.container .site-map .site-map-header .title a').on('click', function(){
    $('.container .site-map').removeClass('show')
})


/* site-map depth1 클릭시 */
$('.container .site-map .site-map-nav .depth1-title').on('click', function(){
    $(this).next().toggleClass('show')
})

/* 바로구매하기 버튼 클릭시 */
$('.container .cashier-btn .buy-btn').on('click', function(){
    $('.container .cashier').addClass('show');
})

$('.container .cashier .cashier-close').on('click', function(){
    $('.container .cashier').removeClass('show');
})

/* bottom-nav 클릭시 */
$('.bottom-nav').on('click', function(){
    $(this).css('bottom', '0');
    $('.container .side-btn').css('bottom', '180px');
    $('.container .cashier-btn').css('bottom', '70px');
    $('.container .cashier').css('bottom', '150px');
})
