$(document).ready(function () {

  // $(".navigation-sec .nav-item").click(function () {
  //   $(this)
  //     .children()
  //     .addClass("active")
  //     .parent()
  //     .siblings()
  //     .find(".active")
  //     .removeClass("active");
  // });

  $(".second-button").on("click", function () {
    $(".animated-icon").toggleClass("open");
  });


  $('.openBtn').click(function (e) {
    setTimeout(function () { $('.popup').removeClass('animationClose').addClass('animationOpen'); }, 100);
    $('.obscure').fadeIn(50, function () { $(this).focus(); });
    e.preventDefault();
  });

  $(".chat-button").click(function () {
    $(".chat_box .container").slideToggle();
    $(this).toggleClass("act");
    $('.chat-sec').removeAttr("style");
    if ($(this).text() == "✕") {
      $(".chat_box .goto-chat").show();
      $(".chat_box .body").html("");
    }
    $(this).text($(this).text() == 'm' ? '✕' : 'm');
    $('.start-chat .head p').text('Hello Ask Us Anything, Share Your Feedback.')
  });
  $(".goto-chat").click(function () {
    $('.chat-sec').fadeIn();
    $(this).slideUp();
    $("#chatbot-input").focus();
  });


  $("#sendchatbot").on("click", function () {
    var chatbox_txt = $("#chatbot-input").val();
    if (chatbox_txt.trim()) {
      $(".chat_box .goto-chat").hide();
      $(".chat_box .body").css('visibility', 'visible');
      $(".chat_box .body").append("<div class='incoming'><div class='bubble'><p>" + chatbox_txt + "</p></div></div>");
      $(".chat_box .body").append("<div class='typing' id='chatbox-typing'><div class='bubble'><span class='avatar'></span><div class='ellipsis dot_1'></div><div class='ellipsis dot_2'></div><div class='ellipsis dot_3'></div></div></div>");
      $("#chatbot-input").val("");
      $(".chat_box .body").animate({ scrollTop: $('.chat_box .body').prop("scrollHeight") }, 1000);
      $('.start-chat .head p').text('The team typically replies in a few minuts.')
      //$('.chat_box .body').scrollTop($('.chat_box .body')[0].scrollHeight);
      $.ajax({
        url: "https://api.adviceslip.com/advice",
        method: "get",
        data: {},
        success: function (response) {
          setTimeout(function () {
            response = JSON.parse(response);
            $("#chatbox-typing").remove();
            $(".chat_box .body").append("<div class='outgoing'><div class='bubble'><span class='avatar'></span><p>" + response.slip.advice + "</p></div></div>");
          }, 2000);
        }
      });
    }
  });

  document.getElementById("chatbot-input").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      var chatbox_txt = $("#chatbot-input").val();
      if (chatbox_txt.trim()) {
        document.getElementById("sendchatbot").click();
      }
    }
  });


});
