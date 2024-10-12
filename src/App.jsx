import { useState } from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import MainNav, { ResetLocalStorage, Mode, PrintToPDF } from "./components/MainNavBar";
import "./styles/MainNavBar.css";
import "./styles/Section.css";
import "./styles/Education.css";
import "./styles/SkillsAndInterests.css";
import "./styles/App.css";

// Control main nav functionality from here.

function App() {
  const [editMode, setMode] = useState(true);
  const [activeComps, setActiveComps] = useState([
    { id: 0, comp: Mode, isActive: false, isEditing: editMode },
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

  function updateMode() {
    setMode(!editMode);
  }

  return (
    <>
      <MainNav>
        {activeComps.map((item) => {
          const { comp: Component } = item;
          return (
            <Component
              key={item.id}
              active={item.isActive}
              isEditing={editMode}
              onClick={() => {
                updateActiveComps(item.id);
                if (item.isEditing !== undefined) {
                  updateMode();
                }
              }}
            />
          );
        })}
      </MainNav>
      <Header />
      <MainContent />
    </>
  );
}

export default App;
