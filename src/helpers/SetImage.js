export const setImage = (curElement, data) => {
  if (!curElement) return;

  // Intersection Observer
  const obsCallback = function (entries, observer) {
    const [entry] = entries;
    // console.log(entry);

    if (!entry.isIntersecting) return;
    entry.target.src = data;

    observer.unobserve(entry.target);
  };

  const obsOptions = {
    root: null,
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(obsCallback, obsOptions);
  observer.observe(curElement);
};
