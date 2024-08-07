import axios from 'axios';

//COMO REVALIDAD DATOS EN PRODUCCION
export const fetchDataCsv = async  () =>{
    const csvUrl =  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTL5otk34V4tpvxgcV6WdUP6ETsSsQFFM3n_vIE19F5zFMuVegDV3oNO4z8AcxI-N4antVL6VNrpTrj/pub?gid=0&single=true&output=csv'
     let response = await axios.get(csvUrl)
     const parsedCSVData = parseCSV(response.data);
     console.log("parse",parsedCSVData)
     return parsedCSVData
}

function parseCSV(csvText){
    const rows = csvText.split(/\r?\n/);
    const headers = rows[0].split(',');
    const data = [];
    for(let i=1;i<rows.length;i++){
        const rowData = rows[i].split(',');
        const rowObject = {};
        for(let j=0;j<headers.length;j++){
            rowObject[headers[j]] = rowData[j];
        }
        data.push(rowObject);
    }
    return data
}
