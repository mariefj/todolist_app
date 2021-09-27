import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, KeyboardAvoidingView, Platform, TextStyle } from 'react-native';
import firebase from '../firebase/config'
import 'firebase/auth'
import 'firebase/firestore'

const RegistrationScreen = (props: any) => {

	const [fullName, setFullName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [pressed, setPressed] = useState<boolean>(false)

	const stylePressed = pressed ? [styles.footerLink, {textDecorationLine: 'underline'}] as TextStyle : [styles.footerLink]

	const onFooterLinkPress = () => {
		setPressed(true)
		/* setTimeout(() => */props.navigation.navigate('Login')/*, 150)*/
	}

	const onRegisterPress = () => {
		if (password !== confirmPassword) {
			alert("Passwords don't match.")
			return
		}

		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((response) => {
				const uid = response.user?.uid
				const data = {
					id: uid,
					email,
					fullName,
				};
				const usersRef = firebase.firestore().collection('users')
				usersRef
					.doc(uid)
					.set(data)
					.then(() => {
						props.navigation.navigate('TodoLists', {user: data})
				})
				.catch((error) => {
					alert(error)
				});
			})
			.catch((error) => {
				alert(error)
			});
	}

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.container}
			>
				<Image
					style={styles.logo}
					source={require('../../assets/adaptive-icon.png')}
				/>
				<TextInput
					style={styles.input}
					placeholder='Full Name'
					placeholderTextColor="#aaa"
					onChangeText={(text) => setFullName(text)}
					value={fullName}
				/>
				<TextInput
					style={styles.input}
					placeholder='Email'
					placeholderTextColor="#aaa"
					onChangeText={(text) => setEmail(text)}
					value={email}
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholderTextColor="#aaa"
					secureTextEntry
					placeholder='Password'
					onChangeText={(text) => setPassword(text)}
					value={password}
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholderTextColor="#aaa"
					secureTextEntry
					placeholder='Confirm Password'
					onChangeText={(text) => setConfirmPassword(text)}
					value={confirmPassword}
					autoCapitalize="none"
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={() => onRegisterPress()}>
					<Text style={styles.buttonTitle}>Create account</Text>
				</TouchableOpacity>
				<View style={styles.footerView}>
					<Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={stylePressed}>Log in</Text></Text>
				</View>
			</KeyboardAvoidingView>
		</View>
	)
}

export default RegistrationScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	logo: {
		width: 110,
		height: 110,
		marginTop: 20,
		marginBottom: 10,
	},
	input: {
		height: 50,
		width: 200,
		borderRadius: 5,
		overflow: 'hidden',
		backgroundColor: 'white',
		marginTop: 10,
		marginBottom: 10,
		paddingLeft: 16,
		elevation: 5,
		color: '#888',
		fontSize: 15,
	},
	button: {
		backgroundColor: 'pink',
		width: 180,
		marginTop: 20,
		height: 50,
		borderRadius: 50 / 2,
		alignItems: "center",
		justifyContent: 'center',
		elevation: 5,
	},
	buttonTitle: {
		color: 'white',
		fontSize: 17,
		fontWeight: "bold"
	},
	footerView: {
		flex: 1,
		alignItems: "center",
		marginTop: 20
	},
	footerText: {
		fontSize: 17,
		color: '#888'
	},
	footerLink: {
		color: "pink",
		fontWeight: "bold",
		fontSize: 17
	}
})