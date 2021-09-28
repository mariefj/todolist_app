import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, TextInput, Keyboard, Modal } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { IItem, IItemList } from '../interfaces/IItem'

import firebase from '../firebase/config'
import 'firebase/auth'
import 'firebase/firestore';


const Item = (props: any) => {

	return (
		<View style={styles.item}>
			<TouchableOpacity onPress={props.onPress} style={styles.itemName}>
				<View style={styles.circle}></View>
				<Text style={styles.itemText}>{props.item.name}</Text>
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
	const [todoLists, setTodoLists] = useState<IItem[] | null>([])
	const [dialogVisible, setDialogVisible] = useState<boolean>(false)
	const [currentItem, setCurrentItem] = useState<IItem | null>()

	const userID = props.route.params.user.id
	const todoListsCollectionRef = firebase.firestore().collection('todoLists').doc(userID).collection('todoListsUser')

	useEffect(() => {
		todoListsCollectionRef
			.orderBy('createdAt', 'desc')
			.onSnapshot(
				querySnapshot => {
					const newTodoLists: IItem[] | null = []
					querySnapshot.forEach(doc => {
						const todoList = doc.data()
						todoList.id = doc.id
						newTodoLists.push(todoList)
					});
					setTodoLists(newTodoLists)
				},
				error => {
					console.log(error)
				}
			)
	}, [])

	const handleAdd = () => {
		if (todoName && todoName.length > 0) {
			const timestamp = firebase.firestore.FieldValue.serverTimestamp();
			const data = {
				name: todoName,
				createdAt: timestamp,
			};
			todoListsCollectionRef
				.add(data)
				.then(doc => {
					setTodoName('')
					Keyboard.dismiss()
				})
			.catch((error) => {
				console.error(error)
			});
		}
	}

	const handleUpdate = () => {
		if (todoName && todoName.length > 0) {
			todoListsCollectionRef
				.doc(currentItem?.id)
				.update({name: todoName})
				.then(() => {
					setCurrentItem(null)
					setTodoName('')
					setDialogVisible(false)
				})
				.catch((error) => {
					console.error(error)
				})
		}
	}

	const handleDelete = (itemID: string) => {
		todoListsCollectionRef
			.doc(itemID)
			.delete()
			.catch((error) => {
				console.error(error)
			})
	}

	const RenderItem = (item: IItemList) =>
		<Item
			item={item.item}
			onPress={() => props.navigation.navigate('Todo', {name: item.item.name, id: item.item.id, user: props.route.params.user})}
			onUpdate={() => {
				setTodoName(item.item.name)
				setCurrentItem(item.item)
				setDialogVisible(true)
			}}
			onDelete={() => handleDelete(item.item.id)}
		/>

	return (
		<View style={styles.container}>
			{ todoLists && (
				<FlatList
					data={todoLists}
					renderItem={RenderItem}
					keyExtractor={(item: IItem) => item.id}
				/>
			)}
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
			<Dialog.Container visible={dialogVisible}>
				<Dialog.Input
					value={todoName}
					placeholder={todoName}
					onChangeText={text => setTodoName(text)}
				/>
				<Dialog.Button label="Ok" onPress={handleUpdate} style={{color: 'pink', fontSize: 18}}/>
			</Dialog.Container>
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