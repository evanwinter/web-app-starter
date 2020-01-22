import React, { useState } from "react"

export const Form = () => {
	const [query, setQuery] = useState("")
	const [mode, setMode] = useState("encrypt")
	const [result, setResult] = useState([])

	const handleTextChange = (e) => setQuery(e.target.value)
	const handleRadioChange = (e) => setMode(e.target.value)

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (query && query.trim()) {
			const result = await displayResults(query, mode)
			setResult(result)
		}
	}

	const encrypt = async (data) => {
		const encryptURL = "https://forms.stormcloud.ninja/dev/general_encrypt/"
		const url = encryptURL + data
		const result = await fetch(url)
		const html = await result.text()
		return html
	}

	const decrypt = async (data) => {
		const decryptURL = "https://forms.stormcloud.ninja/dev/general_decrypt/"
		const url = decryptURL + data
		const result = await fetch(url)
		const html = await result.text()
		return html
	}

	const displayResults = async (query, mode) => {
		return mode === "encrypt" ? await encrypt(query) : await decrypt(query)
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
