const express = require("express");
const fs = require("fs")
const multer = require("multer");

const server = express()
const storage = multer.diskStorage({
	destination: "./public",
})
const upload = multer({
	storage,
})

// const uploadFile = () => {
// 	const stream = fs.createReadStream()
// };

server.use(express.static("public"))

server.get("/", (req, res) => {
	res.send(`
		<!DOCTYPE html>
		<html>
			<head></head>

			<body>
				<input type="file" id="file-upload" />
				<button id="upload-btn">upload</button>
			
				<script src="/index.js"></script>
			</body>
		</html>
	`)
})

server.post("/api/upload", upload.single("file"), (req, res) => {
	console.log(req.file)

	res.json({
		message: "Uploaded"
	})
})

server.listen(8080)
