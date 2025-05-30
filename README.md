Código-fonte das aulas sobre [React Native](https://github.com/celkecursos/tutorial-aula-react-native-0-79-typescript.git) 0.79.<br>

## Requisitos

* Node.js 22 ou superior - Conferir a versão: node -v
* EXPO GO - Baixar o aplicativo Expo Go da Play Store ou App Store.

## Como rodar o projeto baixado

Altere o arquivo src/config/api.js e configure o IP da máquina onde a API está sendo executada.
No curso, a API é executada no próprio computador, então é necessário definir o IP da sua máquina.
Para obter esse IP, execute o comando abaixo no terminal: <code>ipconfig</code>
Em seguida, use o valor exibido em Endereço IPv4.

Instalar todas as dependencias indicada no package.json.
```
npm install
```

Executar o projeto.
```
npx expo start
```

- Baixar o aplicativo Expo Go da Play Store e App Store.
- Ler o QRCode da aplicação com o aplicativo Expo Go.

## Sequencia para criar o projeto

Criar o projeto com React Native usando expo.
```
npx create-expo-app@latest . --template
```

Na instalação utilizar o template "Blank (TypeScript)".

Executar o projeto.
```
npx expo start
```

- Baixar o aplicativo Expo Go da Play Store ou App Store.
- Ler o QRCode da aplicação com o aplicativo Expo Go.

Realizar chamada para API.
```
npm install axios
```

Dependência para navegar entre as página.
```
npm install @react-navigation/native @react-navigation/native-stack
```
```
npx expo install react-native-screens react-native-safe-area-context
```

Biblioteca para validar o formulário
```
npm install yup
```

## Como enviar o projeto para o GitHub.

Inicializar um novo repositorio GIT.
```
git init
```

Alterar o usuário globalmente "--global" (para todos os repositórios) ou alterar o usuário apenas para um repositório "--local".
```
git config --global user.name "SeuNomeDeUsuario"
git config --global user.email "seuemail@exemplo.com"
```

Adicionar todos os arquivos modificados na área de preparação.
```
git add .
```

Commit registra as alterações feitas nos arquivos que foram adicionados na área de preparação.
```
git commit -m "Base do projeto"
```

Verificar em qual branch está.
```
git branch
```

Renomear a branch atual no GIT para main.
```
git branch -M main
```

Adicionar um repositório remoto ao repositório local.
```
git remote add origin https://github.com/celkecursos/tutorial-aula-crud-react19-typescript.git
```

Enviar os commits locais para um repositório remoto.
```
git push -u origin main
```

## Autor

Este projeto foi desenvolvido por [Cesar Szpak](https://github.com/cesarszpak) e está hospedado no repositório da organização [Celke](https://github.com/celkecursos).

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE.txt) para mais detalhes.