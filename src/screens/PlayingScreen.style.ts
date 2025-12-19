// src/screens/PlayingScreen.style.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  recordImage: {
    width: 200,
    height: 200,
    opacity: 0.8,
  },

  recordWrapper: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignSelf: 'center',
  },

  infoBox: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    height: 450,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    position: 'relative',
    overflow: 'hidden',
    marginTop: -20,
  },

  playerBox: {
    width: 350,
    minHeight: 650,
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -60,
  },

  textArea: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },

  titleContainer: {
    position: 'absolute',
    top: '10%',
    alignItems: 'center',
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
    justifyContent: 'space-evenly', // ensures equal space
    alignItems: 'center',
    width: '70%',
    marginTop: -150,
  },

  controlButton: {
    flex: 1,
    alignItems: 'center',
  },

  playText: {
    fontSize: 26,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'Lora_700Bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#7B4A2D',
    zIndex: 999,
  },
});

export default styles;
