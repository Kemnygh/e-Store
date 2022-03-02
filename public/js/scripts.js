$(document).ready(() => {
  userreg();
  login();
  show_tab();
  passreset(); 
  products();
  details();
  remove();
  add();
  insertData();
  filter()
});
function addPhone(){
  $('#addProducts').submit(function (e) {
    e.preventDefault();
    var name = $('#addName').val(); 
    var price = $('#addPrice').val(); 
    var color = $('#addColors').val(); 
    var stock = $('#addStock').val(); 

    $.ajax({
      method: 'post',
      url: '/phone-route',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
        'name': name,
        'price': price,
        'color': color,
        'stock': stock
      }),
      success: function (res) {
        window.location.href= '/';
      },
      error: function (err) {
        console.log(err)
      }
    })
  }
  )

}


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

// admin Js
function products(category, name, price, colors, stock) {
  this.category = category,
      this.name = name,
      this.price = price,
      this.color = colors,
      this.stock = stock
}

var products = {
  iphones: {
      iphonese: new products("iphones", "Iphone SE", 1200, "Black/Red/Blue", "Yes"),
      iphone12: new products("iphones", "Iphone 12 Pro Max", 8800, "Brown/Blue/Black", "Yes"),
      iphone11: new products("iphones", "Iphone 11 Pro Max", 1400, "Light-Blue", "Yes"),
      iphone13: new products("iphones", "Iphone 13 Pro Max", 1400, "Burgendy", "No"),
     
  }
}
function filter() {
  var userInput = document.getElementById("userInput").value;
  var a = userInput;
  a = a.toLowerCase();
  for (var i = 0; i < a.length; i++) {
      if (a[i] === " ") {
          a = a.slice(0, i) + a.slice(i + 1);
      }
  }
  var firstLetter = userInput.charAt(0).toUpperCase();
  var remain = userInput.slice(1).toLowerCase();
  userInput = firstLetter + remain;
  var flag = false;
  if (userInput != "" && userInput != undefined && userInput != " " && userInput != null) {
      for (var key in products) {
          for (var key2 in products[key]) {
              if (a === key2) {
                  flag = true;
                  document.getElementById("userInput").value = '';
                  document.getElementById("displaye").style.display = 'none';
                  document.getElementById("products").style.display = 'none';
                  document.getElementById("displayc").style.display = 'block';
                  document.getElementById("displayc").innerHTML = document.getElementById(key2).innerHTML;
                  document.getElementById("topButton").style.display = 'none';
                  document.getElementById("homeButton").style.display = 'block';
              }
              else if (userInput === products[key][key2].name) {
                  flag = true;
                  document.getElementById("userInput").value = '';
                  document.getElementById("displaye").style.display = 'none';
                  document.getElementById("products").style.display = 'none';
                  document.getElementById("displayc").style.display = 'block';
                  document.getElementById("displayc").innerHTML = document.getElementById(products[key][key2].name).innerHTML;
                  document.getElementById("topButton").style.display = 'none';
                  document.getElementById("homeButton").style.display = 'block';
              }
          }
      }
      if (flag != true) {
          document.getElementById("displayc").style.display = 'none';
          document.getElementById("products").style.display = 'none';
          document.getElementById("displaye").style.display = 'block';
          document.getElementById("topButton").style.display = 'none';
          document.getElementById("displaye").innerText = "NO RESULTS FOUND!";
          document.getElementById("homeButton").style.display = 'block';
      }
  }
}
function home() {
  setTimeout(function () {
      document.getElementById("userInput").value = '';
      document.getElementById("displayc").style.display = 'none';
      document.getElementById("products").style.display = 'block';
      document.getElementById("homeButton").style.display = 'none';
      document.getElementById("displaye").style.display = 'none';
  }, 1000)
}
function change(id) {
  document.getElementById(id).childNodes[1].style.display = "none";
  document.getElementById(id).childNodes[3].style.display = 'block';
}
function changee(id) {
  document.getElementById(id).childNodes[0].style.display = "none";
  document.getElementById(id).childNodes[1].style.display = 'block';
}
function changeag(id, src) {
  document.getElementById(id).childNodes[1].style.display = "block";
  document.getElementById(id).childNodes[3].style.display = 'none';
}
function changeeag(id, src) {
  document.getElementById(id).childNodes[0].style.display = "block";
  document.getElementById(id).childNodes[1].style.display = 'none';
}
function details(productName, srcc) {
  var src = srcc;
  var name = productName;
  for (var key in products) {
      for (var key2 in products[key]) {
          if (name === key2) {
              swal({
                  title: "Name : " + products[key][key2].name,
                  text: "Category : " + "( " + products[key][key2].category + " )  "
                      + " --- Color : ( " + products[key][key2].color + " ) "
                      + " --- Stock  : ( " + products[key][key2].stock + " ) "
                      + " --- Price : ( RS." + products[key][key2].price + " ) ",
                  textColor: "red",
                  imageUrl: src,
                  imageWidth: 300,
                  imageHeight: 250,
                  imageAlt: 'Custom image',
                  animation: false,
              })
          }
          else if (name === products[key][key2].name) {
              swal({
                  title: "Name : " + products[key][key2].name,
                  text: "Category : " + "( " + products[key][key2].category + " )  "
                      + " --- Color : ( " + products[key][key2].color + " ) "
                      + " --- Stock  : ( " + products[key][key2].stock + " ) "
                      + " --- Price : ( RS." + products[key][key2].price + " ) ",
                  textColor: "red",
                  imageUrl: src,
                  imageWidth: 300,
                  imageHeight: 250,
                  imageAlt: 'Custom image',
                  animation: false,
              })
          }

      }
  }

}




