import React from "react";
import {View, Text} from "react-native";
import styles from "./styles";
import propTyes from "./proptypes";

const keySeperator = () => (<View style={styles.keySeperator} />)

const Leaders = ({renderLeader1, renderLeader2, renderLeader3}) => {
    return (
        <View style={styles.container}>
            <Text> IMG </Text>
            <View style={styles.leadTextContainer}>
                <Text style={styles.leadText}> Leading Articles </Text>
            </View>
            {renderLeader1()}
            {keySeperator()}
            {renderLeader2()}
            {keySeperator()}
            {renderLeader3()}
        </View>
    );
};

Leaders.propTyes = propTyes;

export default Leaders;