import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import { getOnePost, updatePost } from '../../services/PostService';
import ImagePicker from 'react-native-image-crop-picker';
import { uploadImage } from '../core/ImageUpload';

const UpdatePostScreen = ({ route }) => {
    const navigation = useNavigation();
    const post = route.params;
    const [error, setError] = useState(null);
    const [text, setText] = useState('');
    const [imgFile, setFile] = React.useState(null);
    const [image, setImage] = React.useState(null);

    const handlePressImage = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
            });
            setFile(image);
            const file = {
                uri: image.path,
                type: image.mime,
            };
            const imageUrl = await uploadImage(file);
            console.log('Upload success', imageUrl);
            setImage(imageUrl);
            console.log('Update post info');
        } catch (error) {
            console.log('Upload error', error);
        }
    };

    const handleUpdateMember = async () => {
        let payload = {
            text,
            imageUrl: image,
        };
        let postData = {
            id: post.id,
            username: post.username,
            text,
            imageUrl: image,
        }
        try {
            await updatePost(post.id, payload);
            navigation.navigate('ViewPostScreen', postData);
        } catch (error) {
            setError('Update Failed');
        }
    };
    React.useEffect(() => {
        async function loadPosts() {
            try {
                const usersArray = await getOnePost(post.id);
                console.log("fetch details:", usersArray.text)
                setText(usersArray.text);
                setImage(usersArray.imageUrl);
            } catch (error) {
                console.error('Error fetching posts: ', error);
            }
        }

        loadPosts();
    }, []);

    return (
        <>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/AddPost.png')} style={styles.image} />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Update post</Text>
                <TextInput
                    mode="outlined"
                    numberOfLines={4}
                    multiline={true}
                    style={styles.input}
                    placeholder="Write here"
                    placeholderTextColor="#B5B5B5"
                    onChangeText={text => setText(text)}
                    value={text}
                    autoCapitalize="sentences"
                    keyboardType="text"
                />
                <TouchableOpacity onPress={() => handlePressImage()}>
                    <Image
                        source={{
                            uri:
                                (image !== null && image) ||
                                'https://firebasestorage.googleapis.com/v0/b/colab-12dc4.appspot.com/o/ImageUpload.png?alt=media&token=7d9900c1-80ea-467e-9fc4-80ded2b31709',
                        }}
                        style={styles.postImage}
                    />
                </TouchableOpacity>
                {
                    error && <Text style={styles.error}>{error}
                    </Text>
                }
                <TouchableOpacity style={styles.button} onPress={handleUpdateMember}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    image: {
        width: 410,
        height: 410,
    },
    title: {
        fontFamily: 'Hind Mysuru',
        fontSize: 38,
        fontWeight: '300',
        fontStyle: 'normal',
        lineHeight: 38,
        letterSpacing: 0.5,
        color: '#323232',
        backgroundColor: '#ffffff90',
        marginBottom: 38,
        borderRadius: 5,
    },
    label: {
        fontFamily: 'Hind Mysuru',
        fontSize: 12,
        fontWeight: '300',
        fontStyle: 'normal',
        lineHeight: 12,
        letterSpacing: 0.5,
        color: '#B5B5B5',
        borderRadius: 5,
        width: 327,
        paddingHorizontal: 10,
    },
    input: {
        backgroundColor: '#EFEFEF',
        width: 327,
        height: 'auto',
        margin: 12,
        padding: 10,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
        marginBottom: 30,
        maxW: "300",
        color: '#323232',
    },
    error: {
        color: '#E9446A',
        fontSize: 16,
        marginBottom: 10,
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#323232',
        width: 327,
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    postImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
});

export default UpdatePostScreen;
