import React, { useState, useCallback } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';

import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

export default function CreateAccountScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      setShowSuccessPopup(false);
      setShowPassword(false);
      setShowConfirmPassword(false);
      setPasswordFocused(false);
      setConfirmPasswordFocused(false);
    }, [])
  );

  const validatePassword = (pwd: string) => {
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    return hasUpperCase && hasNumber;
  };

  const handleCreateAccount = async () => {
    if (!validatePassword(password) || !validatePassword(confirmPassword)) {
      setError('A senha deve conter pelo menos 1 caractere maiúsculo e númerico.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      setError('');
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        router.push('/');
      }, 5000);
    } catch (err: any) {
      // Set the actual error message from Firebase if available
      if (err && err.message) {
        setError(err.message);
      } else {
        setError('Erro ao criar a conta. Verifique os dados e tente novamente.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style = {styles.text}>Cadastro</Text>
      <View style={styles.div}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={'#ffffff'}
          value={email}
          onChangeText={setEmail}
          style={styles.inputemail}
          autoCapitalize="none"
          keyboardType="email-address"
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
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Confirme a senha"
            placeholderTextColor={'#ffffff'}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
            secureTextEntry={!showConfirmPassword}
            onFocus={() => setConfirmPasswordFocused(true)}
            onBlur={() => setConfirmPasswordFocused(false)}
          />
          {confirmPasswordFocused && (
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.showButton}
            >
              <Text style={styles.showButtonText}>{showConfirmPassword ? 'Ocultar' : 'Mostrar'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {showSuccessPopup ? (
        <View style={styles.popup}>
          <Text style={styles.popupText}>Uma mensagem de verificação foi enviada. Por favor, verifique seu e-mail antes de tentar usar a conta.</Text>
        </View>
      ) : null}
      <Pressable
        style={({ pressed }: { pressed: boolean }) => [
          styles.divbutton,
          pressed && styles.divbuttonPressed,
        ]}
        onPress={handleCreateAccount}
      >
        <Text style={styles.button}>Criar Conta</Text>
      </Pressable>
      <View style={styles.divconta}>
        <Text style={styles.criarconta} onPress={() => router.push('/')}>Faça seu login</Text>
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
  text: {
    fontSize: 40,
    color: '#ffffff',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop:276.5,
    marginBottom: 20,
  },
  div:{
    alignItems: 'center',
    alignSelf: 'center'
  },
  inputemail:{
    textAlign: 'center',
    width: 250,
    padding: 10,
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 13,

    color: '#ffffff',
    borderColor: '#ccc',
    backgroundColor: '#010035'
  },
  input: {
    textAlign: 'center',
    width: 250,
    padding: 10,
    borderWidth: 2,
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
      { translateY: 1 },]
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
      { translateY: 0 }
    ]
  },
  popup: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    backgroundColor: '#4B5C75',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 1000,
  },
  popupText: {
    color: '#fff',
    fontSize: 18,
  },
});
