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

  record: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: '42.5%',
    zIndex: 1,
    opacity: 0.8,
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
  gap: 30, // ✅ optional: clean spacing between child elements
},

infoBox: {
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.04)',
  borderRadius: 16,
  paddingVertical: 50,
  paddingHorizontal: 24,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.2)',
  marginBottom: 20, // ✅ slightly less to avoid pushing elements too far
  marginTop: -20,
},

  titleContainer: {
    position: 'absolute',
    top: '10%',
    alignItems: 'center',
  },

  label: {
    fontSize: 20,
    marginBottom: 8,
    color: '#f5f5f5',
    fontFamily: 'Lora_700Bold',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  track: {
    fontSize: 32,
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
