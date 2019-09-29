import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';


const HabitSettings = props => {

    const deleteHabitsHandler = () => {
        props.deleteAllHabits();
    }

    return (
        <Modal
            visible={props.settingVisible}
            animationType="slide">
            <View style={styles.habitInputSection}>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Delete All Habits"
                        onPress={deleteHabitsHandler}
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
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default HabitSettings;