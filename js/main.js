document.addEventListener("DOMContentLoaded", function () {
  let wrapper = document.getElementById("wrapper");
  let topLayer = wrapper.querySelector(".top");
  let handle = wrapper.querySelector(".handle");
  let skew = 0;
  let delta = 0;
  if (wrapper.className.indexOf("skewed") != -1) {
    skew = 1000;
  }
  wrapper.addEventListener("mousemove", function (e) {
    delta = (e.clientX - window.innerWidth / 2) * 0.5;
    handle.style.left = e.clientX + delta + "px";
    topLayer.style.width = e.clientX + skew + delta + "px";
  });
});

var $card = $(".card"),
  $cardTitle = $(".card-title"),
  $cardSubtitle = $(".card-subtitle"),
  $cardShine = $(".card-shine"),
  $cardShadow = $(".card-shadow"),
  currentMousePos = {
    x: 0,
    y: 0,
  },
  mouseFromCenter = {
    x: 0,
    y: 0,
  };

var modal = $(".modal"),
  modalBtn = $("[data-toggle=modal]"),
  closeBtn = $(".modal__close"),
  closeSuccess = $(".success__close"),
  modalSuccess = $(".success");

$(this).keydown(function (event) {
  if (event.which == 27) {
    modalSuccess.removeClass("success--visible");
    $("body").css("overflow", "auto");
  }
});
$(document).on("click", function (e) {
  if (modalSuccess.is(e.target)) {
    modalSuccess.toggleClass("success--visible");
    $("body").css("overflow", "auto");
  }
});
closeSuccess.on("click", function () {
  modalSuccess.removeClass("success--visible");
  $("body").css("overflow", "auto");
});

modalBtn.on("click", function () {
  modal.toggleClass("modal--visible");
  $("body").css("overflow", "hidden");
});

closeBtn.on("click", function () {
  modal.toggleClass("modal--visible");
  $("body").css("overflow", "auto");
});
// close esc
$(this).keydown(function (event) {
  if (event.which == 27) {
    modal.removeClass("modal--visible");
    $("body").css("overflow", "auto");
  }
});
$(document).on("click", function (e) {
  if (modal.is(e.target)) {
    modal.removeClass("modal--visible");
    $("body").css("overflow", "auto");
  }
});

$(document).mousemove(function (event) {
  var wHeight = $(window).height(),
    wWidth = $(window).width();

  currentMousePos.x = event.pageX;
  currentMousePos.y = event.pageY;
  mouseFromCenter.x = currentMousePos.x - wWidth / 2;
  mouseFromCenter.y = currentMousePos.y - wHeight / 2;

  var around1 = -1 * (((currentMousePos.y * 100) / wHeight) * 0.2 - 10) + "deg",
    around2 = 1 * (((currentMousePos.x * 100) / wWidth) * 0.2 - 10) + "deg",
    trans1 = ((currentMousePos.x * 100) / wHeight) * 0.3 + "px",
    trans2 = ((currentMousePos.y * 100) / wHeight) * 0.3 + "px",
    dy = event.pageY - wHeight / 2, //@h/2 = center of poster
    dx = event.pageX - wWidth / 2, //@w/2 = center of poster
    theta = Math.atan2(dy, dx), // angle between cursor and center of poster in RAD
    angle = (theta * 180) / Math.PI - 90,
    mousePositionX = (currentMousePos.x / wWidth) * 100,
    mousePositionY = 50 + (currentMousePos.y / wHeight) * 10;

  // gradient angle and opacity for card shine effect
  $cardShine.css(
    "background",
    "linear-gradient(" +
    angle +
    "deg, rgba(255,255,255," +
    (currentMousePos.y / wHeight) * 0.7 +
    ") 0%,rgba(255,255,255, 0) 80%)"
  );
  // card pos and angle
  $card.css({
    "-webkit-transform": "translate3d(" +
      trans1 +
      ", " +
      trans2 +
      ", 0) scale(1) rotatex(" +
      around1 +
      ") rotatey(" +
      around2 +
      ")",
    "background-position": mousePositionX + "%" + " " + (currentMousePos.y / wHeight) * 50 + "%",
  });
  // card shadow pos and angle
  $cardShadow.css({
    transform: "scale(.9,.9) translateX(" +
      (mouseFromCenter.x * -0.02 + 12) +
      "px) translateY(" +
      (mouseFromCenter.y * -0.02 + 12) +
      "px) scale(1.0) rotateY(" +
      (mouseFromCenter.x / 25) * 0.5 +
      "deg) rotateX(" +
      mouseFromCenter.y / -25 +
      "deg)",
  });

  $cardTitle.css({
    transform: "translateX(" +
      (mouseFromCenter.x / 25) * 0.7 +
      "px) translateY(" +
      (mouseFromCenter.y / 25) * 1.65 +
      "px)",
  });

  $cardSubtitle.css({
    transform: "translateX(" +
      (mouseFromCenter.x / 25) * 0.5 +
      "px) translateY(" +
      (mouseFromCenter.y / 25) * 1.15 +
      "px) translateZ(60px)",
  });
});

