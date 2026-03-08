import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { colors, globalStyles } from '../styles/GlobalStyles';
import { useLibrary } from '../context/LibraryContext';

export default function AddBookScreen({ navigation }) {
  const [title,  setTitle]  = useState('');
  const [author, setAuthor] = useState('');
  const { addBook } = useLibrary();

  const handleAdd = () => {
    if (!title.trim())  { Alert.alert('Missing Title',  'Please enter a book title.');  return; }
    if (!author.trim()) { Alert.alert('Missing Author', 'Please enter the author name.'); return; }
    addBook(title, author);
    Alert.alert('Book Added!', `"${title.trim()}" is now in the library.`, [
      { text: 'Add Another', onPress: () => { setTitle(''); setAuthor(''); } },
      { text: 'Go to Library', onPress: () => { setTitle(''); setAuthor(''); navigation.navigate('Library'); } },
    ]);
  };

  const ready = title.trim().length > 0 && author.trim().length > 0;

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.eyebrow}>CATALOGUE</Text>
            <Text style={styles.title}>Add New Book</Text>
            <Text style={styles.desc}>Expand the library collection.</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.iconWrap}><Text style={styles.icon}>📖</Text></View>
            <Text style={globalStyles.label}>Book Title</Text>
            <TextInput style={globalStyles.input} placeholder="e.g. The Great Gatsby"
              placeholderTextColor={colors.textMuted} value={title} onChangeText={setTitle}
              returnKeyType="next" autoCapitalize="words" />
            <Text style={globalStyles.label}>Author</Text>
            <TextInput style={globalStyles.input} placeholder="e.g. F. Scott Fitzgerald"
              placeholderTextColor={colors.textMuted} value={author} onChangeText={setAuthor}
              returnKeyType="done" autoCapitalize="words" onSubmitEditing={handleAdd} />
            <TouchableOpacity style={[styles.btn, !ready && styles.btnDisabled]} onPress={handleAdd} activeOpacity={0.8} disabled={!ready}>
              <Text style={styles.btnTxt}>Add to Library</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tips}>
            <Text style={styles.tipsTitle}>💡 Tips</Text>
            <Text style={styles.tip}>• Use the full book title for easier browsing</Text>
            <Text style={styles.tip}>• Include first and last name of the author</Text>
            <Text style={styles.tip}>• Books are immediately available to borrow</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll:  { flexGrow: 1, paddingBottom: 40 },
  header:  { paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 20 : 24, paddingBottom: 8 },
  eyebrow: { fontSize: 11, fontWeight: '700', color: colors.primary, letterSpacing: 2, marginBottom: 4 },
  title:   { fontSize: 28, fontWeight: '800', color: colors.textPrimary, marginBottom: 6 },
  desc:    { fontSize: 14, color: colors.textSecondary, lineHeight: 20 },
  card: {
    backgroundColor: colors.surface, borderRadius: 18,
    padding: 22, margin: 16, borderWidth: 1, borderColor: colors.border,
  },
  iconWrap: { alignItems: 'center', marginBottom: 20 },
  icon:     { fontSize: 40 },
  btn:      { backgroundColor: colors.primary, borderRadius: 12, paddingVertical: Platform.OS === 'android' ? 13 : 16, alignItems: 'center', marginTop: 6 },
  btnDisabled: { backgroundColor: colors.surfaceElevated, borderWidth: 1, borderColor: colors.border },
  btnTxt: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
  tips:      { marginHorizontal: 16, padding: 14, backgroundColor: 'rgba(79,142,247,0.08)', borderRadius: 14, borderWidth: 1, borderColor: 'rgba(79,142,247,0.2)' },
  tipsTitle: { fontSize: 13, fontWeight: '700', color: colors.primaryLight, marginBottom: 6 },
  tip:       { fontSize: 12, color: colors.textSecondary, lineHeight: 22 },
});