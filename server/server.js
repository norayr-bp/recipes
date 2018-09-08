const express = require('express');
const app = express();
const path = require('path');
const distPath = path.join(__dirname, '..', 'dist');
const port = process.env.PORT || 3000;

app.use(express.static(distPath));

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});