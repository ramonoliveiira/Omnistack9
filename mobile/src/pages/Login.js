import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Text, TextInput,
     TouchableOpacity, Image, StyleSheet } from 'react-native';

import logo from '../assets/logo.png'

import api from '../services/api'

//Cada parte tem sua estilização própria, é como se todos tivessem um ID próprio
//PS: O elemento não herda estilização do pai
//KeyboardAvoidging serve para empurrar o conteudo para cima qnd abre o keyboard (No android é automático/nativo)
export default function Login({ navigation }) {
   // <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style ={styles.container}>
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    //Qnd o array de dependencias está vazio executa apenas uma vez
    useEffect(()=>{
        AsyncStorage.getItem('user').then(user => {
            if (user){
                navigation.navigate('List');
            }
        })
    }, [])
   async function handleSubmit(){
        //email, techs
        const response = await api.post('/sessions',{
            email
        })

        const { _id } = response.data;
        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List');
        //console.log(_id);
    }
    //Não se recebe event dentro do onChangeText no react native (mobile) e sim o próporio texto [diretão mesmo]
    //onChangeText={text => setEmail(text)} ou onChangeText={setEmail}
    return (
        <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
            <Image source={logo} />  
            
            <View style={styles.form}>
            <Text style={styles.label}>Seu E-MAIL*</Text>
        
            <TextInput 
                style={styles.input}
                placeholder="Seu e-mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Tecnologias de Interesse* (separadas por vírgula)</Text>
            <TextInput 
                style={styles.input}
                placeholder="Tecnologias de interesse" 
                placeholderTextColor="#999"            
                autoCapitalize="words"
                autoCorrect={false}
                value={techs}
                onChangeText={setTechs}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Encontrar Spots</Text>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       paddingTop: Platform.OS === 'android' ? 25 : 0,
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 16,
    }

})