function toggleForms() {
  var loginForm = document.getElementById('login-form');
  var registerForm = document.getElementById('register-form');
  
  // .d-none{display:none!important}
  // 如果当前login的页面没有显示，则把d-none class属性移除并将其显示出来
  // 反之则将register页面显示出来
  if (loginForm.classList.contains('d-none')) {
    loginForm.classList.remove('d-none');
    registerForm.classList.add('d-none');
  } else {
    loginForm.classList.add('d-none');
    registerForm.classList.remove('d-none');
  }
}
