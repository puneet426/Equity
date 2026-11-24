(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");

  /* ---------- mobile menu ---------- */
  var openBtn = document.querySelector("[data-menu-open]");
  var sheet = document.getElementById("menu-sheet");
  if (openBtn && sheet) {
    var closeBtn = sheet.querySelector("[data-menu-close]");
    var setOpen = function (open) {
      sheet.hidden = !open;
      openBtn.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
      (open ? closeBtn : openBtn).focus();
    };
    openBtn.addEventListener("click", function () { setOpen(true); });
    closeBtn.addEventListener("click", function () { setOpen(false); });
    sheet.addEventListener("click", function (e) { if (e.target.closest("nav a")) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !sheet.hidden) setOpen(false); });
  }

  /* ---------- ledger double rule draws in once ---------- */
  var ledgers = document.querySelectorAll(".ledger");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("drawn"); io.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    ledgers.forEach(function (l) { io.observe(l); });
  } else {
    ledgers.forEach(function (l) { l.classList.add("drawn"); });
  }

  /* ---------- enquiry form: validates, then sends to WhatsApp ---------- */
  var form = document.getElementById("enquiry");
  if (form) {
    var WA = form.getAttribute("data-wa");
    var status = form.querySelector(".form-status");
    var submit = form.querySelector("button[type=submit]");

    var fieldOf = function (el) { return el.closest(".field"); };
    var setErr = function (name, msg) {
      var f = form.querySelector('[data-field="' + name + '"]');
      if (!f) return;
      var input = f.querySelector("input, select, textarea");
      f.classList.toggle("has-error", !!msg);
      f.querySelector(".err").textContent = msg || "";
      if (input && input.type !== "radio") input.setAttribute("aria-invalid", msg ? "true" : "false");
    };
    var cleanPhone = function (v) {
      var d = (v || "").replace(/\D/g, "");
      if (d.length === 12 && d.indexOf("91") === 0) d = d.slice(2);
      if (d.length === 11 && d.charAt(0) === "0") d = d.slice(1);
      return d;
    };
    var validate = function () {
      var ok = true;
      var name = form.elements.name.value.trim();
      if (name.length < 2) { setErr("name", "Please write the student's name."); ok = false; } else setErr("name");
      var phone = cleanPhone(form.elements.phone.value);
      if (!/^[6-9]\d{9}$/.test(phone)) { setErr("phone", "Enter a 10-digit mobile number, for example 98765 43210."); ok = false; } else setErr("phone");
      if (!form.querySelector('input[name="course"]:checked')) { setErr("course", "Pick the exam you are preparing for, or “Not sure yet”."); ok = false; } else setErr("course");
      return ok;
    };

    form.addEventListener("input", function (e) {
      var f = fieldOf(e.target);
      if (f && f.classList.contains("has-error")) validate();
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.hidden = true;
      if (!validate()) {
        var first = form.querySelector(".has-error input, .has-error select");
        if (first) first.focus();
        return;
      }
      submit.setAttribute("aria-busy", "true");
      var course = form.querySelector('input[name="course"]:checked').value;
      var lines = [
        "Hello Equity Classes, I would like to know about the next batch.",
        "",
        "Name: " + form.elements.name.value.trim(),
        "Phone: " + cleanPhone(form.elements.phone.value),
        "Course: " + course
      ];
      var stage = form.elements.stage.value;
      if (stage) lines.push("Currently: " + stage);
      var note = form.elements.note.value.trim();
      if (note) lines.push("Note: " + note);
      var url = "https://wa.me/" + WA + "?text=" + encodeURIComponent(lines.join("\n"));

      var win = window.open(url, "_blank", "noopener");
      setTimeout(function () {
        submit.removeAttribute("aria-busy");
        status.hidden = false;
        if (win === null && !/Mobi|Android/i.test(navigator.userAgent)) {
          status.className = "form-status bad";
          status.innerHTML = 'Your browser blocked WhatsApp from opening. <a class="link" href="' + url + '" target="_blank" rel="noopener">Open the message in WhatsApp</a>, or call <a class="link" href="tel:+919288484448">092884 84448</a>.';
        } else {
          status.className = "form-status ok";
          status.innerHTML = "Your message is ready in WhatsApp. Press send there and we will reply during office hours (Mon to Sat, 10:30 AM to 7 PM). If WhatsApp did not open, call <a class=\"link\" href=\"tel:+919288484448\">092884 84448</a>.";
          form.reset();
        }
        status.focus();
      }, 400);
    });
  }

  /* ---------- results page: filter + search ---------- */
  var list = document.getElementById("achievers");
  if (list) {
    var items = Array.prototype.slice.call(list.querySelectorAll("li"));
    var btns = document.querySelectorAll("[data-filter]");
    var q = document.getElementById("achiever-search");
    var count = document.getElementById("achiever-count");
    var empty = document.getElementById("achiever-empty");
    var current = "all";
    var apply = function () {
      var term = (q.value || "").trim().toLowerCase();
      var shown = 0;
      items.forEach(function (li) {
        var match = (current === "all" || li.dataset.cat === current) && (!term || li.dataset.name.indexOf(term) !== -1);
        li.hidden = !match;
        if (match) shown++;
      });
      count.textContent = "Showing " + shown + " of " + items.length + " achievers";
      empty.hidden = shown !== 0;
      if (!shown) empty.querySelector("p").textContent = term ? "No achiever called “" + q.value.trim() + "” in this list." : "No achievers in this group yet.";
    };
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        current = b.dataset.filter;
        btns.forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        apply();
      });
    });
    q.addEventListener("input", apply);
    var reset = document.getElementById("achiever-reset");
    if (reset) reset.addEventListener("click", function () { q.value = ""; btns[0].click(); q.focus(); });
    apply();
  }

  /* ---------- kept from the old site: type "debit" for a joke ---------- */
  var jokes = [
    "Why did the accountant break up? Too many liabilities.",
    "Assets = Liabilities + Equity. Perfectly balanced.",
    "A CS student's favourite key? The Compliance key.",
    "Debit what comes in, credit what goes out. Including your patience during exams."
  ];
  var buf = "";
  var toast = document.getElementById("toast");
  document.addEventListener("keydown", function (e) {
    if (!toast || /input|textarea|select/i.test(e.target.tagName) || !e.key || e.key.length !== 1) return;
    buf = (buf + e.key.toLowerCase()).slice(-5);
    if (buf === "debit") {
      toast.textContent = jokes[Math.floor(Math.random() * jokes.length)];
      toast.hidden = false;
      clearTimeout(toast._t);
      toast._t = setTimeout(function () { toast.hidden = true; }, 4500);
      buf = "";
    }
  });
})();
