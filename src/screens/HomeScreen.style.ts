import { StyleSheet } from 'react-native';
import { HomeT as T } from '../ui/tokens/homescreenToken';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    marginTop: 100,
    alignItems: 'center',
  },

  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontFamily: 'Lora_700Bold',
    fontSize: T.titleFontSize,
    fontWeight: 'bold',
    marginBottom: T.titleMarginBottom,
    color: '#1e1e1e',
  },

  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: T.buttonPaddingVertical,
    paddingHorizontal: T.buttonPaddingHorizontal,
    borderRadius: 30,
    marginTop: T.buttonMarginTop,
    width: T.buttonWidth,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: T.buttonTextSize,
    fontWeight: '600',
    letterSpacing: 1,
    width: '100%',
    textAlign: 'center',
    //alignSelf: 'center',
  },
});

export default styles;
