const express = require('express');
const app = express();
const path = require('path');
const distPath = path.join(__dirname, '..', 'dist');

app.use(express.static(distPath));

app.listen(3000, () => {
    console.log('Server is up!');
});