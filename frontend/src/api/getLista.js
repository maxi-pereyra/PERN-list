let lista;
let hoja = 'lista-compras';

async function getLista() {
    let response;
        try {
          // Fetch first 10 files
          response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1YbZ-GnO1HdSlNwzZU1r5DIM708e7H9ar9kpj7nKHg-Y',
            range: `${hoja}!A:E`,
          });
        } catch (err) {
            console.log(err)
          //document.getElementById('content').innerText = err.message;
          return;
        }
        const range = response.result;
        if (!range || !range.values || range.values.length == 0) {
          document.getElementById('content').innerText = 'No values found.';
          return;
        }
        lista = [];
        range.values.forEach((fila) => {
            if((fila[0]) == undefined) return;
            const newProduct = {
              id: fila[0],
                nombre: fila[1],
                descripcion: fila[2],
                precio: fila[3],
                categoria: fila[4]
            };
            lista.push(newProduct);
        });
        
}

async function editTurno(id, contenido) {
  const update = [

  ]
  const filaAEditar = parseInt(id)+1;
  response = await gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: '1YbZ-GnO1HdSlNwzZU1r5DIM708e7H9ar9kpj7nKHg-Y',
    range: `${hoja}!A${filaAEditar}:G${filaAEditar}`,
    values: [update],
    valueInputOption:"USER_ENTERED"
  });
  return response;
}