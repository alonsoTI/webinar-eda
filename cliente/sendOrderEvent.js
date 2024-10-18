const axios = require('axios');

// Reemplaza con tu Endpoint de Event Grid y tu Clave de Acceso
const EVENT_GRID_TOPIC_ENDPOINT = "https://eda-lab-topic.canadacentral-1.eventgrid.azure.net/api/events";
const EVENT_GRID_TOPIC_KEY = "9TpxIxNtUC7w9ubEUj7vCSJ0y5hpE8rJhqWdX2uYRkzn6ZD8UHa4JQQJ99AJACBsN54XJ3w3AAABAZEGB7fd"; // Reemplaza con tu clave real

async function sendOrderEvent(order) {
    const events = [{
        id: order.id,
        eventType: "NewOrderCreated",
        subject: `orders/${order.id}`,
        data: order,
        eventTime: new Date().toISOString(),
        dataVersion: "1.0"
    }];

    const config = {
        headers: {
            'aeg-sas-key': EVENT_GRID_TOPIC_KEY,
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.post(EVENT_GRID_TOPIC_ENDPOINT, events, config);
        console.log(`Evento enviado: ${response.status} - ${response.statusText}`);
        console.log(order);
    } catch (error) {
        if (error.response) {
            console.error(`Error enviando evento: ${error.response.status} - ${error.response.statusText}`);
            console.error('Detalles del error:', error.response.data);
        } else {
            console.error(`Error enviando evento: ${error.message}`);
        }
    }
}

// Simulación de creación de un pedido
const newOrder = {
    "id": "ORDER121232",
    "customer": "Victor Lliuya",
    "items": [
        { 
            "productId": "PROD3", 
            "quantity": 2 
        },
        { 
            "productId": "PROD1", 
            "quantity": 1 
        }
    ],
    "total": 190.00
};

// Ejecutar la función para enviar el evento
sendOrderEvent(newOrder);
