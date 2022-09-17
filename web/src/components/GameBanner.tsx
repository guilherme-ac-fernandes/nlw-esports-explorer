interface GameBannerProps {
  id: string;
  title: string;
  bannerUrl: string;
  adsCount: number;
}

function GameBanner(props: GameBannerProps) {
  const { title, bannerUrl, adsCount } = props;

  const adsString = adsCount < 2 ? 'anúncio' : 'anúncios';
  return (
    <a className="relative rounded-lg overflow-hidden">
      <img src={ bannerUrl } alt={ `Game ${title} banner` } />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradiente absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{ title }</strong>
        <span className="text-zinc-300 text-sm block">{ `${adsCount} ${adsString}` }</span>
      </div>

    </a>
  );
  
}

export default GameBanner;
