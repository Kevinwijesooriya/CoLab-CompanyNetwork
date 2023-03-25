import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import FloatingButtonMI from '../core/components/FloatingButtonMI';
import { fetchPosts } from '../../services/PostService';
import NavBar from '../core/components/NavBar';

const ViewPostScreen = () => {
  const postsInitialState = [
    {
      id: 'gdgf',
      username: 'Name',
      text: 'Position',
      imageUrl:
        'http://drive.google.com/uc?export=view&id=1k11P0jqhLZFSGOFMXSSZizd7QrRr_K5J',
    },
  ];
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [posts, setPosts] = React.useState(postsInitialState);
  async function loadPosts() {
    try {
      const usersArray = await fetchPosts();
      setPosts(usersArray);
    } catch (error) {
      console.error('Error fetching posts: ', error);
    }
  }
  React.useEffect(() => {
    loadPosts();
  }, []);
  React.useEffect(() => {
    loadPosts();
  }, [isFocused]);

  const handleCardPress = post => {
    console.log('post', post);
    navigation.navigate('PostScreen', post);
  };
  const Card = ({ post }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => handleCardPress(post)}>
        <Text style={styles.cardTitle}>{post.username}</Text>
        <Image source={{ uri: post.imageUrl }} style={styles.cardImage} />
        <Text style={styles.cardSubtitle}>{post.text}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <FloatingButtonMI
        text="Add Post"
        icon="post-add"
        navigateTo="AddPostScreen"
      />
      <NavBar />
      <ScrollView contentContainerStyle={styles.container}>
        {posts.map((post, index) => (
          <Card key={index} post={post} />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    padding: 16,
    margin: 6,
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    borderRadius: 8,
    backgroundColor: '#fdff',
    elevation: 2,
  },
  titleContainerNav: {
    marginBottom: 16,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    // backgroundColor: '#fff',
    // elevation: 2,
  },
  title: {
    fontFamily: 'Hind Mysuru',
    fontSize: 10,
    fontWeight: '300',
    fontStyle: 'normal',
    lineHeight: 38,
    // letterSpacing: 0.5,
    color: '#323232',
    // marginLeft: 5,
  },
  card: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  cardImage: {
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardTitle: {
    margin: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  cardSubtitle: {
    marginLeft: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#666',
  },
});

export default ViewPostScreen;
