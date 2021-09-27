import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const ratio : number = 0.35;

const HomeScreen = (props: any) => {

	return (
		<View style={styles.container}>
			<Image source={require('../../assets/board_tasks.png')} style={styles.illu}></Image>
			<Text style={styles.baseText}>Hi ! Let's add <Text style={styles.innerText}>some tasks</Text> to avoid your poor memory to forget !</Text>
			<TouchableOpacity
				onPress={() => props.route.params?.user ? props.navigation.navigate('TodoLists', { user: props.route.params.user}) : props.navigation.navigate('Login')}
				style={styles.button}>
				<Text style={styles.buttonText}>Go !</Text>
			</TouchableOpacity>
		</View>
	)
}

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	baseText: {
		color: '#888',
		fontSize: 20,
		marginHorizontal: 40,
	},
	innerText: {
		color: 'pink',
		fontSize: 20,
	},
	illu: {
		width: 932*ratio,
		height: 710*ratio,
		marginBottom: 15,
	},
	button: {
		backgroundColor: 'pink',
		borderRadius: 100,
		marginTop: 20,
		paddingLeft: 25,
		paddingRight: 25,
		paddingTop: 12,
		paddingBottom: 12,
	},
	buttonText: {
		fontSize: 20,
		color: '#fff',
	}
});
