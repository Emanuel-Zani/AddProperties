function handleLoginResponse(response, sheet) {
  const webhooks = response.webhooks;

  webhooks.forEach((webhook) => {
    const { id_properties, url, date_created } = webhook;

    // Verificar si el webhook está activo
    const isActive = checkIfWebhookIsActive(id_properties); // Asume que esta función devuelve true si está activo

    // Verificar si el webhook ya existe en el sheet
    const existsInSheet = checkIfPropertyExists(id_properties, sheet);

    // Si está activo y no existe en el sheet, agregarlo al sheet
    if (isActive && !existsInSheet) {
      insertProperty(id_properties, url, date_created, sheet); // Asegúrate de que esta función agrega correctamente al sheet
      Logger.log(`✅ Webhook activo y agregado al sheet: ${url}`);
    }
  });
}

// Función que inserta la propiedad en el sheet
function insertProperty(id_properties, url, date_created, sheet) {
  const newRow = [id_properties, url, date_created]; // Ajusta la estructura de la fila según sea necesario
  sheet.appendRow(newRow);
}

// Función que verifica si la propiedad ya está en el sheet
function checkIfPropertyExists(id_properties, sheet) {
  const data = sheet.getDataRange().getValues(); // Obtiene todos los datos del sheet
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] == id_properties) {
      // Asume que el id_properties está en la primera columna
      return true; // Si encuentra el id en el sheet, devuelve true
    }
  }
  return false; // Si no lo encuentra, devuelve false
}
