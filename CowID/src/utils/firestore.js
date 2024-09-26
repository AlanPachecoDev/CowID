import {getDownloadURL, getStorage,ref, uploadBytes} from 'firebase/storage';
import firebase from 'firebase/compat/app';
import { updateProfile } from 'firebase/auth';
export const Storage = getStorage();

export async function upload(image,currentUser){
    const filename = currentUser.uid + '.png';
    const imgRef = ref(storage,filename);
    const response = await fetch(image);
    const blob = await response.blob();
    const photoURL = await getDownloadURL(imgRef);
    console.log(blob);
    //let filename = image.substring(image.lastIndexOf('/')+1);
    try{
        await uploadBytes(storage,blob);
        updateProfile(currentUser,{photoURL});
        alert("Imagen subida correctamente");
    }catch(e){
        console.log(e);
    }
    
    //setLoading(false);
    
}