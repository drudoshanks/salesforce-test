import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Alert, Button } from 'react-native';
import colors from '../../Theme/Colors';
import Header from '../../Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend } from '../../Redux/Actions/Index';
import CameraController from '../../Components/CameraController';

// ------------------------------------------

const Home = ({ navigation }) => {

  const [profileImage, setProfileImage] = useState(null)

  const { isInternetConnectivity, friendsList } = useSelector(state => state.AddFriend)
  const dispatch = useDispatch()

  console.log("unsaved friends")
  console.log(friendsList)

  const AddFriend = async () => {

    if(isInternetConnectivity){
      if (friendsList.length > 0) {
        console.log('uploading store data to server');
        for (let index = 0; index < friendsList.length; index++) {
          try {
            const data = friendsList[index]
  
            const config = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data)
            };
            const response = await fetch(`https://rnapp-mock-developer-edition.ap24.force.com/services/apexrest/apiservice`, config)
            const Jsonresponse = await response.json();
            console.log(response.status);
            console.log('addFriend-response', Jsonresponse);
  
            console.log('Brfore......', friendsList);
  
            let tempArray = friendsList
            let newArray = tempArray.filter((item) => {
              return item?.Id != response?.Id
            })
            dispatch(addFriend(newArray))
            console.log('After......', friendsList);
  
          } catch (error) {
            console.log("addFriend-error", error);
          }
  
  
        }
      } else {
        return
      }
    } else {
      Alert.alert('Internet not connected');
    }

    
  };

  const onChooseImage = () => {
    CameraController.open(data => {
      if (data) {
        setProfileImage(data.path);
        // setUpdateProfileImage(true);
      }
    });
  };

  return (

    <View style={styles.mainContainer}>

      <Header Title={'Home'} />
      <View style={{ flex: 1, justifyContent: 'center' }}>
      
      <Image source={{ uri: profileImage }} resizeMode={'contain'} style={{width : '100%',height:"50%"}}/>
      <Button title='Add Image' onPress={onChooseImage} />
      
      {
        (friendsList && friendsList.length)
        ?
        <View style={{marginTop:20}}>
          <Text style={{
            fontSize: 16,
            color: colors.Black,
            paddingHorizontal: 16
          }}>{friendsList.length + ' unsaved friends'}</Text>
        </View>
        : null
      }
      <View style={{marginTop:20}}>
        <Button  title='Sync Saved Data' onPress={AddFriend} />
      </View>
      </View>
    </View>


  );

}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.Background
  }
})
export default Home;
