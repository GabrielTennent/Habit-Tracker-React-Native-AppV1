import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

//Component for rendering habit input modal from home page
const HabitInput = props => {
    //Tracks habit name entered into text field
    const [enteredHabit, setEnteredHabit] = useState('');

    //Updates input into input field
    const habitInputHandler = (enteredHabit) => {
        setEnteredHabit(enteredHabit);
    };

    //Calls for home page to add the habit name given if not empty
    const addHabitHandler = () => {
        if(enteredHabit === ""){
            return;
        }
        props.onAddHabit(enteredHabit);
        setEnteredHabit('');
    }

    //Returns modal if set to true on homepage that lets user input and add habits
    return (
        <Modal
            visible={props.addVisible}
            animationType="slide">
            <View style={styles.habitInputSection}>
                <TextInput
                    placeholder="Enter habit name here"
                    style={styles.habitInputText}
                    onChangeText={habitInputHandler}
                    value={enteredHabit}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        title="Add Habit"
                        onPress={addHabitHandler}
                    />
                    <Button
                        title="CANCEL"
                        color="red"
                        onPress={props.onCancel}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    habitInputSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    habitInputText: {
        borderBottomColor: 'black',
        borderBottomWidth: 1, width: '70%',
        marginBottom: 20
    },
    buttonContainer: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default HabitInput;