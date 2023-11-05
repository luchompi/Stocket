
const Loading = () => {
  return (
    <div>
      <h4>Espere mientras procesamos unas cosas</h4>
      <div className="row justify-content-md-center">
        <lord-icon
          src="https://cdn.lordicon.com/yvrtgyqf.json"
          trigger="loop"
          style={{ width: "150px", height: "150px" }}
        ></lord-icon>
      </div>
    </div>
  );
};

export default Loading;
