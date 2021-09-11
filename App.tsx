import React, { useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// import { useNavigation } from '@react-navigation/native';

import HomeScreen from './src/screens/HomeScreen';
import TodosListScreen from './src/screens/TodosListScreen';
import TodoScreen from './src/screens/TodoScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';

// type RootStackParamList = {
// 	Home: {name: string},
// 	Login: {name: string},
// 	Registration: {name: string},
// 	TodosList: {name: string};
// 	Todos: {name: string};
// };

const Stack = createNativeStackNavigator();	//<RootStackParamList>

const ratio : number = 0.35;

const App = () => {

	const [user, setUser] = useState(null)

	return (
		<NavigationContainer>
			<StatusBar hidden={true}/>
				<Stack.Navigator
					initialRouteName='Home'
					screenOptions={{
						headerStyle: {
							backgroundColor: '#fff',
						},
						headerTintColor: '#888',
						headerTitleStyle: {
							fontWeight: 'bold',
						}
					}}
				>
				{ user ?
					<>
						<Stack.Screen name='Home'>
							{props => <HomeScreen {...props} extraData={user} />}
						</Stack.Screen>
						<Stack.Screen name='TodosList' component={TodosListScreen} options={{title: 'Todos'}}/>
						<Stack.Screen name='Todos' component={TodoScreen} options={{title: 'Todo'}}/>
					</>
				:
					<>
						<Stack.Screen name='Home' component={HomeScreen}/>
						<Stack.Screen name='Login' component={LoginScreen} />
						<Stack.Screen name='Registration' component={RegistrationScreen} />
					</>
				}
				</Stack.Navigator>
		</NavigationContainer>
	)
}

export default App;

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
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		paddingBottom: 10,
	},
	buttonText: {
		fontSize: 20,
		color: '#fff',
	}
});