const express = require('express');
const router = express.Router();

 router.get('/', (req, res) => {
   res.send({response: 'It\'s Aliiiive!'}).status(200);
 });

 module.exports = router;
