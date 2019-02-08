import React from "react";
import { View } from "react-native";
import { TileLink, TileSummary } from "../shared";
import styles from "./styles";

const TileM = ({tile, onPress}) => {
    const {strapline, article: {shortHeadline}} = tile;
    const newTile = {article: {shortHeadline}}

    return (
    <TileLink onPress={onPress} tile={newTile}>
        <View style={styles.container}>
            <TileSummary headlineStyle={styles.headlineStyle} tile={newTile}  strapline={strapline}
            straplineStyle={styles.straplineStyle}/>
        </View>
    </TileLink>);
};

export default TileM;