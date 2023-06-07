import {getChatCompletion, getCompletion, getEmbeddings} from "@/src/opeaiServices";
import pinecone, {initialize} from "@/src/pinecone";

export default async function handler(req, res) {
	// 1. check if post call
	if (req.method !== 'POST') {
		return res.status(400).json({message: 'invalid request'})
	}

	try {
		const {query, refine} = req.body

		// 1. initialize the pinecone
		await initialize()
		// 2. connect to the index
		const index = await pinecone.Index(process.env.PINECONE_INDEX)

		// 3. get the embedding for the query
		const queryEmbedding = await getEmbeddings(query)

		// 4. query the pinecone db
		const queryRequest = {
			vector: queryEmbedding,
			topK: 5,
			includeValues: true,
			includeMetadata: true,
		}
		const result = await index.query({queryRequest})

		// 5. get the metadata from the pinecone results
		let similarIngredients = result['matches'].map(item => item['metadata'].text)

		if (refine) {
			// 6. refine the response  TODO: not working properly
			const prompt = `
				Please provide a list of ingredients, including '${query}' if found, from the given list that belong to the same category as '${query}'. If there are no ingredients in the same category as '${query}', please return an empty array.
				Below are 3 Sample Array responses:
				1. ["Onions", "Eggplant", "Broccoli"]
				2. ["Turkey", "Duck", "Lamb", "Sausages"]
				3. []
				Ingredients: ${JSON.stringify(similarIngredients)}
				Answer:
			`

			const refinedIngredients = await getCompletion(prompt)
			const refinedIngredientsParsed = JSON.parse(refinedIngredients.trim())

			// 7. return the refined response to user
			return res.status(200).json({q: query, response: refinedIngredientsParsed})

		} else {
			// 6. return the unrefined response to user
			return res.status(200).json({q: query, response: similarIngredients})
		}

	} catch (e) {
		console.log(e)
		return res.status(500).json({message: e.message})
	}

}
