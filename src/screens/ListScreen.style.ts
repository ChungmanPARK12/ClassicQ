// src/screens/ListScreen.style.ts
import { StyleSheet } from 'react-native';

// Layout constants
const ART_BOX = 80;
const IMAGE_SIZE = 85;   // <- change this freely; alignment won’t move
const PLAY_BADGE = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 0,
  },

  background: { flex: 1 },
  itemWrapper: { marginBottom: -2 },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 4,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  itemLight: { backgroundColor: '#3e2723' },
  itemDark: { backgroundColor: 'rgba(0,0,0,0.35)' },

  artContainer: {
    width: ART_BOX,
    height: ART_BOX,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginLeft: -20,
    position: 'relative',
  },

  // Actual image (centered inside the fixed column)
  artImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
  },

  // Placeholder matches artImage exactly
  placeholderBox: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
    backgroundColor: '#5C3A2E',
  },

  placeholderText: {
    fontFamily: 'Lora_700Bold',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e1e1e',
  },

  playIconOverlay: {
    position: 'absolute',
    left: (ART_BOX - PLAY_BADGE) / 2,
    top: (ART_BOX - PLAY_BADGE) / 2,
    width: PLAY_BADGE,
    height: PLAY_BADGE,
    borderRadius: PLAY_BADGE / 2,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textBox: { flex: 1, justifyContent: 'center' },
  trackTitle: { fontSize: 15, fontWeight: '600', color: '#fff' },
  trackComposer: { fontSize: 14, color: '#ddd', marginTop: 4 },

  // Heart button
  actionsBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
});

export default styles;