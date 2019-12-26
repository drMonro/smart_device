'use strict';



// Аккордеон

var AccordionCheckBoxes = document.querySelectorAll(".accordion__checkbox");

var accordionSetup = function() {
  AccordionCheckBoxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function (evt) {
      // evt.preventDefault();
      if (checkbox.closest('.accordion__checkbox').checked === true) {
        checkbox.checked = true;
      } else {
        checkbox.closest('.accordion__checkbox').checked = true;
        checkbox.checked = false;
      }
    });
  });
};


// Форма
var isStorageSupport = true;
var name_storage = "";
var phone_storage = "";
var question_storage = "";

var popup = document.querySelector(".modal");
var name = popup.querySelector("[name=name]");
var phone = popup.querySelector("[name=phone-number]");
var question = popup.querySelector("[name=question]");

var modalButton = document.querySelector(".page-header__button");
var closeModalButton = popup.querySelector(".modal__close-button");
var nameInput = popup.querySelector(".modal__input--name");
var PhoneInputs = document.querySelectorAll("[name=phone-number]");

try {
  name_storage = localStorage.getItem("name");
} catch (err) {
  isStorageSupport = false;
}

try {
  phone_storage = localStorage.getItem("phone-number");
} catch (err) {
  isStorageSupport = false;
}

try {
  question_storage = localStorage.getItem("question");
} catch (err) {
  isStorageSupport = false;
}

var isClickOutside = function (evt, cssSelector) {
  var target = evt.target;
  var element = target.closest(cssSelector);
  return !element;
};

var onSuccessWindowOutsideCLick = function (evt) {
  if (isClickOutside(evt, '.modal__form')) {
    popup.classList.remove("modal--show");
  }
};


//Скроллер
var ScrollButtons = document.querySelectorAll(".button--js-scroll");
var formSection = "form--js";


var currentYPosition = function () {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) return self.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}


var elmYPosition = function (eID) {
  var elm = document.getElementById(eID);
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent != document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  } return y;
}


var smoothScroll = function (eID) {
  var startY = currentYPosition();
  var stopY = elmYPosition(eID);
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY); return;
  }
  var speed = Math.round(distance / 100);
  if (speed >= 10) speed = 30;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for ( var i=startY; i<stopY; i+=step ) {
      setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
      leapY += step; if (leapY > stopY) leapY = stopY; timer++;
    } return;
  }
  for ( var i=startY; i>stopY; i-=step ) {
    setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
    leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
  }
}

var scrollSetup = function(scrollInputs, scrollDestination) {
  scrollInputs.forEach(function (scrollButton) {
    scrollButton.addEventListener('click', function (evt) {
      smoothScroll(scrollDestination);
    });
  });
};


// Валидация телефона

var phoneBeginning = '+7(';

var phoneMask = {
  mask: '+7(CCC)NNNNNNN',
  blocks: {
    CCC: {
      mask: '000'
    },
    NNNNNNN: {
      mask: '0000000',
    }
  }
};

var phoneValidationSetup = function (phoneInputs, inputMask) {

  phoneInputs.forEach(function (phoneInput) {
    var cellularPhone = new IMask(phoneInput, inputMask);
    phoneInput.addEventListener('focus', function (evt) {
      if(evt.currentTarget.value === '') {
        evt.currentTarget.value = phoneBeginning;
      }
    });
  });
};

// Исполнение

accordionSetup();
scrollSetup(ScrollButtons, formSection);
phoneValidationSetup(PhoneInputs, phoneMask);


popup.addEventListener('click', onSuccessWindowOutsideCLick);

modalButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal--show");
  nameInput.focus();
  if (name_storage) {
    name.value = name_storage;
  }
  if (phone_storage) {
    phone.value = phone_storage;
  }
  if (question_storage) {
    question.value = question_storage;
  }
});

closeModalButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal--show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("modal--show")) {
      popup.classList.remove("modal--show");
    }
  }
});
