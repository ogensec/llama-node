import { LLM } from "llama-node";
import { LLMRS } from "llama-node/dist/llm/llm-rs.cjs";
import readline from 'readline';


const llama = new LLM(LLMRS);

export default class LLamaChat {

		static TYPE = 'Llama';

		static MODEL_TYPE = {
				SYSTEM: 'system',
				HUMAN_RESPONSE: 'human-response',
		}

		currentType = null;
		currentPath = null;
		instructions = null;
		// params = {
		// 		numPredict: 1024,
		// 		temperature: 0.00001,
		// 		topP: 2,
		// 		topK: 15,
		// 		repeatPenalty: 1.2,
		// 		repeatLastN: 128,
		// 		seed: 42,
		// 		feedPrompt: true,
		// }
		params = {
				numPredict: 1024,
				temperature: 0.00001,
				topP: 2,
				topK: 15,
				repeatPenalty: 1,
				repeatLastN: 128,
				seed: 42,
				feedPrompt: true,
		}
		isFirstPrompt = true;

		ipc = null

		constructor(model, options = { instructions: null }) {
				if (Object.values(LLamaChat.MODEL_TYPE).includes(model.type)) {
						this.currentType = model.type;
						this.currentPath = model.path
						if (options.instructions) this.instructions = options.instructions;
						if (options.params) this.params = { ...this.params, ...options.params }

						this.ipc = readline.createInterface({
								input: process.stdin,
								output: process.stdout
						});

				}
				else {
						console.error('Invalid model type :', model.type)
				}
		}

		async init() {
				await llama.load({ modelPath: this.currentPath, modelType: LLamaChat.TYPE });
		}


		promptMessage() {
						this.ipc.question('Message: ', async (msg) => {
								// console.log('response input', msg);
								await this.sendMessage(msg);
						});

		}
		createPrompt(prompt) {
				if (this.currentType === LLamaChat.MODEL_TYPE.SYSTEM) {
						if (this.isFirstPrompt) {
								this.isFirstPrompt = false;
								const input = `[INST] ${ this.instructions ? `<<SYS>> ${ this.instructions } <</SYS>>` : null } ${prompt} [/INST]`
								this.history = input;
								return input;
						} else {
								const input = this.history + '[INST] ' + prompt + ' [/INST]';
								this.history = input;
								return input;
						}
				} else if (this.currentType === LLamaChat.MODEL_TYPE.HUMAN_RESPONSE) {
						if (this.isFirstPrompt) {
								this.isFirstPrompt = false;
								const input = `### HUMAN:\n ${this.instructions }\n${ prompt }\n### RESPONSE:\n`
								// const input = ` ${this.instructions ? `### INSTRUCTION:\n${this.instructions}\n` : ''}### HUMAN:\n${ prompt }\n### RESPONSE:\n`

								this.history = input;
								return input;
						} else {
								const input = this.history + `### HUMAN:\n${ prompt }\n### RESPONSE:\n`
								this.history = input;
								return input;
						}
				}
		}
		async sendMessage(message) {

				const promptedMessage = this.createPrompt(message);

				console.log(promptedMessage);
				const params = {
						...this.params,
						prompt: promptedMessage,
				};

				const responseBot = [];
				return llama.createCompletion(params, response => {
						if (!response.token.includes("<end>")) {
								responseBot.push(response.token);
								process.stdout.write(response.token);
						}
						if (response.completed) {
								this.memorizeAnswer(responseBot.join(''))
								process.stdout.write('\n\n');
								this.promptMessage();
						}
				});
		};
		memorizeAnswer(answer) {
				if (this.currentType === LLamaChat.MODEL_TYPE.SYSTEM)
						this.history = this.history + answer + ' ';
				else if (this.currentType === LLamaChat.MODEL_TYPE.HUMAN_RESPONSE)
						this.history = this.history + answer + '\n'
		}
}
