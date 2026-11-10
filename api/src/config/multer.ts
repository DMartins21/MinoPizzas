import multer from 'multer';

export default {
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
        const allowedMemes = ["image/jpeg", "image/jpg", "image/png"];

        if(!allowedMemes.includes(file.mimetype)){
            return cb(new Error("Formato de imagem não compátivel"));
        }
        return cb(null, true);
    }
}