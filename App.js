import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyBcdVw2KkNAVNAV3IX4-EsigVjngCiTLsc",
  authDomain: "esp32-56336.firebaseapp.com",
  databaseURL: "https://esp32-56336-default-rtdb.firebaseio.com",
  projectId: "esp32-56336",
  storageBucket: "esp32-56336.appspot.com",
  messagingSenderId: "60959713063",
  appId: "1:60959713063:web:2a4c2872a6ca4e15f5ab02",
  measurementId: "G-EEYRXX42JE"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class App extends Component {

  state = {
    status: []
  }

  componentDidMount() {
    firebase
      .database()
      .ref("led/")
      .child("Status")
      .on("value", (snapshot) => {
        const status = (snapshot.val());
        this.setState({ status });
      });

  }

  desligarLigarLed = () => {
    var led = firebase.database().ref("led")
    if (this.state.status === 0) {
      led.child("Status").set(1);
    }
    else {

      led.child("Status").set(0);
    }
  }

  render() {
    return (
      <>
        <View style={estilos.fundo1}>
        </View>

        <View style={estilos.fundo2}>

          <View style={estilos.principal}>
            <Image style={estilos.imagem} source={require("./images/Barra.png")} />
          </View>


          <View style={estilos.principal2}>
            <Text style={estilos.texto}>Aperte o botão abaixo para acender ou desligar o LED</Text>
          </View>


          <View style={estilos.principal2}>

            <TouchableOpacity
              style={estilos.botao}
              onPress={this.desligarLigarLed}>
              <Text style={estilos.texto}>{
                this.state.status == 0 ? 'LIGAR' : 'DESLIGAR'
              }</Text>
            </TouchableOpacity>
            <View style={estilos.espaçamentoIcone}>
              <Image style={estilos.gif} source={require("./images/led-rgb.gif")} />
            </View>
          </View>

        </View>
      </>
    );
  }
}

const estilos = StyleSheet.create({

  fundo1: {
    backgroundColor: "white",
    flex: 1,
  },

  fundo2: {
    backgroundColor: "black",
    flex: 20,
  },

  principal: {
    alignItems: "center",
    padding: 0
  },

  principal2: {
    alignItems: "center",
    padding: 40
  },

  texto: {
    fontSize: 24, fontWeight: "bold", color: "white"
  },

  botao: {
    alignItems: "center",
    backgroundColor: "red",
    padding: 10,
    height: 80,
    width: 250,
    borderRadius: 10,
    justifyContent: "center"
  },

  espaçamentoIcone: {
    padding: 110
  },

  imagem: {
    width: 420,
    height: 106
  },

  gif: {
    width: 420,
    height: 106
  }
})

export default App;