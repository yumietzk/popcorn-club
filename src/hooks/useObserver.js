import { useState, useEffect } from 'react';

const useObserver = (ref) => {
  const [curElement, setElement] = useState();

  // input
  useEffect(() => {
    setElement(ref.current.childNodes[0]);
  }, []);

  const setSrc = (data) => {
    if (!curElement) return;

    // Intersection Observer
    const obsCallback = function (entries, observer) {
      const [entry] = entries;

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

  // output
  return [curElement, setSrc];
};

export default useObserver;
