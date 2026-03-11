const pageConfig = {
  heroLogo: "",
  teaser: {
    kind: "image",
    src: "assets/media/images/teaser.png",
    poster: "",
    caption: "",
  },
  overview: {
    kind: "image",
    src: "assets/media/images/method-2.png",
    poster: "",
    caption: "",
  },
  interactiveViewer: {
    referenceImage: "",
    fallbackVideo: "",
    thumbnails: 18,
  },
  method: {
    primary: {
      kind: "image",
      src: "assets/media/images/method-2.png",
      poster: "",
      caption: "",
    },
    secondary: {
      kind: "image",
      src: "",
      poster: "",
      caption: "",
    },
  },
  gallery: {
    caption: "",
    slides: [
      {
        title: "Case 42",
        rows: [
          { kind: "image", src: "assets/media/images/42.png", label: "source image" },
          { kind: "placeholder", label: "" },
          {
            kind: "video",
            src: "assets/media/videos/obama_42_recomposed.mp4",
            poster: "assets/media/images/obama_42_recomposed_poster.png",
            label: "reenactment result",
          },
        ],
      },
      {
        title: "Case ave1",
        rows: [
          { kind: "image", src: "assets/media/images/ave1.png", label: "source image" },
          { kind: "placeholder", label: "" },
          {
            kind: "video",
            src: "assets/media/videos/obama_ave1_recomposed.mp4",
            poster: "assets/media/images/obama_ave1_recomposed_poster.png",
            label: "reenactment result",
          },
        ],
      },
      {
        title: "Case cap",
        rows: [
          { kind: "image", src: "assets/media/images/cap.png", label: "source image" },
          { kind: "placeholder", label: "" },
          {
            kind: "video",
            src: "assets/media/videos/obama_cap_recomposed.mp4",
            poster: "assets/media/images/obama_cap_recomposed_poster.png",
            label: "reenactment result",
          },
        ],
      },
      {
        title: "",
        rows: [
          { kind: "placeholder", label: "" },
          { kind: "placeholder", label: "" },
          { kind: "placeholder", label: "" },
        ],
      },
    ],
  },
  baseline: {
    intro: "",
    captionA: "",
    captionB: "",
    carouselA: [{ kind: "placeholder" }, { kind: "placeholder" }, { kind: "placeholder" }],
    carouselB: [{ kind: "placeholder" }, { kind: "placeholder" }, { kind: "placeholder" }],
  },
  moreResults: {
    sections: {
      a: [
        { kind: "placeholder", label: "" },
        { kind: "placeholder", label: "" },
        { kind: "placeholder", label: "" },
      ],
      b: [
        { kind: "placeholder", label: "" },
        { kind: "placeholder", label: "" },
        { kind: "placeholder", label: "" },
      ],
      c: [
        { kind: "placeholder", label: "" },
        { kind: "placeholder", label: "" },
        { kind: "placeholder", label: "" },
      ],
    },
  },
};

function setText(id, value) {
  const node = document.getElementById(id);
  if (!node) return;

  if (value) {
    node.textContent = value;
    node.classList.remove("is-hidden");
  } else {
    node.classList.add("is-hidden");
  }
}

function createPlaceholder(square = false) {
  const panel = document.createElement("div");
  panel.className = `placeholder-panel${square ? " is-square" : ""}`;
  return panel;
}

function createMedia(item) {
  if (!item || item.kind === "placeholder" || !item.src) {
    return createPlaceholder();
  }

  const shell = document.createElement("div");
  shell.className = "media-shell";

  if (item.kind === "video") {
    const video = document.createElement("video");
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.controls = true;
    video.src = item.src;
    if (item.poster) video.poster = item.poster;
    shell.append(video);
    return shell;
  }

  const image = document.createElement("img");
  image.src = item.src;
  image.alt = item.alt || "";
  image.loading = "lazy";
  image.decoding = "async";
  shell.append(image);
  return shell;
}

function renderSingleMedia(containerId, media, captionId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.replaceChildren(createMedia(media));
  if (captionId) setText(captionId, media.caption);
}

function renderHeroLogo() {
  const logo = document.getElementById("hero-logo");
  if (!logo) return;

  if (pageConfig.heroLogo) {
    logo.src = pageConfig.heroLogo;
    logo.classList.remove("is-hidden");
  } else {
    logo.classList.add("is-hidden");
  }
}

