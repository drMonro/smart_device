'use strict';

// Аккордеон

var AccordionButtons = document.querySelectorAll('.accordion__button');

var accordionSetup = function (buttons) {
  buttons.forEach(function (button) {
    button.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (button.closest('.accordion__button').classList.contains('accordion__button-active')) {
        buttons.forEach(function (accordion) {
          accordion.classList.remove('accordion__button-active');
        });
      } else {
        buttons.forEach(function (accordion) {
          accordion.classList.remove('accordion__button-active');
        });
        button.classList.add('accordion__button-active');
      }
    });
  });
};

// Форма
var ESC_KEY_CODE = 27;
var isStorageSupport = true;
var nameStorage = '';
var phoneStorage = '';
var questionStorage = '';
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
  nameStorage = localStorage.getItem('name');
} catch (err) {
  isStorageSupport = false;
}

try {
  phoneStorage = localStorage.getItem('phone-number');
} catch (err) {
  isStorageSupport = false;
}

try {
  questionStorage = localStorage.getItem('question');
} catch (err) {
  isStorageSupport = false;
}


var formsSetup = function (nameInputs, phoneInputs, questionInputs, forms) {
  nameInputs.forEach(function (inputName) {
    if (nameStorage) {
      inputName.value = nameStorage;
    }
  });

  phoneInputs.forEach(function (phoneInput) {
    if (phoneStorage) {
      phoneInput.value = phoneStorage;
    }
  });

  questionInputs.forEach(function (questionInput) {
    if (questionStorage) {
      questionInput.value = questionStorage;
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

var showModal = function () {
  popup.classList.add('js--modal--show');
  body.classList.add('js-body-overflow');
};

var hideModal = function () {
  popup.classList.remove('js--modal--show');
  body.classList.remove('js-body-overflow');
};


var isClickOutside = function (evt, cssSelector) {
  var target = evt.target;
  var element = target.closest(cssSelector);
  return !element;
};

var onSuccessWindowOutsideCLick = function (evt) {
  if (isClickOutside(evt, '.modal__form')) {
    hideModal();
  }
};

// Скроллер
var scrollToFormButton = document.querySelector('.js-scroll-to-form');
var scrollToAdvantagesButton = document.querySelector('.js-scroll-to-advantages');
var formSectionID = 'js-form-position';
var advantagesSectionID = 'js-advantages-position';


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
  while (node.offsetParent && node.offsetParent !== document.body) {
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
      var bottomScrollHandler = 'window.scrollTo(0, ' + leapY + ')';
      setTimeout(bottomScrollHandler, timer * speed);
      leapY += step;
      if (leapY > stopY) {
        leapY = stopY;
      }
      timer++;
    }
    return;
  }
  for (var j = startY; j > stopY; j -= step) {
    var topScrollHandler = 'window.scrollTo(0, ' + leapY + ')';
    setTimeout(topScrollHandler, timer * speed);
    leapY -= step;
    if (leapY < stopY) {
      leapY = stopY;
    }
    timer++;
  }
};

var scrollSetup = function (scrollButton, scrollDestination) {
  scrollButton.addEventListener('click', function () {
    smoothScroll(scrollDestination);
  });
};

// Валидация телефона
var IMask;
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

accordionSetup(AccordionButtons);
scrollSetup(scrollToFormButton, formSectionID);
scrollSetup(scrollToAdvantagesButton, advantagesSectionID);
phoneValidationSetup(PhoneInputs, phoneMask);
formsSetup(NameInputs, PhoneInputs, QuestionInputs, Forms);

popup.addEventListener('click', onSuccessWindowOutsideCLick);

modalButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  showModal();
  if (nameInput) {
    nameInput.focus();
  }
});

closeModalButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  hideModal();
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    evt.preventDefault();
    if (popup.classList.contains('js--modal--show')) {
      hideModal();
    }
  }
});
