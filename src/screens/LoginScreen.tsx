import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, KeyboardAvoidingView, Platform, TextStyle } from 'react-native';

const LoginScreen = (props: any) => {

	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [pressed, setPressed] = useState<boolean>(false)

	const stylePressed = pressed ? [styles.footerLink, {textDecorationLine: 'underline'}] as TextStyle : [styles.footerLink]

	const onFooterLinkPress = () => {
		setPressed(true)
		setTimeout(() => props.navigation.navigate('Registration'), 150)
	}

	useEffect(() => {
		setTimeout(() => setPressed(false), 150)
	})

	const onLoginPress = () => {
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
				<TouchableOpacity
					style={styles.button}
					onPress={() => onLoginPress()}>
					<Text style={styles.buttonTitle}>Log in</Text>
				</TouchableOpacity>
				<View style={styles.footerView}>
					<Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={stylePressed}>Sign up</Text></Text>
				</View>
			</KeyboardAvoidingView>
		</View>
	)
}

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	logo: {
		alignSelf: 'center',
		width: 130,
		height: 130,
		marginTop: 20,
		marginBottom: 10,
	},
	input: {
		alignSelf: 'center',
		height: 50,
		width: 200,
		borderRadius: 5,
		overflow: 'hidden',
		backgroundColor: 'white',
		marginTop: 10,
		marginBottom: 10,
		paddingLeft: 16,
		elevation: 5,
		color: "#888",
		fontSize: 15,
	},
	button: {
		backgroundColor: 'pink',
		width: 150,
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
		fontSize: 17,
	}
})