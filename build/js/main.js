'use strict';

// Аккордеон

var AccordionCheckBoxes = document.querySelectorAll('.accordion__button');

var accordionSetup = function () {
  AccordionCheckBoxes.forEach(function (checkbox) {
    checkbox.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (checkbox.closest('.accordion__button').classList.contains('accordion__button-active')) {
        AccordionCheckBoxes.forEach(function (accordion) {
          accordion.classList.remove('accordion__button-active');
        });
      } else {
        AccordionCheckBoxes.forEach(function (accordion) {
          accordion.classList.remove('accordion__button-active');
        });
        checkbox.classList.add('accordion__button-active');
      }
    });
  });
};

// Форма
var isStorageSupport = true;
var name_storage = '';
var phone_storage = '';
var question_storage = '';
var popup = document.querySelector('.modal');
var body = document.querySelector('body');
var modalButton = document.querySelector('.page-header__button');
var closeModalButton = popup.querySelector('.modal__close-button');
var nameInput = document.getElementById('name');
var PhoneInputs = document.querySelectorAll('[name=phone-number]');
var NameInputs = document.querySelectorAll('[name=name]');
var QuestionInputs = document.querySelectorAll('[name=question]');
var Forms = document.querySelectorAll('form');


try {
  name_storage = localStorage.getItem('name');
} catch (err) {
  isStorageSupport = false;
}

try {
  phone_storage = localStorage.getItem('phone-number');
} catch (err) {
  isStorageSupport = false;
}

try {
  question_storage = localStorage.getItem('question');
} catch (err) {
  isStorageSupport = false;
}


var inputsSetup = function (nameInputs, phoneInputs, questionInputs, forms) {
  nameInputs.forEach(function (nameInput) {
    if (name_storage) {
      nameInput.value = name_storage;
    }
  });

  phoneInputs.forEach(function (phoneInput) {
    if (phone_storage) {
      phoneInput.value = phone_storage;
    }
  });

  questionInputs.forEach(function (questionInput) {
    if (question_storage) {
      questionInput.value = question_storage;
    }
  });

  forms.forEach(function (form) {
    var name = form.querySelector('[name=name]');
    var phone = form.querySelector('[name=phone-number]');
    var question = form.querySelector('[name=question]');

    form.addEventListener('submit', function () {
      if (isStorageSupport) {
        localStorage.setItem('name', name.value);
        localStorage.setItem('phone', phone.value);
        localStorage.setItem('question', question.value);
      }
    });
  });
};


var isClickOutside = function (evt, cssSelector) {
  var target = evt.target;
  var element = target.closest(cssSelector);
  return !element;
};

var onSuccessWindowOutsideCLick = function (evt) {
  if (isClickOutside(evt, '.modal__form')) {
    popup.classList.remove('modal--js-show');
    body.style.overflow = 'auto';
  }
};


// Скроллер
// var ScrollButtons = document.querySelectorAll('.button--js-scroll');
var scrollToFormButton = document.querySelector('.js-scroll-to-form');
var scrollToAdvantagesButton = document.querySelector('.js-scroll-to-advantages');
var formSection = 'js-form-position';
var advantagesSection = 'js-advantages-position';


var currentYPosition = function () {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) {
    return self.pageYOffset;
  }
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop) {
    return document.documentElement.scrollTop;
  }
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) {
    return document.body.scrollTop;
  }
  return 0;
};

var elmYPosition = function (eID) {
  var elm = document.getElementById(eID);
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent != document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
};

var smoothScroll = function (eID) {
  var startY = currentYPosition();
  var stopY = elmYPosition(eID);
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  var speed = Math.round(distance / 100);
  if (speed >= 10) {
    speed = 30;
  }
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
      leapY += step;
      if (leapY > stopY) {
        leapY = stopY;
      }
      timer++;
    }
    return;
  }
  for (var i = startY; i > stopY; i -= step) {
    setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
    leapY -= step;
    if (leapY < stopY) {
      leapY = stopY;
    }
    timer++;
  }
};

var scrollSetup = function (scrollButton, scrollDestination) {
  // scrollInputs.forEach(function (scrollButton) {
    scrollButton.addEventListener('click', function () {
      smoothScroll(scrollDestination);
    });
  // });
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
      mask: '0000000'
    }
  }
};
var phoneValidationSetup = function (phoneInputs, inputMask) {
  phoneInputs.forEach(function (phoneInput) {
    var cellularPhone = new IMask(phoneInput, inputMask);
    phoneInput.addEventListener('focus', function () {
      if (cellularPhone.value === '') {
        cellularPhone.value = phoneBeginning;
      }
    });
  });
};

// Исполнение

accordionSetup();
scrollSetup(scrollToFormButton, formSection);
scrollSetup(scrollToAdvantagesButton, advantagesSection);
phoneValidationSetup(PhoneInputs, phoneMask);
inputsSetup(NameInputs, PhoneInputs, QuestionInputs, Forms);


popup.addEventListener('click', onSuccessWindowOutsideCLick);

modalButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.add('modal--js-show');
  body.style.overflow = 'hidden';
  if (nameInput) {
    nameInput.focus();
  }
});

closeModalButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.remove('modal--js-show');
  body.style.overflow = 'auto';
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains('modal--js-show')) {
      popup.classList.remove('modal--js-show');
      body.style.overflow = 'auto';
    }
  }
});
