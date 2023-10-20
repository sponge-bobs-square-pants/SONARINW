const express = require('express');
const app = express();

app.use((req, res, next) => {
  const customerIP = req.ip; // This gets the client's IP address
  // You can store it in a variable or pass it along with the response data.
  res.locals.customerIP = customerIP;
  next();
});

app.get('/get-customer-ip', (req, res) => {
    const customerIP = res.locals.customerIP; // Get the IP from res.locals
    res.json({ customerIP }); // Send the IP address as a JSON response
  });