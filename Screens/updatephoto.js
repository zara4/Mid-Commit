import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform,Text,TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample({ navigation: { navigate } }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center'}}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <TouchableOpacity
              style={{ width: '94%', margin: 10,top:200}}  onPress={() => navigate('ReviewData')}>
      <View style={{backgroundColor: "#222",height: 44,marginTop:10,flexDirection: "row",justifyContent: "center",
    alignItems: "center",borderRadius: 22}}>
                <Text style={{letterSpacing: 0.5,fontSize: 16,color: '#FFFFFF'}}>NEXT </Text>
              </View>
            </TouchableOpacity>
    </View>
  );
}
