"use strict";

const interests = {
  recommend: {
    title: "What should a system show next?",
    description: "My work at LinkedIn connects ranking and exploration: matching people with relevant content while giving unfamiliar content a chance to be discovered.",
    link: "#journey",
    label: "The engineering side",
    point: 0
  },
  evaluate: {
    title: "How do we know what works?",
    description: "Off-policy evaluation uses existing interaction logs to estimate a different policy's performance. My RecSys work focuses on making uncertainty estimation practical at scale.",
    link: "#paper-ope",
    label: "From M Passes to One",
    point: 1
  },
  reason: {
    title: "Can a model learn to reason?",
    description: "At IBM Research, I worked on models that generate executable programs to answer questions, learning without gold programs and coping with noisy feedback.",
    link: "#paper-cipitr",
    label: "The neuro-symbolic research",
    point: 2
  },
  transfer: {
    title: "What knowledge carries over?",
    description: "My early research explored policy distillation: learning a shared agent from several specialized agents, using text-based games with different vocabularies.",
    link: "#paper-language",
    label: "Language Expansion In Text-Based Games",
    point: 3
  }
};

const extendedBio = "Ghulam Ahmed Ansari is a Staff Machine Learning Engineer at LinkedIn, where his work spans Feed ranking, content exploration, and off-policy evaluation. He previously worked on LinkedIn Learning Search and misinformation detection. Before LinkedIn, he was a Research Engineer at IBM Research, studying reinforcement learning and neuro-symbolic methods for knowledge-base question answering. His publications include work at ACM RecSys, TACL, and IJCAI, and a poster at the NeurIPS Deep Reinforcement Learning Workshop. He holds B.Tech and M.Tech degrees in Electrical Engineering from IIT Madras, is an IEEE Senior Member, and was recognized as an Excellent Reviewer for the KDD 2025 Applied Data Science Track.";
const bioText = document.getElementById("bio-text");
const shortBio = bioText.textContent;
const bioStatus = document.getElementById("bio-status");
const publications = [...document.querySelectorAll(".publication")];
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const themeToggle = document.getElementById("theme-toggle");

function setPressed(buttons, selected) {
  buttons.forEach((button) => button.setAttribute("aria-pressed", String(button === selected)));
}

function filterPapers(topic) {
  let count = 0;
  publications.forEach((paper) => {
    const show = topic === "all" || paper.dataset.topics.split(" ").includes(topic);
    paper.hidden = !show;
    if (show) count += 1;
  });
  setPressed(filterButtons, filterButtons.find((button) => button.dataset.filter === topic));
  document.getElementById("publication-count").textContent = `${count} selected ${count === 1 ? "paper" : "papers"}`;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => filterPapers(button.dataset.filter));
});

const interestButtons = [...document.querySelectorAll("[data-interest]")];
interestButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const interest = interests[button.dataset.interest];
    setPressed(interestButtons, button);
    document.getElementById("interest-title").textContent = interest.title;
    document.getElementById("interest-description").textContent = interest.description;
    const link = document.getElementById("interest-link");
    link.href = interest.link;
    link.replaceChildren(document.createTextNode(`${interest.label} `));
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "\u2197";
    link.append(arrow);
    document.querySelectorAll(".orbit-point").forEach((point, index) => {
      point.style.background = index === interest.point ? "var(--accent)" : "#8aaf89";
      point.style.boxShadow = index === interest.point ? "0 0 0 6px #b6cd621c" : "none";
    });
  });
});

// A deep link must reveal its paper even after a different filter was selected.
function revealLinkedPaper(hash) {
  const paper = publications.find((item) => `#${item.id}` === hash);
  if (paper && paper.hidden) filterPapers("all");
}
document.getElementById("interest-link").addEventListener("click", (event) => {
  revealLinkedPaper(event.currentTarget.hash);
});
window.addEventListener("hashchange", () => revealLinkedPaper(window.location.hash));

const bioButtons = [...document.querySelectorAll("[data-bio]")];
bioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setPressed(bioButtons, button);
    bioText.textContent = button.dataset.bio === "short" ? shortBio : extendedBio;
    bioStatus.textContent = "";
  });
});

document.getElementById("select-bio").addEventListener("click", () => {
  const selection = window.getSelection();
  if (!selection) {
    bioStatus.textContent = "Select the paragraph manually to copy it.";
    return;
  }
  bioText.focus({ preventScroll: true });
  const range = document.createRange();
  range.selectNodeContents(bioText);
  selection.removeAllRanges();
  selection.addRange(range);
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
  bioStatus.textContent = `Selected. Press ${isMac ? "Command" : "Ctrl"}+C to copy.`;
});

function setTheme(dark) {
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  document.getElementById("theme-label").textContent = dark ? "Light" : "Dark";
  themeToggle.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} theme`);
}

// Keep the preference in this page only; file:// and blocked storage work too.
setTheme(false);
themeToggle.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme !== "dark");
});

document.querySelectorAll(".map-controls, .research-toolbar, .bio-controls, #select-bio, #theme-toggle").forEach((element) => {
  element.hidden = false;
});
