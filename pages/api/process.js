import pinecone, {initialize} from "@/src/pinecone";
import {getEmbeddings} from "@/src/opeaiServices";
import {ingredients} from "@/constants";

const insertIngredients = async (ingArr) => {
	try {
		// 1. initialize pinecone
		await initialize()
		// 2. connect to the index
		const index = pinecone.Index(process.env.PINECONE_INDEX)

		let vectors = []
		for (let i = 0; i < ingArr.length; i++) {
			let ingredient = ingArr[i]
			console.log(`${i + 1}:`, ingredient)
			const embedding = await getEmbeddings(ingredient)

			// 3. create an array named vector and push our vectors in that array
			vectors.push({
				id: ingredient,
				values: embedding,
				metadata: {
					text: ingredient,
				},
			})
		}

		// 4. upsert method
		await index.upsert({
			upsertRequest: {
				vectors
			}
		})

		console.log('Ingredients added successfully')

	} catch (e) {
		console.log(e)
	}
}

const getAllIngredients = () => {
	let allIngredients = []
	Object.entries(ingredients).map(([key, value]) => {
		allIngredients = allIngredients.concat(value)
	})

	return allIngredients
}


export default async function handler(req, res) {
	try {
		const allIngredients = getAllIngredients()
		await insertIngredients(allIngredients)
		return res.status(200).json({message: 'success'})
	} catch (e) {
		console.log(e)
		return res.status(500).json({message: 'error'})
	}
}
