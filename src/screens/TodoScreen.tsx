import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, TextInput, Keyboard, ListRenderItem } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { IItem } from '../interfaces/IItem'

import firebase from '../firebase/config'
import 'firebase/auth'
import 'firebase/firestore';

// import DocumentReference = firebase.firestore.DocumentReference
// import CollectionReference = firebase.firestore.CollectionReference
// import DocumentData = firebase.firestore.DocumentData
// import DocumentSnapshot = firebase.firestore.DocumentSnapshot

interface IItemTask extends IItem{
	checked: boolean,
}

interface IItemListTask {
	item : {
		id: string,
		name: string,
		createdAt: {nanoseconds: number, seconds: number},
		checked: boolean,
	}
}

const Item = (props: any) => {

	const styleItemChecked = props.item.checked ? [styles.itemName, {backgroundColor: '#DCDCDC'}] : [styles.itemName]
	const styleTextChecked = props.item.checked ? [styles.itemText, {textDecorationLine: 'line-through'}] : [styles.itemText]

	return (
		<View style={styles.item}>
			<TouchableOpacity onPress={props.onPress} style={styleItemChecked}>
				<View style={styles.circle}></View>
				<Text style={styleTextChecked}>{props.item.name}</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={props.onDelete}>
				<MaterialIcons name="delete" size={36} color="pink" />
			</TouchableOpacity>
		</View>
	)
}

const TodoScreen = (props: any) => {

	const [taskName, setTaskName] = useState<string>('')
	const [todoList, setTodoList] = useState<IItemTask[] | null>(null)

	const userID = props.route.params.user.id
	const todoListCollectionRef =
		firebase
			.firestore()
			.collection('todoLists')
			.doc(userID)
			.collection('todoListsUser')
			.doc(props.route.params.id)
			.collection('tasks')

	useEffect(() => {
		todoListCollectionRef
			.orderBy('createdAt', 'desc')
			.onSnapshot(
				querySnapshot => {
					const newTodoList: IItemTask[] | null = []
					querySnapshot.forEach(doc => {
						const task = doc.data()
						task.id = doc.id
						newTodoList.push(task)
					});
					setTodoList(newTodoList)
				},
				error => {
					console.log(error)
				}
			)
	}, [])

	const handleAdd = () => {
		if (taskName && taskName.length > 0) {
			const timestamp = firebase.firestore.FieldValue.serverTimestamp();
			const data = {
				name: taskName,
				checked: false,
				createdAt: timestamp,
			};
			todoListCollectionRef
				.add(data)
				.then(doc => {
					setTaskName('')
					Keyboard.dismiss()
				})
			.catch((error) => {
				console.error(error)
			});
		}
	}

	const handleDelete = (itemID: string) => {
		todoListCollectionRef
			.doc(itemID)
			.delete()
			.then(() => {})
			.catch((error) => {
				console.error(error)
			})
	}

	const handlePressTask = (item: IItemTask) => {
		todoListCollectionRef
			.doc(item.id)
			.update({checked: !item.checked})
			.then(() => {})
			.catch((error) => {
				console.error(error)
			})
	}

	const RenderItem = (item: IItemListTask) =>
		<Item
			item={item.item}
			onPress={() => handlePressTask(item.item)}
			onDelete={() => handleDelete(item.item.id)}
		/>

	return (
		<View style={styles.container}>
			<FlatList
				data={todoList}
				renderItem={RenderItem}
				keyExtractor={(item) => item.id}
			/>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.containerInput}
			>
				<TextInput
					style={styles.textInput}
					value={taskName}
					placeholder="Write a task"
					placeholderTextColor="#aaa"
					onChangeText={text => setTaskName(text)}
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