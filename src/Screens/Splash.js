import React, { useEffect } from 'react'
import { Text, View, Image, useColorScheme, StyleSheet } from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import colors from '../Theme/Colors';
import { useDispatch } from 'react-redux';
import { isConnected } from '../Redux/Actions/Index';
import dynamicLinks from '@react-native-firebase/dynamic-links';


const Splash = ({ navigation }) => {
    /// add deep link
    /// galary
    /// sync button 

    const handleDynamicLink = link => {
        // Handle dynamic link inside your own application
        if (link?.url === 'https://salesforcedemo.page.link') {
          // ...navigate to your screen
        }
      };


    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

        const checkConnectivity = NetInfo.addEventListener(state => {
            // console.log("Connection type", state.type);
            // console.log("Is connected ? ", state.isConnected);
            dispatch(isConnected(state.isConnected))
        });

        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeStack' }],
            })
        }, 1500)
        return () => unsubscribe();
    }, [])

    return (
        <View style={styles.mainContainer}>

            <Text style={styles.title}>{'Splash'}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.Black
    }
})
export default Splash;