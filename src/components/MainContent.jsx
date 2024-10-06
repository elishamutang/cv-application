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

export default function MainContent() {
  // Create an initial state array to store initial components.
  const [initialOrder, setOrder] = useState([
    { id: 0, comp: Education },
    { id: 1, comp: Section },
    { id: 2, comp: SkillsAndInterests },
  ]);

  function moveSection(e, itemId) {
    // Alternate way:

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

    // Re-insert into orderCopy array.
    orderCopy.splice(newElemIdx, 0, elem);

    // Call set function.
    setOrder(orderCopy);
  }

  return (
    <>
      {initialOrder.map((item) => {
        const { comp: Component } = item;

        return (
          <Fragment key={item.id}>
            <Component moveSectionBtns={<MoveSectionComps handler={(e) => moveSection(e, item.id)} />} />
          </Fragment>
        );
      })}
    </>
  );
}
