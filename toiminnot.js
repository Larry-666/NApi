var config = require('./sisaankirjaus');
const sql = require('mssql');

//Kaikki SQL:n liittyvät toiminnot
async function addOrder(order) {

    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('Numero', Int, order.Numero)
            .input('Tyyppi', VarChar, order.Tyyppi)
            .input('Aihe', VarChar, order.Aihe)
            .input('Rooli', VarChar, order.Rooli)
            .query("INSERT INTO [dbo].[HuomHäirTieto] VALUES ('"+order.Numero+"', '"+order.Tyyppi+"', '"+order.Aihe+"', '"+order.Rooli+"')")
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
 }
 
 async function addVast(order) {
 
    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('Numero', Int, order.Numero)
            .input('Rooli', VarChar, order.Rooli)
            .input('Sähköposti1', VarChar, order.Sähköposti1)
            .input('Sähköposti2', VarChar, order.Sähköposti2)
            .query("INSERT INTO [dbo].[Vastaanottajat] VALUES ('"+order.Numero+"', '"+order.Rooli+"', '"+order.Sähköposti1+"', '"+order.Sähköposti2+"')")
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
 }
 
 async function addViestit(order) {
 
    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('Numero', Int, order.Numero)
            .input('Huomio', VarChar, order.Rooli)
            .input('Lähettäjä', VarChar, order.Lähettäjä)
            .input('VastRooli', VarChar, order.VastRooli)
            .input('Aihe', VarChar, order.Aihe)
            .input('Päivämäärä', VarChar, order.Päivämäärä)
            .query("INSERT INTO [dbo].[Viestit] VALUES ('"+order.Numero+"', '"+order.Huomio+"', '"+order.Lähettäjä+"', '"+order.VastRooli+"' , '"+order.Aihe+"', '"+order.Päivämäärä+"')")
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
 }
 

 module.exports = {
    addOrder : addOrder,
    addVast : addVast,
    addViestit : addViestit
}