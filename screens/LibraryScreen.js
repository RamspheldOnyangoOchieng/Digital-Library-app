import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { colors, globalStyles } from '../styles/GlobalStyles';
import { useLibrary } from '../context/LibraryContext';
import BookItem from '../components/BookItem';

export default function LibraryScreen() {
  const { books, tokens } = useLibrary();
  const [filter, setFilter] = useState('all');

  const filteredBooks = books.filter(book => {
    if (filter === 'available') return !book.borrowed;
    if (filter === 'borrowed') return book.borrowed;
    return true;
  });

  const availableCount = books.filter(b => !b.borrowed).length;
  const borrowedCount = books.filter(b => b.borrowed).length;

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <FlatList
        data={filteredBooks}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <BookItem book={item} />}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.subtitle}>WELCOME BACK</Text>
                <Text style={styles.title}>Digital Library</Text>
              </View>
              <View style={styles.tokenBadge}>
                <Text style={styles.tokenIcon}>🪙</Text>
                <Text style={styles.tokenCount}>{tokens}</Text>
                <Text style={styles.tokenLabel}>tokens</Text>
              </View>
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{books.length}</Text>
                <Text style={styles.statLabel}>Total Books</Text>
              </View>
              <View style={[styles.statCard, styles.statCardMiddle]}>
                <Text style={[styles.statNumber, { color: colors.success }]}>{availableCount}</Text>
                <Text style={styles.statLabel}>Available</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={[styles.statNumber, { color: colors.accent }]}>{borrowedCount}</Text>
                <Text style={styles.statLabel}>Borrowed</Text>
              </View>
            </View>

            {/* Filter Tabs */}
            <View style={styles.filterRow}>
              {['all', 'available', 'borrowed'].map(f => (
                <TouchableOpacity
                  key={f}
                  style={[styles.filterTab, filter === f && styles.filterTabActive]}
                  onPress={() => setFilter(f)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={globalStyles.sectionTitle}>
              {filteredBooks.length} {filter === 'all' ? 'Books' : filter === 'available' ? 'Available' : 'Borrowed'}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📚</Text>
            <Text style={styles.emptyText}>No books found</Text>
            <Text style={styles.emptySubtext}>Try a different filter or add a new book</Text>
          </View>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 2,
    marginBottom: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: 0.2,
  },
  tokenBadge: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  tokenIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  tokenCount: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.accent,
    lineHeight: 26,
  },
  tokenLabel: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statCardMiddle: {
    borderColor: 'rgba(78, 203, 160, 0.3)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  filterRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 4,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 10,
  },
  filterTabActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 6,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
