(function () {
  var btn = document.getElementById("menuBtn");
  var menu = document.getElementById("menu");
  var close = document.getElementById("menuClose");

  function openMenu() {
    if (!menu) return;
    menu.classList.add("on");
    document.body.classList.add("lock");
  }
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("on");
    document.body.classList.remove("lock");
  }

  if (btn) btn.addEventListener("click", openMenu);
  if (close) close.addEventListener("click", closeMenu);
  if (menu) {
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

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
