import express from 'express';

const router = express.Router();

router.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'API Server is running!' });
});


export default router;
