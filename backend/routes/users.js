// backend/routes/users.js

import express from 'express';
import { addDoc } from 'firebase/firestore';
import { UserCollection } from '../config/firebase.js';

const router = express.Router();

// POST /create
router.post('/create', async (req, res) => {
  try {
    const data = req.body;
    await addDoc(UserCollection, data);
    res.status(200).send({ msg: 'User added successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
