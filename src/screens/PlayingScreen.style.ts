import { StyleSheet, Dimensions } from 'react-native';
import { PlayingT as T } from '../ui/tokens/playingscreenToken';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  playerBox: {
    width: 350,
    minHeight: T.playerBoxMinHeight,
    paddingTop: T.playerBoxPaddingTop,
    paddingBottom: T.playerBoxPaddingBottom,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: T.playerBoxMarginTop,
  },

  infoBox: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    height: T.infoBoxHeight,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    position: 'relative',
    overflow: 'hidden',
    marginTop: T.infoBoxMarginTop,
  },

  textArea: {
    marginTop: T.textAreaMarginTop,
    width: '100%',
    alignItems: 'center',
  },

  recordWrapper: {
    position: 'absolute',
    bottom: T.recordBottom,
    left: 0,
    right: 0,
    alignSelf: 'center',
  },

  recordImage: {
    width: 200,
    height: 200,
    opacity: 0.8,
  },

  label: {
    fontSize: 30,
    marginBottom: 8,
    color: '#f5f5f5',
    fontFamily: 'Lora_700Bold',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  track: {
    fontSize: 25,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Lora_700Bold',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  composer: {
    fontSize: 20,
    color: '#ddd',
    fontStyle: 'italic',
    marginTop: 6,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: T.controlsWidth as any, // Home에서 겪은 width 타입 이슈 회피 (원하면 as const로 고정)
    marginTop: T.controlsMarginTop,
  },

  controlButton: {
    flex: 1,
    alignItems: 'center',
  },
});

export default styles;
