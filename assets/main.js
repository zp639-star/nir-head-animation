const pageConfig = {
  heroLogo: "",
  teaser: {
    kind: "image",
    src: "assets/media/images/teaser.png",
    poster: "",
    caption:
      "Overview: Given a single input image, our method reconstructs an animatable 3D Gaussian head by first recovering a Neutral Identity Representation (NIR) that removes source expression and pose while preserving identity. This representation enables faithful expression transfer from driving inputs. In contrast, existing methods such as LAM (He et al., 2025) often suffer from source-expression leakage and identity distortion.",
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
      caption:
        "Pipeline overview: Given a single source image, our method reconstructs a Neutral Identity Representation (NIR), an expression-neutral Gaussian head that removes transient facial motions while preserving identity-specific geometry and appearance. Expressions from the driving image are then transferred through 3DMM-based motion parameters with identity-aware refinement, enabling natural and identity-consistent reenactment across diverse expressions.",
    },
    secondary: {
      title: "Dynamic Pipeline",
      kind: "video",
      src: "assets/media/videos/dynamic_pipeline_overview.mp4",
      poster: "assets/media/images/dynamic_pipeline_overview_poster.png",
      caption:
        "Dynamic pipeline: the source image is first restored to the Neutral Identity Representation and then animated into the final 4D Gaussian avatar.",
    },
  },
  gallery: {
    caption: "",
    pages: [
      {
        items: [
          {
            title: "Case 42",
            source: { kind: "image", src: "assets/media/images/42.png" },
            result: {
              kind: "video",
              src: "assets/media/videos/obama_42_recomposed.mp4",
              poster: "assets/media/images/obama_42_recomposed_poster.png",
            },
          },
          {
            title: "Case ave1",
            source: { kind: "image", src: "assets/media/images/ave1.png" },
            result: {
              kind: "video",
              src: "assets/media/videos/obama_ave1_recomposed.mp4",
              poster: "assets/media/images/obama_ave1_recomposed_poster.png",
            },
          },
          {
            title: "Case cap",
            source: { kind: "image", src: "assets/media/images/cap.png" },
            result: {
              kind: "video",
              src: "assets/media/videos/obama_cap_recomposed.mp4",
              poster: "assets/media/images/obama_cap_recomposed_poster.png",
            },
          },
          {
            title: "",
            source: { kind: "placeholder" },
            result: { kind: "placeholder" },
          },
        ],
      },
    ],
  },
  baseline: {
    intro: "Sequential side-by-side comparison between our method and CAP4D.",
    captionA: "Comparison between our method and CAP4D.",
    captionB: "",
    carouselA: [
      {
        kind: "video",
        src: "assets/media/videos/comparison_all_sequential.mp4",
        poster: "assets/media/images/comparison_all_sequential_poster.png",
      },
    ],
    carouselB: [],
  },
  moreResults: {
    sections: {
      a: [
        { kind: "placeholder", label: "" },
        { kind: "placeholder", label: "" },
        { kind: "placeholder", label: "" },
      ],
      b: [
        {
          kind: "video",
          src: "assets/media/videos/editing_reenactment.mp4",
          poster: "assets/media/images/editing_reenactment_poster.png",
          label: "",
        },
      ],
      c: [
        {
          kind: "video",
          src: "assets/media/videos/cross_reenactment_results.mp4",
          poster: "assets/media/images/cross_reenactment_results_poster.png",
          label: "",
        },
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

function hasRenderableMedia(item) {
  return Boolean(item && item.kind !== "placeholder" && item.src);
}

function renderSingleMedia(containerId, media, captionId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.replaceChildren(createMedia(media));
  if (captionId) setText(captionId, media.caption);
}

function renderMethodSecondary() {
  const block = document.getElementById("method-secondary-block");
  const title = document.getElementById("method-secondary-title");
  const media = pageConfig.method.secondary;

  if (!block || !title) return;

  const shouldShow = hasRenderableMedia(media) || Boolean(media.title) || Boolean(media.caption);
  if (!shouldShow) {
    block.classList.add("is-hidden");
    return;
  }

  block.classList.remove("is-hidden");
  setText("method-secondary-title", media.title);
  renderSingleMedia("method-secondary", media, "method-secondary-caption");
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

function createGalleryCase(caseItem) {
  const card = document.createElement("div");
  card.className = "gallery-case";

  if (caseItem.title) {
    const title = document.createElement("h2");
    title.className = "title is-5 gallery-case-title";
    title.textContent = caseItem.title;
    card.append(title);
  }

  const source = createMedia(caseItem.source);
  source.classList.add("gallery-case-media");
  card.append(source);

  const sourceLabel = document.createElement("h2");
  sourceLabel.className = "subtitle has-text-centered is-max-desktop gallery-row-label";
  sourceLabel.textContent = caseItem.source.kind === "placeholder" ? "" : "source image";
  card.append(sourceLabel);

  const spacer = document.createElement("hr");
  spacer.className = "gallery-spacer";
  spacer.style.border = "none";
  spacer.style.background = "transparent";
  card.append(spacer);

  const result = createMedia(caseItem.result);
  result.classList.add("gallery-case-media");
  card.append(result);

  const resultLabel = document.createElement("h2");
  resultLabel.className = "subtitle has-text-centered is-max-desktop gallery-row-label";
  resultLabel.textContent = caseItem.result.kind === "placeholder" ? "" : "reenactment result";
  card.append(resultLabel);

  return card;
}

function createGalleryItem(page) {
  const item = document.createElement("div");
  item.className = "item item-video3";

  const grid = document.createElement("div");
  grid.className = "gallery-grid";
  page.items.forEach((caseItem) => grid.append(createGalleryCase(caseItem)));
  item.append(grid);
  return item;
}

function renderGallery() {
  setText("gallery-caption", pageConfig.gallery.caption);
  const container = document.getElementById("gallery-carousel");
  if (!container) return;
  container.replaceChildren(...pageConfig.gallery.pages.map(createGalleryItem));
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
    const items = pageConfig.baseline.carouselA || [];
    carouselA.replaceChildren(...items.map(createBaselineItem));
    carouselA.classList.toggle("is-hidden", items.length === 0);
  }
  if (carouselB) {
    const items = pageConfig.baseline.carouselB || [];
    carouselB.replaceChildren(...items.map(createBaselineItem));
    carouselB.classList.toggle("is-hidden", items.length === 0);
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
    container.dataset.count = String(items.length);
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
  renderInteractiveViewer();
  renderSingleMedia("method-primary", pageConfig.method.primary, "method-primary-caption");
  renderMethodSecondary();
  renderGallery();
  renderBaseline();
  renderMoreResults();
  initCarousels();
});
