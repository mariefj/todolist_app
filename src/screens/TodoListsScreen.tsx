import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const Item = (props: any) => {

	return (
		<View style={styles.item}>
			<TouchableOpacity onPress={props.onPress} style={styles.itemName}>
				<View style={styles.circle}></View>
				<Text style={styles.itemText}>{props.item.fullName}</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={props.onUpdate}>
				<MaterialCommunityIcons name="pencil" size={36} color="pink" />
			</TouchableOpacity>
			<TouchableOpacity onPress={props.onDelete}>
				<MaterialIcons name="delete" size={36} color="pink" />
			</TouchableOpacity>
		</View>
	)
}

const TodoListsScreen = (props: any) => {

	const [todoName, setTodoName] = useState<string>('')
	const [todoLists, setTodoLists] = useState(null)

	const handleAdd = () => {
		// push data
		setTodoName('')
	}

	const handleUpdate = () => {
	}

	const handleDelete = () => {
	}

	const renderItem = (props: any) =>
		<Item
			item={props.item}
			onPress={() => props.navigation.navigate('Todo', {name: props.item.name, id: props.item.id})}
			onDelete={() => handleDelete()}
		/>

	return (
		<View style={styles.container}>
			<FlatList
				data={todoLists}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.containerInput}
			>
				<TextInput
					style={styles.textInput}
					value={todoName}
					placeholder="Add a Todo List"
					placeholderTextColor="#aaa"
					onChangeText={text => setTodoName(text)}
				/>
				<TouchableOpacity
					onPress={() => handleAdd()}
					style={styles.button}
				>
					<Text style={styles.buttonText}>+</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	)
}

export default TodoListsScreen;

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
		elevation: 5,
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