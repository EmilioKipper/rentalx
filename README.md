Necessário criar um arquivo .env com sua chave para o JWT, confome .env.example.

Run migrations: `yarn typeorm migration:run`
Add admin user: `yarn seed:admin`
Create test database with name `rentx_test`

Rodar o arquivo do docker-compose `docker-compose up` adicionando a flag `-d` ao comando, ele roda em background, liberando o terminal

Caso apareça algum erro, reiniciar o docker: `docker-compose down` -> `docker-compose up -d` -> após o servidor estar rodando -> `yarn typeorm migration:run`

Debugg on terminal
`docker logs rentx -f`

Swagger/Docs on url/api-docs
