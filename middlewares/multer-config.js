import multer, { diskStorage } from "multer"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

//Les extentions à accepter
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
}

const sizeGameImage = 5 * 1024 * 1024   // 5Mo
const sizeUserAvatar = 512 * 1024       // 512Ko

const gameImageUpload = makeMulter(sizeGameImage, "image")
const userAvatarUpload = makeMulter(sizeUserAvatar, "avatar")

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
        limits: size
    }).single(keyword)
}

export { gameImageUpload, userAvatarUpload }