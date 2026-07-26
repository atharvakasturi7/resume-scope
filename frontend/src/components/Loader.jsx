import "./Loader.css";

export default function Loader({ message = "Analyzing resume..." }) {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>{message}</p>
    </div>
  );
}