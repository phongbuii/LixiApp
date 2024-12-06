import React, {useEffect, useRef, useState} from 'react';
import WheelOfFortune from './components/WheelPicker';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Alert,
  Vibration,
  AppState,
  AppStateStatus,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import Sound from 'react-native-sound';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-9258791108574734/5580549374';

const {width, height} = Dimensions.get('screen');

interface Player {
  id?: number;
  name: string;
}

interface WheelOfFunProps {
  players: Player[];
  setTypeGame: (type: number) => void;
  setPlayers: (players: Player[]) => void;
}

const WheelOfFun: React.FC<WheelOfFunProps> = ({
  players,
  setTypeGame,
  setPlayers,
}) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [participants, setParticipants] = useState<string[]>([
    'Người chơi 1',
    'Người chơi 2',
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    if (players && players.length > 0) {
      const participantNames = players.map((item, index) =>
        item.name !== '' ? item.name : `Người chơi ${item.id ?? index + 1}`,
      );
      setParticipants(participantNames);
    }
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [players]);

  const wheelOptions = {
    rewards: participants,
    knobSize: 50,
    borderWidth: 5,
    borderColor: '#000',
    innerRadius: 50,
    duration: 4000,
    backgroundColor: 'red',
    textAngle: 'horizontal',
    getWinner: (value: string, index: number) => {
      console.log('WINNER', value);
      Alert.alert('Kết quả', `Người thắng: ${value}`);
    },
    playButton: () => (
      <View style={styles.buttonPlay}>
        <Text style={{color: 'white'}}>Vào việc</Text>
      </View>
    ),
    onRef: (ref: any) => (this.child = ref),
  };

  const deletePlayer = (index: number) => {
    if (players.length > 1) {
      const updatedPlayers = [...players];
      updatedPlayers.splice(index, 1);
      setPlayers(updatedPlayers);
    }
  };

  const onFinished = (value: string, index: number) => {
    Alert.alert(
      'Chúc mừng',
      `Người thắng: ${value.toUpperCase()}.\nBạn có muốn xóa người chơi này?`,
      [
        {text: 'Không', onPress: () => {}},
        {text: 'Xóa', onPress: () => deletePlayer(index)},
      ],
    );
  };

  const whooshRef = useRef<Sound>(
    new Sound('mussic.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.error('Failed to load the sound', error);
      }
    }),
  );

  const playMusic = () => {
    whooshRef.current?.play(success => {
      if (!success) {
        console.error('Playback failed due to audio decoding errors');
      }
    });
  };

  useEffect(() => {
    setTimeout(playMusic, 500);
  }, []);

  const onSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
    if (soundEnabled) {
      whooshRef.current?.pause();
    } else {
      playMusic();
    }
  };

  const appState = useRef<AppStateStatus>(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState<AppStateStatus>(
    appState.current,
  );

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        playMusic();
      } else if (nextAppState === 'background') {
        whooshRef.current?.pause();
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => subscription.remove();
  }, []);

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <RectButton onPress={() => setTypeGame(0)} style={{marginTop: 30}}>
        <Icon name="arrow-back" size={height / 18} color="#FDD451" />
      </RectButton>
      <View style={{alignSelf: 'center', zIndex: 1}}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{requestNonPersonalizedAdsOnly: true}}
        />
        <View style={{marginLeft: width - 50, marginTop: 20}}>
          <Icon
            name={soundEnabled ? 'volume-mute' : 'volume-high-sharp'}
            size={30}
            color="#fff"
            onPress={onSoundToggle}
          />
        </View>
      </View>
      {!loading && (
        <WheelOfFortune options={wheelOptions} getWinner={onFinished} />
      )}
    </View>
  );
};

export default WheelOfFun;

const styles = StyleSheet.create({
  buttonPlay: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
