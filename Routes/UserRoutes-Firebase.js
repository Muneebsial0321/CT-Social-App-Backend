const express = require('express')
const app = express.Router()
const { admin, db } = require('../Config/firebase-db');


app.post('/users', async (req, res) => {
    try {
      const { name, email , somthing} = req.body;
      const userRef = db.collection('users').doc(); // Auto-generate document ID
      await userRef.set({
        name,
        email,
        somthing,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      res.status(201).send({ id: userRef.id });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


  app.get('/users', async (req, res) => {
    try {
      const usersSnapshot = await db.collection('users').get();
    console.log("all users are")
      console.log(usersSnapshot.docs)
      const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


  app.get('/users/:id', async (req, res) => {
    try {
      const userRef = db.collection('users').doc(req.params.id);
      const doc = await userRef.get();
      if (!doc.exists) {
        res.status(404).send('User not found');
      } else {
        res.status(200).send({ id: doc.id, ...doc.data() });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  
  app.put('/users/:id', async (req, res) => {
    try {
      const { name, email } = req.body;
      const userRef = db.collection('users').doc(req.params.id);
      await userRef.update({
        name,
        email,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      res.status(200).send('User updated');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  

  app.delete('/users/:id', async (req, res) => {
    try {
      const userRef = db.collection('users').doc(req.params.id);
      await userRef.delete();
      res.status(200).send('User deleted');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  
  

  module.exports = app