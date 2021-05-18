import React from 'react';
import { StyleSheet, Text, View, Modal, Image, FlatList, Dimensions, TouchableOpacity, ImageBackground, ActivityIndicator, AsyncStorage } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';

var radio_props = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
];
export default class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Notifications: [
                {id:1, title:'A new donation has been posted'},
                {id:2, title:'A new donation has been posted'}
            ],
        };
    }


    renderNotification = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                <View style={{ borderWidth: 1, backgroundColor: '#fff', borderColor: '#fff', margin: 10, borderRadius: 10, paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '20%', padding: 10, justifyContent: 'center', marginTop: 5 }}>
                           <Image source={require('./../assets/notificationblack.png')} style={{width:30, height:30}} />
                        </View>
                        <View style={{ width: '70%', paddingTop: 0 }}>
                            <Text style={{ fontSize: 15, textAlign: 'left', marginTop: 20, fontWeight: 'bold' }}>{item.title}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.mainContainer}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 40,
                        width: "100%"
                    }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={{ width: "20%" }}>
                            <Image
                                source={require('./../assets/backwhite.png')}
                                style={{ height: 30, width: 30, marginTop: 10 }}
                            />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 18, marginTop: 8, textAlign: 'center' }}>Notifications</Text>

                    </View>
                </View>

                <ScrollView>

                    <View>


                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <View style={{ width: '100%' }}>
                            </View>
                        </View>


                    </View>

                    <FlatList
                        pagingEnabled
                        data={this.state.Notifications}
                        renderItem={this.renderNotification}
                        keyExtractor={item => item.id}
                    />

                </ScrollView>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e1e1e1',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    mainContainer: {
        backgroundColor: "black",
        height: "13%",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 20
      },
    image: {
        width: 90,
        height: 90,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
        marginLeft: -5
    },
    button: {
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 5,
        marginTop: 30,
        marginLeft: 5,
        marginRight: 5,
        width: 200,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        textAlignVertical: 'center',
        textAlign: 'center',
        backgroundColor: '#F74329',
    },


});