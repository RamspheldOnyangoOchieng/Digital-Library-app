import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { colors, shadow } from '../styles/GlobalStyles';
import { useLibrary } from '../context/LibraryContext';

export default function BookItem({ book }) {
  const { tokens, borrowBook, returnBook } = useLibrary();

  const onPress = () => {
    if (book.borrowed) {
      Alert.alert('Return Book', `Return "${book.title}"?`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Return', onPress: () => returnBook(book.id) },
      ]);
      return;
    }
    if (tokens <= 0) {
      Alert.alert('No Tokens', 'Visit Admin Panel to get more tokens.');
      return;
    }
    Alert.alert('Borrow Book', `Borrow "${book.title}" for 1 token?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Borrow', onPress: () => borrowBook(book.id) },
    ]);
  };

  return (
    <View style={[styles.card, shadow(3)]}>
      <View style={[styles.dot, book.borrowed ? styles.dotOff : styles.dotOn]} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
      </View>
      <View style={styles.right}>
        <View style={[styles.badge, book.borrowed ? styles.badgeOff : styles.badgeOn]}>
          <Text style={[styles.badgeTxt, book.borrowed ? styles.badgeTxtOff : styles.badgeTxtOn]}>
            {book.borrowed ? 'Lent' : 'Free'}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.btn, book.borrowed ? styles.btnReturn : styles.btnBorrow]}
          onPress={onPress} activeOpacity={0.75}>
          <Text style={[styles.btnTxt, book.borrowed && styles.btnTxtReturn]}>
            {book.borrowed ? 'Return' : 'Borrow'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, borderRadius: 14,
    padding: 14, marginHorizontal: 16, marginVertical: 5,
    borderWidth: 1, borderColor: colors.border,
  },
  dot: { width: 9, height: 9, borderRadius: 5, marginRight: 12 },
  dotOn:  { backgroundColor: colors.success },
  dotOff: { backgroundColor: colors.textMuted },
  info:   { flex: 1, marginRight: 10 },
  title:  { fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginBottom: 3 },
  author: { fontSize: 12, color: colors.textSecondary },
  right:  { alignItems: 'flex-end', gap: 6 },
  badge:  { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  badgeOn:  { backgroundColor: 'rgba(78,203,160,0.15)' },
  badgeOff: { backgroundColor: 'rgba(74,86,104,0.25)' },
  badgeTxt:    { fontSize: 11, fontWeight: '700' },
  badgeTxtOn:  { color: colors.success },
  badgeTxtOff: { color: colors.textMuted },
  btn: { paddingHorizontal: 14, paddingVertical: Platform.OS === 'android' ? 6 : 8, borderRadius: 10, minWidth: 72, alignItems: 'center' },
  btnBorrow: { backgroundColor: colors.primary },
  btnReturn: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border },
  btnTxt:       { fontSize: 13, fontWeight: '700', color: '#fff' },
  btnTxtReturn: { color: colors.textSecondary },
});