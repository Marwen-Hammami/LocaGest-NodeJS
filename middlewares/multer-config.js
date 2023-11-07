import multer, { diskStorage } from "multer"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

//Les extentions à accepter
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "application/pdf": "pdf",
    "audio/mpeg": "mp3", 
}

const sizeFile = 5 * 1024 * 1024   // 5Mo

const FileUpload = makeMulter(false)
const multipleFileUpload = makeMulter(true)

function makeMulter(multiple) {
    const mult = multer({
        storage: diskStorage({
            destination: (req, file, callback) => {
                const __dirname = dirname(fileURLToPath(import.meta.url))
                callback(null, join(__dirname, "../public/images"))
            },
            filename: (req, file, callback) => {
                const name = file.originalname.split(" ").join("_")
                const extension = MIME_TYPES[file.mimetype]
                callback(null, name + Date.now() + "." + extension)
            },
        }),
        limits: sizeFile
    })
    if (multiple) {
        return mult.array("file")
    }
    return mult.single("file")
}

export { FileUpload, multipleFileUpload }