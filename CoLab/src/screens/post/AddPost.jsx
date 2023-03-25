import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import { getAuth } from "firebase/auth";
import { addPost } from '../../services/PostService';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { uploadImage } from '../core/ImageUpload';

const AddPostScreen = () => {
    const navigation = useNavigation();
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const [text, setText] = useState('');
    const [error, setError] = useState(null);
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

    const handleAddPosts = async () => {
        let payload = {
            imageUrl: image,
            text,
            uid,
        };
        try {
            await addPost(payload);
            console.log('Post added to Firestore');
            navigation.navigate('ViewPostScreen');

        } catch (error) {
            setError('Error adding user to Firestore');
            console.error('Error adding user to Firestore: ', error);
        }
    };

    return (
        <>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/AddPost.png')} style={styles.image} />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Create New Post</Text>
                    
                <TextInput
                    style={styles.input}
                    numberOfLines={4}
                    multiline={true}
                    placeholder="Write Here"
                    placeholderTextColor="#B5B5B5"
                    onChangeText={text => setText(text)}
                    value={text}
                    autoCapitalize="sentences"
                    keyboardType="email-address"
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
                {error && <Text style={styles.error}>{error}</Text>}
                <TouchableOpacity style={styles.button} onPress={handleAddPosts}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 2,
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
        maxW:"300",
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

export default AddPostScreen;
