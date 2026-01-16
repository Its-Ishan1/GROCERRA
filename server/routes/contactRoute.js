
import express from 'express';
import { submitContact, getContactMessages, updateMessageStatus } from '../controllers/contactController.js';
import authSeller from '../middleware/authSeller.js';

const contactRouter = express.Router();

contactRouter.post('/submit', submitContact);
contactRouter.get('/messages', authSeller, getContactMessages);
contactRouter.post('/update-status', authSeller, updateMessageStatus);

export default contactRouter;
