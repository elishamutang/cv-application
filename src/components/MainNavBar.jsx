export function ResetLocalStorage({ active, onClick }) {
  return (
    <button className={active ? "reset active" : "reset"} onClick={onClick}>
      Reset
    </button>
  );
}

export function Mode({ active, onClick, isEditing }) {
  return (
    <button className={active ? "Mode active" : "Mode"} onClick={onClick}>
      Mode: {isEditing ? "Editing" : "Viewing"}
    </button>
  );
}

export function PrintToPDF({ active, onClick }) {
  return (
    <button className={active ? "printToPDF active" : "printToPDF"} onClick={onClick}>
      Print PDF
    </button>
  );
}

export default function MainNav({ children }) {
  return <div className="mainNav">{children}</div>;
}
