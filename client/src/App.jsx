import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, RefreshCw, CheckCircle, Clock, Loader2, FileText } from 'lucide-react';
import './App.css';

function App() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = 'http://localhost:5000/api/v1';

  // Cargar las facturas desde el Backend
  const fetchInvoices = async () => {
    try {
      const response = await fetch(`${API_URL}/invoices`);
      const data = await response.json();
      if (data.success) setInvoices(data.data);
    } catch (error) {
      console.error('Error al conectar con la API:', error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Disparar el envío batch asíncrono
  const handleProcessQueue = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/process-queue`, { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        setInvoices(data.data);
        // Polling para simular la actualización del Worker tras 4.5s
        setTimeout(() => {
          fetchInvoices();
          setLoading(false);
        }, 4500);
      }
    } catch (error) {
      console.error('Error al procesar la cola:', error);
      setLoading(false);
    }
  };

  // Reiniciar la cola
  const handleReset = async () => {
    try {
      const response = await fetch(`${API_URL}/reset`, { method: 'POST' });
      const data = await response.json();
      if (data.success) setInvoices(data.data);
    } catch (error) {
      console.error('Error al reiniciar:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="title-area">
          <FileText className="icon-main" />
          <div>
            <h1>SII Invoice Auto-Notifier</h1>
            <p>Procesador automático de facturas y cobros recurrentes</p>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn btn-secondary" onClick={handleReset} disabled={loading}>
            <RefreshCw size={18} /> Reiniciar
          </button>
          <button className="btn btn-primary" onClick={handleProcessQueue} disabled={loading}>
            {loading ? <Loader2 className="spinner" size={18} /> : <Send size={18} />}
            {loading ? 'Procesando...' : 'Notificar Lote'}
          </button>
        </div>
      </header>

      <div className="grid-container">
        <AnimatePresence>
          {invoices.map((inv) => (
            <motion.div
              key={inv.id}
              className={`invoice-card ${inv.status.toLowerCase()}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <div className="card-header">
                <span className="inv-id">{inv.id}</span>
                <span className={`badge badge-${inv.status.toLowerCase().replace(' 🚀', '')}`}>
                  {inv.status === 'Pendiente' && <Clock size={14} />}
                  {inv.status === 'Procesando' && <Loader2 className="spinner" size={14} />}
                  {inv.status.includes('Enviado') && <CheckCircle size={14} />}
                  {inv.status}
                </span>
              </div>
              
              <div className="card-body">
                <h3>{inv.client}</h3>
                <p className="amount">${inv.amount.toLocaleString('es-CL')} CLP</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
