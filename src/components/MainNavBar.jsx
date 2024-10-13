export function ResetLocalStorage({ active, onClick, editMode }) {
  if (editMode) {
    return (
      <button className={active ? "reset active" : "reset"} onClick={onClick}>
        Reset
      </button>
    );
  }
}

export function Mode({ active, onClick, editMode }) {
  return (
    <button className={active ? "Mode active" : "Mode"} onClick={onClick}>
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
