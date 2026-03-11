const pageConfig = {
  links: {
    paper: "",
    code: "",
    supplementaryPdf: "",
    arxiv: "",
  },
  teaser: [
    {
      kind: "auto",
      title: "",
      description: "",
      src: "assets/media/images/teaser.png",
      poster: "",
      expectedPath: "assets/media/images/teaser.png",
    },
  ],
  overviewFigure: [
    {
      kind: "image",
      title: "",
      description: "",
      src: "assets/media/images/method-2.png",
      expectedPath: "assets/media/images/method-2.png",
    },
  ],
  videos: [
    {
      kind: "video",
      title: "Case 42",
      description: "Recomposed panel with the correct source image, segmented driver, and segmented result.",
      src: "assets/media/videos/obama_42_recomposed.mp4",
      poster: "assets/media/images/obama_42_recomposed_poster.png",
      expectedPath: "assets/media/videos/obama_42_recomposed.mp4",
    },
    {
      kind: "video",
      title: "Case ave1",
      description: "Recomposed panel with the correct source image, segmented driver, and segmented result.",
      src: "assets/media/videos/obama_ave1_recomposed.mp4",
      poster: "assets/media/images/obama_ave1_recomposed_poster.png",
      expectedPath: "assets/media/videos/obama_ave1_recomposed.mp4",
    },
    {
      kind: "video",
      title: "Case cap",
      description: "Recomposed panel with the correct source image, segmented driver, and segmented result.",
      src: "assets/media/videos/obama_cap_recomposed.mp4",
      poster: "assets/media/images/obama_cap_recomposed_poster.png",
      expectedPath: "assets/media/videos/obama_cap_recomposed.mp4",
    },
  ],
  figures: [],
};

function setLink(anchorId, href) {
  const anchor = document.getElementById(anchorId);
  if (!anchor) return;

  if (href) {
    anchor.href = href;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    return;
  }

  anchor.href = "#link-row";
  anchor.classList.add("disabled");
  anchor.setAttribute("aria-disabled", "true");
}

function createPlaceholder(expectedPath, kind) {
  const wrapper = document.createElement("div");
  wrapper.className = "media-placeholder";

  const inner = document.createElement("div");
  inner.className = "placeholder-inner";

  const label = document.createElement("span");
  label.className = "placeholder-label";
  if (kind === "video") {
    label.textContent = "Video Slot";
  } else if (kind === "image") {
    label.textContent = "Image Slot";
  } else {
    label.textContent = "Media Slot";
  }

  const path = document.createElement("p");
  path.className = "placeholder-path";
  path.textContent = expectedPath ? `Expected path: ${expectedPath}` : "Add a media file and update main.js";

  inner.append(label, path);
  wrapper.append(inner);
  return wrapper;
}

function createMediaFrame(item) {
  const frame = document.createElement("div");
  frame.className = "media-frame";
  const inferredKind = resolveKind(item);

  if (!item.src) {
    frame.append(createPlaceholder(item.expectedPath, inferredKind));
    return frame;
  }

  if (inferredKind === "video") {
    const video = document.createElement("video");
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.src = item.src;
    if (item.poster) video.poster = item.poster;
    frame.append(video);
    return frame;
  }

  const image = document.createElement("img");
  image.src = item.src;
  image.alt = item.title;
  image.loading = "lazy";
  image.decoding = "async";
  frame.append(image);
  return frame;
}

function resolveKind(item) {
  if (item.kind && item.kind !== "auto") return item.kind;
  if (!item.src) return "auto";

  const normalized = item.src.toLowerCase();
  if (normalized.endsWith(".mp4") || normalized.endsWith(".webm") || normalized.endsWith(".mov")) {
    return "video";
  }

  return "image";
}

function createMediaCard(item) {
  const card = document.createElement("article");
  card.className = "media-card";

  card.append(createMediaFrame(item));

  if (item.title || item.description) {
    const copy = document.createElement("div");
    copy.className = "media-copy";

    if (item.title) {
      const title = document.createElement("h4");
      title.textContent = item.title;
      copy.append(title);
    }

    if (item.description) {
      const description = document.createElement("p");
      description.textContent = item.description;
      copy.append(description);
    }

    card.append(copy);
  }

  return card;
}

function createCarouselSlide(item) {
  const slide = document.createElement("article");
  slide.className = "carousel-slide";

  const card = document.createElement("div");
  card.className = "carousel-card";

  const frame = document.createElement("div");
  frame.className = "carousel-frame";

  if (!item.src) {
    frame.append(createPlaceholder(item.expectedPath, "video"));
  } else {
    const video = document.createElement("video");
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.src = item.src;
    if (item.poster) video.poster = item.poster;
    frame.append(video);
  }

  const copy = document.createElement("div");
  copy.className = "carousel-copy";

  const title = document.createElement("h4");
  title.textContent = item.title;

  const description = document.createElement("p");
  description.textContent = item.description;

  copy.append(title, description);
  card.append(frame, copy);
  slide.append(card);
  return slide;
}

function renderVideoCarousel(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const slides = items.length ? items : [
    {
      title: "Video slot",
      description: "Add a video and update main.js",
      src: "",
      expectedPath: "assets/media/videos/example.mp4",
    },
  ];

  const shell = document.createElement("div");
  shell.className = "carousel-shell";

  const prevButton = document.createElement("button");
  prevButton.className = "carousel-arrow carousel-arrow-prev";
  prevButton.type = "button";
  prevButton.textContent = "‹";
  prevButton.setAttribute("aria-label", "Previous video");

  const nextButton = document.createElement("button");
  nextButton.className = "carousel-arrow carousel-arrow-next";
  nextButton.type = "button";
  nextButton.textContent = "›";
  nextButton.setAttribute("aria-label", "Next video");

  const viewport = document.createElement("div");
  viewport.className = "carousel-viewport";

  const track = document.createElement("div");
  track.className = "carousel-track";
  slides.forEach((item) => track.append(createCarouselSlide(item)));
  viewport.append(track);

  const footer = document.createElement("div");
  footer.className = "carousel-footer";

  const dots = document.createElement("div");
  dots.className = "carousel-dots";

  const status = document.createElement("div");
  status.className = "carousel-status";

  let currentIndex = 0;

  function pauseInactiveVideos() {
    const videos = track.querySelectorAll("video");
    videos.forEach((video, index) => {
      if (index !== currentIndex) video.pause();
    });
  }

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    prevButton.disabled = slides.length <= 1;
    nextButton.disabled = slides.length <= 1;
    status.textContent = `${currentIndex + 1} / ${slides.length}`;

    dots.querySelectorAll(".carousel-dot").forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });

    pauseInactiveVideos();
  }

  slides.forEach((item, index) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to video ${index + 1}: ${item.title}`);
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });
    dots.append(dot);
  });

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  shell.append(prevButton, viewport, nextButton);
  footer.append(dots, status);
  container.append(shell, footer);

  updateCarousel();
}

function renderCollection(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;
  items.forEach((item) => container.append(createMediaCard(item)));
}

setLink("paper-link", pageConfig.links.paper);
setLink("code-link", pageConfig.links.code);
setLink("supp-link", pageConfig.links.supplementaryPdf);
setLink("arxiv-link", pageConfig.links.arxiv);

renderCollection("teaser-grid", pageConfig.teaser);
renderCollection("overview-grid", pageConfig.overviewFigure);
renderVideoCarousel("video-carousel", pageConfig.videos);