$(function () {
  var $app = $(".app");
  var $img = $(".app__img");
  var $pageNav1 = $(".pages__item--1");
  var $pageNav2 = $(".pages__item--2");
  var animation = true;
  var curSlide = 1;
  var scrolledUp = void 0,
    nextSlide = void 0;

  $(".header-btn").on("click", function () {
    $(".mobile__menu").addClass("active");
    $("body").css("overflow", "hidden");
  });

  $(".mobile__close-btn").on("click", function () {
    $(".mobile__menu").removeClass("active");
    $("body").css("overflow", "auto");
  });
  $(".mobile__link").on("click", function () {
    $(".mobile__menu").removeClass("active");
    $("body").css("overflow", "auto");
  });

  var pagination = function pagination(slide, target) {
    animation = true;
    if (target === undefined) {
      nextSlide = scrolledUp ? slide - 1 : slide + 1;
    } else {
      nextSlide = target;
    }

    $(".pages__item--" + nextSlide).addClass("page__item-active");
    $(".pages__item--" + slide).removeClass("page__item-active");

    $app.toggleClass("active");
    setTimeout(function () {
      animation = false;
    }, 3000);
  };

  var navigateDown = function navigateDown() {
    if (curSlide > 1) return;
    scrolledUp = false;
    pagination(curSlide);
    curSlide++;
  };

  var navigateUp = function navigateUp() {
    if (curSlide === 1) return;
    scrolledUp = true;
    pagination(curSlide);
    curSlide--;
  };

  setTimeout(function () {
    $app.addClass("initial");
  }, 1500);

  setTimeout(function () {
    animation = false;
  }, 4500);

  $(document).on("mousewheel DOMMouseScroll", function (e) {
    var delta = e.originalEvent.wheelDelta;
    if (animation) return;
    if (delta > 0 || e.originalEvent.detail < 0) {
      navigateUp();
    } else {
      navigateDown();
    }
  });

  $(document).on("click", ".pages__item:not(.page__item-active)", function () {
    if (animation) return;
    var target = +$(this).attr("data-target");
    pagination(curSlide, target);
    curSlide = target;
  });
  $(".contacts__form").validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // строчное правило, converted to {required:true}
      userName: {
        required: true,
        minlength: 2,
      },
      userPhone: {
        required: true,
        minlength: 7,
      },
      // правило-объект
      userEmail: {
        required: true,
        email: true,
      },
      userQuestion: {
        required: true,
      },
    }, // сообщения
    messages: {
      userName: {
        required: "Name required",
        minlength: "Name is not less then two letters",
      },
      userPhone: {
        required: "Phone is required",
        minlength: "Phone should be full",
      },
      userEmail: {
        required: "Email is required",
        email: "Email should be written as example@gmail.com",
      },
      userQuestion: {
        required: "Please write your question",
      },
    },

    // submitHandler: function (form) {
    //   $(form).ajaxSubmit();
    // }
  });

  // E-mail Ajax Send
  $(".contacts__form").submit(function () {
    //Change
    event.preventDefault();
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize(),
    }).done(function () {
      $(".success").addClass("success--visible");
      $("body").css("overflow", "hidden");
      $(form)[0].reset();
    });
    return false;
  });

  $(".modal__form").validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // строчное правило, converted to {required:true}
      userName: {
        required: true,
        minlength: 2,
      },
      userPhone: {
        required: true,
        minlength: 7,
      },
      // правило-объект
      userEmail: {
        required: true,
        email: true,
      },
      userQuestion: {
        required: true,
        minlength: 5,
      },
    }, // сообщения
    messages: {
      userName: {
        required: "Name required",
        minlength: "Name is not less then two letters",
      },
      userPhone: {
        required: "Phone is required",
        minlength: "Phone should be full",
      },
      userEmail: {
        required: "Email is required",
        email: "Email should be written as example@gmail.com",
      },
      userQuestion: {
        required: "Question is required",
        minlength: "Message is not less then five letters",
      },
    },
  });

  // E-mail Ajax Send
  $(".modal__form").submit(function () {
    //Change
    event.preventDefault();
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize(),
    }).done(function () {
      $(".modal").removeClass("modal--visible");
      $(".success").addClass("success--visible");
      $("body").css("overflow", "hidden");
      $(form)[0].reset();
    });
    return false;
  });
});

$(window).scroll(function () {
  var scroll = $(window).scrollTop();

  if (scroll >= 5) {
    $(".header__bottom").addClass("active");
    $(".header-btn").addClass("active");
  } else {
    $(".header__bottom").removeClass("active");
    $(".header-btn").removeClass("active");
  }
});

$(".map-info__circle--1").mouseover(function () {
  $(".map-info__content--1").addClass("active");
});
$(".map-info__circle--1").mouseleave(function () {
  $(".map-info__content--1").removeClass("active");
});

$(".map-info__circle--2").mouseover(function () {
  $(".map-info__content--2").addClass("active");
});
$(".map-info__circle--2").mouseleave(function () {
  $(".map-info__content--2").removeClass("active");
});
$(".map-info__circle--3").mouseover(function () {
  $(".map-info__content--3").addClass("active");
});
$(".map-info__circle--3").mouseleave(function () {
  $(".map-info__content--3").removeClass("active");
});

new WOW().init();

window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
}