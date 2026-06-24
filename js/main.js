/* LIIE v2 — interactions minimales : menu mobile + reveals au scroll */
(function () {
  "use strict";

  // ----- Menu mobile -----
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  // ----- Formulaire de contact -----
  var form = document.getElementById("contactForm");
  if (form) {
    var status = form.querySelector("[data-form-status]");
    var formspree = (form.dataset.formspree || "").trim();

    if (formspree) {
      // Mode Formspree : vrai envoi serveur, sans recharger la page.
      form.setAttribute("action", formspree);
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var data = new FormData(form);
        if (status) status.textContent = "Envoi en cours…";
        fetch(formspree, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (r) {
            if (r.ok) {
              form.reset();
              if (status) status.textContent = "Merci, votre message a bien été envoyé.";
            } else {
              if (status) status.textContent = "Une erreur est survenue. Écrivez-nous directement à cerimed-contact@univ-amu.fr.";
            }
          })
          .catch(function () {
            if (status) status.textContent = "Connexion impossible. Écrivez-nous à cerimed-contact@univ-amu.fr.";
          });
      });
    } else {
      // Mode mailto par défaut : ouvre le client mail pré-rempli.
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = (form.elements.name && form.elements.name.value || "").trim();
        var email = (form.email && form.email.value || "").trim();
        var org = (form.organisation && form.organisation.value || "").trim();
        var msg = (form.message && form.message.value || "").trim();
        var to = form.dataset.email || "cerimed-contact@univ-amu.fr";
        var subject = "Contact LIIE" + (name ? " — " + name : "");
        var body =
          "Nom : " + name + "\n" +
          "Email : " + email + "\n" +
          (org ? "Structure : " + org + "\n" : "") +
          "\n" + msg + "\n";
        window.location.href =
          "mailto:" + to +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(body);
        if (status) status.textContent = "Votre logiciel de messagerie s'ouvre, message pré-rempli.";
      });
    }
  }

  // ----- Reveals au scroll -----
  var els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) {
    els.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  els.forEach(function (el) { io.observe(el); });
})();
