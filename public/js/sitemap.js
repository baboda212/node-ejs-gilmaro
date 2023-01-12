/* bottom-nav 메뉴 클릭시 */
$('.bottom-nav ul #menu a').on('click', function(){
    $('.site-map').addClass('show')
})


/* site-map 닫기버튼 클릭시 */
$('.site-map .site-map-header .title a').on('click', function(){
    $('.site-map').removeClass('show')
})


/* site-map depth1 클릭시 */
$('.site-map .site-map-nav .depth1-title').on('click', function(){
    $(this).next().toggleClass('show')
})

/* 바로구매하기 버튼 클릭시 */
$('.cashier-btn .buy-btn').on('click', function(){
    $('.cashier').addClass('show');
})

$('.cashier .cashier-close').on('click', function(){
    $('.cashier').removeClass('show');
})

/* bottom-nav 클릭시 */
$('.bottom-nav').on('click', function(){
    $(this).css('bottom', '0');
    $(this).css('backgroundColor', '#fff');
    $('.side-btn').css('bottom', '180px');
    $('.cashier-btn').css('bottom', '70px');
    $('.cashier').css('bottom', '150px');
})

