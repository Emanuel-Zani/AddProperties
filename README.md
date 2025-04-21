# 📄 Webhook Registration Script for Google Sheets

Este proyecto contiene un script en Google Apps Script que permite registrar automáticamente **webhooks activos** en una hoja de cálculo de Google Sheets, evitando duplicados. Está diseñado para integrarse con respuestas de login que contienen múltiples webhooks y almacenar solo aquellos que estén activos y no registrados previamente.

---

## 🚀 Características

- ✅ Filtra webhooks activos.
- 📋 Verifica si ya existen en el Google Sheet.
- ➕ Inserta automáticamente nuevos webhooks activos.
- 🪵 Utiliza `Logger.log()` para rastrear acciones realizadas.

---

## 🧠 ¿Cómo funciona?

El script analiza una respuesta JSON con una lista de webhooks y realiza los siguientes pasos:

1. **Itera sobre cada webhook recibido**.
2. Verifica si el `id_properties` del webhook **está activo**.
3. Revisa si ese `id_properties` **ya está registrado en la hoja de cálculo**.
4. Si está activo **y no existe**, lo **agrega como una nueva fila** al final del Sheet.

---

## 📁 Estructura del Código

```javascript
function handleLoginResponse(response, sheet) {
  const webhooks = response.webhooks;

  webhooks.forEach((webhook) => {
    const { id_properties, url, date_created } = webhook;

    const isActive = checkIfWebhookIsActive(id_properties);
    const existsInSheet = checkIfPropertyExists(id_properties, sheet);

    if (isActive && !existsInSheet) {
      insertProperty(id_properties, url, date_created, sheet);
      Logger.log(`✅ Webhook activo y agregado al sheet: ${url}`);
    }
  });
}
```

### 🔧 Funciones auxiliares

#### `insertProperty(id_properties, url, date_created, sheet)`

Agrega un nuevo webhook activo al Google Sheet como una nueva fila.

#### `checkIfPropertyExists(id_properties, sheet)`

Verifica si el `id_properties` ya está registrado en la hoja, comparando contra la primera columna.

#### `checkIfWebhookIsActive(id_properties)`

> ⚠️ **No incluida en este código.**  
> Debe definirse por separado. Se espera que devuelva `true` si el webhook está activo.

---

## 📌 Requisitos

- Tener acceso a un Google Sheet.
- Crear un proyecto de Apps Script vinculado al Sheet.
- Asegurarse de definir la función `checkIfWebhookIsActive(id_properties)` en el script.

---

## 🧪 Ejemplo de Uso

```javascript
const response = {
  webhooks: [
    {
      id_properties: "123",
      url: "https://example.com",
      date_created: "2024-04-20",
    },
    {
      id_properties: "456",
      url: "https://example.org",
      date_created: "2024-04-19",
    },
  ],
};

handleLoginResponse(
  response,
  SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
);
```

---

## 🛠️ Personalización

Puedes adaptar la función `insertProperty` para incluir más columnas si el webhook contiene más datos que deseas almacenar (como estado, tipo, etc.).
