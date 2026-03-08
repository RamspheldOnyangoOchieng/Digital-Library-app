import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { colors, globalStyles } from '../styles/GlobalStyles';
import { useLibrary } from '../context/LibraryContext';
import BookItem from '../components/BookItem';

const FILTERS = ['All', 'Available', 'Borrowed'];

export default function LibraryScreen() {
  const { books, tokens } = useLibrary();
  const [filter, setFilter] = useState('All');

  const filtered = books.filter(b => {
    if (filter === 'Available') return !b.borrowed;
    if (filter === 'Borrowed')  return  b.borrowed;
    return true;
  });

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <FlatList
        data={filtered}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <BookItem book={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.eyebrow}>WELCOME BACK</Text>
                <Text style={styles.title}>Digital Library</Text>
              </View>
              <View style={styles.tokenBox}>
                <Text style={styles.tokenEmoji}>🪙</Text>
                <Text style={styles.tokenNum}>{tokens}</Text>
                <Text style={styles.tokenLbl}>tokens</Text>
              </View>
            </View>
            {/* Stats */}
            <View style={styles.statsRow}>
              {[
                { label: 'Total',     value: books.length,                   color: colors.textPrimary },
                { label: 'Available', value: books.filter(b=>!b.borrowed).length, color: colors.success },
                { label: 'Borrowed',  value: books.filter(b=> b.borrowed).length, color: colors.accent  },
              ].map(s => (
                <View key={s.label} style={styles.statBox}>
                  <Text style={[styles.statNum, { color: s.color }]}>{s.value}</Text>
                  <Text style={styles.statLbl}>{s.label}</Text>
                </View>
              ))}
            </View>
            {/* Filter tabs */}
            <View style={styles.tabs}>
              {FILTERS.map(f => (
                <TouchableOpacity key={f} style={[styles.tab, filter===f && styles.tabActive]}
                  onPress={() => setFilter(f)} activeOpacity={0.7}>
                  <Text style={[styles.tabTxt, filter===f && styles.tabTxtActive]}>{f}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={globalStyles.sectionTitle}>{filtered.length} {filter === 'All' ? 'Books' : filter}</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📚</Text>
            <Text style={styles.emptyTxt}>No books found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
    paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 20 : 24, paddingBottom: 18,
  },
  eyebrow: { fontSize: 11, fontWeight: '700', color: colors.primary, letterSpacing: 2, marginBottom: 4 },
  title:   { fontSize: 28, fontWeight: '800', color: colors.textPrimary },
  tokenBox: {
    backgroundColor: colors.surfaceElevated, borderRadius: 14,
    paddingHorizontal: 14, paddingVertical: 10, alignItems: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  tokenEmoji: { fontSize: 18, marginBottom: 2 },
  tokenNum:   { fontSize: 22, fontWeight: '800', color: colors.accent, lineHeight: 26 },
  tokenLbl:   { fontSize: 10, color: colors.textMuted, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase' },
  statsRow: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 14, gap: 8 },
  statBox:  {
    flex: 1, backgroundColor: colors.surface, borderRadius: 12,
    paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: colors.border,
  },
  statNum: { fontSize: 22, fontWeight: '800', marginBottom: 2 },
  statLbl: { fontSize: 11, color: colors.textMuted, fontWeight: '600' },
  tabs: {
    flexDirection: 'row', marginHorizontal: 16, backgroundColor: colors.surface,
    borderRadius: 12, padding: 3, borderWidth: 1, borderColor: colors.border,
  },
  tab:       { flex: 1, paddingVertical: Platform.OS === 'android' ? 8 : 10, alignItems: 'center', borderRadius: 9 },
  tabActive: { backgroundColor: colors.primary },
  tabTxt:       { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  tabTxtActive: { color: '#fff', fontWeight: '700' },
  empty:    { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 44, marginBottom: 12 },
  emptyTxt:  { fontSize: 16, fontWeight: '600', color: colors.textSecondary },
});