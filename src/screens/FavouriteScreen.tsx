import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFavourite } from '../screens/context/FavouriteContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function FavouriteScreen() {
  const { favourites } = useFavourite();
  const [loadingMap, setLoadingMap] = useState<{ [index: number]: boolean }>({});

  const renderItem = ({ item, index }: any) => {
    const isLoading = loadingMap[index];

    return (
      <TouchableOpacity style={styles.itemWrapper}>
        <View style={[styles.item, index % 2 === 0 ? styles.itemDark : styles.itemLight]}>
          <View style={styles.imageBox}>
            {isLoading && (
              <ActivityIndicator size="small" color="#fff" style={styles.imageLoader} />
            )}
            <Image
              source={item.image}
              style={styles.trackImage}
              onLoadStart={() => setLoadingMap(prev => ({ ...prev, [index]: true }))}
              onLoadEnd={() => setLoadingMap(prev => ({ ...prev, [index]: false }))}
            />
            <View style={styles.iconOverlay}>
              <Ionicons name="play" size={18} color="#fff" />
            </View>
          </View>

          <View style={styles.textBox}>
            <Text style={styles.trackTitle}>{item.title}</Text>
            <Text style={styles.trackComposer}>{item.composer}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#0d1b0d', '#1e3a1e', '#3b5b2e']}
      style={styles.background}
    >
      <View style={styles.container}>
        <FlatList
          data={favourites}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.empty}>No favourites yet.</Text>
          }
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  itemWrapper: {
    marginBottom: -2,
  },
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
  itemLight: {
    backgroundColor: '#3e2723',
  },
  itemDark: {
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  imageBox: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginLeft: -20,
    position: 'relative',
  },
  trackImage: {
    width: 90,
    height: 90,
    borderRadius: 6,
  },
  imageLoader: {
    position: 'absolute',
    zIndex: 1,
  },
  iconOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -9 }, { translateY: -9 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 4,
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
  },
  trackTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  trackComposer: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 4,
  },
  empty: {
    marginTop: 40,
    textAlign: 'center',
    color: '#ccc',
    fontSize: 16,
    fontStyle: 'italic',
  },
});
