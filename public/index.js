var input = document.querySelector("#file-upload")
var button = document.querySelector("#upload-btn")

button.addEventListener("click", () => {
	if (input.files.length > 0) {	
		const file = input.files[0]
		let body = new FormData();
		body.append("file", file, "file")

		const totalBytes = file.size;
		let bytesUploaded = 0;
		console.log("total bytes:", totalBytes)

		const progressTrackingStream = new TransformStream({
			transform(chunk, controller) {
				controller.enqueue(chunk);
				bytesUploaded += chunk.byteLength;
				console.log("upload progress:", Math.floor((bytesUploaded / totalBytes) * 100));
				console.log("uploaded bytes:", bytesUploaded)
				// uploadProgress.value = bytesUploaded / totalBytes;
			},
			flush(controller) {
				console.log("completed stream");
			},
		});

		// let file = input.files[0]
		// let fileSize = file.size // e.g. 500000
		// let chunkSize = 1024 * 1024 // why?
		// let chunks = Math.ceil(fileSize/chunkSize)
		// let chunk = 0

		// while (chunk <= chunks) {
		// 	let c = file.slice(chunk*chunkSize, (chunk+1)*chunkSize)
		// 	body.set("chunk", c)
		// 	body.set("offset", chunk.toString())
		// 	body.set("totalSize", fileSize)

		// }

		fetch("http://localhost:8080/api/upload", {
			method: "POST",
			body: file.stream().pipeThrough(progressTrackingStream),
			duplex: "half"
		}).catch((err) => console.log({err}))
	}
})
