import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Platform } from 'react-native';
import { colors, globalStyles, shadow } from '../styles/GlobalStyles';
import { useLibrary } from '../context/LibraryContext';

export default function AdminScreen() {
  const { books, tokens, addToken, addTokens } = useLibrary();
  const [log, setLog] = useState([{ id: 1, msg: 'Admin panel initialized', time: 'Today' }]);

  const grant = (n) => {
    addTokens(n);
    const t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLog(prev => [{ id: Date.now(), msg: `${n} token${n>1?'s':''} granted`, time: t }, ...prev.slice(0, 9)]);
  };

  const onGrant5 = () => Alert.alert('Grant 5 Tokens', 'Add 5 tokens to the account?', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Grant', onPress: () => grant(5) },
  ]);

  const borrowed  = books.filter(b =>  b.borrowed);
  const available = books.filter(b => !b.borrowed);

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>MANAGEMENT</Text>
          <Text style={styles.title}>Admin Panel</Text>
          <View style={styles.badge}><Text style={styles.badgeTxt}>🔐 Admin Access</Text></View>
        </View>

        {/* Token Card */}
        <Text style={globalStyles.sectionTitle}>Token Management</Text>
        <View style={[styles.tokenCard, shadow(4)]}>
          <View style={styles.tokenTop}>
            <Text style={styles.tokenEmoji}>🪙</Text>
            <View>
              <Text style={styles.tokenNum}>{tokens}</Text>
              <Text style={styles.tokenSub}>Current Balance</Text>
            </View>
          </View>
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.grantBtn} onPress={() => grant(1)} activeOpacity={0.8}>
              <Text style={styles.grantTxt}>+ 1 Token</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.grantBtn, styles.grantBtnGold]} onPress={onGrant5} activeOpacity={0.8}>
              <Text style={[styles.grantTxt, { color: '#1A1A1A' }]}>+ 5 Tokens</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.note}>Each borrowed book costs 1 token.</Text>
        </View>

        {/* Stats */}
        <Text style={globalStyles.sectionTitle}>Library Overview</Text>
        <View style={styles.grid}>
          {[
            { n: books.length,     lbl: 'Total',     color: colors.textPrimary },
            { n: available.length, lbl: 'Available',  color: colors.success     },
            { n: borrowed.length,  lbl: 'On Loan',    color: colors.accent      },
            { n: tokens,           lbl: 'Tokens',     color: colors.primary     },
          ].map(s => (
            <View key={s.lbl} style={styles.statBox}>
              <Text style={[styles.statNum, { color: s.color }]}>{s.n}</Text>
              <Text style={styles.statLbl}>{s.lbl}</Text>
            </View>
          ))}
        </View>

        {/* On Loan */}
        {borrowed.length > 0 && (
          <View>
            <Text style={globalStyles.sectionTitle}>Currently on Loan</Text>
            {borrowed.map(b => (
              <View key={b.id} style={styles.loanRow}>
                <View style={styles.loanDot} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.loanTitle}>{b.title}</Text>
                  <Text style={styles.loanAuthor}>{b.author}</Text>
                </View>
                <View style={styles.loanBadge}><Text style={styles.loanBadgeTxt}>Lent</Text></View>
              </View>
            ))}
          </View>
        )}

        {/* Log */}
        <Text style={globalStyles.sectionTitle}>Activity Log</Text>
        <View style={styles.logCard}>
          {log.map((entry, i) => (
            <View key={entry.id} style={[styles.logRow, i < log.length - 1 && styles.logBorder]}>
              <View style={styles.logDot} />
              <Text style={styles.logMsg}>{entry.msg}</Text>
              <Text style={styles.logTime}>{entry.time}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header:  { paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 20 : 24, paddingBottom: 8 },
  eyebrow: { fontSize: 11, fontWeight: '700', color: colors.accent, letterSpacing: 2, marginBottom: 4 },
  title:   { fontSize: 28, fontWeight: '800', color: colors.textPrimary, marginBottom: 10 },
  badge:   { alignSelf: 'flex-start', backgroundColor: 'rgba(247,201,72,0.15)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, borderWidth: 1, borderColor: 'rgba(247,201,72,0.3)' },
  badgeTxt:{ fontSize: 12, fontWeight: '700', color: colors.accent },
  tokenCard: { backgroundColor: colors.surface, borderRadius: 18, padding: 20, marginHorizontal: 16, borderWidth: 1, borderColor: colors.border },
  tokenTop:  { flexDirection: 'row', alignItems: 'center', marginBottom: 18, gap: 14 },
  tokenEmoji:{ fontSize: 44 },
  tokenNum:  { fontSize: 40, fontWeight: '800', color: colors.accent, lineHeight: 46 },
  tokenSub:  { fontSize: 12, color: colors.textMuted, fontWeight: '600' },
  btnRow:  { flexDirection: 'row', gap: 10, marginBottom: 14 },
  grantBtn:     { flex: 1, backgroundColor: colors.surfaceElevated, borderRadius: 12, paddingVertical: Platform.OS === 'android' ? 12 : 14, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  grantBtnGold: { backgroundColor: colors.accent, borderColor: colors.accent },
  grantTxt: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  note:     { fontSize: 12, color: colors.textMuted, textAlign: 'center' },
  grid:     { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 16, gap: 10 },
  statBox:  { width: '47%', backgroundColor: colors.surface, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
  statNum:  { fontSize: 26, fontWeight: '800', marginBottom: 4 },
  statLbl:  { fontSize: 11, color: colors.textMuted, fontWeight: '600' },
  loanRow:  { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 12, padding: 14, marginHorizontal: 16, marginVertical: 4, borderWidth: 1, borderColor: colors.border, gap: 10 },
  loanDot:  { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent },
  loanTitle:  { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  loanAuthor: { fontSize: 12, color: colors.textMuted },
  loanBadge:  { backgroundColor: 'rgba(247,201,72,0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  loanBadgeTxt: { fontSize: 11, fontWeight: '700', color: colors.accent },
  logCard:  { backgroundColor: colors.surface, borderRadius: 14, marginHorizontal: 16, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  logRow:   { flexDirection: 'row', alignItems: 'center', padding: 13, gap: 10 },
  logBorder:{ borderBottomWidth: 1, borderBottomColor: colors.border },
  logDot:   { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary },
  logMsg:   { flex: 1, fontSize: 13, color: colors.textSecondary },
  logTime:  { fontSize: 11, color: colors.textMuted, fontWeight: '600' },
});