import multer from 'multer';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

import { completeProfile } from "../services/completeProfile.js";
import { profileChanges } from "../services/userProfile.js";

export const updateProfile = async (req, res) => {
  const { birthday, country, currency, gender, spendLimit, uid } = req.body;

  try {
    const user = await completeProfile({
      birthday,
      country,
      currency,
      gender,
      spendLimit,
      uid,
      reputation: 150,
    });

    res.status(201).json({ message: "Successfully updated!", access: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const applyProfileChanges = async (req, res) => {
  // Creamos un middleware de Multer específico para esta ruta
  const upload = multer({ 
    storage: multer.memoryStorage(), // Usamos memoryStorage para simplificar
    limits: { fileSize: 5 * 1024 * 1024 }
  }).single('image');

  upload(req, res, async (err) => {
    try {
      if (err) {
        console.error('Error en upload:', err);
        return res.status(400).json({ error: err.message });
      }

      const { UID, description } = req.body;
      let profile_photo = null;

      // Procesamos la imagen si existe
      if (req.file) {
        const fileName = `${uuidv4()}${path.extname(req.file.originalname)}`;
        const filePath = path.join('uploads', 'profile-photos', fileName);
        
        // Creamos el directorio si no existe
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
        
        // Guardamos el archivo
        await fs.promises.writeFile(filePath, req.file.buffer);
        profile_photo = `/profile-photos/${fileName}`;
      }

      const user = await profileChanges(UID, description, profile_photo);
      res.status(200).json({ 
        message: "Successfully updated!", 
        access: true,
        profile_photo
      });

    } catch (error) {
      console.error('Error en applyProfileChanges:', error);
      res.status(500).json({ error: error.message });
    }
  });
};