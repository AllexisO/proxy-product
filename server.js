const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.get('/test', (req, res) => {
    res.json({ message: 'Proxy server is working!' });
});

app.get('/products', async (req, res) => {
    const response = await fetch('http://api-product:3001/api/products');
    const data = await response.json();
    res.json(data);
});

app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    const response = await fetch(`http://localhost:3001/api/products/${id}`);
    const data = await response.json();
    res.json(data);
});

app.post('/products', async (req, res) => {
    const response = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);

});

app.put('/products/:id', async (req, res) => {
    const id = req.params.id;
    const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);

});

app.delete('/products/:id', async (req, res) => {
  const id = req.params.id;
  const response = await fetch(`http://localhost:3001/api/products/${id}`, {
    method: 'DELETE'
  });
  
  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => {
    console.log('Proxy server running on port 3000');
})