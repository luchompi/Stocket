import PlayOnce from "../components/Animation";
import PropTypes from "prop-types";

const CardLayout = ({ ICON, title, component }) => {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <PlayOnce ICON={ICON} />
            <div
              className="col"
              style={{ alignContent: "center", alignSelf: "center" }}
            >
              <h4>{title}</h4>
            </div>
          </div>
          <div className="card-text">{component}</div>
        </div>
      </div>
    </div>
  );
};

CardLayout.propTypes = {
  ICON: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  component: PropTypes.object.isRequired,
};

export default CardLayout;
