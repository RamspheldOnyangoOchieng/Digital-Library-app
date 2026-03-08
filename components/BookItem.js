import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { colors } from '../styles/GlobalStyles';
import { useLibrary } from '../context/LibraryContext';

export default function BookItem({ book }) {
  const { tokens, borrowBook, returnBook } = useLibrary();

  const handleBorrow = () => {
    if (book.borrowed) {
      Alert.alert(
        'Return Book',
        `Return "${book.title}" to the library?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Return',
            onPress: () => returnBook(book.id),
          },
        ]
      );
      return;
    }

    if (tokens <= 0) {
      Alert.alert(
        'No Tokens',
        'You need at least 1 token to borrow a book. Visit the Admin Panel to get more tokens.',
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Borrow Book',
      `Borrow "${book.title}" for 1 token?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Borrow',
          onPress: () => {
            const result = borrowBook(book.id);
            if (!result.success) {
              Alert.alert('Error', 'Could not borrow this book.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusDot}>
        <View style={[styles.dot, book.borrowed ? styles.dotBorrowed : styles.dotAvailable]} />
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
      </View>

      <View style={styles.right}>
        <View style={[styles.badge, book.borrowed ? styles.badgeBorrowed : styles.badgeAvailable]}>
          <Text style={[styles.badgeText, book.borrowed ? styles.badgeTextBorrowed : styles.badgeTextAvailable]}>
            {book.borrowed ? 'Lent' : 'Free'}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, book.borrowed ? styles.buttonReturn : styles.buttonBorrow]}
          onPress={handleBorrow}
          activeOpacity={0.75}
        >
          <Text style={[styles.buttonText, book.borrowed ? styles.buttonTextReturn : styles.buttonTextBorrow]}>
            {book.borrowed ? 'Return' : 'Borrow'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusDot: {
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotAvailable: {
    backgroundColor: colors.success,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  dotBorrowed: {
    backgroundColor: colors.textMuted,
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 3,
  },
  author: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  right: {
    alignItems: 'flex-end',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeAvailable: {
    backgroundColor: 'rgba(78, 203, 160, 0.15)',
  },
  badgeBorrowed: {
    backgroundColor: 'rgba(74, 86, 104, 0.3)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  badgeTextAvailable: {
    color: colors.success,
  },
  badgeTextBorrowed: {
    color: colors.textMuted,
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    minWidth: 72,
    alignItems: 'center',
  },
  buttonBorrow: {
    backgroundColor: colors.primary,
  },
  buttonReturn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  buttonTextBorrow: {
    color: '#FFFFFF',
  },
  buttonTextReturn: {
    color: colors.textSecondary,
  },
});
