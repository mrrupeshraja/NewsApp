import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import Card from './Components/Card';

const Search = ({navigation}) => {
  const [SearchText, setSearchText] = useState('');
  const [Data, setData] = useState([]);
  const searchNews = async text => {
    setSearchText(text);
    if (text.length > 2) {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=5721bd7c98ea4fe8912f198ccf36a439&q=${text}`,
      );
      const data = await response.json();
      setData(data.articles);
    }
  };
  return (
    <View className="flex-1">
      <View className="bg-redprimary flex-row items-center space-x-4 px-4">
        <ArrowLeftIcon color={'white'} size={18} />
        <TextInput
          placeholder="Enter your query.."
          value={SearchText}
          placeholderTextColor={'White'}
          onChangeText={text => {
            searchNews(text);
          }}
          className="text-sm text-white"
        />
      </View>
      <View className="mb-16">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Data}
          renderItem={({item, index}) => {
            return <Card item={item} navigation={navigation} index={index} />;
          }}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
