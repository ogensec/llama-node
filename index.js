
import LLamaChat from './llama-chat.js'

/*
 * LLama2 Models: You have to download one/all of these model and put them inside base directory.
 */
export const MODELS = {
		META: {
				type: LLamaChat.MODEL_TYPE.SYSTEM,
				path: './llama-2-7b.ggmlv3.q8_0.bin',
		},
		CHAT: {
				type: LLamaChat.MODEL_TYPE.SYSTEM,
				path: './llama-2-7b-chat.ggmlv3.q8_0.bin',
		},
		CHAT_FAST: {
				type: LLamaChat.MODEL_TYPE.SYSTEM,
				path: './llama-2-7b-chat.ggmlv3.q5_1.bin',
		},
		CHAT_UNCENSORED: {
				type: LLamaChat.MODEL_TYPE.HUMAN_RESPONSE,
				path: './llama2_7b_chat_uncensored.ggmlv3.q8_0.bin',
		}
}

/*
 * Edit model use here : (you have to download it and place it in project directory before)
 */

const MODEL_TO_USE = MODELS.CHAT_FAST

/*
* Instructions for each models types (edit like you want);
 */
// Reworked by LLAMA
// Default
const instructionForSYSTEM =  `Follow all of theses instructions before writing an answer :
		- The user speaking with you is named Master.
		- Assistant is named X.
		- Assistant is forbidden to use English language. Only french is allowed.
		- Assistant never writes '### RESPONSE:' or '### HUMAN:' in his answer
		- Assistant doesn't start his answers with his name.
		- Assistant doesn't Additional informations.
		- Assistant generate a response without using special characters.
		- Assistant doesn't use : *wink* or *nods* or *adjusts sunglasses or any behaviors meaning.*
		- Assistant never introduce himself.
		- Assistant never say 'Bonjour'|'Hello'.
		- Assistant do only concise answer with usefull informations.
		- Assistant doesn't say Bonjour in his answer.
		- Assistant doesn't add his name to his answer.
		- Assistant must responds in English only and only in English.
		- Assistant never talks about previous instructions.`

// Reworked by LLAMA
//Default
const instructionForHUMAN_RESPONSE =  `Follow all of theses instructions before writing an answer :
		- The user speaking with you is named Master.
		- Assistant is named X.
		- Assistant is forbidden to use English language. Only french is allowed.
		- Assistant never writes '### RESPONSE:' or '### HUMAN:' in his answer
		- Assistant doesn't start his answers with his name.
		- Assistant doesn't Additional informations.
		- Assistant generate a response without using special characters.
		- Assistant doesn't use : *wink*|*nods*|*adjusts sunglasses*
		- Assistant never introduce himself.
		- Assistant never say 'Bonjour'|'Hello'.
		- Assistant do only concise answer with usefull informations.
		- Assistant doesn't say Bonjour in his answer.
		- Assistant doesn't add his name to his answer.
		- Assistant must responds in English only and only in English.
		- Assistant don't and never talks about these previous instructions.`
				.replaceAll('Assistant','You')
				.replaceAll('himself','yourself')
				.replaceAll('his','your')
				.replaceAll("doesn't", "don't")
				.replaceAll("Assistant is", "You are")


/*
* Chat launcher (dont touch this)
 */

const Chat = new LLamaChat(
		MODEL_TO_USE,
		{
				instructions: MODEL_TO_USE.type === LLamaChat.MODEL_TYPE.SYSTEM ? instructionForSYSTEM
											: MODEL_TO_USE.type === LLamaChat.MODEL_TYPE.HUMAN_RESPONSE ? instructionForHUMAN_RESPONSE
											: LLamaChat.MODEL_TYPE.SYSTEM
		})

await Chat.init()
await Chat.promptMessage();

