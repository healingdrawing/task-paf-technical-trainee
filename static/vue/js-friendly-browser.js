/*
  remove static background
  (with delay to prevent blinking: static -> black -> dynamic, detected by web analyzers)
  in case of javascript is allowed,
  otherwise the ghost is present sometimes when slideshow transition executed.
*/
setTimeout(function() {
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "#000";
}, 4000);