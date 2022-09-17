import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Header } from '../../components/Header';
import { GameCard } from '../../components/GameCard';

import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { Background } from '../../components/Background';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: { ads:number };
}

export function Home() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const response = await fetch('http://192.168.68.114:3333/games');
    const data = await response.json();
    
    setGames(data);
  };

  const navigation = useNavigation();

  const handleOpenGame = ({ id, title, bannerUrl }: Game) => {
    navigation.navigate('game', { id, title, bannerUrl });
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={ logoImg } style={styles.logo} />
        <Header 
          title="Encontre seu duo!" 
          subtitle="Selecione o game que deseja jogar..."
          />
        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <GameCard data={item} onPress={ () => handleOpenGame(item) } />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
          />
      </SafeAreaView>
    </Background>
  );
}