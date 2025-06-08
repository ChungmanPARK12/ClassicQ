import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  // Background
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

  // Title ClassiQ
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
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#1e1e1e',
  },
  
  
  // Buttons
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // semi-transparent for background harmony
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    marginTop: 20,
    width: '70%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    
  },
  
  favButton: {
    backgroundColor: 'rgba(228, 93, 127, 0.2)', // subtle pink shade
    borderColor: 'rgba(228, 93, 127, 0.4)',
  },
  
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },

  loader: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: '#A36C4D',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
}

  
});

export default styles;
