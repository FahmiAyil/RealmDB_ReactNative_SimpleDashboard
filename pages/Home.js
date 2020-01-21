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


const Home: () => React$Node = (props) => {
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
        <View style={{ flex: 1, flexDirection: 'column', marginTop: 30 }}>
          <View style={{ margin: 10, alignItems: 'flex-end' }}>
            <View  style={{ flexDirection: 'column', flex: 1, marginTop: 5, width: '100%', marginBottom: 10, alignItems: 'center' }}>
              <View style={{ width: '95%', alignItems: 'flex-start', marginBottom: 5}}>
                <Button
                  style={{
                    width: 90,
                    height: 30,
                    borderRadius: 10,
                  }}
                  onPress={() => {props.navigation.navigate('User')}}
                >
                  <Text>Add User</Text>
                </Button>
              </View>
              <Textarea
                rowSpan={3}
                style={{ width: '95%', borderWidth: 1, borderRadius: 10, borderColor: '#8b8be0' }}
                placeholder="What's up??"
                placeholderTextColor="#4F8EC9"
                onChangeText={text => setTInput(text)}
                value={tinput}
              />
              <View style={{ width: '95%', alignItems: 'flex-end'}}>
                <Button
                  style={{
                    width: 63,
                    height: 30,
                    right: 0,
                    top: 5,
                    borderRadius: 10,
                  }}
                  onPress={() => Save()}
                >
                  <Text>Post</Text>
                </Button>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            {
              dataPost.length > 0
                ? dataPost.map((post, index) => (
                  <React.Fragment key={index}>
                    <View style={{ width: '89%', marginTop: 5}}>
                      <Text
                        style={{ fontSize: 12, color: 'grey' }}
                      >
                        {moment(post.date).format('DD/MM/YYYY HH:mm')}
                      </Text>
                    </View>
                    <Card style={{ width: '90%', borderRadius: 8 }}>
                      <View style={{ flexDirection: 'column', paddingTop: 13, paddingBottom: 13, paddingLeft: 10 }}>
                        <Text style={{ color: '#575c5c', fontSize: 14 }}>
                          {post.description}
                        </Text>
                      </View>
                    </Card>
                  </React.Fragment>
                ))
                : <></>
            }
          </View>
        </View>
      </ScrollView>
    </Root>
  );
};

export default Home;
