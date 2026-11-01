const express = require('express');
const cors = require('cors');
const { getInvoices, processQueueAsync, resetQueue } = require('./services/notifier.service');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint para obtener la cola
app.get('/api/v1/invoices', (req, res) => {
  res.json({ success: true, data: getInvoices() });
});

// Endpoint para disparar el procesamiento
app.post('/api/v1/process-queue', (req, res) => {
  try {
    const updatedQueue = processQueueAsync();
    res.json({ 
      success: true, 
      message: 'Automatización iniciada en segundo plano',
      data: updatedQueue 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Endpoint para reiniciar
app.post('/api/v1/reset', (req, res) => {
  const resetedQueue = resetQueue();
  res.json({ success: true, data: resetedQueue });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});