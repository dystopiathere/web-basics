const menu = document.querySelector(".site-header__menu");
const menuButton = menu.querySelector("summary");

menu.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.open) {
    menu.open = false;
    menuButton.focus();
  }
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    menu.open = false;
    const section = document.querySelector(link.hash);
    const heading = section?.querySelector("h2");
    history.pushState(null, "", link.hash);
    section?.scrollIntoView({ block: "start" });
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  });
});

const reviews = document.querySelector(".reviews");
const reviewLinks = document.querySelectorAll(".reviews__pages a");
const reviewObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        reviewLinks.forEach((link) => {
          if (link.hash === `#${entry.target.id}`) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      }
    });
  },
  { root: reviews, threshold: 0.6 },
);

reviews.querySelectorAll(".review").forEach((review) => {
  reviewObserver.observe(review);
});
