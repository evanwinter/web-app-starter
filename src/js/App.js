import React, { useState } from "react"

const getEncrypted = (data) => {
	const encryptURL = "https://forms.stormcloud.ninja/dev/general_encrypt/"
	const url = encryptURL + data
	return fetch(url).then((result) => result.text().then((html) => html))
}

const getDecrypted = (data) => {
	const decryptURL = "https://forms.stormcloud.ninja/dev/general_decrypt/"
	const url = decryptURL + data
	return fetch(url).then((result) => result.text().then((html) => html))
}

const displayResults = (query, mode) => {
	if (mode === "encrypt") {
		return getEncrypted(query)
	} else {
		return getDecrypted(query)
	}
}

export const Form = () => {
	const [query, setQuery] = useState("")
	const [mode, setMode] = useState("encrypt")
	const [result, setResult] = useState([])

	const handleTextChange = (e) => setQuery(e.target.value)
	const handleRadioChange = (e) => setMode(e.target.value)

	const handleSubmit = (e) => {
		e.preventDefault()
		if (query && query.trim()) {
			displayResults(query, mode).then((result) => setResult(result))
		}
	}

	return (
		<>
			<FormInput
				handleRadioChange={handleRadioChange}
				handleTextChange={handleTextChange}
				handleSubmit={handleSubmit}
			/>
			<FormResults result={result} />
		</>
	)
}

export const FormInput = ({
	handleRadioChange,
	handleTextChange,
	handleSubmit,
}) => {
	return (
		<div className="FormInput">
			<form onSubmit={handleSubmit}>
				<div className="input-group">
					<label htmlFor="encrypt">Encrypt</label>
					<input
						onChange={handleRadioChange}
						defaultChecked
						id="encrypt"
						type="radio"
						name="encrypt-decrypt"
						value="encrypt"
					/>
				</div>
				<div className="input-group">
					<label htmlFor="decrypt">Decrypt</label>
					<input
						onChange={handleRadioChange}
						id="decrypt"
						type="radio"
						name="encrypt-decrypt"
						value="decrypt"
					/>
				</div>
				<div className="input-group">
					<input onChange={handleTextChange} type="text" />
					<button className="button">Submit</button>
				</div>
			</form>
		</div>
	)
}

export const FormResults = ({ result }) => {
	const parser = new DOMParser()
	const html = parser.parseFromString(result, "text/html")
	const containerElement = html.querySelector("p")
	const value = containerElement ? containerElement.innerText : ""
	return <div className="FormResults">{value}</div>
}

const App = () => (
	<div className="App container">
		<Form />
	</div>
)

export default App
