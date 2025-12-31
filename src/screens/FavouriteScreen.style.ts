// src/screens/FavouriteScreen.style.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, paddingTop: 0 },
  itemWrapper: { marginBottom: 0 },
  item: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 4,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    alignItems: 'center',
  },
  
  itemLight: { backgroundColor: '#3e2723' },
  itemDark: { backgroundColor: 'rgba(0,0,0,0.35)' },
  itemActive: { backgroundColor: '#274627' },

  trackImage: { width: 90, height: 80, borderRadius: 6 },

  imageBox: {
    width: 90,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginLeft: -20,
    position: 'relative',
  },

  imageLoader: { position: 'absolute', zIndex: 1 },

  iconOverlay: {
    position: 'absolute',
    top: '50%',
    left: '47%',
    transform: [{ translateX: -9 }, { translateY: -9 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 2,
  },

  textBox: { flex: 1, justifyContent: 'center' },
  trackTitle: { fontSize: 15, fontWeight: '600', color: '#fff' },
  trackComposer: { fontSize: 14, color: '#ddd', marginTop: 4 },

  actionsBox: { flexDirection: 'row', alignItems: 'center', paddingLeft: 10 },
  heartBtn: { paddingHorizontal: 20, paddingVertical: 8 },
  dragHandle: { paddingHorizontal: 0, paddingVertical: 8, marginRight: -10 },

  empty: {
    marginTop: 40,
    textAlign: 'center',
    color: '#ccc',
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default styles;
