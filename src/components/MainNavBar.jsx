import { useState } from "react";

function ResetLocalStorage({ active, onClick }) {
  return (
    <button className={active ? "reset active" : "reset"} onClick={onClick}>
      Reset
    </button>
  );
}

function EditDoc({ active, onClick }) {
  return (
    <button className={active ? "editDoc active" : "editDoc"} onClick={onClick}>
      Edit
    </button>
  );
}

function PrintToPDF({ active, onClick }) {
  return (
    <button className={active ? "printToPDF active" : "printToPDF"} onClick={onClick}>
      Print PDF
    </button>
  );
}

export default function MainNav() {
  const [activeComps, setActiveComps] = useState([
    { id: 0, comp: EditDoc, isActive: false },
    { id: 1, comp: ResetLocalStorage, isActive: false },
    { id: 2, comp: PrintToPDF, isActive: false },
  ]);

  function updateActiveComps(itemId) {
    setActiveComps((prevActiveComps) => {
      const updatedActiveComps = prevActiveComps.map((item) => {
        if (item.id === itemId) {
          return { ...item, isActive: true };
        } else {
          return { ...item, isActive: false };
        }
      });

      return updatedActiveComps;
    });
  }

  return (
    <div className="mainNav">
      {activeComps.map((item) => {
        const { comp: Component } = item;

        return <Component key={item.id} active={item.isActive} onClick={() => updateActiveComps(item.id)} />;
      })}
    </div>
  );
}
