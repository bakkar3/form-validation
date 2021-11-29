import { useState, useEffect } from "react";
import "./App.scss";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [payload, setPayload] = useState({});
  const [phoneIsValid, setPhoneIsValid] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const handleName = (e) => {
    let _name = e.target.value;
    if (_name !== "" && _name.length <= 10) {
      setNameIsValid(true);
    } else {
      setNameIsValid(false);
    }
    setName(_name);
  };

  const clearPayload = () => {
    if (Object.keys(payload).length !== 0) {
      setPayload((prev) => ({}));
    }
  };

  //   useEffect(() => {
  //   clearPayload();
  //   }, [name + phone]);

  useEffect(() => {
    setFormIsValid(nameIsValid && phoneIsValid);
  }, [nameIsValid, phoneIsValid]);

  const handlePhone = (e) => {
    let _phone = e.target.value;
    if (_phone !== "" && /^\d\d\d-\d\d\d-\d\d\d\d$/.test(_phone)) {
      setPhoneIsValid(true);
    } else {
      setPhoneIsValid(false);
    }
    setPhone(_phone);
  };

  const handleButton = (e) => {
    e.preventDefault();
    setPayload((prev) => ({
      ...prev,
      name,
      phone,
    }));
  };

  return (
    <div className="App">
      <form>
        <fieldset>
          <legend>Order Form</legend>
          <div className={"row " + (nameIsValid ? "valid" : "invalid")}>
            {" "}
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={handleName} />
          </div>

          <div className={"note " + (nameIsValid ? "valid" : "invalid")}>
            required, maximum 10 characters
          </div>

          <div className={"row " + (phoneIsValid ? "valid" : "invalid")}>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={handlePhone}
            />
          </div>
          <div className={"note " + (phoneIsValid ? "valid" : "invalid")}>
            e.g. 555-333-2222
          </div>

          <div className="buttonRow">
            <button disabled={!formIsValid} onClick={handleButton}>
              Register
            </button>
          </div>
        </fieldset>
      </form>
      {Object.keys(payload).length !== 0 && (
        <pre>payload: {JSON.stringify(payload, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;
