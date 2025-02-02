import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

export default function ExploreScreen() {
  const [input, setInput] = useState(''); 
  const [response, setResponse] = useState(''); 
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResponse('Simulated response for: ' + input);
      setLoading(false);
    }, 2000); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.text}>Chat with Dr.AI!</Text>
        
        {/* Input for user's question */}
        <TextInput
          style={styles.input}
          placeholder="Ask a question..."
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
          multiline
        />
        
        {/* Send button */}
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>

        {/* Scrollable response area */}
        <ScrollView style={styles.responseContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : (
            <Text style={styles.responseText}>
              {response || 'The response will appear here.'}
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white', // Dark background to match the theme
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    //backgroundColor: 'grey', // Dark background to match the theme
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black', 
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 120,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#1e1e1e', // Slightly darker background for input box
    color: '#fff', // White text for readability
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#2980B9', 
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  responseContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    backgroundColor: '#1e1e1e', // Dark background for response area
    padding: 15,
    borderRadius: 12,
  },
  responseText: {
    fontSize: 16,
    color: '#fff', // White text for the response
  },
});
