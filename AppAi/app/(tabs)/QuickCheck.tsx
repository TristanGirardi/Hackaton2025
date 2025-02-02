import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function QuickCheckScreen() {
  const [showInputs, setShowInputs] = useState(true);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [heartBeats, setHeartBeats] = useState('');
  const [step, setStep] = useState(1);
  const [result, setResult] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showHeartRateCountdown, setShowHeartRateCountdown] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setShowInputs(true);
      setHeight('');
      setWeight('');
      setAge('');
      setHeartBeats('');
      setStep(1);
      setResult(null);
      setCountdown(3);
      setShowCountdown(false);
      setShowHeartRateCountdown(false);
    }, [])
  );

  const handleStart = () => {
    setShowInputs(true);
    setStep(1);
    setResult(null);
  };

  const handleSubmit = () => {
  if (height && weight && age) {
    setStep(2);
    setShowCountdown(true);
    setCountdown(10); // Set initial countdown to 10 seconds
    let count = 10;
    
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
      count--;
      if (count < 1) {
        clearInterval(countdownInterval);
        setShowCountdown(false);
        setShowHeartRateCountdown(true);
        setCountdown(5); // Keep heart rate countdown at 5 seconds
        let heartRateCount = 5;
        
        const heartRateInterval = setInterval(() => {
          setCountdown((prev) => prev - 1);
          heartRateCount--;
          if (heartRateCount < 1) {
            clearInterval(heartRateInterval);
            setShowHeartRateCountdown(false);
            setStep(3);
          }
        }, 1000);
      }
    }, 1000);
  } else {
    Alert.alert('Error', 'Please fill in all fields.');
  }
};

  const handleHeartRateSubmit = () => {
    if (heartBeats) {
      const bmi = (parseFloat(weight) / (parseFloat(height) * parseFloat(height))).toFixed(2);
      const heartRate = calculateHeartRate(parseInt(heartBeats));
      
      const averageBmiNorm = "18.5 - 24.9";  // Normal BMI range
      const averageHeartRateNorm = "60 - 100 bpm";  // Normal resting heart rate range
  
      const resultText = `• BMI: ${bmi} - This measures the body mass index, which helps to assess if your weight is in a healthy range for your height. (Normal BMI: ${averageBmiNorm})\n• Estimated Heart Rate: ${heartRate} bpm\n- This is an estimate of your heart rate in beats per minute, scaled from the heartbeats you counted in 5 seconds. It helps in understanding your heart's physical activity levels. (Normal Heart Rate: ${averageHeartRateNorm})`;
      setResult(resultText);
      setShowInputs(false);
    } else {
      Alert.alert('Error', 'Please enter the number of heartbeats in 5 seconds.');
    }
  };

  const calculateHeartRate = (beats: number): number => {
    return beats * 12;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!showInputs ? (
        <View style={styles.resultContainer}>
          <Text style={styles.title}>Quick Check Results</Text>
          {result && <Text style={styles.resultText}>{result}</Text>}
          <Button title="Start Over" onPress={handleStart} />
        </View>
      ) : (
        step === 1 ? (
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Enter Your Information</Text>
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
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        ) : showCountdown ? (
          <View style={styles.inputContainer}>
            <Text style={styles.countdownText}>Get ready to count your heartbeats! Counting starts in {countdown}...</Text>
          </View>
        ) : showHeartRateCountdown ? (
          <View style={styles.inputContainer}>
            <Text style={styles.heartRateText}>Start counting your heartbeats now! {countdown}</Text>
          </View>
        ) : step === 3 ? (
          <View style={styles.inputContainer}>
            <Text style={styles.heartRateText}>Enter your heartbeats in 5 seconds:</Text>
            <TextInput
              style={styles.input}
              placeholder="Heartbeats in 5 seconds"
              keyboardType="numeric"
              value={heartBeats}
              onChangeText={setHeartBeats}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleHeartRateSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        ) : null
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f4f7fc', // Light background for a clean look
      paddingTop: 50,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 30,
      color: '#2C3E50', // Slightly darker color for a professional look
      textShadowColor: '#BDC3C7', // Subtle shadow to give depth
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 5,
    },
    inputContainer: {
      width: '90%',
      padding: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff', // White background for inputs to stand out
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 15,
      elevation: 5,
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 50,
      borderColor: '#BDC3C7', // Soft gray border
      borderWidth: 1.5,
      marginBottom: 15,
      paddingLeft: 20,
      borderRadius: 8,
      backgroundColor: '#ecf0f1', // Light gray background for inputs
      fontSize: 16,
      color: '#34495E', // Slightly darker color for text
    },
    resultContainer: {
      width: '90%',
      padding: 30,
      backgroundColor: '#ffffff', // White background for results
      borderRadius: 15,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 15,
      elevation: 5,
      alignItems: 'flex-start',
      marginTop: 20,
    },
    resultText: {
      fontSize: 18,
      lineHeight: 24,
      marginBottom: 20,
      color: '#34495E', // Darker text color for results
      fontWeight: 'normal',
      letterSpacing: 0.5,
    },
    countdownText: {
      fontSize: 18,
      color: '#34495E', // Darker color for countdown
      marginTop: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    heartRateText: {
      fontSize: 18,
      color: '#34495E', // Darker color for heart rate message
      marginTop: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    submitButton: {
      width: '100%',
      height: 50,
      backgroundColor: '#2980B9', // Blue color for the button
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      shadowColor: '#2980B9',
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
    submitButtonText: {
      color: '#fff', // White text
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  