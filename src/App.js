import React, { useEffect, useState } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

const App = () => {
  // state variables
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random user");

  // fetching random user.
  const getPersonData = async () => {
    setLoading(true);
    const response = await fetch(url);
    const finalResponse = await response.json();

    // DESTRUCTURING
    let { results } = finalResponse;
    const newPerson = results.map((person) => {
      const { email, phone } = person;
      const { large: image } = person.picture; //nested object.
      const { password } = person.login;
      const { first: firstName, last: lastName } = person.name;
      const { age } = person.dob;
      const { name, number } = person.location.street;

      //simplyfying the code
      return {
        email,
        phone,
        image,
        password,
        age,
        street: `${number} ${name}`,
        name: `${firstName} ${lastName}`,
      };
    });

    setPerson(newPerson[0]); //accessing the returned object
    setLoading(false);
    setTitle("name"); // show by default
    setValue(newPerson[0].name); //newly fetched user's name
  };

  useEffect(() => {
    getPersonData();
  }, []); //runs only once on initial render

  // IMPORTANT FUNCTION , dynamically updating the values
  const handleValue = (e) => {
    console.log(person.name);
    if (e.target.classList.contains("icon")) {
      // console.log("true");
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]); //accessing the property's value
    }
  };

  return (
    <main>
      {/* black box */}
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">My {title} is -</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={getPersonData}>
            {loading ? "loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default App;
