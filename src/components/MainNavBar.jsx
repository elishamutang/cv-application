import { useState } from "react";

function ResetLocalStorage({ active, onClick }) {
  return (
    <button className={active ? "reset active" : "reset"} onClick={onClick}>
      Reset
    </button>
  );
}

function Mode({ active, onClick, isEditing }) {
  return (
    <button className={active ? "Mode active" : "Mode"} onClick={onClick}>
      Mode: {isEditing ? "Editing" : "Viewing"}
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
    { id: 0, comp: Mode, isActive: false, isEditing: true },
    { id: 1, comp: ResetLocalStorage, isActive: false },
    { id: 2, comp: PrintToPDF, isActive: false },
  ]);

  function updateActiveComps(itemId) {
    setActiveComps((prevActiveComps) => {
      const updatedActiveComps = prevActiveComps.map((item) => {
        if (item.id === itemId) {
          if (item.isEditing !== undefined) {
            return { ...item, isActive: true, isEditing: !item.isEditing };
          }

          return { ...item, isActive: true };
        } else {
          return { ...item, isActive: false };
        }
      });

      return updatedActiveComps;
    });
  }

  // console.log(activeComps);

  return (
    <div className="mainNav">
      {activeComps.map((item) => {
        const { comp: Component } = item;

        return (
          <Component
            key={item.id}
            active={item.isActive}
            isEditing={item.isEditing}
            onClick={() => updateActiveComps(item.id)}
          />
        );
      })}
    </div>
  );
}
