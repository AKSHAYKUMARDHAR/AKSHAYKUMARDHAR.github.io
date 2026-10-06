/* Portfolio app: renders everything from window.CONTENT and wires the interactions. */
(function () {
  "use strict";

  var C = window.CONTENT;
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // Bold the given phrases inside an already-escaped string.
  function emph(text, phrases) {
    var out = esc(text);
    (phrases || []).forEach(function (p) { out = out.split(esc(p)).join("<strong>" + esc(p) + "</strong>"); });
    return out;
  }

  /* ---------- Icons (lucide, MIT) ---------- */
  var ICONS = {
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
    close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    chevright: '<path d="m9 18 6-6-6-6"/>',
    chevdown: '<path d="m6 9 6 6 6-6"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>'
  };
  function icon(name) {
    return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (ICONS[name] || "") + "</svg>";
  }
  function fillIcons(scope) {
    $$("[data-icon]", scope).forEach(function (el) {
      var n = el.getAttribute("data-icon");
      if (n === "theme") { el.outerHTML = '<span id="themeIcon">' + themeIcon() + "</span>"; return; }
      el.outerHTML = icon(n);
    });
  }
  function themeIcon() { return icon(root.getAttribute("data-theme") === "dark" ? "sun" : "moon"); }

  /* ---------- Hero ---------- */
  var id = C.identity;
  function renderHero() {
    $("#availText").textContent = id.availability;
    $("#roleLine").textContent = id.roleLine;
    var key = "when not to answer.";
    var h = id.headline;
    $("#heroTitle").innerHTML = h.indexOf(key) > -1
      ? esc(h.replace(key, "")) + '<span class="accent">' + esc(key) + "</span>"
      : esc(h);
    $("#heroSub").innerHTML = emph(id.sub, ["39% to 13%"]);
    $("#heroCv").href = id.cv;
    $("#navCv").href = id.cv;
    $("#heroSocial").innerHTML =
      '<a href="' + esc(id.github) + '" target="_blank" rel="noopener" aria-label="GitHub">' + icon("github") + "</a>" +
      '<a href="' + esc(id.linkedin) + '" target="_blank" rel="noopener" aria-label="LinkedIn">' + icon("linkedin") + "</a>" +
      '<a href="mailto:' + esc(id.email) + '" aria-label="Email">' + icon("mail") + "</a>";
  }

  /* ---------- Hero decision log ---------- */
  var termTimers = [];
  function renderTerminal() {
    $("#termBody").innerHTML = C.decisionLog.map(function (r) {
      return '<li class="term-line"><span class="term-in">' + esc(r.input) + '</span>' +
        '<span class="term-via">' + esc(r.via) + '</span>' +
        '<span class="term-out k-' + esc(r.kind) + '">→ ' + esc(r.out) + "</span></li>";
    }).join("");
    $("#termSummary").textContent = C.decisionLogSummary;
    $("#termReplay").addEventListener("click", playTerminal);
  }
  function playTerminal() {
    termTimers.forEach(clearTimeout);
    termTimers = [];
    var lines = $$(".term-line");
    var sum = $("#termSummary");
    lines.forEach(function (l) { l.classList.remove("show"); });
    sum.classList.remove("show");
    if (reduce) {
      lines.forEach(function (l) { l.classList.add("show"); });
      sum.classList.add("show");
      return;
    }
    lines.forEach(function (l, i) {
      termTimers.push(setTimeout(function () { l.classList.add("show"); }, 300 + i * 600));
    });
    termTimers.push(setTimeout(function () { sum.classList.add("show"); }, 300 + lines.length * 600));
  }

  /* ---------- Metrics ---------- */
  function finalText(m) {
    if (m.text) return m.text;
    if (m.format === "fromTo") return m.from + m.suffix + " → " + m.to + m.suffix;
    return (m.prefix || "") + m.to.toFixed(m.decimals || 0) + (m.suffix || "");
  }
  function renderMetrics() {
    $("#metrics").innerHTML = C.metrics.map(function (m, i) {
      return '<div class="metric reveal"><div class="metric-num" data-i="' + i + '">' + esc(finalText(m)) + "</div>" +
        '<div class="metric-label">' + esc(m.label) + "</div>" +
        '<div class="metric-src">' + esc(m.source) + "</div></div>";
    }).join("");
  }
  function animateMetric(el) {
    var m = C.metrics[+el.getAttribute("data-i")];
    if (reduce || m.text) { el.textContent = finalText(m); return; }
    var from = m.format === "fromTo" ? m.from : 0;
    var start = null;
    var dur = 1300;
    function step(t) {
      if (start === null) start = t;
      var p = Math.min(1, (t - start) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      var v = from + (m.to - from) * e;
      if (m.format === "fromTo") el.textContent = m.from + m.suffix + " → " + Math.round(v) + m.suffix;
      else el.textContent = (m.prefix || "") + v.toFixed(m.decimals || 0) + (m.suffix || "");
      if (p < 1) requestAnimationFrame(step); else el.textContent = finalText(m);
    }
    requestAnimationFrame(step);
  }

  /* ---------- About ---------- */
  function renderAbout() {
    $("#aboutText").innerHTML = C.about.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    $("#principles").innerHTML = C.principles.map(function (p, i) {
      return '<div class="card principle reveal"><span class="n">' + (i + 1) + "</span><div><h3>" + esc(p.title) + "</h3><p>" + esc(p.text) + "</p></div></div>";
    }).join("");
  }

  /* ---------- Tab keyboard helper ---------- */
  function tabKeys(container, selector, onSelect) {
    container.addEventListener("keydown", function (e) {
      var items = $$(selector, container);
      var i = items.indexOf(document.activeElement);
      if (i < 0) return;
      var next = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % items.length;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + items.length) % items.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = items.length - 1;
      if (next === null) return;
      e.preventDefault();
      items[next].focus();
      onSelect(next);
    });
  }

  /* ---------- Pipelines ---------- */
  function renderPipeline(boxId, panelId, stages, initial) {
    var box = $("#" + boxId);
    box.innerHTML = stages.map(function (s, i) {
      return (i ? '<span class="pipe-arrow" aria-hidden="true">' + icon("chevright") + "</span>" : "") +
        '<button class="stage k-' + esc(s.kind) + '" type="button" role="tab" id="' + boxId + "-t" + i +
        '" aria-controls="' + panelId + '" aria-selected="false" tabindex="-1" data-i="' + i + '"><b>' + esc(s.name) +
        "</b><small>" + esc(s.label) + "</small></button>";
    }).join("");
    function select(i) {
      $$(".stage", box).forEach(function (b) {
        var on = +b.getAttribute("data-i") === i;
        b.setAttribute("aria-selected", String(on));
        b.tabIndex = on ? 0 : -1;
      });
      var s = stages[i];
      var panel = $("#" + panelId);
      panel.className = "stage-panel k-" + s.kind;
      panel.setAttribute("aria-labelledby", boxId + "-t" + i);
      panel.innerHTML = "<h5>" + esc(s.name) + "</h5><p>" + esc(s.detail) + "</p>" +
        (s.tools ? '<div class="tools">' + s.tools.map(function (t) {
          return '<div class="tool"><code>' + esc(t.name) + "</code><span>" + esc(t.text) + "</span></div>";
        }).join("") + "</div>" : "");
    }
    box.addEventListener("click", function (e) {
      var b = e.target.closest(".stage");
      if (b) select(+b.getAttribute("data-i"));
    });
    tabKeys(box, ".stage", select);
    select(initial);
  }

  /* ---------- Case study ---------- */
  function renderCase() {
    var cs = C.caseStudy, p1 = cs.part1, p2 = cs.part2;
    $("#caseTitle").textContent = cs.title;
    $("#caseSub").textContent = cs.sub;

    $("#p1Kicker").textContent = p1.kicker;
    $("#p1Title").textContent = p1.title;
    $("#p1Problem").innerHTML = p1.problem.map(function (t) {
      return "<p>" + emph(t, ["39% of transactions landed uncategorized", "categorize more without trading away precision"]) + "</p>";
    }).join("");
    $("#p1Role").textContent = p1.role;
    $("#p1Stack").innerHTML = p1.stack.map(function (s) { return '<span class="chip">' + esc(s) + "</span>"; }).join("");
    renderPipeline("pipe1", "pipe1Panel", p1.stages, 4);
    $("#calls").innerHTML = p1.calls.map(function (c) {
      return '<div class="card call reveal"><h5>' + esc(c.call) + "</h5><p>" + esc(c.did) + '</p><div class="res">' + esc(c.result) + "</div></div>";
    }).join("");
    $("#silentFailure").textContent = p1.silentFailure;

    $("#p2Kicker").textContent = p2.kicker;
    $("#p2Title").textContent = p2.title;
    $("#p2Intro").innerHTML = emph(p2.intro, ["synthetic data only", "Claude Code"]);
    renderPipeline("pipe2", "pipe2Panel", p2.stages, 5);
    $("#p2Ops").textContent = p2.ops;

    $("#footnotes").innerHTML = p2.footnotes.map(function (f) { return "<p>" + esc(f) + "</p>"; }).join("");
    $("#resultsNote").textContent = p2.resultsNote;
    $("#takeaway").innerHTML = emph(p2.takeaway, ["98.0% vs 90.7% precision"]);
    $("#bugs").textContent = p2.bugs;
    $("#gate").textContent = p2.gate;
    $("#caseCta").href = id.caseStudy;
    $("#repoCta").href = p2.repo;

    renderResultTabs();
    renderResults();
    renderWalk();
  }

  /* ---------- Results explorer ---------- */
  var res = { key: "golden", table: false };
  function pct(v) { return (v === 0 || v === 100 ? String(v) : v.toFixed(1)) + "%"; }
  function renderResultTabs() {
    var R = C.caseStudy.part2.results;
    var tabs = $("#resultTabs");
    tabs.innerHTML = Object.keys(R).map(function (k) {
      return '<button class="tab" type="button" role="tab" data-k="' + k + '" aria-selected="' + (k === res.key) + '" tabindex="' + (k === res.key ? 0 : -1) + '">' + esc(R[k].tab) + "</button>";
    }).join("");
    var keys = Object.keys(R);
    function select(i) {
      res.key = keys[i];
      $$(".tab", tabs).forEach(function (b) {
        var on = b.getAttribute("data-k") === res.key;
        b.setAttribute("aria-selected", String(on));
        b.tabIndex = on ? 0 : -1;
      });
      renderResults();
    }
    tabs.addEventListener("click", function (e) {
      var b = e.target.closest(".tab");
      if (b) select(keys.indexOf(b.getAttribute("data-k")));
    });
    tabKeys(tabs, ".tab", select);
    $("#tableToggle").addEventListener("click", function () {
      res.table = !res.table;
      this.setAttribute("aria-pressed", String(res.table));
      this.textContent = res.table ? "View as chart" : "View as table";
      renderResults();
    });
  }
  function renderResults() {
    var r = C.caseStudy.part2.results[res.key];
    var body = $("#resultsBody");
    var V = ["A", "B", "C"];
    if (res.table) {
      body.innerHTML = '<div style="overflow-x:auto"><table class="res-table"><thead><tr><th scope="col">Version</th>' +
        r.metrics.map(function (m) { return '<th scope="col">' + esc(m) + "</th>"; }).join("") + "</tr></thead><tbody>" +
        V.map(function (v) {
          return '<tr class="' + (v === "C" ? "is-c" : "") + '"><td>' + v + "</td>" +
            r.rows[v].map(function (x) { return "<td>" + pct(x) + "</td>"; }).join("") + "</tr>";
        }).join("") + "</tbody></table></div>";
    } else {
      body.innerHTML = '<div class="metric-groups">' + r.metrics.map(function (m, j) {
        var lower = /wrong|Review rate/.test(m);
        return '<div class="mg"><h5>' + esc(m) + (lower ? ' <span class="muted-sm">lower is better</span>' : "") + "</h5>" +
          V.map(function (v) {
            var x = r.rows[v][j];
            return '<div class="bar-row' + (v === "C" ? " is-c" : "") + '"><span class="lab">' + v + '</span>' +
              '<span class="track"><span class="fill ' + v.toLowerCase() + '" data-w="' + x + '"></span></span>' +
              '<span class="val">' + pct(x) + "</span></div>";
          }).join("") + "</div>";
      }).join("") + "</div>";
      var fills = $$(".fill", body);
      var apply = function () { fills.forEach(function (f) { f.style.width = f.getAttribute("data-w") + "%"; }); };
      if (reduce) apply(); else requestAnimationFrame(function () { requestAnimationFrame(apply); });
    }
    $("#resultsCaption").textContent = r.caption;
  }

  /* ---------- Walkthrough ---------- */
  var walkTimers = [];
  function renderWalk() {
    var p2 = C.caseStudy.part2;
    var list = $("#walkList");
    list.innerHTML = p2.examples.map(function (ex, i) {
      return '<button class="ex" type="button" role="tab" data-i="' + i + '" aria-selected="false" tabindex="-1" aria-controls="walkPanel"><small>' +
        esc(ex.title) + "</small><b>" + esc(ex.input) + "</b></button>";
    }).join("");
    function select(i) {
      $$(".ex", list).forEach(function (b) {
        var on = +b.getAttribute("data-i") === i;
        b.setAttribute("aria-selected", String(on));
        b.tabIndex = on ? 0 : -1;
      });
      var ex = p2.examples[i];
      walkTimers.forEach(clearTimeout);
      walkTimers = [];
      $("#walkMap").innerHTML = '<p class="walk-input" style="flex-basis:100%"><span>input › </span>' + esc(ex.input) + "</p>" +
        p2.walkNodes.map(function (n) {
          var cls = n === "Human review" ? " review" : n === "Auto-post" ? " post" : "";
          return '<span class="wnode' + cls + '" data-n="' + esc(n) + '"><span class="step"></span>' + esc(n) + "</span>";
        }).join("");
      ex.path.forEach(function (n, k) {
        var node = $('.wnode[data-n="' + n.replace(/"/g, '\\"') + '"]', $("#walkMap"));
        if (!node) return;
        var light = function () { node.classList.add("on"); $(".step", node).textContent = String(k + 1); };
        if (reduce) light(); else walkTimers.push(setTimeout(light, 120 + k * 380));
      });
      var cmp = $("#walkCompare");
      if (ex.without) {
        cmp.className = "walk-compare";
        cmp.innerHTML = '<div class="cmp bad"><h6>' + esc(ex.withoutLabel) + "</h6><p>" + esc(ex.without) + "</p></div>" +
          '<div class="cmp good"><h6>' + esc(ex.withLabel) + "</h6><p>" + esc(ex.with) + "</p></div>";
      } else {
        cmp.className = "walk-compare single";
        cmp.innerHTML = '<div class="cmp good"><h6>What happens</h6><p>' + esc(ex.with) + "</p></div>";
      }
    }
    list.addEventListener("click", function (e) {
      var b = e.target.closest(".ex");
      if (b) select(+b.getAttribute("data-i"));
    });
    tabKeys(list, ".ex", select);
    select(2);
  }

  /* ---------- Experience ---------- */
  function renderExperience() {
    $("#timeline").innerHTML = C.experience.map(function (x, i) {
      var open = i === 0;
      return '<li class="tl-item reveal' + (open ? " current" : "") + '"><div class="card tl-card">' +
        '<div class="tl-top"><div><h3>' + esc(x.title) + '</h3><div class="tl-co"><b>' + esc(x.company) + "</b> · " + esc(x.context) + "</div></div>" +
        '<div class="tl-meta">' + esc(x.dates) + "<br>" + esc(x.location) + "</div></div>" +
        '<p class="tl-sum">' + esc(x.summary) + "</p>" +
        '<button class="link-btn tl-toggle" type="button" aria-expanded="' + open + '" aria-controls="tl-b' + i + '">' +
        (open ? "Hide details" : "Show details") + icon("chevdown") + "</button>" +
        '<ul class="tl-bullets" id="tl-b' + i + '"' + (open ? "" : " hidden") + ">" +
        x.bullets.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + "</ul></div></li>";
    }).join("");
    $("#timeline").addEventListener("click", function (e) {
      var b = e.target.closest(".tl-toggle");
      if (!b) return;
      var open = b.getAttribute("aria-expanded") !== "true";
      b.setAttribute("aria-expanded", String(open));
      b.innerHTML = (open ? "Hide details" : "Show details") + icon("chevdown");
      $("#" + b.getAttribute("aria-controls")).hidden = !open;
    });
  }

  /* ---------- Projects ---------- */
  function renderProjects() {
    $("#filters").innerHTML = C.projectFilters.map(function (f, i) {
      return '<button class="filter" type="button" data-f="' + esc(f) + '" aria-pressed="' + (i === 0) + '">' + esc(f) + "</button>";
    }).join("");
    $("#projectGrid").innerHTML = C.projects.map(function (p) {
      return '<article class="card project reveal' + (p.featured ? " featured" : "") + '" data-cats="' + esc(p.cats.join("|")) + '">' +
        (p.featured ? '<span class="badge">Featured</span>' : "") +
        "<h3>" + esc(p.title) + "</h3>" +
        '<div class="ctx">' + esc(p.context) + (p.date ? " · " + esc(p.date) : "") + "</div>" +
        "<p>" + esc(p.text) + "</p>" +
        '<div class="chips">' + p.tags.map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") + "</div>" +
        '<a class="repo" href="' + esc(p.link) + '" target="_blank" rel="noopener">' + icon("github") + "View on GitHub</a>" +
        "</article>";
    }).join("");
    $("#filters").addEventListener("click", function (e) {
      var b = e.target.closest(".filter");
      if (!b) return;
      var f = b.getAttribute("data-f");
      $$(".filter").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      $$(".project").forEach(function (card) {
        var cats = card.getAttribute("data-cats").split("|");
        card.hidden = !(f === "All" || cats.indexOf(f) > -1);
        if (!card.hidden) card.classList.add("in");
      });
    });
  }

  /* ---------- Skills ---------- */
  function renderSkills() {
    $("#skillGrid").innerHTML = C.skills.map(function (g, gi) {
      return '<div class="card skill-group reveal"><h3>' + esc(g.group) + '</h3><div class="chips">' +
        g.items.map(function (it, ii) {
          return '<button class="skill-chip" type="button" aria-pressed="false" aria-describedby="used-' + gi + '" data-g="' + gi + '" data-i="' + ii + '">' + esc(it[0]) + "</button>";
        }).join("") + '</div><p class="used" id="used-' + gi + '" aria-live="polite"></p></div>';
    }).join("");
    function show(btn) {
      var g = +btn.getAttribute("data-g"), i = +btn.getAttribute("data-i");
      $$('.skill-chip[data-g="' + g + '"]').forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      $("#used-" + g).textContent = "Used in: " + C.skills[g].items[i][1];
    }
    var grid = $("#skillGrid");
    grid.addEventListener("mouseover", function (e) { var b = e.target.closest(".skill-chip"); if (b) show(b); });
    grid.addEventListener("focusin", function (e) { var b = e.target.closest(".skill-chip"); if (b) show(b); });
    grid.addEventListener("click", function (e) { var b = e.target.closest(".skill-chip"); if (b) show(b); });
  }

  /* ---------- Education etc ---------- */
  function renderEducation() {
    var edu = '<div class="card edu-card reveal"><h3>Education</h3><ul>' + C.education.map(function (e) {
      return "<li><b>" + esc(e.degree) + "</b>" + esc(e.school) + '<br><span>' + esc(e.dates) + "</span>" + (e.note ? "<br>" + esc(e.note) : "") + "</li>";
    }).join("") + "</ul></div>";
    function list(title, items) {
      return '<div class="card edu-card reveal"><h3>' + esc(title) + "</h3><ul>" + items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>";
    }
    $("#eduGrid").innerHTML = edu + list("Certifications", C.certifications) + list("Awards", C.awards) + list("Languages", C.languages);
  }

  /* ---------- Contact ---------- */
  function copyEmail() {
    var done = function () { toast("Email copied"); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(id.email).then(done, fallback);
    } else fallback();
    function fallback() {
      var t = document.createElement("textarea");
      t.value = id.email;
      t.setAttribute("readonly", "");
      t.style.position = "fixed";
      t.style.opacity = "0";
      document.body.appendChild(t);
      t.select();
      try { document.execCommand("copy"); done(); } catch (e) { toast(id.email); }
      document.body.removeChild(t);
    }
  }
  function renderContact() {
    $("#contactLine").textContent = C.contact.line;
    var a = $("#emailLink");
    a.textContent = id.email;
    a.href = "mailto:" + id.email;
    $("#copyEmail").addEventListener("click", copyEmail);
    $("#contactLinks").innerHTML =
      '<a class="btn btn-ghost" href="' + esc(id.linkedin) + '" target="_blank" rel="noopener">' + icon("linkedin") + "LinkedIn</a>" +
      '<a class="btn btn-ghost" href="' + esc(id.github) + '" target="_blank" rel="noopener">' + icon("github") + "GitHub</a>" +
      '<a class="btn btn-primary" href="' + esc(id.cv) + '" target="_blank" rel="noopener">' + icon("download") + "Download CV</a>";
    $("#locationText").textContent = id.location;
    $("#year").textContent = String(new Date().getFullYear());
  }

  /* ---------- Toast ---------- */
  var toastTimer = null;
  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 1800);
  }

  /* ---------- Theme ---------- */
  function setupTheme() {
    $("#themeBtn").addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      $("#themeIcon").innerHTML = themeIcon();
    });
  }

  /* ---------- Nav ---------- */
  function setupNav() {
    var links = $("#navLinks");
    var btn = $("#menuBtn");
    function setMenu(open) {
      links.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      btn.innerHTML = icon(open ? "close" : "menu");
    }
    btn.addEventListener("click", function () { setMenu(!links.classList.contains("open")); });
    links.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });

    if (!("IntersectionObserver" in window)) return;
    var map = {};
    $$("a", links).forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          $$("a", links).forEach(function (a) { a.classList.remove("active"); });
          map[en.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (k) { var s = document.getElementById(k); if (s) io.observe(s); });
  }

  /* ---------- Command palette ---------- */
  function setupPalette() {
    var back = $("#palette"), input = $("#paletteInput"), list = $("#paletteList");
    var lastFocus = null, sel = 0, shown = [];
    function go(hash) { return function () { var el = document.getElementById(hash); if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }; }
    function open(url) { return function () { window.open(url, "_blank", "noopener"); }; }
    var items = [
      { label: "About", hint: "section", run: go("about") },
      { label: "Case study", hint: "section", run: go("case") },
      { label: "Results explorer", hint: "case study", run: go("results") },
      { label: "Walk a transaction through the system", hint: "case study", run: go("walk") },
      { label: "Experience", hint: "section", run: go("experience") },
      { label: "Projects", hint: "section", run: go("projects") },
      { label: "Skills", hint: "section", run: go("skills") },
      { label: "Education and certifications", hint: "section", run: go("education") },
      { label: "Contact", hint: "section", run: go("contact") },
      { label: "Download CV", hint: "PDF", run: open(id.cv) },
      { label: "Read the case study", hint: "PDF", run: open(id.caseStudy) },
      { label: "Open GitHub", hint: "link", run: open(id.github) },
      { label: "Open LinkedIn", hint: "link", run: open(id.linkedin) },
      { label: "Copy email", hint: "action", run: copyEmail },
      { label: "Toggle theme", hint: "action", run: function () { $("#themeBtn").click(); } }
    ];
    function render() {
      var q = input.value.trim().toLowerCase();
      shown = items.filter(function (it) { return !q || it.label.toLowerCase().indexOf(q) > -1 || it.hint.indexOf(q) > -1; });
      if (sel >= shown.length) sel = 0;
      list.innerHTML = shown.length ? shown.map(function (it, i) {
        return '<li role="option" id="pal-' + i + '" data-i="' + i + '" aria-selected="' + (i === sel) + '">' + esc(it.label) + "<small>" + esc(it.hint) + "</small></li>";
      }).join("") : '<li class="empty">No matches</li>';
      input.setAttribute("aria-activedescendant", shown.length ? "pal-" + sel : "");
      var cur = $("#pal-" + sel);
      if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: "nearest" });
    }
    function show() {
      lastFocus = document.activeElement;
      back.hidden = false;
      input.value = "";
      sel = 0;
      render();
      input.focus();
    }
    function hide() {
      back.hidden = true;
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function run(i) {
      var it = shown[i];
      if (!it) return;
      hide();
      it.run();
    }
    $("#paletteBtn").addEventListener("click", show);
    document.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        if (back.hidden) show(); else hide();
      }
    });
    input.addEventListener("input", function () { sel = 0; render(); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); if (shown.length) { sel = (sel + 1) % shown.length; render(); } }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (shown.length) { sel = (sel - 1 + shown.length) % shown.length; render(); } }
      else if (e.key === "Enter") { e.preventDefault(); run(sel); }
      else if (e.key === "Escape") { e.preventDefault(); hide(); }
      else if (e.key === "Tab") { e.preventDefault(); }
    });
    list.addEventListener("click", function (e) {
      var li = e.target.closest("li[data-i]");
      if (li) run(+li.getAttribute("data-i"));
    });
    back.addEventListener("mousedown", function (e) { if (e.target === back) hide(); });
  }

  /* ---------- Scroll reveal + counters ---------- */
  function setupObservers() {
    var reveals = $$(".reveal");
    var nums = $$(".metric-num");
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("in"); });
      nums.forEach(function (el) { el.textContent = finalText(C.metrics[+el.getAttribute("data-i")]); });
      return;
    }
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); rio.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    reveals.forEach(function (el) { rio.observe(el); });
    var nio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateMetric(en.target); nio.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    nums.forEach(function (el) { nio.observe(el); });
  }

  /* ---------- Boot ---------- */
  renderHero();
  renderTerminal();
  renderMetrics();
  renderAbout();
  renderCase();
  renderExperience();
  renderProjects();
  renderSkills();
  renderEducation();
  renderContact();
  fillIcons(document);
  setupTheme();
  setupNav();
  setupPalette();
  setupObservers();
  playTerminal();
})();
