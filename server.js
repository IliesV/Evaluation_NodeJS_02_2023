const app = require('./app');
const port = 3200;

app.listen(port, ()=>{
    console.log('L\'application écoute sur le port ' + port)
})