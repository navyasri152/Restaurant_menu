const express = require('express');
const app = express();
const port = 3000;

// Serve static HTML file
app.use(express.static('public'));

// Handle currency conversion logic
app.get('/convert', (req, res) => {
    const { amount, from, to } = req.query;
    // Implement your currency conversion logic here
    // Example: Use a library like 'exchange-rates-api' to fetch exchange rates
    // and perform the conversion
    // Send the converted amount as a JSON response
    const convertedAmount = amount * 1.2; // Dummy conversion
    res.json({ result: convertedAmount });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
