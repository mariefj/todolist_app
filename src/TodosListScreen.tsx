import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const todos = [
	{
		id: '1',
		name: 'work',
	},
	{
		id: '2',
		name: 'party',
	},
	{
		id: '3',
		name: 'sport',
	},
];

const Item = ({item, onPress, onDelete}) =>
	<View style={styles.item}>
			<TouchableOpacity onPress={onPress} style={styles.itemName}>
				<View style={styles.circle}></View>
				<Text style={styles.itemText}>{item.name}</Text>
			</TouchableOpacity>
		<TouchableOpacity onPress={onDelete}>
			<MaterialIcons name="delete" size={36} color="pink" />
		</TouchableOpacity>
	</View>

const TodosListScreen = ({navigation}) => {

	const [todo, setTodo] = useState<string>('')

	const handleAddTodo = () => {
		// push data
		console.log(todo)
		setTodo('')
	}

	const renderItem = ({item}) =>
		<Item
			item={item}
			onPress={() => navigation.navigate('Todos')}
			onDelete={() => null}
		/>

	return (
		<View style={styles.container}>
			<FlatList
				data={todos}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.containerInput}
			>
				<TextInput
					style={styles.textInput}
					value={todo}
					placeholder="Write a todo"
					placeholderTextColor="#aaa"
					onChangeText={text => setTodo(text)}
				/>
				<TouchableOpacity
					onPress={() => handleAddTodo()}
					style={styles.button}
				>
					<Text style={styles.buttonText}>+</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	)
}

export default TodosListScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 10,
	},
	title: {
		color: '#888',
		fontSize: 30,
	},
	containerInput: {
		flex: 1,
		backgroundColor: '#fff',
		position: 'absolute',
		zIndex: 2,
		bottom: 50,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
	},
	textInput: {
		textAlign: 'center',
		borderRadius: 50,
		color: '#888',
		backgroundColor: 'white',
		elevation: 5,
		padding: 15,
		marginRight: 20,
		width: '70%',
		fontSize: 18,
	},
	button: {
		backgroundColor: 'pink',
		borderRadius: 100,
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		fontSize: 36,
		color: '#fff',
		lineHeight: 46
	},
	item: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 30,
		marginVertical: 10,
		alignItems: 'center',
	},
	itemName: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 50,
		backgroundColor: 'white',
		elevation: 5,
		padding: 15,
		marginRight: 20,
	},
	itemText: {
		color: '#888',
		fontSize: 20,
		textTransform: 'uppercase',
	},
	circle: {
		width: 15,
		height: 15,
		borderRadius: 50,
		backgroundColor: 'pink',
		marginRight: 14
,	}
});