import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import GameBanner from './components/GameBanner';
import AdBanner from './components/AdBanner';
import AddModal from './components/AdModal';
import logoImg from './assets/logo-nlw-esports.svg';

import './styles/main.css';
import axios from 'axios';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: { ads:number };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => { fetchGames() }, []);

  const fetchGames = async () => {
    axios.get('http://localhost:3333/games').then(({ data }) => setGames(data));
  };

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={ logoImg } alt="Logo do eSports" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className=" text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      {/* Biblioteca para aplicar slider => Keen-Slider */}
      <div className="grid grid-cols-6 gap-6 mt-16">
       {games.filter((_, index) => index < 6).map((game) => {
        return (
          <GameBanner
            key={ game.id }
            id={game.id}
            title={game.title}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
          />
        );
       })}
      </div>

      <Dialog.Root>
        <AdBanner />
        <AddModal />
      </Dialog.Root>
      
    </div>
  )
}

export default App