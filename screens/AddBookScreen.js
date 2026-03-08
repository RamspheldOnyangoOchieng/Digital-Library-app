import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors, globalStyles } from '../styles/GlobalStyles';
import { useLibrary } from '../context/LibraryContext';

export default function AddBookScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const { addBook } = useLibrary();

  const handleAdd = () => {
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter a book title.');
      return;
    }
    if (!author.trim()) {
      Alert.alert('Missing Author', 'Please enter the author name.');
      return;
    }

    addBook(title, author);
    Alert.alert(
      '✅ Book Added',
      `"${title.trim()}" has been added to the library!`,
      [
        {
          text: 'Add Another',
          onPress: () => {
            setTitle('');
            setAuthor('');
          },
        },
        {
          text: 'Go to Library',
          onPress: () => {
            setTitle('');
            setAuthor('');
            navigation.navigate('Library');
          },
        },
      ]
    );
  };

  const isReady = title.trim().length > 0 && author.trim().length > 0;

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.subtitle}>CATALOGUE</Text>
            <Text style={styles.title}>Add New Book</Text>
            <Text style={styles.description}>
              Expand the library collection by adding a new title.
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <View style={styles.iconRow}>
              <View style={styles.bookIcon}>
                <Text style={styles.bookIconText}>📖</Text>
              </View>
            </View>

            <Text style={globalStyles.label}>Book Title</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="e.g. The Great Gatsby"
              placeholderTextColor={colors.textMuted}
              value={title}
              onChangeText={setTitle}
              returnKeyType="next"
              autoCapitalize="words"
            />

            <Text style={globalStyles.label}>Author</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="e.g. F. Scott Fitzgerald"
              placeholderTextColor={colors.textMuted}
              value={author}
              onChangeText={setAuthor}
              returnKeyType="done"
              autoCapitalize="words"
              onSubmitEditing={handleAdd}
            />

            <TouchableOpacity
              style={[
                styles.addButton,
                !isReady && styles.addButtonDisabled,
              ]}
              onPress={handleAdd}
              activeOpacity={0.8}
              disabled={!isReady}
            >
              <Text style={styles.addButtonText}>Add to Library</Text>
            </TouchableOpacity>
          </View>

          {/* Tips */}
          <View style={styles.tips}>
            <Text style={styles.tipsTitle}>💡 Tips</Text>
            <Text style={styles.tipItem}>• Use the full book title for easier search</Text>
            <Text style={styles.tipItem}>• Include first and last name of the author</Text>
            <Text style={styles.tipItem}>• Books are immediately available to borrow</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
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
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    margin: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconRow: {
    alignItems: 'center',
    marginBottom: 24,
  },
  bookIcon: {
    width: 72,
    height: 72,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  bookIconText: {
    fontSize: 36,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonDisabled: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  tips: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: 'rgba(79, 142, 247, 0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(79, 142, 247, 0.2)',
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryLight,
    marginBottom: 8,
  },
  tipItem: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
