import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { storage } from '../../../firebaseConfig';

export const uploadImage = async file => {
  if (file == null) {
    return null;
  }

  const metadata = {
    contentType: file.type,
  };
  const fileName = file.uri.substring(file.uri.lastIndexOf('/') + 1);
  const response = await fetch(file.uri);
  const blob = await response.blob();

  const storageRef = ref(storage, 'images/' + fileName);
  const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      error => {
        console.log('Upload error:', error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at', downloadURL);
          resolve(downloadURL);
        } catch (error) {
          console.log('Error getting download URL:', error);
          reject(error);
        }
      },
    );
  });
};
