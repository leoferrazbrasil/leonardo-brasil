import { createBrasaApp } from './app.mjs';

const port = Number(process.env.PORT || 3000);
const app = createBrasaApp();

app.listen(port, () => {
  console.log(`Brasa full-stack ativo na porta ${port}`);
});
