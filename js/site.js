(function () {
  var root = document.getElementById("heroSlider");
  if (root) {
    var slides = [].slice.call(root.querySelectorAll(".slide"));
    var dotsWrap = document.getElementById("dots");
    var i = 0;
    var timer;

    slides.forEach(function (_, n) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Slide " + (n + 1));
      if (n === 0) b.className = "is-on";
      b.addEventListener("click", function () { go(n); });
      dotsWrap.appendChild(b);
    });
    var dots = [].slice.call(dotsWrap.querySelectorAll("button"));

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
      timer = setInterval(function () { go(i + 1); }, 10000);
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