function renderInteractiveViewer() {
  const container = document.getElementById("interactive-viewer");
  if (!container) return;

  const stage = document.createElement("div");
  stage.className = "viewer-stage";

  const reference = document.createElement("div");
  reference.className = "viewer-reference";
  if (pageConfig.interactiveViewer.referenceImage) {
    const image = document.createElement("img");
    image.src = pageConfig.interactiveViewer.referenceImage;
    image.alt = "Reference image";
    reference.append(image);
  } else {
    reference.append(createPlaceholder(true));
  }
  const refLabel = document.createElement("p");
  refLabel.className = "viewer-label";
  refLabel.textContent = "";
  reference.append(refLabel);

  const canvasShell = document.createElement("div");
  canvasShell.className = "viewer-canvas-shell";
  if (pageConfig.interactiveViewer.fallbackVideo) {
    const video = document.createElement("video");
    video.className = "viewer-canvas";
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.controls = true;
    video.src = pageConfig.interactiveViewer.fallbackVideo;
    canvasShell.append(video);
  } else {
    const canvas = document.createElement("div");
    canvas.className = "viewer-canvas";
    canvasShell.append(canvas);
  }

  stage.append(reference, canvasShell);

  const previews = document.createElement("div");
  previews.className = "viewer-previews";
  for (let index = 0; index < pageConfig.interactiveViewer.thumbnails; index += 1) {
    const thumb = document.createElement("div");
    thumb.className = "viewer-thumb";
    previews.append(thumb);
  }

  container.replaceChildren(stage, previews);
}

function createGalleryItem(slide) {
  const item = document.createElement("div");
  item.className = "item item-video3";

  if (slide.title) {
    const title = document.createElement("h2");
    title.className = "title is-4 gallery-item-title";
    title.textContent = slide.title;
    item.append(title);
  }

  const stack = document.createElement("div");
  stack.className = "gallery-stack";

  slide.rows.forEach((row, index) => {
    stack.append(createMedia(row));

    if (row.label) {
      const label = document.createElement("h2");
      label.className = "subtitle has-text-centered is-max-desktop gallery-row-label";
      label.textContent = row.label;
      stack.append(label);
    }

    if (index !== slide.rows.length - 1) {
      const spacer = document.createElement("hr");
      spacer.className = "gallery-spacer";
      spacer.style.border = "none";
      spacer.style.background = "transparent";
      stack.append(spacer);
    }
  });

  item.append(stack);
  return item;
}

function renderGallery() {
  setText("gallery-caption", pageConfig.gallery.caption);
  const container = document.getElementById("gallery-carousel");
  if (!container) return;
  container.replaceChildren(...pageConfig.gallery.slides.map(createGalleryItem));
}

function createBaselineItem(itemConfig) {
  const item = document.createElement("div");
  item.className = "item item-video3";
  item.append(createMedia(itemConfig));
  return item;
}

function renderBaseline() {
  setText("baseline-intro", pageConfig.baseline.intro);
  setText("baseline-caption-a", pageConfig.baseline.captionA);
  setText("baseline-caption-b", pageConfig.baseline.captionB);

  const carouselA = document.getElementById("baseline-carousel-a");
  const carouselB = document.getElementById("baseline-carousel-b");
  if (carouselA) {
    carouselA.replaceChildren(...pageConfig.baseline.carouselA.map(createBaselineItem));
  }
  if (carouselB) {
    carouselB.replaceChildren(...pageConfig.baseline.carouselB.map(createBaselineItem));
  }
}

function createMoreResultsCard(itemConfig) {
  const card = document.createElement("div");
  card.className = "more-results-card";
  card.append(createMedia(itemConfig));
  if (itemConfig.label) {
    const label = document.createElement("h2");
    label.className = "subtitle has-text-centered is-max-desktop";
    label.textContent = itemConfig.label;
    card.append(label);
  }
  return card;
}

function renderMoreResults() {
  const map = {
    a: "more-results-a",
    b: "more-results-b",
    c: "more-results-c",
  };

  Object.entries(map).forEach(([key, id]) => {
    const container = document.getElementById(id);
    if (!container) return;
    const items = pageConfig.moreResults.sections[key] || [];
    container.replaceChildren(...items.map(createMoreResultsCard));
  });
}

function initCarousels() {
  if (!window.bulmaCarousel) return;

  window.bulmaCarousel.attach(".carousel", {
    slidesToScroll: 1,
    slidesToShow: 1,
    loop: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeroLogo();
  renderSingleMedia("teaser-media", pageConfig.teaser, "teaser-caption");
  renderSingleMedia("overview-media", pageConfig.overview, "overview-caption");
  renderInteractiveViewer();
  renderSingleMedia("method-primary", pageConfig.method.primary, "method-primary-caption");
  renderSingleMedia("method-secondary", pageConfig.method.secondary, "method-secondary-caption");
  renderGallery();
  renderBaseline();
  renderMoreResults();
  initCarousels();
});
