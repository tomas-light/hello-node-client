### Устанвока
В консоли набрать `yarn install`

### Запуск
В консоли набрать `yarn start`

### TSL and localhost
HTTPS connection for localhost can be enabled in `./webpack/config.dev.ts`.
1. Uncomment lines bellow
```ts
devServer: {
  /*...*/
  server: {
    type: "https",
    options: {
      key: certificate.privateKey,
      cert: certificate.certPEM,
    },
  },
},
```

2. Change settings in Chrome to accepts self-signed certificates for localhost.
Please go to `chrome://flags/#allow-insecure-localhost` in Chrome 
and enable this feature.
