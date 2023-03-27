Com o docker instalado, rodar o seguinte comando para criar a imagem:
`docker build -t rentx`

Depois, com a imagem criada, rodar:
`docker run -p 3333:3333 rentx`

Roda o arquivo do docker-compose, que é equivalente aos comandos acima
`docker-compose up`
adicionando a flag `-d` ao comando, ele roda em background, liberando o terminal
