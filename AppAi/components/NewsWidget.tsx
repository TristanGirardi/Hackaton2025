import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';

// Define TypeScript type for news data
type NewsWidget = {
  title: string;
  source: { name: string };
  url: string;
  urlToImage: string | null;
};

const API_KEY = '761293623e8f43088d8b0c8a5e3eb0b1'; // Replace with your actual News API key
const POSITIVE_KEYWORDS = ['breakthrough', 'success', 'cure', 'innovation', 'hope', 'discovery', 'improvement'];

const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?category=health&country=us&sortBy=publishedAt&apiKey=${API_KEY}`;

export default function NewsWidget() {
  const [news, setNews] = useState<NewsWidget | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchNews(); // Fetch news on mount

    // Refresh medical news every hour
    const interval = setInterval(() => {
      setLoading(true); // Show loading indicator while fetching
      fetchNews();
    }, 3600000); 

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(NEWS_API_URL);
      const data = await response.json();
  
      if (Array.isArray(data.articles) && data.articles.length > 0) {
        // Ensure TypeScript knows the type
        const articles: NewsWidget[] = data.articles;
  
        // Find a positive news article
        const positiveNews = articles.find((article: NewsWidget) => 
          article.title && POSITIVE_KEYWORDS.some(keyword => article.title.toLowerCase().includes(keyword))
        );
  
        setNews(positiveNews || articles[0]); // Use first positive article or fallback to the latest news
      } else {
        setNews(null);
      }
  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews(null);
      setLoading(false);
    }
  };
  
  

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  if (!news) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No positive medical news available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Medical News</Text>
      {news.urlToImage && (
        <Image source={{ uri: news.urlToImage }} style={styles.newsImage} />
      )}
      <Text style={styles.newsTitle}>{news.title}</Text>
      <Text style={styles.source}>Source: {news.source.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  newsImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  source: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
    textAlign: 'center',
  },
});

