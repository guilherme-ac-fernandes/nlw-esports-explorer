import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import 'express-async-errors';

import { PrismaClient } from '@prisma/client';
import convertHourStringToMinutes from './utils/convert-hour-string-to-minutes';
import convertMinutesToHourString from './utils/convert-minutes-to-hour-string';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3333;

const prisma = new PrismaClient({ log: ['query'] });

// Rota de Validação
app.get('/', (_req: Request, res: Response) => {
  return res.status(200).json({ message: 'OK!' });
});

// Rota para listagem de Games
app.get('/games', async (_req: Request, res: Response) => {
  const games = await prisma.game.findMany({
    include: { _count: { select: { ads: true } } },
  });
  return res.status(200).json(games)
})

// Rota de criação de um anúncio para o Game selecionado
app.post('/games/:gameId/ads', async (req: Request, res: Response) => {
  const { gameId } = req.params;
  const {
    name,
    yearsPlaying,
    discord,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel,
  } = req.body;
  
  const newAd = await prisma.ad.create({
    data: {
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays: weekDays.join(','),
      hourStart: convertHourStringToMinutes(hourStart),
      hourEnd: convertHourStringToMinutes(hourEnd),
      useVoiceChannel,
    },
  });
  return res.status(201).json(newAd);
});

// Rota para listagem de Anúncios referente a um Game 
app.get('/games/:id/ads', async (req: Request, res: Response) => {
  const { id: gameId } = req.params;

  const ads = await prisma.ad.findMany({
    where: { gameId },
    select: {
      id: true,
      name: true,
      yearsPlaying: true,
      weekDays: true,
      hourStart: true,
      hourEnd: true,
      useVoiceChannel: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  const formattedAds = ads.map((ad) => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    };
  });
  return res.status(200).json(formattedAds);
});

// Rota para obter discord do criador do Anúncio
app.get('/ads/:id/discord', async (req: Request, res: Response) => {
  const { id } = req.params;
  const ad = await prisma.ad.findUniqueOrThrow({
    where: { id },
    select: { discord: true },
  });

  return res.status(200).json({ discord: ad.discord });
});

// Erro Genérico
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  return res.status(500).json({ message: 'Internal server error' });
})

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`)
});
