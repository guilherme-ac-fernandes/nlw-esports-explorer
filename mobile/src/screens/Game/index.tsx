import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { GameParams } from '../../@types/navigation';

import { Background } from '../../components/Background';
import logoImg from '../../assets/logo-nlw-esports.png';
import { THEME } from '../../theme';

import { styles } from './styles';
import { Header } from '../../components/Header';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
  const route = useRoute();
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const game = route.params as GameParams;
  const navigation = useNavigation();
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    const response = await fetch(`http://192.168.68.114:3333/games/${game.id}/ads`);
    const data = await response.json();
    setDuos(data);

  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getDiscordUser = async (adsId: string) => {
    const response = await fetch(`http://192.168.68.114:3333/ads/${adsId}/discord`);
    const { discord } = await response.json();
    setDiscordDuoSelected(discord);
  };
  
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo  name="chevron-thin-left" color={THEME.COLORS.CAPTION_300} size={20} />
          </TouchableOpacity>
          
          <Image source={ logoImg } style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image source={{uri: game.bannerUrl}} style={styles.cover} resizeMode="cover" />

        <Header
          title={game.title} 
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <DuoCard data={item} onConnect={ () => getDiscordUser(item.id) } />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={duos.length > 0 ? styles.contentList : styles.emptyListContent}
          style={styles.containerList}
          ListEmptyComponent={ () => <Text style={styles.emptyListText}>
            Não há anúncios publicados ainda!
          </Text> }
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={ discordDuoSelected }
          onClose={() => setDiscordDuoSelected('')}
        />

      </SafeAreaView>
    </Background>
  );
}