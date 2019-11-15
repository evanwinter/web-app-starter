import React, { useState } from "react"

const App = () => {

	const [data, setData] = useState(null)

	const fetchData = async () => {
		console.log('Fetching data...')

		const response = await fetch("https://jsonplaceholder.typicode.com/todos/1")
		const json = await response.json()

		if (json) setData(json)
	}

	return (
		<div className="App" onClick={fetchData}>
			Hello World

			<div>{data ? JSON.stringify(data) : ''}</div>
		</div>
	)
}
export default App