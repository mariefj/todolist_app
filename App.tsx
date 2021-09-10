import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './src/HomeScreen';
import TodosListScreen from './src/TodosListScreen';
import TodoScreen from './src/TodoScreen';

const Stack = createNativeStackNavigator();

const ratio : number = 0.35;

const App = () =>

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
			<Stack.Screen name='Home' component={HomeScreen}/>
			<Stack.Screen name="TodosList" component={TodosListScreen} options={{title: 'Todos'}}/>
			<Stack.Screen name="Todos" component={TodoScreen} options={{title: 'Todo'}}/>
		</Stack.Navigator>
	</NavigationContainer>

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