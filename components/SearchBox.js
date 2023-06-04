import {useState} from "react";


export default function SearchBox({setHighlightIng}) {
	const [ingredient, setIngredient] = useState('')
	const [results, setResults] = useState([])
	const [q, setQ] = useState('')
	const [loading, setLoading] = useState(false)

	const handleChange = (e) => {
		setIngredient(e.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (ingredient.trim().length === 0) {
			alert('search ing is empty!')
			return
		}

		setLoading(true)
		setHighlightIng([])

		let response = await fetch('/api/search', {
			method: 'POST',
			body: JSON.stringify({query: ingredient}),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (response.ok) {
			response = await response.json()
			setResults(response.response)
			setHighlightIng(response.response)
			setQ(response.q)
		} else {
			alert('error')
		}

		setIngredient('')
		setLoading(false)
	}

	return (
		<div>
			<form className={'w-full flex space-x-2'} onSubmit={handleSubmit}>
				<input onChange={handleChange} value={ingredient} type={'text'} placeholder={'Type any ingredient...'}
							 className={'grow border border-purple-500 p-2 rounded-md'}/>
				<button
					disabled={loading}
					className={'bg-purple-500 p-2 px-4 text-white rounded-md hover:bg-purple-600 disabled:bg-purple-300 disabled:cursor-not-allowed'}
				>
					Search
				</button>
			</form>
			<div className={'mt-4'}>
				<div className={'border-b flex items-center'}>
					<h3 className={"font-semibold uppercase"}>Results</h3>
					{q ? <span className={'text-xs ml-2'}>({q})</span> : undefined}
				</div>
				<div className={'mt-2'}>
					{
						loading
							? <p>Searching...</p>
							: results.length > 0
								? <ol>
									{results.map((item) => <li key={item}>{item}</li>)}
								</ol>
								: <p>No Results found</p>
					}
				</div>
			</div>
		</div>
	)
}