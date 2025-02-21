import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

// Define the shape of the day object manually
interface DayObject {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

const CalendarWidget: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Define the type for day parameter as DayObject
  const onDayPress = (day: DayObject) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.widgetContainer}>
      <Text style={styles.header}>Calendar Widget</Text>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: 'blue',
            selectedTextColor: 'white',
          },
        }}
        monthFormat={'yyyy MM'}
      />
      <Text style={styles.selectedDate}>
        {selectedDate ? `Selected Date: ${selectedDate}` : 'No date selected'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  widgetContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    margin: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedDate: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default CalendarWidget;
