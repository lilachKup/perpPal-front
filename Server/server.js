const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());
const port = 3003;



app.post('/data', (req, res) => {
    const {market_id, name, description, price, category, quantity, image} = req.body;
    console.log("req.body", req.body);
    console.log("before if", market_id, name, description, price, category, quantity, image);

    if (market_id || name || description || price || category || quantity || image) {
        res.status(200).send(`Received parameter: ${market_id}, ${name}, ${description}, ${price}, ${category}, ${quantity}, ${image}`);
        console.log("in if",market_id, name, description, price, category, quantity, image);
        
    } else {
        res.status(400).send('Parameter is missing');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});