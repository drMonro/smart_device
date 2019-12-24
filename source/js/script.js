'use strict';

window.onload = function () {
  document.body.innerHTML = document.body.innerHTML.replace(/\u2028/g, '');
};

var link = document.querySelector(".contacts-button");
var popup = document.querySelector(".index-write-us");
var close = popup.querySelector(".close-button");
var form = popup.querySelector("form");
var name = popup.querySelector("[name=name]");
var email = popup.querySelector("[name=email]");
var letter = popup.querySelector("[name=letter]");
var isStorageSupport = true;
var login_storage = "";
var email_storage = "";

try {
  login_storage = localStorage.getItem("login");
} catch (err) {
  isStorageSupport = false;
}

try {
  email_storage = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal-show");
  if (email_storage) {
    email.value = email_storage;
    // letter.focus();
  } if (login_storage) {
    login.value = login_storage;
    letter.focus();
  } else {
    login.focus();
  }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  popup.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {
  if (!login.value || !email.value || !letter.value) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("login", login.value);
      localStorage.setItem("email", email.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("modal-show")) {
      popup.classList.remove("modal-show");
      popup.classList.remove("modal-error");
    }
  }
});


