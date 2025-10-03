require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.get('/test', (req, res) => {
    res.json({ message: 'Proxy server is working!' });
});

const API_URL = process.env.API_URL || 'http://api-product:3001';

app.get('/api/v1/products', async (req, res) => {
    const response = await fetch(`${API_URL}/api/v1/products`);
    const data = await response.json();
    res.json(data);
});

app.get('/api/v1/products/:id', async (req, res) => {
    const id = req.params.id;
    const response = await fetch(`${API_URL}/api/v1/products/${id}`);
    const data = await response.json();
    res.json(data);
});

app.post('/api/v1/products', async (req, res) => {
    const response = await fetch(`${API_URL}/api/v1/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);

});

app.put('/api/v1/products/:id', async (req, res) => {
    const id = req.params.id;
    const response = await fetch(`${API_URL}/api/v1/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);

});

app.delete('/api/v1/products/:id', async (req, res) => {
  const id = req.params.id;
  const response = await fetch(`${API_URL}/api/v1/products/${id}`, {
    method: 'DELETE'
  });
  
  const data = await response.json();
  res.json(data);
});

app.listen(4000, () => {
    console.log('Proxy server running on port 4000');
})