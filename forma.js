let openPopupButtons = document.querySelectorAll('.open_button');
let form = document.querySelector('.forma');
let popup = document.querySelector('.popup');

let names = document.getElementById('name');
let email = document.getElementById('email');
let sms = document.getElementById('sms');
let checkbox = document.getElementById('checkbox');

function save() {
  localStorage.setItem('Имя', names.value);
  localStorage.setItem('Эл. почта', email.value);
  localStorage.setItem('Сообщение', sms.value);
  if (checkbox.checked) {
    localStorage.setItem('Согласие', 1);
  } else {
    localStorage.setItem('Согласие', 0);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  names.value = localStorage.getItem('Имя');
  email.value = localStorage.getItem('Эл. почта');
  sms.value = localStorage.getItem('Сообщение');
  let checkBox = localStorage.getItem('Согласие');
  if (checkBox == 1) {
    checkbox.checked = true;
  } else if (checkBox == 0) {
    checkbox.checked = false;
  }
  
  names.oninput = save;
  email.oninput = save;
  sms.oninput = save;
  checkbox.oninput = save;

  openPopupButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    window.onpopstate = function () {
      window.history.go(0);
      form.classList.remove('open');
      popup.classList.remove('popup_open');
    };
    history.pushState({ page: 1 }, '', '?forma');
    form.classList.add('open');
    popup.classList.add('popup_open');
  });
});

  $(function(){
    $(".forma").submit(function(e){
      e.preventDefault();
      var href = $(this).attr("action");
      $.ajax({
          type: "POST",
          dataType: "json",
          url: href,
          data: $(this).serialize(),
          success: function(response){
              if(response.status == "success"){
                  alert("Форма отправленна успешно!");
                  localStorage.removeItem('Имя');
                  localStorage.removeItem('Эл. почта');
                  localStorage.removeItem('Сообщение');
                  localStorage.removeItem('Согласие');
                  names.value = localStorage.getItem('Имя');
                  email.value = localStorage.getItem('Эл. почта');
                  sms.value = localStorage.getItem('Сообщение');
                  checkbox.checked = false;
              }
          },
          error: function (status) {
            alert('Ошибка! Попробуйте еще раз!');
          },
      });
    });
  });
}); 
