/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import moment from 'moment'
import Schema from '../model/schema'

import { Textarea, Button, Text, Toast, Root, Icon, Card } from "native-base";


const Home: () => React$Node = () => {
  const [tinput, setTInput] = useState('')
  const [dataPost, setDataPost] = useState([])

  const realm = new Realm({
    path: 'UserDatabase.realm',
    schema: [Schema.post, Schema.user]
  });

  const Save = () => {
    if (tinput !== '' && tinput !== null){
      realm.write(() => {
        const post = realm.create('post', {
          post_id: Object.keys(realm.objects('post')).length !== 0 ? Math.max(...Object.keys(realm.objects('post')))+1 : 0,
          description: tinput,
          date: new Date()
        });
      });
      setTInput('')
      Toast.show({
        text: "Success posting",
        buttonText: "Close"
      })
      fetchPost()
    } else {
      Toast.show({
        text: "Gagal Posting",
        buttonText: "Close"
      })
    }
  }

  const fetchPost = () => {
    let posts = realm.objects('post').sorted('post_id', true)
    let data = []
    for (let i = 0; i < posts.length; i++) {
      data.push(posts[i])
    }

    setDataPost(data)
  }

  useEffect(() => {
    fetchPost()
  }, [])

  return (
    <Root>
      <ScrollView>
        <Text>asjdha</Text>
      </ScrollView>
    </Root>
  );
};

export default Home;
