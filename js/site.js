(function () {
  var root = document.getElementById("heroSlider");
  if (root) {
    var slides = [].slice.call(root.querySelectorAll(".slide"));
    var dotsWrap = document.getElementById("dots");
    var i = 0;
    var timer;
    var cool = false;
    var playing = true;
    var touchY = null;

    slides.forEach(function (_, n) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Slide " + (n + 1));
      if (n === 0) b.className = "is-on";
      b.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        go(n);
      });
      dotsWrap.appendChild(b);
    });
    var dots = [].slice.call(dotsWrap.querySelectorAll("button"));

    function atHero() {
      return window.scrollY < 40;
    }

    function go(n) {
      slides[i].classList.remove("is-on");
      dots[i].classList.remove("is-on");
      i = (n + slides.length) % slides.length;
      slides[i].classList.add("is-on");
      dots[i].classList.add("is-on");
      restart();
    }

    function restart() {
      clearInterval(timer);
      if (!atHero()) return;
      timer = setInterval(function () { go(i + 1); }, 8000);
    }

    function step(dir) {
      if (cool) return;
      cool = true;
      go(i + dir);
      setTimeout(function () { cool = false; }, 700);
    }

    root.querySelector(".arr.prev").addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      go(i - 1);
    });
    root.querySelector(".arr.next").addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      go(i + 1);
    });

    window.addEventListener("wheel", function (e) {
      if (!atHero()) return;
      if (Math.abs(e.deltaY) < 8) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      var down = e.deltaY > 0;
      if (down && i === slides.length - 1) return;
      if (!down && i === 0) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      step(down ? 1 : -1);
    }, { passive: false });

    root.addEventListener("touchstart", function (e) {
      touchY = e.changedTouches[0].clientY;
    }, { passive: true });
    root.addEventListener("touchmove", function (e) {
      if (!atHero() || touchY == null) return;
      var dy = touchY - e.touches[0].clientY;
      if (dy > 0 && i === slides.length - 1) return;
      if (dy < 0 && i === 0) {
        e.preventDefault();
        return;
      }
      if (Math.abs(dy) > 10) e.preventDefault();
    }, { passive: false });
    root.addEventListener("touchend", function (e) {
      if (touchY == null || !atHero()) return;
      var dy = touchY - e.changedTouches[0].clientY;
      touchY = null;
      if (Math.abs(dy) < 40) return;
      var down = dy > 0;
      if (down && i === slides.length - 1) return;
      if (!down && i === 0) return;
      go(i + (down ? 1 : -1));
    }, { passive: true });

    document.addEventListener("keydown", function (e) {
      if (!atHero()) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        step(-1);
      }
    });

    window.addEventListener("scroll", function () {
      var on = atHero();
      if (on && !playing) {
        playing = true;
        restart();
      } else if (!on && playing) {
        playing = false;
        clearInterval(timer);
      }
    }, { passive: true });

    restart();
  }

  var header = document.querySelector(".site-header");
  var brandImg = header && header.querySelector(".brand img");
  var overPhoto = document.body.classList.contains("home") || document.body.classList.contains("has-hero");

  function setHeader() {
    if (!header) return;
    var solid = !overPhoto || window.scrollY > 24;
    header.classList.toggle("is-solid", solid);
    if (brandImg && overPhoto) {
      var next = solid ? "img/logo-on-light.svg" : "img/logo-on-photo.svg";
      if (brandImg.getAttribute("src") !== next) brandImg.setAttribute("src", next);
    }
  }
  setHeader();
  window.addEventListener("scroll", setHeader, { passive: true });

  var form = document.getElementById("brief");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var name = fd.get("name") || "";
      var type = fd.get("type") || "";
      var area = fd.get("area") || "";
      var how = fd.get("how") || "";
      var note = fd.get("note") || "";
      var body =
        "Ім’я: " + name +
        "\nТип: " + type +
        "\nПлоща: " + area +
        "\nЗв’язок: " + how +
        "\n\n" + note;
      window.location.href =
        "mailto:project@buro312.com?subject=" +
        encodeURIComponent("Бриф: " + type + " / " + name) +
        "&body=" + encodeURIComponent(body);
    });
  }
})();
