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
  const [reset, setReset] = useState(false);
  const [activeComps, setActiveComps] = useState([
    { id: 0, title: "mode", comp: Mode, isActive: true },
    { id: 1, title: "reset", comp: ResetLocalStorage, isActive: false },
    { id: 2, title: "printToPDF", comp: PrintToPDF, isActive: false },
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

  function resetLocalStorage() {
    localStorage.clear();
    setReset(!reset);
  }

  return (
    <>
      <MainNav editMode={editMode}>
        {activeComps.map((item) => {
          const { comp: Component } = item;
          return (
            <Component
              key={item.id}
              active={item.isActive}
              editMode={editMode}
              onClick={() => {
                updateActiveComps(item.id);
                if (item.title === "mode") {
                  updateMode();
                } else if (item.title === "reset") {
                  resetLocalStorage();
                }
              }}
            />
          );
        })}
      </MainNav>
      {reset ? <Header key="reset-header" editMode={editMode} /> : <Header editMode={editMode} />}
      {reset ? <MainContent key="reset-main" editMode={editMode} /> : <MainContent editMode={editMode} />}
    </>
  );
}

export default App;
