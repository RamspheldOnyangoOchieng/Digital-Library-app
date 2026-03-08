import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { colors, globalStyles } from '../styles/GlobalStyles';
import { useLibrary } from '../context/LibraryContext';

export default function AdminScreen() {
  const { books, tokens, addToken } = useLibrary();
  const [log, setLog] = useState([
    { id: 1, message: 'Admin panel initialized', time: 'Today' },
  ]);

  const borrowedBooks = books.filter(b => b.borrowed);
  const availableBooks = books.filter(b => !b.borrowed);

  const handleAddToken = () => {
    addToken();
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLog(prev => [
      { id: Date.now(), message: '1 token granted to user', time: timeStr },
      ...prev.slice(0, 9),
    ]);
  };

  const handleAddFiveTokens = () => {
    Alert.alert(
      'Grant 5 Tokens',
      'Add 5 tokens to the user account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Grant',
          onPress: () => {
            for (let i = 0; i < 5; i++) addToken();
            const now = new Date();
            const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setLog(prev => [
              { id: Date.now(), message: '5 tokens granted to user', time: timeStr },
              ...prev.slice(0, 9),
            ]);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.subtitle}>MANAGEMENT</Text>
          <Text style={styles.title}>Admin Panel</Text>
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>🔐 Admin Access</Text>
          </View>
        </View>

        {/* Token Management */}
        <View style={styles.section}>
          <Text style={globalStyles.sectionTitle}>Token Management</Text>
          <View style={styles.tokenCard}>
            <View style={styles.tokenDisplay}>
              <Text style={styles.tokenEmoji}>🪙</Text>
              <View>
                <Text style={styles.tokenValue}>{tokens}</Text>
                <Text style={styles.tokenSub}>Current Balance</Text>
              </View>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.grantButton}
                onPress={handleAddToken}
                activeOpacity={0.8}
              >
                <Text style={styles.grantButtonText}>+1 Token</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.grantButton, styles.grantButtonAccent]}
                onPress={handleAddFiveTokens}
                activeOpacity={0.8}
              >
                <Text style={[styles.grantButtonText, { color: '#1A1A1A' }]}>+5 Tokens</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.tokenNote}>
              Tokens allow users to borrow books. Each borrow costs 1 token.
            </Text>
          </View>
        </View>

        {/* Library Stats */}
        <Text style={globalStyles.sectionTitle}>Library Overview</Text>
        <View style={styles.statsGrid}>
          <View style={[styles.statBox, styles.statBoxTotal]}>
            <Text style={styles.statBoxNumber}>{books.length}</Text>
            <Text style={styles.statBoxLabel}>Total Books</Text>
          </View>
          <View style={[styles.statBox, styles.statBoxAvailable]}>
            <Text style={[styles.statBoxNumber, { color: colors.success }]}>{availableBooks.length}</Text>
            <Text style={styles.statBoxLabel}>Available</Text>
          </View>
          <View style={[styles.statBox, styles.statBoxBorrowed]}>
            <Text style={[styles.statBoxNumber, { color: colors.accent }]}>{borrowedBooks.length}</Text>
            <Text style={styles.statBoxLabel}>On Loan</Text>
          </View>
          <View style={[styles.statBox, styles.statBoxTokens]}>
            <Text style={[styles.statBoxNumber, { color: colors.primary }]}>{tokens}</Text>
            <Text style={styles.statBoxLabel}>Tokens</Text>
          </View>
        </View>

        {/* Currently Borrowed */}
        {borrowedBooks.length > 0 && (
          <View>
            <Text style={globalStyles.sectionTitle}>Currently on Loan</Text>
            {borrowedBooks.map(book => (
              <View key={book.id} style={styles.loanRow}>
                <View style={styles.loanDot} />
                <View>
                  <Text style={styles.loanTitle}>{book.title}</Text>
                  <Text style={styles.loanAuthor}>{book.author}</Text>
                </View>
                <View style={styles.loanBadge}>
                  <Text style={styles.loanBadgeText}>Lent</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Activity Log */}
        <Text style={globalStyles.sectionTitle}>Activity Log</Text>
        <View style={styles.logCard}>
          {log.map((entry, index) => (
            <View key={entry.id} style={[styles.logRow, index < log.length - 1 && styles.logRowBorder]}>
              <View style={styles.logDot} />
              <Text style={styles.logMessage}>{entry.message}</Text>
              <Text style={styles.logTime}>{entry.time}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.accent,
    letterSpacing: 2,
    marginBottom: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  adminBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(247, 201, 72, 0.15)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(247, 201, 72, 0.3)',
  },
  adminBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.accent,
    letterSpacing: 0.5,
  },
  section: {
    marginTop: 4,
  },
  tokenCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tokenDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 16,
  },
  tokenEmoji: {
    fontSize: 48,
  },
  tokenValue: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.accent,
    lineHeight: 48,
  },
  tokenSub: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  grantButton: {
    flex: 1,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  grantButtonAccent: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  grantButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  tokenNote: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    gap: 10,
  },
  statBox: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  statBoxTotal: {},
  statBoxAvailable: { borderColor: 'rgba(78, 203, 160, 0.25)' },
  statBoxBorrowed: { borderColor: 'rgba(247, 201, 72, 0.25)' },
  statBoxTokens: { borderColor: 'rgba(79, 142, 247, 0.25)' },
  statBoxNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  statBoxLabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  loanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  loanDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  loanTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
  },
  loanAuthor: {
    fontSize: 12,
    color: colors.textMuted,
  },
  loanBadge: {
    backgroundColor: 'rgba(247, 201, 72, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  loanBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.accent,
  },
  logCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  logRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 10,
  },
  logRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  logMessage: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
  },
  logTime: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
  },
});
