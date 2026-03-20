const pageConfig = {
  heroLogo: "",
  teaser: {
    kind: "image",
    src: "assets/media/images/teaser.png",
    poster: "",
    caption:
      "Overview: Given a single input image, our method reconstructs an animatable 3D Gaussian head by first recovering a Neutral Identity Representation (NIR) that removes source expression and pose while preserving identity. This representation enables faithful expression transfer from driving inputs. In contrast, existing methods such as LAM (He et al., 2025) often suffer from source-expression leakage and identity distortion.",
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
  expressionRemoval: {
    caption: "Top row: source images. Bottom row: expression-neutral results.",
    slides: [
      {
        kind: "image",
        src: "assets/media/images/supp_exp1_slide_1.png",
      },
      {
        kind: "image",
        src: "assets/media/images/supp_exp1_slide_2.png",
      },
      {
        kind: "image",
        src: "assets/media/images/supp_exp1_slide_3.png",
      },
      {
        kind: "image",
        src: "assets/media/images/supp_exp1_slide_4.png",
      },
    ],
  },
  moreResults: {
    sections: {
      a: [
        {
          kind: "video",
          src: "assets/media/videos/ironman_ablation.mp4",
          poster: "assets/media/images/ironman_ablation_poster.png",
          label: "",
        },
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

const expressionRemovalSliderState = {
  count: 0,
  index: 0,
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

function createExpressionRemovalSlide(itemConfig) {
  const slide = document.createElement("div");
  slide.className = "expression-removal-slide";
  slide.append(createMedia(itemConfig));
  return slide;
}

function setExpressionRemovalIndex(index) {
  const track = document.getElementById("expression-removal-track");
  const dots = document.querySelectorAll(".expression-removal-dot");
  if (!track || expressionRemovalSliderState.count === 0) return;

  const nextIndex =
    ((index % expressionRemovalSliderState.count) + expressionRemovalSliderState.count) %
    expressionRemovalSliderState.count;

  expressionRemovalSliderState.index = nextIndex;
  track.style.transform = `translateX(-${nextIndex * 100}%)`;

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === nextIndex);
    dot.setAttribute("aria-current", dotIndex === nextIndex ? "true" : "false");
  });
}

function bindExpressionRemovalSlider() {
  const root = document.getElementById("expression-removal-slider");
  const prev = document.getElementById("expression-removal-prev");
  const next = document.getElementById("expression-removal-next");
  const dots = document.getElementById("expression-removal-dots");

  if (!root || !prev || !next || !dots || root.dataset.bound === "true") return;

  prev.addEventListener("click", () => {
    setExpressionRemovalIndex(expressionRemovalSliderState.index - 1);
  });

  next.addEventListener("click", () => {
    setExpressionRemovalIndex(expressionRemovalSliderState.index + 1);
  });

  dots.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;
    const { index } = target.dataset;
    if (!index) return;
    setExpressionRemovalIndex(Number(index));
  });

  root.dataset.bound = "true";
}

function renderExpressionRemoval() {
  setText("expression-removal-caption", pageConfig.expressionRemoval.caption);
  const root = document.getElementById("expression-removal-slider");
  const track = document.getElementById("expression-removal-track");
  const dots = document.getElementById("expression-removal-dots");
  const prev = document.getElementById("expression-removal-prev");
  const next = document.getElementById("expression-removal-next");
  if (!root || !track || !dots || !prev || !next) return;

  const items = pageConfig.expressionRemoval.slides || [];
  track.replaceChildren(...items.map(createExpressionRemovalSlide));

  dots.replaceChildren(
    ...items.map((_, index) => {
      const dot = document.createElement("button");
      dot.className = "expression-removal-dot";
      dot.type = "button";
      dot.dataset.index = String(index);
      dot.setAttribute("aria-label", `Go to expression removal slide ${index + 1}`);
      dot.setAttribute("aria-current", "false");
      return dot;
    }),
  );

  expressionRemovalSliderState.count = items.length;
  expressionRemovalSliderState.index = 0;

  root.classList.toggle("is-hidden", items.length === 0);
  dots.classList.toggle("is-hidden", items.length <= 1);
  prev.disabled = items.length <= 1;
  next.disabled = items.length <= 1;

  bindExpressionRemovalSlider();
  setExpressionRemovalIndex(0);
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
  renderSingleMedia("method-primary", pageConfig.method.primary, "method-primary-caption");
  renderMethodSecondary();
  renderGallery();
  renderBaseline();
  renderExpressionRemoval();
  renderMoreResults();
  initCarousels();
});
