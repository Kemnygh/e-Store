$(document).ready(() => {
  userreg();
  login();
  show_tab();
  passreset() 
});


function userreg(){
  $('#sign-up').submit(function (e) {
    e.preventDefault();
    var firstname = $('#fname').val(); 
    var lastname = $('#lname').val(); 
    var email = $('#email').val(); 
    var pass1 = $('#password1').val(); 
    var pass2 = $('#password2').val();
    var date = Date()
    let err = 'cannot be blank' 

    if (!firstname || typeof firstname !== 'string') {
      $('#fname').addClass('errborder')
      $('#fupdate').show()
      $('#fupdate').html(err)
    } else { $('#fupdate').hide() }
    
    if (!lastname || typeof lastname !== 'string') {
      $('#lname').addClass('errborder')
      $('#lupdate').show()
      $('#lupdate').html(err)
    } else { $('#lupdate').hide() }
    
    if (!email || typeof email !== 'string') {
      $('#email').addClass('errborder')
      $('#eupdate').show()
      $('#eupdate').html(err)
    } else { $('#eupdate').hide() }
    
    if (!pass1 || typeof pass1 !== 'string') {
      $('#password1').addClass('errborder')
      $('.pass1').show()
      $('.pass1').html(err)
    } else if (pass1 !== pass2) {
      $('.pass1').hide()
      $('#passmatch').show() 
      $('#passmatch').html('Password don\'t match')
    } else {
      $('#passmatch').hide() 
      $.ajax({
        method: 'post',
        url: '/user',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
          'fname': firstname,
          'lname': lastname,
          'email': email,
          'pass': pass1,
          'date': date
        }),
        success: function (res) {
          window.location.href= '/';
        },
        error: function (err) {
          console.log(err)
        }
      })
    } 
    $('#sign-up')[0].reset();
})
}

function login() { 
  $('#sign-in').submit(function (e) {
    e.preventDefault();
    var email = $('#lemail').val();
    var pass = $('#lpassword').val();

    if (!email || !pass) {
      $('#login-notice').html('Invlaid email/password').fadeOut(5000)
    } else {
      $.ajax({
        method: 'post',
        url: '/login',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
          'email': email,
          'pass': pass
        }),
        success: function (res) {
          let status = res.status
          if (status == 'error') {
            $('#login-notice').html(res.error).fadeOut(5000)
          } else {
            let data = res.data
            let token = JSON.parse(atob(data.split('.')[1]))
            $('.modal').modal('hide')
            $('.item1').hide()
            $('#account-details').removeClass('hidden')
            $('#account-user').html(`Welcome ${token.username}`)
            console.log(token)
          }
        },
        error: function (err) {
          console.log(err)
        }
      })
      $('#sign-in')[0].reset();
    }
  }
  )
}
  
function show_tab(){
  $('#pwd-hidden').hide()
  $('#go-to-restore').click(() => {
    $('#pwd-hidden').show()
    $('#pwd-hidden').attr('aria-checked', true)
  })
  $('.btn-close').click(() => {
    $('#pwd-hidden').hide()
  })
  $('#home-tab').click(() => {
    $('#pwd-hidden').hide()
  })
  $('#profile-tab').click(() => {
    $('#pwd-hidden').hide()
  })
}

function passreset() {
  $('#new-pwd').submit(function (e) {
    e.preventDefault();
    var email = $('#pemail').val();

    if (!email) {
      $('#pemail').addClass('errborder')
      $('#pwd-notice').addClass('pwd-error')
      $('#pwd-notice').html('please enter email address')
    } else {
      $.ajax({
        method: 'post',
        url: '/passreset',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
          'email': email
        }),
        success: function (res) {
          console.log(res)
          $('#pwd-notice').addClass('pwd-success')
          $('#pwd-notice').html(res.data)
        },
        error: function (err) {
          console.log(err)
        }
      })
      $('#new-pwd')[0].reset();
    }
  }
  )
}