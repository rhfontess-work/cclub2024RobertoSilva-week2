/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
// src/index.js

var src_default = {
	async fetch(request, env, ctx) {

		const responseMap = {
			0: "Response 0 ",
			1: "Response 1 ",
			2: "Response 2 ",
			3: "Response 3 ",
		};

		let currentResponse = Math.floor(Math.random() * 4);

		console.log("Logging: " + request.url, " Method:" + request.method)
		console.log("Logging: " + responseMap[currentResponse])

		if (request.method == "POST") {
			return new Response("{\"METHOD\" : \"" + request.method + "\" , \"RESULT\" : \"" + responseMap[currentResponse] + "ALLOWED\" }", {
				headers: {
					'content-type': 'application/json',
				},
			});
		}
		else {
			return new Response("{\"METHOD\" : \"" + request.method + "\" , \"RESULT\" : \"NOT ALLOWED\" }", {
				status: 405,
				headers: {
					'content-type': 'application/json',
					Allow: 'POST',
				},
			});
		}
	}
};

export {

	src_default as default
};