import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Linking,
    TouchableOpacity,
    Alert,
} from 'react-native';
import FloatingButton from '../core/components/FloatingButton';
import Icon from 'react-native-vector-icons/AntDesign';
import { deletePost } from '../../services/PostService';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";




const PostScreen = ({ route }) => {

    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user.uid;
    const navigation = useNavigation();
    console.log(
        '🚀 ~ file: PostScreen.jsx:6 ~ PostScreen ~ props:',
        route.params,
    );
    const post = route.params;
    // const handlePress = async url => {
    //     await Linking.openURL(url);
    // };
    console.log("post details :",post)
    const handlePressRemove = async id => {
        try {
            await deletePost(id);
            navigation.navigate('ViewPostScreen');
        } catch (error) {
            console.log('Oops! Something Went Wrong', error);
        }
    };

    return (
        <>
            {
                userId === post.uid &&
            <FloatingButton
                text="Change Details"
                icon="edit"
                navigateTo="UpdatePostScreen"
                params={post}
            />
            }
            <View style={styles.container}>
                <View style={styles.postHeader}>
                    <Text style={styles.postName}>Feed</Text>
                </View>
                <View style={styles.postHeader}>
                    <Image
                        source={{ uri: post.imageUrl }}
                        style={styles.postImage}
                    />
                </View>
                <View style={styles.postDetails}>
                    <View style={styles.postItem}>
                        <Text style={styles.postValue}>{post.text}</Text>
                    </View>
                    {
                    userId === post.uid &&
                        <View style={styles.profileItemRemove}>
                            <TouchableOpacity
                                style={styles.profileItemTouchRemove}
                                onPress={() => handlePressRemove(post.id)}>
                                <Text style={styles.profileLabelRemove}>Remove </Text>
                                <Icon name="deleteuser" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        }
                        </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    postHeader: {
        padding: 16,
        margin: 16,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // width: '100%',
        borderRadius: 8,
        backgroundColor: '#fff',
        elevation: 2,
    },
    postImage: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    postName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        fontFamily: 'Hind Mysuru',
        color: '#323232',
    },
    postPosition: {
        fontSize: 18,
        color: '#999999',
    },
    postDetails: {
        padding: 20,
        fontFamily: 'Hind Mysuru',
        color: '#323232',
    },
    postItem: {
        padding: 16,
        marginBottom: 16,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderRadius: 8,
        backgroundColor: '#fff',
        elevation: 2,
    },
    postItemSocial: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    postLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        width: '40%',
        fontFamily: 'Hind Mysuru',
        color: '#323232',
    },
    postValue: {
        marginLeft: 16,
        marginBottom: 16,
        fontSize: 16,
        fontSize: 18,
        fontFamily: 'Hind Mysuru',
        color: '#323232',
    },
    PostRemove: {
        fontSize: 18,
        fontWeight: 'bold',
        width: '40%',
        fontFamily: 'Hind Mysuru',
        color: '#fff',
    },

    profileItemRemove: {
        padding: 16,
        marginBottom: 16,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderRadius: 8,
        backgroundColor: 'red',
        elevation: 2,
    },
    profileItemTouchRemove: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderRadius: 8,
        backgroundColor: 'red',
    },
    profileLabelRemove: {
        fontSize: 18,
        fontWeight: 'bold',
        width: '40%',
        fontFamily: 'Hind Mysuru',
        color: '#fff',
    },
});

export default PostScreen;
