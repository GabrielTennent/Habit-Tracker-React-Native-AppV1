import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Button, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { AsyncStorage, Alert } from 'react-native';

//Imports assests being rendered to modals for home page
import HabitItem from './HabitItem';
import HabitInput from './HabitInput';
import HabitSettings from './HabitSettings';

const HabitPage = (props) => {

    //Stores current habits
    const [currentHabits, setHabits] = useState([]);

    //Stores booleans for adding and setting modals
    const [addMode, setAddMode] = useState(false);
    const [settingMode, setSettingMode] = useState(false);

    //Loads all data in Asnyc local storage and displays welcome message npm swhen application first loads
    useEffect(() => {
        getHabitsHandler();
        const name = props.navigation.getParam('name', 'no name found');
        Alert.alert("Welcome " + name.enteredName + " to my habit list application!");
    }, []);

    //Clears all local storage
    const clearLocalStorage = async () => {
        try {
            await AsyncStorage.clear()
                .then(() => getHabitsHandler());
        } catch (error) {
            console.log(error);
        }
        cancelSettings();
    };

    //Saves habit to local storage
    const saveHabitHandler = async (habit) => {
        try {
            await AsyncStorage.setItem(Math.random().toString(), habit)
                .then(() => getHabitsHandler());
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
        cancelAddHabit();
    };

    //Returns all habits in local storage and loads then into temp storage
    const getHabitsHandler = async () => {
        clearTempStorage();
        try {
            //habits = await AsyncStorage.getItem('habits');
            const keys = await AsyncStorage.getAllKeys();
            habits = await AsyncStorage.multiGet(keys);
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
        for (var x = 0; x < habits.length; x++) {
            addHabitHandler(habits[x][0], habits[x][1]);
            console.log(habits[x][1]);
        }
        //currentHabits = habits;
        return currentHabits;
    }

    //Adds a habit to temp storage that is then used to render habits
    const addHabitHandler = (id, habitName) => {
        setHabits(currentHabits => [...currentHabits,
        { ID: id, value: habitName }
        ]);
    };

    //Checks to see the user actually wants to complete the habit
    const removeHabitCheck = (habitID) => {
        Alert.alert(
            'Habit completion tracker:',
            'Have you completed this habit?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('No Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => removeHabitHandler(habitID)
                },
            ],
            { cancelable: true },
        );
    }

    //Checks to see the user actually wants remove all habits
    const removeAllHabitsCheck = (habitID) => {
        Alert.alert(
            'Habit data reset:',
            'Are you sure you would like to remove all habits?',
            [
                {
                    text: 'No',
                    onPress: () => cancelSettings(),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => clearLocalStorage()
                },
            ],
            { cancelable: true },
        );
    }

    //Removes a habit from local storage - used once habit marked as completed
    const removeHabitHandler = async (habitID) => {
        try {
            await AsyncStorage.removeItem(habitID)
                .then(() => getHabitsHandler());
        } catch (error) {
            console.log(error);
        }
    }

    //Removes temporary storage
    const clearTempStorage = () => {
        setHabits([]);
    }

    //Cancels add habits modal
    const cancelAddHabit = () => {
        setAddMode(false);
    }

    //Cancels setting modal
    const cancelSettings = () => {
        setSettingMode(false);
    }

    //Return method for displaying all home page data and reference to rendering components
    return (
        <View style={styles.screen} >
            <View style={styles.buttons}>
                <Button title="Add new habit" onPress={() => setAddMode(true)} />
                <Button title="Settings" onPress={() => setSettingMode(true)} color="red" />
            </View>
            <HabitSettings
                settingVisible={settingMode}
                deleteAllHabits={removeAllHabitsCheck}
                onCancel={cancelSettings}
            />
            <HabitInput
                addVisible={addMode}
                onAddHabit={saveHabitHandler}
                onCancel={cancelAddHabit}
            />
            <FlatList
                data={currentHabits}
                keyExtractor={(item, index) => item.ID}
                renderItem={itemData => <HabitItem
                    ID={itemData.item.ID}
                    onDelete={removeHabitCheck}
                    title={itemData.item.value}
                />}
            />
        </View>
    );
}

//Styles used for home page buttons and title
const styles = StyleSheet.create({
    screen: {
        padding: 30
    },
    title: {
        paddingBottom: 20,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttons: {
        paddingBottom: 5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});

export default withNavigation(HabitPage);