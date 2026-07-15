import { createMainApp } from './app.mjs';

const port = Number(process.env.PORT || 3000);
const app = createMainApp();

app.listen(port, () => {
  console.log(`Leonardo Brasil API ativa na porta ${port}`);
});
