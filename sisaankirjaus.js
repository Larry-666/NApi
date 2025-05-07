const sql = require('mssql')

//Tiedot jotka tarvitaan Azure SQL:n yhdistämiseen

const config = {
    user: '', // better stored in an app setting such as process.env.DB_USER
    password: '', // better stored in an app setting such as process.env.DB_PASSWORD
    server: '.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: '', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true,
        enableArithAbort : true, 
        
    }
}

//Tarkistaa että yhteys on luotu
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  config, poolPromise
} 