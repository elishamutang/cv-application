export function ResetLocalStorage({ onClick, editMode }) {
  if (editMode) {
    return (
      <button className="reset" onClick={onClick}>
        Reset
      </button>
    );
  }
}

export function Mode({ active, onClick, editMode }) {
  return (
    <button className={active ? "mode active" : "mode"} onClick={onClick}>
      {editMode ? "Editing" : "Viewing"}
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

export default function MainNav({ children, editMode }) {
  return <div className={editMode ? "mainNav" : "mainNav viewing"}>{children}</div>;
}
