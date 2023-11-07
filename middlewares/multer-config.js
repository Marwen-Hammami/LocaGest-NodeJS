import multer, { diskStorage } from "multer"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

//Les extentions à accepter
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
}

const sizeImage = 5 * 1024 * 1024   // 5Mo

const ImageUpload = makeMulter(sizeImage, "image")
const multipleImageUpload = makeMulterMultiple(sizeImage, "image")

function makeMulter(size, keyword) {
    return multer({
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
        //Limite la taille des images
        limits: sizeImage
    }).single("image")
}

function makeMulterMultiple(size, keyword) {
    return multer({
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
        //Limite la taille des images
        limits: sizeImage
    }).array("image")
}

export { ImageUpload, multipleImageUpload }


//simplifier et ajouter le support pour pdf et mp3
//avec keyword file
