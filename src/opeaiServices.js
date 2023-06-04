import {Configuration, OpenAIApi} from 'openai'

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export const getEmbeddings = async (text) => {
	const response = await openai.createEmbedding({
		model: 'text-embedding-ada-002',
		input: text
	})
	return response.data.data[0].embedding
}

export const getCompletion = async(prompt) => {
	const completion = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt,
		max_tokens: 500,
		temperature: 0
	})
	return completion.data.choices[0].text
}