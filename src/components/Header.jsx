import { useEffect, useState } from "react";

function Header() {
  const [fullName, setFullName] = useState(() => {
    const checkLocal = localStorage.getItem("name");
    return checkLocal ? checkLocal : "John Doe";
  });

  const initialContactDetails = [
    { id: 0, field: "Street Address" },
    { id: 1, field: "City, State Zip" },
    { id: 2, field: "youremail@contact.com" },
    { id: 3, field: "Phone Number" },
  ];

  const [contactDetails, setContactDetails] = useState(() => {
    const checkLocal = localStorage.getItem("contact");
    return checkLocal ? JSON.parse(checkLocal) : initialContactDetails;
  });

  useEffect(() => {
    localStorage.setItem("contact", JSON.stringify(contactDetails));
    localStorage.setItem("name", fullName);
  }, [fullName, contactDetails]);

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
    <div id="header">
      <div id="name">
        <input type="text" id="fullName" value={fullName} onChange={handleName} />
      </div>
      <div id="contact">
        {contactDetails.map((item) => {
          return <input key={item.id} placeholder={item.field} onChange={handleContactChange} />;
        })}
      </div>
    </div>
  );
}

export default Header;
