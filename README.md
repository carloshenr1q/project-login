# Projeto Login

Este é um aplicativo Expo React Native para autenticação de usuários, apresentando funcionalidades de login e criação de conta usando Firebase e Google Sign-In.

## Funcionalidades

- Login de usuário com autenticação do Google
- Criação de conta
- Navegação baseada em abas
- Integração com Firebase para serviços backend
- Design responsivo com componentes Expo

## Tecnologias Utilizadas

- **Expo**: Framework para aplicações React universais
- **React Native**: Desenvolvimento de aplicativos móveis
- **Firebase**: Serviços backend para autenticação
- **TypeScript**: JavaScript com tipagem segura
- **React Navigation**: Biblioteca de navegação

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Android Studio (para desenvolvimento Android)
- Xcode (para desenvolvimento iOS, apenas macOS)

## Instalação

1. Clone o repositório:

   ```bash
   git clone <url-do-repositório>
   cd project-login
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o Firebase:

   - Crie um projeto Firebase no [Firebase Console](https://console.firebase.google.com/)
   - Habilite o Google Sign-In nas configurações de Autenticação
   - Baixe o arquivo `google-services.json` e coloque na raiz do projeto
   - Atualize `firebaseConfig.ts` com sua configuração do Firebase

4. Configure variáveis de ambiente se necessário (usando react-native-dotenv)

## Executando o Aplicativo

1. Inicie o servidor de desenvolvimento Expo:

   ```bash
   npx expo start
   ```

2. Escolha sua plataforma alvo:
   - **Android**: Pressione `a` ou escaneie o código QR com o app Expo Go
   - **iOS**: Pressione `i` (apenas macOS) ou escaneie o código QR com o app Expo Go
   - **Web**: Pressione `w` para abrir no navegador

## Estrutura do Projeto

```
project-login/
├── app/                    # Diretório principal do app (roteamento baseado em arquivos)
│   ├── _layout.tsx         # Layout raiz
│   ├── index.tsx           # Tela inicial
│   ├── create-account.tsx  # Tela de criação de conta
│   ├── (tabs)/             # Navegação por abas
│   └── account/            # Telas relacionadas à conta
├── components/             # Componentes reutilizáveis
├── constants/              # Constantes do app
├── hooks/                  # Hooks personalizados
├── assets/                 # Imagens e fontes
├── firebaseConfig.ts       # Configuração do Firebase
└── google-services.json    # Configuração dos serviços Google
```

## Scripts

- `npm start` / `npx expo start`: Iniciar o servidor de desenvolvimento
- `npm run android`: Iniciar no emulador Android
- `npm run ios`: Iniciar no simulador iOS
- `npm run web`: Iniciar no navegador web
- `npm run test`: Executar testes
- `npm run lint`: Executar linting
- `npm run reset-project`: Resetar para um projeto Expo novo

## Testes

Execute a suíte de testes:

```bash
npm run test
```

## Contribuição

1. Faça um fork do repositório
2. Crie uma branch de funcionalidade
3. Faça suas alterações
4. Execute testes e linting
5. Envie um pull request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Saiba Mais

- [Documentação do Expo](https://docs.expo.dev/)
- [Documentação do React Native](https://reactnative.dev/docs/getting-started)
- [Documentação do Firebase](https://firebase.google.com/docs)
