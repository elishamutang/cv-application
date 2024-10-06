import { Fragment, useState } from "react";
import { MoveSectionUp, MoveSectionDown } from "./Buttons";
import Education from "./Education";
import Section from "./Section";
import SkillsAndInterests from "./SkillsAndInterests";

function MoveSectionComps({ handler }) {
  return (
    <>
      <MoveSectionUp onClick={handler} />
      <MoveSectionDown onClick={handler} />
    </>
  );
}

function EducationComp({ handler }) {
  return <Education moveSectionBtns={<MoveSectionComps handler={handler} />} />;
}

function SectionComp({ handler }) {
  return <Section moveSectionBtns={<MoveSectionComps handler={handler} />} />;
}

function SkillsAndInterestsComp({ handler }) {
  return <SkillsAndInterests moveSectionBtns={<MoveSectionComps handler={handler} />} />;
}

export default function MainContent() {
  // Create an initial state array to store initial components.
  // **Note: There must be a better way.
  const [initialOrder, setOrder] = useState([
    { id: 0, comp: <EducationComp handler={(e) => moveSection(e, 0)} /> },
    { id: 1, comp: <SectionComp handler={(e) => moveSection(e, 1)} /> },
    { id: 2, comp: <SkillsAndInterestsComp handler={(e) => moveSection(e, 2)} /> },
  ]);

  function moveSection(e, itemId) {
    const orderCopy = [...initialOrder];

    // Get elem being clicked.
    const [elem] = orderCopy.filter((item) => item.id === itemId);

    // Get initial index of elem in initialOrder array.
    let [initialElemIdx] = orderCopy
      .map((item, idx) => {
        if (item.id === itemId) {
          return idx;
        }
      })
      .filter((idx) => idx !== undefined);

    // Remove clicked elem.
    orderCopy.splice(initialElemIdx, 1);

    // New elem index
    let newElemIdx;

    // Identify which move button is clicked (e.g move up or down)
    if (e.currentTarget.className.includes("Up")) {
      newElemIdx = initialElemIdx === 0 ? orderCopy.length : initialElemIdx - 1;
    } else {
      newElemIdx = initialElemIdx === orderCopy.length ? 0 : initialElemIdx + 1;
    }

    console.log(`Initial index: ${initialElemIdx}`);
    console.log(`New index: ${newElemIdx}`);

    // Re-insert into orderCopy array.
    orderCopy.splice(newElemIdx, 0, elem);

    console.log(orderCopy);
    console.log(initialOrder);

    // Call set function.
    setOrder(orderCopy);
  }

  return (
    <>
      {initialOrder.map((item) => {
        return <Fragment key={item.id}>{item.comp}</Fragment>;
      })}
    </>
  );
}
