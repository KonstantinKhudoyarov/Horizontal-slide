"use strict";

let Slider = (function() {
  const container = document.querySelector(".items");
  let isDown = false;
  let startX;
  let scrollLeft;

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  function mousedownEvent(e) {
    isDown = true;
    startX = e.pageX - getCoords(container).left;
    scrollLeft = container.scrollLeft;
    container.classList.add("active");
  }

  function mouseupAndLeaveEvents() {
    isDown = false;
    container.classList.remove("active");
  }

  function mousemoveEvent(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - getCoords(container).left;
    const walk = x - startX;
    container.scrollLeft = scrollLeft - walk;
  }

  return {
    container: container,
    mousedownEvent: mousedownEvent,
    mouseupAndLeaveEvents: mouseupAndLeaveEvents,
    mousemoveEvent: mousemoveEvent
  };
})();

Slider.container.addEventListener("mousedown", Slider.mousedownEvent);

Slider.container.addEventListener("mouseup", Slider.mouseupAndLeaveEvents);

Slider.container.addEventListener("mouseleave", Slider.mouseupAndLeaveEvents);

Slider.container.addEventListener("mousemove", Slider.mousemoveEvent);
