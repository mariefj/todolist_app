import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const tasks = [
	{
		id: '1',
		name: 'do stuff',
		checked: false,
	},
	{
		id: '2',
		name: 'do other stuff',
		checked: false,
	},
	{
		id: '3',
		name: 'do some stuff again',
		checked: true,
	},
];

const Item = ({item}) => {

	const [checked, setChecked] = useState<boolean>(false)
	const styleChecked = item.checked ? [styles.itemName, {backgroundColor: '#DCDCDC'}] : [styles.itemName]

	return (
		<View style={styles.item}>
			<TouchableOpacity onPress={() => {setChecked(!checked)}} style={styleChecked}>
				<View style={styles.circle}></View>
				<Text style={styles.itemText}>{item.name}</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => null}>
				<MaterialIcons name="delete" size={36} color="pink" />
			</TouchableOpacity>
		</View>
	)
}

const TodoScreen = () => {

	const [task, setTask] = useState<string>('')

	const handleAddTask = () => {
		// push data
		setTask('')
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={tasks}
				renderItem={({item}) => <Item item={item} />}
				keyExtractor={(item) => item.id}
			/>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.containerInput}
			>
				<TextInput
					style={styles.textInput}
					value={task}
					placeholder="Write a task"
					placeholderTextColor="#aaa"
					onChangeText={text => setTask(text)}
				/>
				<TouchableOpacity
					onPress={() => handleAddTask()}
					style={styles.button}
				>
					<Text style={styles.buttonText}>+</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	)
}

export default TodoScreen;

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
		elevation: 5
	},
	buttonText: {
		fontSize: 36,
		color: '#fff',
		marginBottom: '5%',
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
	},
	circle: {
		width: 15,
		height: 15,
		borderRadius: 50,
		backgroundColor: 'pink',
		marginRight: 14
,	}
});