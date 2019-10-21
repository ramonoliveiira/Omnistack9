import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import api from '../services/api';
//import { FlatList } from 'react-native-gesture-handler';

// poderia ser Spotlist (propriedades)  e para pegar os valores propriedades.tech
function SpotList({ tech, navigation }) {

    const [spots, setSpots] = useState([]);
    const baseURL = 'http://192.168.0.104:3333/files/';
    function handleNavigation(id) {
        navigation.navigate('Book', { id });
    }

    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: { tech }
            })
            
            setSpots(response.data);
            
        }
        loadSpots();
    }, [])

 // () => handleNavigation os parentes + arrow function servem para criar uma nova função que só é executada qnd o usuário clica
 //se fosse o contrário já iria de primeira
    return (
        <View style={styles.container} >
            <Text style={styles.title} >Empresas que usam <Text style={styles.bold} >{tech}</Text></Text>
            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem} >
                        <Image style={styles.thumbnail} source={ { uri: baseURL + item.thumbnail } } />
                        <Text style={styles.company} >{item.company}</Text>
                        <Text style={styles.price} >{item.price ? `R$${item.price}` : 'GRATUITO'}</Text>
                        <TouchableOpacity onPress={() => handleNavigation(item._id)} style={styles.button} >
                            <Text style={styles.buttonText} >Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 15
        
    },
    bold: {
        fontWeight: 'bold'
    },
    list: {
        paddingHorizontal: 20
    },
    listItem: {
        marginRight: 15,
    },
    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2
    },
    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10
    },
    price: {
        color: '#999',
        fontSize: 16,
        marginTop: 5
    },
    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15
    }
})
//Necessário ser no final para funcionar o withNavigation
export default withNavigation(SpotList);