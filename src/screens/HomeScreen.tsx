
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import styles from './HomeScreen.style';
import { trackList } from '../data/tracks'; // ✅ Use shared track list

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handlePlayRandom = () => {
    const randomIndex = Math.floor(Math.random() * trackList.length);
    const selectedTrack = trackList[randomIndex];

    navigation.navigate('NowPlaying', {
      title: selectedTrack.title,
      composer: selectedTrack.composer,
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
      >
      <View style={styles.header}>
        <Text style={styles.title}>🎼 ClassiQ</Text>
      </View>

      <View style={styles.body}>
        <TouchableOpacity style={styles.button} onPress={handlePlayRandom}>
          <Text style={styles.buttonText}> Play Random Music</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );


}
