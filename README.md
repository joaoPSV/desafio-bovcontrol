<h1 align="center">
   🐮 BovControl 
</h1>

## Desafio

<p align="justify">Construir uma API que seja capaz de Criar,consultar e editar registro de Animais, salvando os dados em um banco de dados mongoDb </p>

### Bibliotecas utilizadas

- Express
- Body-Parser
- Mongoose
- Chai
- Joi
- Mocha
- DotEnv

### Instruções de instalação (LINUX)

Abra o terminal e execute os seguintes comandos:

```
git clone https://github.com/joaoPSV/desafio-bovcontrol.git

cd desafio-bovcontrol/

npm i

```

### Instruções de execução (LINUX)

Abra o terminal e execute os seguintes comandos:

```
cd desafio-bovcontrol/

// Caso queira rodar o serviço
npm start 

//Caso queira rodar os testes unitários
npm test

```

### Obs: Caso seja necessário alterar a porta que roda o serviço, criar um arquivo .env dentro do diretório do projeto com as seguintes informações:

```
PORT=<Porta>
```


### Segue exemplos de requisições possíveis, que retornarão êxito:

<h4 style="color:green">GET</h1>

/v1/animals/5e4e1b0316577a22d811a06e

<h4 style="color:yellow">POST</h1>

/v1/animals

Com o seguinte Body:
```
{
	"name": "Vaca08",
	"type": "COW",
	"age": 17,
	"weight": 130.2
}
```

<h4 style="color:blue">PUT</h1>

/v1/animals/5e4e1b0316577a22d811a06e

Com o seguite Body:
```
{
	"age": 19
}
```
