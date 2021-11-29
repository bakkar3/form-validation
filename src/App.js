import { useState, useEffect } from 'react';
import './App.scss';

function App() {
	const [ formIsValid, setFormIsValid ] = useState(false);
	const [ payload, setPayload ] = useState({});

	// NAME
	const [ name, setName ] = useState('');
	const [ nameIsValid, setNameIsValid ] = useState(false);

	// PIN
	const [ pin, setPin ] = useState('');
	const [ pinIsValid, setPinIsValid ] = useState(false);

	// PHONE
	const [ phone, setPhone ] = useState('');
	const [ phoneIsValid, setPhoneIsValid ] = useState(false);

	// EMAIL
	const [ email, setEmail ] = useState('');
	const [ emailIsValid, setEmailIsValid ] = useState(false);

	// DATA REP
	const [ dataRep, setDataRep ] = useState({});

	const dataJsonRepresentation = {
		name,
		pin,
		phone,
		email
	};

	// LOGIC
	useEffect(
		() => {
			setFormIsValid(nameIsValid && phoneIsValid && pinIsValid && emailIsValid);
		},
		[ nameIsValid, phoneIsValid, pinIsValid, emailIsValid ]
	);

	const clearPayload = () => {
		if (Object.keys(payload).length !== 0) {
			setPayload((prev) => ({}));
		}
	};
	clearPayload();

	// NAME
	const handleName = (e) => {
		let _name = e.target.value;
		if (_name !== '' && name.length >= 4 && _name.length <= 20) {
			setNameIsValid(true);
		} else {
			setNameIsValid(false);
		}
		setName(_name);
	};

	// PIN
	const handlePin = (e) => {
		let _pin = e.target.value;
		if (_pin !== '' && _pin.length === 4) {
			setPinIsValid(true);
		} else {
			setPinIsValid(false);
		}
		setPin(_pin);
	};

	// PHONE
	const handlePhone = (e) => {
		let _phone = e.target.value;
		if (_phone !== '' && /^\d\d\d-\d\d\d-\d\d\d\d$/.test(_phone)) {
			setPhoneIsValid(true);
		} else {
			setPhoneIsValid(false);
		}
		setPhone(_phone);
	};

	// EMAIL
	const handleEmail = (e) => {
		let email = e.target.value;
		if (
			email.toLowerCase().match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				// /(.+)@(.+){2,}\.(.+){2,}/
			)
		) {
			setEmailIsValid(true);
		} else {
			setEmailIsValid(false);
		}
		setEmail(email);
	};

	// SUBMIT BUTTON
	const handleButton = (e) => {
		e.preventDefault();
		setPayload((prev) => ({
			...prev,
			name,
			phone
		}));
		setDataRep(dataJsonRepresentation);
		console.log(dataRep);
	};

	return (
		<div className="App">
			<form>
				<fieldset>
					<legend>Order Form</legend>

					{/* NAME */}
					<div className={'row ' + (nameIsValid ? 'valid' : 'invalid')}>
						<label htmlFor="name">Name</label>
						<input type="text" id="name" value={name} onChange={handleName} />
					</div>
					<div className={'note ' + (nameIsValid ? 'valid' : 'invalid')}>
						required, minimum 5 and maximum 20 characters
					</div>

					{/* PIN */}
					<div className={'row ' + (pinIsValid ? 'valid' : 'invalid')}>
						<label htmlFor="pin">Pin</label>
						<input type="number" id="pin" value={pin} onChange={handlePin} />
					</div>
					<div className={'note ' + (nameIsValid ? 'valid' : 'invalid')}>required, 4 numbers</div>

					{/* PHONE */}
					<div className="row">
						<label htmlFor="phone">Phone</label>
						<input type="text" id="phone" value={phone} onChange={handlePhone} />
					</div>
					<div className={'note ' + (phoneIsValid ? 'valid' : 'invalid')}>e.g. 555-333-2222</div>

					{/* EMAIL */}
					<div className="row">
						<label htmlFor="email">Email</label>
						<input type="text" id="email" value={email} onChange={handleEmail} />
					</div>
					<div className={'note ' + (emailIsValid ? 'valid' : 'invalid')}>required, valid email form.</div>

					{/* BUTTON */}
					<div className="buttonRow">
						<button disabled={!formIsValid} onClick={handleButton}>
							Register
						</button>
					</div>

					{/* DATA REP */}
					<div>{Object.entries(dataRep).length !== 0 && <p>{JSON.stringify(dataRep)}</p>}</div>
				</fieldset>
			</form>
			{Object.keys(payload).length !== 0 && <pre>payload: {JSON.stringify(payload, null, 2)}</pre>}
		</div>
	);
}

export default App;