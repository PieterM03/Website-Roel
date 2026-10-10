(function () {
  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function sampleEdgeAverageColor(img) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;

    var w = img.naturalWidth || img.width;
    var h = img.naturalHeight || img.height;
    if (!w || !h) return null;

    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(img, 0, 0, w, h);

    var band = Math.max(2, Math.floor(Math.min(w, h) * 0.04));

    var regions = [
      ctx.getImageData(0, 0, w, band),
      ctx.getImageData(0, h - band, w, band),
      ctx.getImageData(0, 0, band, h),
      ctx.getImageData(w - band, 0, band, h)
    ];

    var totalR = 0;
    var totalG = 0;
    var totalB = 0;
    var count = 0;

    for (var r = 0; r < regions.length; r++) {
      var data = regions[r].data;
      for (var i = 0; i < data.length; i += 4) {
        var alpha = data[i + 3];
        if (alpha < 10) continue;
        totalR += data[i];
        totalG += data[i + 1];
        totalB += data[i + 2];
        count++;
      }
    }

    if (!count) return null;

    return {
      r: Math.round(totalR / count),
      g: Math.round(totalG / count),
      b: Math.round(totalB / count)
    };
  }

  function tintColor(base, factorTowardWhite) {
    return {
      r: Math.round(base.r + (255 - base.r) * factorTowardWhite),
      g: Math.round(base.g + (255 - base.g) * factorTowardWhite),
      b: Math.round(base.b + (255 - base.b) * factorTowardWhite)
    };
  }

  function setCardTheme(card, color) {
    var bg = tintColor(color, 0.88);
    var border = tintColor(color, 0.75);
    var divider = tintColor(color, 0.68);

    card.style.setProperty("--card-bg", "rgb(" + bg.r + ", " + bg.g + ", " + bg.b + ")");
    card.style.setProperty("--card-border", "rgb(" + border.r + ", " + border.g + ", " + border.b + ")");
    card.style.setProperty("--card-divider", "rgb(" + divider.r + ", " + divider.g + ", " + divider.b + ")");
  }

  function applyCardThemes() {
    var cards = document.querySelectorAll(".band-product-card");
    cards.forEach(function (card) {
      var img = card.querySelector("img");
      if (!img) return;

      function process() {
        try {
          var base = sampleEdgeAverageColor(img);
          if (!base) return;

          base.r = clamp(base.r, 0, 255);
          base.g = clamp(base.g, 0, 255);
          base.b = clamp(base.b, 0, 255);

          setCardTheme(card, base);
        } catch (e) {
          // Ignore image sampling errors and keep default card style.
        }
      }

      if (img.complete && img.naturalWidth > 0) {
        process();
      } else {
        img.addEventListener("load", process, { once: true });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyCardThemes);
  } else {
    applyCardThemes();
  }
})();
