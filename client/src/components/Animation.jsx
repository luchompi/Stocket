import { useEffect, useRef } from "react";
import { Player } from "@lordicon/react";
import PropTypes from "prop-types";
export default function PlayOnce({ ICON }) {
  const playerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      playerRef.current?.playFromBeginning();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="col col-lg-4">
      <Player ref={playerRef} icon={ICON} size={100} />
    </div>
  );
}

PlayOnce.propTypes = {
  ICON: PropTypes.string.isRequired,
};