function remove(id) {
  var target = document.getElementById(id);
  swal({
      type: "question",
      title: "Are you sure you want to delete this?",
      text: "If you will delete it once you will no longer have to can access on it.",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'rgb(106, 162, 245)',
      confirmButtonText: 'Delete!',
      cancelButtonText: "Cancel",
      confirmButtonColor: "rgb(87, 206, 87)",
  }).then((result) => {
      if (result.value) {
          target.remove();
          swal({
              type: "success",
              title: "Deleted!"
          })
      }
  })
}

function add(id) {
  document.getElementById("modeForAdd").style.display = 'block';
  document.getElementById('category').innerHTML = id;
}
var counterForFoot = 6;
function insertData(id) {
  swal({
      type: "success",
      title: "Added Successfully!"
  })
  if (id === "iphones") {
      var name = document.getElementById("addName").value;
      var price = document.getElementById("addPrice").value;
      price = Number(price);
      var color = document.getElementById("addColors").value;
      var stock = document.getElementById("addStock").value;
      var firstLetter = name.charAt(0).toUpperCase();
      var remain = name.slice(1).toLowerCase();
      name = firstLetter + remain;

      document.getElementById("addName").value = "";
      document.getElementById("addPrice").value = "";
      document.getElementById("addColors").value = "";
      document.getElementById("addStock").value = "";
      document.getElementById("modeForAdd").style.display = 'none';

      var objName = name;
      console.log(objName)
      for (var i = 0; i < objName.length; i++) {
          if (objName[i] === " ") {
              objName = objName.slice(0, i) + objName.slice(i + 1);
          }
          if (objName[i] === "  ") {
              objName = objName.slice(0, i) + objName.slice(i + 2);
          }
          if (objName[i] === "-") {
              objName = objName.slice(0, i) + objName.slice(i + 1);
          }
          if (objName[i] === "_") {
              objName = objName.slice(0, i) + objName.slice(i + 1);
          }
          objName = objName.toLowerCase();
      }

      for (var key in products) {
          if (key === id) {
              products[key].newProduct = new Products(id, name, price, color, stock)
          }
      }
      counterForFoot++;
      var maintarget = document.getElementById("newAddedOfIphones");

      var mainDiv = document.createElement("div");
      mainDiv.setAttribute("class", "newOne");
      mainDiv.setAttribute("id", name);

      var subDiv = document.createElement("div");
      subDiv.setAttribute("class", "imgCover");
      subDiv.setAttribute("id", 'f' + counterForFoot);
      subDiv.setAttribute("onmouseover", 'changee(' + "'" + 'f' + counterForFoot + "'" + ')');
      subDiv.setAttribute("onmouseout", 'changeeag(' + "'" + 'f' + counterForFoot + "'" + ')');


      var img = document.createElement("img");
      img.setAttribute("src", "f7.png");
      img.setAttribute("width", "200px");
      img.setAttribute("height", "150px");
      img.setAttribute("alt", "Please wait Loading...")

      subDiv.appendChild(img);

      var plus = document.createElement("div");
      plus.setAttribute("class", "b");
      plus.setAttribute("onclick", 'details(' + "'" + name + "'" + ',' + "'" + './f7.png' + "'" + ')');
      var plustext = document.createTextNode("+");
      plus.appendChild(plustext);
      subDiv.appendChild(plus);
      mainDiv.appendChild(subDiv);



      var p = document.createElement("p");
      p.setAttribute("class", "proInfoN");
      p.setAttribute("id", objName + "1");
      p.setAttribute("onclick", 'details(' + "'" + name + "'" + ',' + "'" + './f7.png' + "'" + ')')
      var ptext = document.createTextNode(name);
      p.appendChild(ptext);

      mainDiv.appendChild(p);
      var priceInfo = document.createElement("p");
      priceInfo.setAttribute("class", "proInfo");
      var priceText = document.createTextNode("RS." + price);
      priceInfo.appendChild(priceText);
      mainDiv.appendChild(priceInfo);
      var editBtn = document.createElement("button");
      editBtn.setAttribute("class", "adminBtnsEdit");
      editBtn.setAttribute("title", "More");
      editBtn.setAttribute("onclick", 'details(' + "'" + name + "'" + ',' + "'" + './f7.png' + "'" + ')')
      var editBtnFa = document.createElement("i");
      editBtnFa.setAttribute("class", "fa fa-arrow-up");
      editBtn.appendChild(editBtnFa);
      var editBtnText = document.createTextNode(" MORE");
      editBtn.appendChild(editBtnText);
      mainDiv.appendChild(editBtn);

      var deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("class", "adminBtnsDelete");
      deleteBtn.setAttribute("title", "Delete Product");
      deleteBtn.setAttribute("onclick", 'remove(' + "'" + name + "'" + ')')
      var deleteBtnFa = document.createElement("i");
      deleteBtnFa.setAttribute("class", "fa fa-trash");
      deleteBtn.appendChild(deleteBtnFa);
      var deleteBtnText = document.createTextNode(" Delete");
      deleteBtn.appendChild(deleteBtnText);
      mainDiv.appendChild(deleteBtn);


      maintarget.appendChild(mainDiv);
      var a = document.getElementById("iphoneAdd");
      a.removeAttribute("onclick");
      a.style.backgroundColor = "rgb(164, 252, 164)"
  }
  
}