/* visa.html — destination guides (search + region chips) and document checklist generator */
(function () {
  "use strict";

  var DESTINATIONS = [
    {
      id: "schengen", code: "EU", name: "Schengen Area", region: "europe",
      keywords: "europe germany france netherlands italy spain belgium sweden switzerland austria greece portugal",
      visa: "Short-stay C visa, up to 90 days",
      processing: "15 days (up to 45 in peak season)",
      govFee: "€90", fee: 60,
      where: "Apply at the embassy or VFS Global centre of your main destination. Germany, the Netherlands, Belgium and others process in Kampala; some states via Nairobi.",
      docs: [
        "Schengen application form, completed and signed",
        "Travel medical insurance, minimum €30,000 cover valid in all Schengen states",
        "Flight reservation and hotel bookings covering the whole stay",
        "Cover letter explaining your trip and itinerary"
      ]
    },
    {
      id: "uk", code: "UK", name: "United Kingdom", region: "europe",
      keywords: "britain england london scotland gov.uk",
      visa: "Standard Visitor visa, up to 6 months",
      processing: "About 3 weeks after biometrics",
      govFee: "£127", fee: 60,
      where: "Apply online at GOV.UK, then attend biometrics at the VFS Global visa application centre in Kampala.",
      docs: [
        "Online application confirmation and appointment letter",
        "Evidence of income: payslips, tax returns or business accounts",
        "Accommodation details and travel plan",
        "TB test certificate (only for stays over 6 months)"
      ]
    },
    {
      id: "usa", code: "US", name: "United States", region: "americas",
      keywords: "america usa new york b1 b2 ds-160",
      visa: "B1/B2 business and tourist visa",
      processing: "Interview wait varies; 3–7 working days after approval",
      govFee: "$185 MRV fee", fee: 50,
      where: "Complete the DS-160 online, then attend an in-person interview at the U.S. Embassy Kampala on Ggaba Road.",
      docs: [
        "DS-160 confirmation page with barcode",
        "MRV fee receipt and interview appointment letter",
        "5 x 5 cm photo uploaded to the DS-160",
        "Evidence of ties to Uganda: employment, property, family"
      ]
    },
    {
      id: "canada", code: "CA", name: "Canada", region: "americas",
      keywords: "toronto ircc trv visitor",
      visa: "Visitor visa (TRV)",
      processing: "Several weeks to a few months (check IRCC estimates)",
      govFee: "CA$100 + CA$85 biometrics", fee: 70,
      where: "Apply online through an IRCC account, then give biometrics at the VFS Global centre in Kampala.",
      docs: [
        "IRCC online application and Family Information form (IMM 5707)",
        "Biometric instruction letter",
        "Proof of funds and purpose of travel",
        "Travel history: previous visas and entry stamps"
      ]
    },
    {
      id: "uae", code: "AE", name: "United Arab Emirates", region: "asia", light: true,
      keywords: "dubai abu dhabi uae emirates middle east",
      visa: "Tourist visa, 30 or 60 days",
      processing: "3–5 working days",
      govFee: "From approx. $100 (30 days)", fee: 35,
      where: "No embassy visit needed. Issued electronically through an airline or a UAE-licensed sponsor; we lodge it for you.",
      docs: [
        "Colour scan of passport bio page",
        "Passport photo on a white background",
        "Confirmed return ticket",
        "Hotel booking or host’s details in the UAE"
      ]
    },
    {
      id: "china", code: "CN", name: "China", region: "asia",
      keywords: "beijing shanghai guangzhou cova",
      visa: "Tourist (L) or Business (M) visa",
      processing: "4–5 working days (express available)",
      govFee: "From approx. $60", fee: 50,
      where: "Complete the online form, then submit in person at the Chinese Visa Application Service Center in Kampala.",
      docs: [
        "Online visa application (COVA) confirmation, printed and signed",
        "Round-trip flight and hotel bookings",
        "Previous Chinese visas, if any",
        "Invitation letter from a Chinese company (business visas)"
      ]
    },
    {
      id: "south-africa", code: "ZA", name: "South Africa", region: "africa",
      keywords: "johannesburg cape town durban",
      visa: "Visitor visa",
      processing: "5–10 working days",
      govFee: "Confirmed at application", fee: 50,
      where: "Submit in person at the VFS Global South Africa visa centre in Kampala.",
      docs: [
        "Form DHA-84, completed and signed",
        "Yellow fever vaccination certificate",
        "Return ticket and itinerary",
        "Bank statements for the last 3 months"
      ]
    },
    {
      id: "eatv", code: "EA", name: "East Africa Tourist Visa", region: "africa", light: true,
      keywords: "uganda rwanda kenya east africa eatv inbound safari",
      visa: "Multiple entry, 90 days (Uganda, Rwanda, Kenya)",
      processing: "3–5 working days",
      govFee: "$100", fee: 25,
      where: "For foreign visitors. Apply online through the immigration portal of your first country of entry. Not needed by East African citizens.",
      docs: [
        "Scan of passport bio page",
        "Recent passport photo",
        "Yellow fever vaccination certificate",
        "Itinerary showing your first country of entry"
      ]
    },
    {
      id: "india", code: "IN", name: "India", region: "asia", light: true,
      keywords: "delhi mumbai e-visa evisa",
      visa: "e-Tourist or e-Business visa",
      processing: "72 hours to 4 working days",
      govFee: "From $25 (varies by duration)", fee: 30,
      where: "Most travellers use the online e-Visa, no visit needed. Regular visas through the High Commission of India in Kampala.",
      docs: [
        "Passport bio page scan (PDF)",
        "Recent photo on a white background",
        "Return or onward ticket",
        "Business card and invitation letter (e-Business)"
      ]
    },
    {
      id: "turkey", code: "TR", name: "Türkiye", region: "europe",
      keywords: "turkey istanbul ankara antalya",
      visa: "Sticker visa or conditional e-Visa",
      processing: "5–15 working days at the embassy",
      govFee: "Varies by nationality", fee: 45,
      where: "Ugandans normally apply at the Embassy of Türkiye in Kampala. Holders of a valid US, UK, Schengen or Irish visa may qualify for an e-Visa.",
      docs: [
        "Completed visa application form",
        "Hotel bookings and return flight",
        "Travel medical insurance",
        "Valid US, UK or Schengen visa (for the e-Visa route)"
      ]
    }
  ];

  var CORE = [
    "Passport valid 6+ months beyond your return date, with 2 blank pages",
    "Copies of previous passports and visas",
    "Recent passport photos to the embassy’s specification",
    "National ID (original and copy)",
    "Bank statements for the last 6 months, stamped by the bank"
  ];
  var CORE_LIGHT = [
    "Passport valid 6+ months beyond your return date",
    "Digital passport photo",
    "National ID copy"
  ];

  var PURPOSES = {
    tourist: {
      label: "Tourist",
      docs: [
        "Day-by-day itinerary",
        "Return flight reservation",
        "Hotel bookings for every night",
        "Employer leave letter, or business registration if self-employed"
      ]
    },
    business: {
      label: "Business",
      docs: [
        "Invitation letter from the host company stating purpose and dates",
        "Employer’s introduction letter confirming your role, salary and who pays",
        "Company registration certificate and trading licence (if self-employed)",
        "Conference or event registration, if applicable"
      ]
    },
    student: {
      label: "Student",
      docs: [
        "Unconditional admission letter (CAS for UK, I-20 for USA, LOA for Canada)",
        "Proof of tuition payment or scholarship letter",
        "Academic transcripts and certificates",
        "Sponsor’s letter, national ID and bank statements",
        "English test results (IELTS, TOEFL or Duolingo) where required"
      ]
    },
    family: {
      label: "Visiting family",
      docs: [
        "Invitation letter from your host with address and dates",
        "Copy of host’s passport and residence permit or citizenship",
        "Proof of relationship (birth or marriage certificates)",
        "Host’s proof of accommodation and, if sponsoring, their bank statements"
      ]
    }
  };

  var ICON_PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function byId(id) { return document.getElementById(id); }
  function find(id) {
    for (var i = 0; i < DESTINATIONS.length; i++) if (DESTINATIONS[i].id === id) return DESTINATIONS[i];
    return DESTINATIONS[0];
  }

  /* ---------- Guides ---------- */
  var grid = byId("visa-guides");
  var q = byId("visa-q");
  var chips = document.querySelectorAll("#visa-regions [data-region]");
  var countEl = byId("visa-count");
  var emptyEl = byId("visa-empty");
  var region = "all";

  function card(d) {
    return '<article class="visa-card" data-id="' + d.id + '">' +
      '<header class="visa-card__head"><span class="visa-card__code" aria-hidden="true">' + d.code + '</span>' +
      '<div><h3>' + esc(d.name) + '</h3><p>' + esc(d.visa) + '</p></div></header>' +
      '<dl class="visa-card__meta">' +
      '<div><dt>Processing</dt><dd>' + esc(d.processing) + '</dd></div>' +
      '<div><dt>Gov. fee</dt><dd>' + esc(d.govFee) + '</dd></div>' +
      '</dl>' +
      '<p class="visa-card__label">Key documents</p>' +
      '<ul class="visa-card__docs">' + d.docs.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
      '<p class="visa-card__where">' + ICON_PIN + "<span>" + esc(d.where) + "</span></p>" +
      '<footer class="visa-card__foot"><span class="price">Our fee from <strong>$' + d.fee + "</strong></span>" +
      '<button type="button" class="link-arrow" data-checklist="' + d.id + '">Build checklist →</button></footer>' +
      "</article>";
  }

  function renderGuides() {
    if (!grid) return;
    var term = (q && q.value || "").trim().toLowerCase();
    var list = DESTINATIONS.filter(function (d) {
      if (region !== "all" && d.region !== region) return false;
      if (!term) return true;
      return (d.name + " " + d.code + " " + d.keywords + " " + d.visa).toLowerCase().indexOf(term) !== -1;
    });
    var n = list.length;
    var cta = n ? '<aside class="visa-card visa-card--cta" data-m2="' + (n % 2) + '" data-m3="' + (n % 3) + '">' +
      '<div><span class="visa-card__label">Not listed?</span><h3>We cover many more destinations</h3>' +
      '<p>Australia, Qatar, Saudi Arabia (Umrah), Japan, Ireland and beyond. Tell us where you are going and we will confirm the current requirements.</p></div>' +
      '<a class="btn btn-primary btn-sm" href="#apply">Ask about your destination <span class="arr">→</span></a></aside>' : "";
    grid.innerHTML = list.map(card).join("") + cta;
    if (emptyEl) emptyEl.hidden = list.length > 0;
    if (countEl) countEl.textContent = list.length === DESTINATIONS.length
      ? "Showing all " + list.length + " destination guides"
      : "Showing " + list.length + " of " + DESTINATIONS.length + " destination guides";
  }

  if (q) q.addEventListener("input", renderGuides);
  Array.prototype.forEach.call(chips, function (chip) {
    chip.addEventListener("click", function () {
      region = chip.getAttribute("data-region");
      Array.prototype.forEach.call(chips, function (c) {
        var on = c === chip;
        c.setAttribute("aria-pressed", on ? "true" : "false");
        c.classList.toggle("is-active", on);
      });
      renderGuides();
    });
  });
  if (grid) {
    grid.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-checklist]");
      if (!btn) return;
      setDest(btn.getAttribute("data-checklist"));
      var sec = byId("checklist");
      if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ---------- Checklist generator ---------- */
  var destSel = byId("gen-dest");
  var listEl = byId("gen-list");
  var titleEl = byId("gen-title");
  var subEl = byId("gen-sub");
  var progEl = byId("gen-progress");
  var barEl = byId("gen-bar");

  if (destSel) {
    destSel.innerHTML = DESTINATIONS.map(function (d) {
      return '<option value="' + d.id + '">' + esc(d.name) + "</option>";
    }).join("");
  }

  function purpose() {
    var r = document.querySelector('input[name="gen-purpose"]:checked');
    return r ? r.value : "tourist";
  }

  function group(title, items, start) {
    return '<div class="visa-sheet__group"><h4>' + esc(title) + "</h4><ul>" +
      items.map(function (t, i) {
        var id = "gi-" + (start + i);
        return '<li><label class="check"><input type="checkbox" id="' + id + '"> <span>' + esc(t) + "</span></label></li>";
      }).join("") + "</ul></div>";
  }

  function renderChecklist() {
    if (!destSel || !listEl) return;
    var d = find(destSel.value);
    var p = PURPOSES[purpose()];
    var core = d.light ? CORE_LIGHT : CORE;
    var seen = {};
    function uniq(arr) {
      return arr.filter(function (x) { if (seen[x]) return false; seen[x] = 1; return true; });
    }
    var g1 = uniq(core), g2 = uniq(d.docs), g3 = uniq(p.docs);
    titleEl.textContent = d.name + " · " + p.label;
    subEl.textContent = d.visa + " · Typical processing: " + d.processing;
    listEl.innerHTML =
      group("Core documents", g1, 0) +
      group(d.name + " requirements", g2, g1.length) +
      group(p.label + " documents", g3, g1.length + g2.length);
    updateProgress();
  }

  function updateProgress() {
    var boxes = listEl.querySelectorAll('input[type="checkbox"]');
    var done = listEl.querySelectorAll('input[type="checkbox"]:checked').length;
    progEl.textContent = done + " of " + boxes.length + " ready";
    barEl.style.width = boxes.length ? (done / boxes.length * 100) + "%" : "0";
  }

  function setDest(id) {
    if (!destSel) return;
    destSel.value = id;
    renderChecklist();
  }

  if (destSel) {
    destSel.addEventListener("change", renderChecklist);
    document.querySelectorAll('input[name="gen-purpose"]').forEach(function (r) {
      r.addEventListener("change", renderChecklist);
    });
    listEl.addEventListener("change", updateProgress);

    var printBtn = byId("gen-print");
    if (printBtn) {
      printBtn.addEventListener("click", function () {
        document.body.classList.add("print-checklist");
        window.print();
      });
      window.addEventListener("afterprint", function () {
        document.body.classList.remove("print-checklist");
      });
    }

    // Pre-fill the application form with the generator's choice
    var applyLink = byId("gen-apply");
    if (applyLink) {
      applyLink.addEventListener("click", function () {
        var d = find(destSel.value);
        var formDest = byId("a-dest");
        var formPurpose = byId("a-purpose");
        if (formDest) {
          Array.prototype.forEach.call(formDest.options, function (o) {
            if (o.text.indexOf(d.name) === 0) formDest.value = o.value || o.text;
          });
        }
        if (formPurpose) formPurpose.value = PURPOSES[purpose()].label;
      });
    }
  }

  renderGuides();
  renderChecklist();
})();
