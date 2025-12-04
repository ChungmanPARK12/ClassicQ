// src/screens/FavouriteScreen.tsx
// Debug version for draggable flat list issue (v2)

import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

type DebugItem = {
  id: string;
  title: string;
};

const INITIAL_DATA: DebugItem[] = Array.from(
  { length: 10 },
  (_, index) => ({
    id: `debug-${index + 1}`,
    title: `Debug track #${index + 1}`,
  })
);

const FavouriteScreen: React.FC = () => {
  const [data, setData] = useState<DebugItem[]>(INITIAL_DATA);
  const [isDragging, setIsDragging] = useState(false);

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<DebugItem>) => {
      const backgroundColor = isActive ? '#ffeaa7' : '#dfe6e9';

      return (
        <ScaleDecorator> 
          <TouchableOpacity
            // ✅ onPressIn으로 감도 높이기 (길게 누르지 않아도 드래그 시작)
            onPressIn={drag}
            disabled={isActive}
            style={[styles.row, { backgroundColor }]}
          >
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
        </ScaleDecorator>
      );
    },
    []
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>
          FavouriteScreen – Debug Drag Only (v2)
        </Text>

        <DraggableFlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onDragBegin={() => {
            console.log('drag begin');
            setIsDragging(true);
          }}
          onDragEnd={({ data: newData }) => {
            console.log('drag end ids:', newData.map((i) => i.id));
            setIsDragging(false);
            setData(newData);
          }}
          // ✅ 드래그 중일 때 스크롤 막기 (리스트 전체가 움직여버리는 문제 방지)
          scrollEnabled={!isDragging}
          // 필요 시 활성화 거리 줄이고 싶으면 아래 주석 해제
          // activationDistance={0}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  row: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
  },
});

export default FavouriteScreen;
