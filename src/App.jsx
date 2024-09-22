import Header from "./components/Header";
import Section from "./components/Section";
import Education from "./components/Education";
import SkillsAndInterests from "./components/SkillsAndInterests";

import "./styles/Section.css";
import "./styles/Education.css";
import "./styles/SkillsAndInterests.css";
import "./styles/App.css";

function App() {
  return (
    <>
      <Header />
      <Education />
      <Section />
      <SkillsAndInterests />
    </>
  );
}

export default App;
