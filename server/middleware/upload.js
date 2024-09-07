const multer = require('multer');
const multerS3 = require('multer-s3');

// Configuration du client S3
const s3Client = require('../lib/s3client');

// Configuration de multer-s3
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.MINIO_BUCKET,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      console.log('Fonction metadata appelée pour le fichier:', file.originalname);
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const key = `recipes/${Date.now().toString()}-${file.originalname}`;
      console.log('Fonction key appelée. Clé générée:', key);
      cb(null, key);
    }
  }),
  limits: {
    fileSize: 500 * 1024 * 1024, // limite la taille du fichier à 5MB
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      console.log('Fichier image accepté:', file.originalname);
      cb(null, true);
    } else {
      console.log('Fichier rejeté:', file.originalname, 'Type MIME:', file.mimetype);
      cb(new Error('Seules les images sont autorisées.'), false);
    }
  }
});

console.log('Configuration de multer-s3 terminée');

// Middleware de gestion des erreurs
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error('Erreur Multer:', err);
    return res.status(400).json({ success: false, message: `Erreur d'upload: ${err.message}` });
  } else if (err) {
    console.error('Erreur lors de l\'upload:', err);
    return res.status(500).json({ success: false, message: `Erreur serveur: ${err.message}` });
  }
  next();
};

module.exports = {
  upload: upload.array('images', 10),
  handleUploadError
};