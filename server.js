const express = require('express');

const app = express();

app.use((req, res) => {
    res.json({ message: "Hello from Express" });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});