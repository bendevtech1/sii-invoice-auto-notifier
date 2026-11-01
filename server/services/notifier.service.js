// server/services/notifier.service.js

// Base de datos simulada en memoria
let invoicesQueue = [
  { id: 'INV-001', client: 'Constructora del Sur SpA', amount: 145000, status: 'Pendiente' },
  { id: 'INV-002', client: 'Comercial Los Pinos', amount: 32000, status: 'Pendiente' },
  { id: 'INV-003', client: 'Servicios Informáticos SPA', amount: 289000, status: 'Pendiente' },
  { id: 'INV-004', client: 'Transportes del Norte', amount: 95000, status: 'Pendiente' }
];

const getInvoices = () => {
  return invoicesQueue;
};

const processQueueAsync = () => {
  // Cambios el estado a 'Procesando'
  invoicesQueue = invoicesQueue.map(inv => ({ ...inv, status: 'Procesando' }));

  // Simulacion de un retraso de procesamiento asíncrono 
  setTimeout(() => {
    invoicesQueue = invoicesQueue.map(inv => ({ ...inv, status: 'Enviado ' }));
    console.log('Lote de facturas procesado y notificado exitosamente.');
  }, 4000);

  return invoicesQueue;
};

const resetQueue = () => {
  invoicesQueue = [
    { id: 'INV-001', client: 'Constructora del Sur SpA', amount: 145000, status: 'Pendiente' },
    { id: 'INV-002', client: 'Comercial Los Pinos', amount: 32000, status: 'Pendiente' },
    { id: 'INV-003', client: 'Servicios Informáticos SPA', amount: 289000, status: 'Pendiente' },
    { id: 'INV-004', client: 'Transportes del Norte', amount: 95000, status: 'Pendiente' }
  ];
  return invoicesQueue;
};

module.exports = {
  getInvoices,
  processQueueAsync,
  resetQueue
};