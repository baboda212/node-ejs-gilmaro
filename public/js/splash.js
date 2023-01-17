/* splash screen */
const splash = document.querySelector('.splash-logo');
document.addEventListener('DOMContentLoaded', function(e) {
    setTimeout(() => {
      // splash.classList.add('display-none');
      splash.setAttribute('style', 'opacity:0; top:-670px')
      location.href = '/index';
    }, 3000);  
  });  