import multer from 'multer'

// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // your folder
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // or use Date.now() + file.originalname to avoid overwrites
    }
  });
  
  const upload = multer({ storage });

  export default upload;