import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HabitItem = props => {
    //Returns each habit item to be rendered in the home page flatlist
    //Has touchable so that user can complete habits and remove them
    return (
        <TouchableOpacity
            onPress={props.onDelete.bind(this, props.ID)}>
            <View style={styles.habitList}>
                <Text>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    habitList: {
        padding: 15,
        margin: 15,
        backgroundColor: '#ccc',
    }
});

export default HabitItem;