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
		temperature: 0.7
	})
	return completion.data.choices[0].text
}

export const getChatCompletion = async(prompt) => {
	const completion = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: [{role: 'user', content: prompt}],
		max_tokens: 500,
		temperature: 0
	})
	return completion.data.choices[0].message.content
}