import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import CalendarWidget from '@/components/CalendarWidget';
import NewsWidget from '@/components/NewsWidget';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
       <Text style={styles.header}>Welcome</Text>

        {/* News Section */}
        <View style={styles.widgetCard}>
          <NewsWidget />
        </View>

        {/* Calendar Section */}
        <View style={styles.widgetCard}>
          <CalendarWidget />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  widgetCard: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
    marginBottom: 15,
  },
});
