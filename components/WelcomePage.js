import React, { useState } from 'react';
import { Button, View, TextInput, StyleSheet } from 'react-native';

const WelcomePage = (props) => {

    const { navigate } = props.navigation;
    const [enteredName, setEnteredName] = useState('');

    const enteredNameHandler = (enteredName) => {
        setEnteredName(enteredName);
    }

    return (
        <View style={styles.nameInputSection}>
            <TextInput
                placeholder="Enter habit name here"
                style={styles.nameInputText}
                onChangeText={enteredNameHandler}
                value={enteredName}
            />
            <Button
                style={styles.buttonContainer}
                title="Enter!"
                onPress={() => navigate('Home',
                    {
                        name: { enteredName },
                    })}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    nameInputSection: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameInputText: {
        paddingTop: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '70%',
        marginBottom: 20
    },
    buttonContainer: {
        width: '60%',
    }
});


export default WelcomePage;