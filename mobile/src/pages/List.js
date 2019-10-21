import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, SafeAreaView, View, Text, Image, AsyncStorage, StyleSheet } from 'react-native';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';
//import socketio from 'socket.io-client';

export default function List() {

    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            /*const socket = socketio('http://192.168.0.104:3333', {
                query: { user_id }
            });*/
            //console.log(socket);
            /*socket.on('response_request', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
            })*/
        });

    }, [])

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techArray = storageTechs.split(',').map(tech => tech.trim());
            setTechs(techArray);
            
        })
    }, [])

    return (
        <SafeAreaView style={styles.container} >
            <Image style={styles.logo} source={logo} />
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center'
    }
})