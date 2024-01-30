import PropTypes from "prop-types";
import CardLayout from "./CardLayout";

const ParentCardLayout = ({ header, ICON, component, tools, title }) => {
  return (
    <div>
      <div className="card card-success">
        <div className="card-header">
          <h5 className="card-title">{header}</h5>
          {tools && <div className="card-tools">{tools}</div>}
        </div>

        <div className="card-body">
          <div className="card-text">
            <CardLayout ICON={ICON} title={title} component={component} />
          </div>
        </div>
      </div>
    </div>
  );
};

ParentCardLayout.propTypes = {
  header: PropTypes.string.isRequired,
  ICON: PropTypes.object.isRequired,
  component: PropTypes.object.isRequired,
  tools: PropTypes.object,
  title: PropTypes.string.isRequired,
};

export default ParentCardLayout;
