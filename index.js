const controller = require('./controllers/animalController');
    
const port = process.env.PORT || 8080;

controller.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
