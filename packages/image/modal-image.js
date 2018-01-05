import React, {Component} from "react"
import {Modal, View, StyleSheet, Text} from "react-native"
import Image from "./image";
import Link from "@times-components/link";

const style = StyleSheet.create({
    modal: {
        backgroundColor: '#000',
        width: "100%",
        height: "100%",
        flexDirection: "column"
    },
    text: {
        color: 'white'
    },
    imageContainer: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    image: {
        width: '100%'
    }
})

class ModalImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    showModal() {
        this.setState({showModal: true});
    }

    hideModal() {
        this.setState({showModal: false});
    }

    render() {
        return (<View>
            <Modal visible={this.state.showModal}
                onRequestClose={() => this.hideModal()}
                presentationStyle="fullScreen">
                <View style={style.modal}>
                    <Link onPress={() => this.hideModal()}>
                        <Text style={style.text}>CLOSE ME</Text>
                    </Link>
                    <View style={style.imageContainer}>
                        <Image {...this.props} style={style.image} />
                    </View>
                </View>
            </Modal>
            <Link onPress={() => {this.showModal()}}>
                <Image {...this.props} />
            </Link>
        </View>);
    }
}

export default ModalImage;
