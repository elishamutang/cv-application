import Header from "./components/Header";
import MainContent from "./components/MainContent";
import MainNav from "./components/MainNavBar";

import "./styles/MainNavBar.css";
import "./styles/Section.css";
import "./styles/Education.css";
import "./styles/SkillsAndInterests.css";
import "./styles/App.css";

function App() {
  return (
    <>
      <MainNav />
      <Header />
      <MainContent />
    </>
  );
}

export default App;
