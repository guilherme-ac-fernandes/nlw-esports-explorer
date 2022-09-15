import express, { Request, Response } from 'express';

const app = express();

app.use(express());

const PORT = 3333;

app.get('/', (_req: Request, res: Response) => {
  return res.status(200).json({ message: 'OK!' });
});

app.get('/ads', (_req: Request, res: Response) => {
  return res.status(200).json([
    { id: 1, name: 'Anúncio 1' },
    { id: 2, name: 'Anúncio 2' },
    { id: 3, name: 'Anúncio 3' },
    { id: 4, name: 'Anúncio 4' },
  ]);
});

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`)
})