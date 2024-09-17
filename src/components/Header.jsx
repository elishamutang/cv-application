import { useState } from "react";

function Header() {
  const [fullName, setFullName] = useState("John Doe");
  const [contactDetails, setContactDetails] = useState([
    { id: 0, field: "Street Address" },
    { id: 1, field: "City, State Zip" },
    { id: 2, field: "youremail@contact.com" },
    { id: 3, field: "Phone Number" },
  ]);

  function handleName(e) {
    setFullName(e.target.value);
  }

  function handleContactChange(e) {
    setContactDetails(
      contactDetails.map((item) => {
        if (item.id == e.target.id) {
          return { ...item, field: e.target.value };
        } else {
          return item;
        }
      })
    );
  }

  return (
    <>
      <div id="name">
        <input type="text" id="fullName" placeholder={fullName} onChange={handleName} />
      </div>
      <div id="contact">
        {contactDetails.map((item) => {
          return <input key={item.id} id={item.id} placeholder={item.field} onChange={handleContactChange} />;
        })}
      </div>
    </>
  );
}

export default Header;
