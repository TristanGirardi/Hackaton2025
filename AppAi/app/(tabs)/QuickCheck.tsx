import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Import the hook

export default function QuickCheckScreen() {
  const [showInputs, setShowInputs] = useState(true); // Show inputs initially
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState<string | null>(null); // Store the calculation result

  // Reset state when the screen is focused (revisited)
  useFocusEffect(
    React.useCallback(() => {
      setShowInputs(true);  // Show inputs when screen is focused
      setHeight('');
      setWeight('');
      setAge('');
      setResult(null); // Reset result when navigating back to screen
    }, [])
  );

  const handleStart = () => {
    setShowInputs(true); // Show inputs when the "Start" button is clicked
    setResult(null); // Clear previous result
  };

  const handleSubmit = () => {
    // Perform your calculation here with the inputs (height, weight, age)
    if (height && weight && age) {
      const bmi = (parseFloat(weight) / (parseFloat(height) * parseFloat(height))).toFixed(2);
      setResult(`Your BMI is ${bmi}`);
      setShowInputs(false); // Hide inputs after submission
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
      {showInputs ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Height (in meters)"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
          <TextInput
            style={styles.input}
            placeholder="Weight (in kg)"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      ) : (
        // Show the result after submission
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{result}</Text>
          <Button title="Start Over" onPress={handleStart} />
        </View>
      )}
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
  inputContainer: {
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  resultContainer: {
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green',
  },
});
