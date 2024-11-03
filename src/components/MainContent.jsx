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

export default function MainContent({ editMode }) {
  const initialOrder = [
    { id: 0, comp: Education, title: "Education" },
    { id: 1, comp: Section, title: "Section" },
    { id: 2, comp: SkillsAndInterests, title: "Skills And Interests" },
  ];

  // Create an initial state array to store initial components.
  // If a local copy of order exists, use that as initial state.
  // Else use default arrangement defined in initialOrder array and save it in local storage.
  const [order, setOrder] = useState(() => {
    const checkLocal = localStorage.getItem("order");

    if (checkLocal) {
      const localCopy = JSON.parse(checkLocal);

      const localOrder = localCopy.map((item) => {
        const [update] = initialOrder.filter((elem) => {
          if (elem.id === item.id) {
            return elem.comp;
          }
        });

        return update;
      });

      return localOrder;
    } else {
      localStorage.setItem("order", JSON.stringify(initialOrder));
      return initialOrder;
    }
  });

  function moveSection(e, itemId) {
    const buttonTarget = e.currentTarget;

    // Update state based on previous state
    setOrder((order) => {
      // Make shallow copy
      const orderCopy = [...order];

      // Get elem being clicked.
      const [elem] = orderCopy.filter((item) => item.id === itemId);

      // Get initial element index.
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
      if (buttonTarget.className.includes("Up")) {
        newElemIdx = initialElemIdx === 0 ? orderCopy.length : initialElemIdx - 1;
      } else {
        newElemIdx = initialElemIdx === orderCopy.length ? 0 : initialElemIdx + 1;
      }

      // Re-insert into orderCopy array.
      orderCopy.splice(newElemIdx, 0, elem);

      // Remember order of sections
      localStorage.setItem("order", JSON.stringify(orderCopy));

      return orderCopy;
    });
  }

  return (
    <>
      {order.map((item) => {
        const { comp: Component } = item;
        return (
          <Fragment key={item.id}>
            <Component
              moveSectionBtns={<MoveSectionComps handler={(e) => moveSection(e, item.id)} />}
              editMode={editMode}
            />
          </Fragment>
        );
      })}
    </>
  );
}
