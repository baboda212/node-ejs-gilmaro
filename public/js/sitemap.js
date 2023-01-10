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