# NextScript

A server for blogs management

## Run Locally

Clone the project

```bash
  git clone https://github.com/A1-mamun/apollo-assignment-3.git
```

Go to the project directory

```bash
  cd apollo-assignment-3
```

Install dependencies

```bash
  npm install
```

Create a `.env` file in your root directory and add the following to connect with mongoDB

```bash
PORT=3000    // you can use your suitable port
DATABASE_URL=  // use your own database url
BCRYPT_SALT_ROUNDS= // use a salt round
JWT_ACCESS_SECRET= // use a jwt access secret
JWT_REFRESH_SECRET=  // use a refresh secret
JWT_ACCESS_EXPIRES_IN= // use a expiration time for access token
JWT_REFRESH_EXPIRES_IN= // use a expiration time for refresh token
```

Start the server

```bash
  npm run start:dev
```
