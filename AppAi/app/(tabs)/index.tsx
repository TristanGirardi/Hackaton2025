import { StyleSheet, Text, View, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import CalendarWidget from '@/components/CalendarWidget';
import NewsWidget from '@/components/NewsWidget';
import QuickCheckScreen from './QuickCheck';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text> 
      <NewsWidget/>
      <CalendarWidget/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
