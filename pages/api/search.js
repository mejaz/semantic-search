import {getEmbeddings} from "@/src/opeaiServices";
import pinecone, {initialize} from "@/src/pinecone";


export default async function handler(req, res) {
	// 1. check if post call
	if (req.method !== 'POST') {
		return res.status(400).json({message: 'invalid request'})
	}

	try {
		const {query} = req.body

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

		// 6. return the response to user
		return res.status(200).json({q: query, response: similarIngredients})
	} catch (e) {
		console.log(e)
		return res.status(500).json({message: e.message})
	}

}
