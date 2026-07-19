import "./Button.css";


export default function Button({text, onClick, disabled}) {
  return(
    <button
      className="primary-button"
      onClick={onClick}
      disabled={disabled}
      >
        {text}
    </button>
  );
}
