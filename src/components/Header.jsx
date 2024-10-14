import { useEffect, useState } from "react";

function Header({ editMode }) {
  const [fullName, setFullName] = useState(() => {
    const checkLocal = localStorage.getItem("name");
    return checkLocal ? checkLocal : "John Doe";
  });

  const initialContactDetails = [
    { id: 0, title: "address", field: "Street Address, City, State Zip" },
    { id: 1, title: "userContact", field: "(+61) 000 000 E: youremail@contact.com" },
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

  function handleContactChange(e, itemId) {
    setContactDetails((prevContactDetails) => {
      const newContactDetails = prevContactDetails.map((item) => {
        if (item.id === itemId) {
          return { ...item, field: e.target.value };
        } else {
          return item;
        }
      });

      return newContactDetails;
    });
  }

  return (
    <div id="header">
      <div id="name">
        {editMode ? <input type="text" id="fullName" value={fullName} onChange={handleName} /> : <h1>{fullName}</h1>}
      </div>
      <div id="contact">
        {editMode
          ? contactDetails.map((item) => (
              <input
                id={item.title}
                key={item.id}
                value={item.field}
                onChange={(e) => handleContactChange(e, item.id)}
              />
            ))
          : contactDetails.map((item) => (
              <p id={item.title} key={item.id}>
                {item.field}
              </p>
            ))}
      </div>
    </div>
  );
}

export default Header;
