import { useEffect } from "react";
import { useState } from "react";
export const IconHelperWithColors = (url, colors) => {
  const [animate, setAnimate] = useState(null);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter) => counter + 1);
      if (counter === 5) {
        setAnimate("loop");
      } else if (counter > 7) {
        setAnimate("hover");
        setCounter(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [counter]);
  return (
    <div
      className="col col-lg-3"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <lord-icon
        src={url.url}
        trigger={animate}
        colors={colors.colors}
        style={{ width: "150px", height: "150px" }}
      ></lord-icon>
    </div>
  );
};

export const IconHelperWitoutColors = (url) => {
  const [animate, setAnimate] = useState(null);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter) => counter + 1);
      if (counter === 5) {
        setAnimate("loop");
      } else if (counter > 7) {
        setAnimate("hover");
        setCounter(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [counter]);
  return (
    <div
      className="col col-lg-3"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <lord-icon
        src={url.url}
        trigger={animate}
        style={{ width: "150px", height: "150px" }}
      ></lord-icon>
    </div>
  );
};
