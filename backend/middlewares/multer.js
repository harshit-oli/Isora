import multer from "multer"

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{    // ye destination h ki kha vo file store hogi uske liye humne public folder bnaya h
        cb(null,"./public")
    },
    filename:(req,file,cb)=>{      // yha hota h ki hum file ka name kya rakhna chahte h 
        cb(null,file.originalname)
    }
})

export const upload=multer({storage});