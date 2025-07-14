import React, { useState, useCallback } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Image, Pressable, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import reactLogo from '@/assets/images/react-logo.png';

import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '<YOUR_EXPO_CLIENT_ID>',
    iosClientId: '<YOUR_IOS_CLIENT_ID>',
    androidClientId: '1:1******************0:android:*******************',
    webClientId: '',
  });

  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setPassword('');
      setError('');
      setShowPassword(false);
      setPasswordFocused(false);
    }, [])
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          const user = userCredential.user;
          if (!user.emailVerified) {
            setError('Por favor, verifique seu e-mail antes de fazer login.');
            return;
          }
          setError('');
          router.push('/account/welcome');
        })
        .catch(() => {
          setError('Erro ao autenticar com Google.');
        });
    }
  }, [response]);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (!user.emailVerified) {
        setError('Por favor, verifique seu e-mail antes de fazer login.');
        return;
      }
      setError('');
      router.push('/account/welcome');
    } catch (err) {
      setError('Usuário ou senha inválidos.');
    }
  };

  const handleGoogleSignIn = () => {
    promptAsync();
  };

  return (
    <View style={styles.container}>
      <Image source={reactLogo} style={styles.logo} />
      <View style={styles.div}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={'#ffffff'}
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Senha"
            placeholderTextColor={'#ffffff'}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry={!showPassword}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          {passwordFocused && (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.showButton}
            >
              <Text style={styles.showButtonText}>{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable
        style={({ pressed }: { pressed: boolean }) => [
          styles.divbutton,
          pressed && styles.divbuttonPressed,
        ]}
        onPress={handleLogin}
      >
        <Text style={styles.button}>Entrar</Text>
      </Pressable>
      <Pressable style={styles.divgoogleLoginImage} onPress={handleGoogleSignIn}>
        <Image source={require('../assets/images/login-google.png')} style={styles.googleLoginImage} />
      </Pressable>
      <View style={styles.divconta}>
          <Text style={styles.criarconta} onPress={() => router.push('/create-account')}>Não tem conta cadastrada?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#010020',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop:230,
    marginBottom: 20,
  },
  div: {
    alignItems: 'center',
  },
  input: {
    textAlign: 'center',
    width: 250,
    padding: 10,
    borderWidth: 2,
    marginBottom: 13,
    borderRadius: 15,

    color: '#ffffff',
    borderColor: '#ccc',
    backgroundColor: '#010035'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
    marginBottom: 12,
  },
  showButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  showButtonText: {
    color: '#4B5C75',
    fontWeight: 'bold',
    transform: [
      { translateX: -10 },  // move 50 unidades para a direita
      { translateY: -6 },]
  },
  divbutton: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop:15,
    backgroundColor: '#4B5C75',
    borderColor:'#fff',
    borderWidth:2,
  },
  button: {
    color: '#fff',
    fontSize: 20,
    paddingTop:2,
    paddingLeft:15,
    paddingRight:15,
    paddingBottom: 2,
  },
  divbuttonPressed: {
    backgroundColor: '#2a3a4a',
  },
  divgoogleLoginImage:{
    marginTop: 'auto',
    alignSelf: 'center',
    bottom: 0,
    height: 30,
  },
  googleLoginImage: {
    width: 170,
    height: 50,
    resizeMode: 'contain',
  },
  divconta: {
    alignSelf:'center',
    marginTop: 'auto',
    bottom: 0,
    height: 30,
  },
  criarconta: {
    color: '#fff',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: -9.5,
    transform:[
      { translateY: -5 },
    ]
  },
});
