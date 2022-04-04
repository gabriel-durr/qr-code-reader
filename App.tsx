import { BarCodeScanner } from "expo-barcode-scanner";

import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
} from "react-native";
import { findProductByCode, IProduct } from "./services/api";

async function askForPermission() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();

    return status === "granted";
}

export default function App() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanning, setScanning] = useState(false);
    const [product, setProduct] = useState<IProduct | null | undefined>(null);
    useEffect(() => {
        askForPermission().then(setHasPermission);
    }, []);

    function onBarCodeScanned(payload: { data: string }) {
        // com o código de barras, podemos consultar a nossa API
        const product = findProductByCode(payload.data);
        setProduct(product);
        setScanning(false);
        // após o retorno da API podemos salvar o produto em um estado
    }

    if (hasPermission === null) {
        return <Text>Obtendo permissões...</Text>;
    }

    if (hasPermission === false) {
        return <Text>Sem permissões para acessar a câmera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.mark}
                source={require("./assets/fenixMyMarkFullWhite.png")}
            />
            <Text style={styles.title}>QR scanner in Market 🛒</Text>

            <Image
                style={styles.doubt}
                source={require("./assets/duvida.png")}
            />

            <Text style={styles.subtitle}>
                Encontre o preço dos produtos em nosso supermercado 🌟
            </Text>

            {product === undefined && (
                <Text style={styles.subtitle}>Produto não encontrado :(</Text>
            )}

            {product && (
                <View style={styles.productContainer}>
                    <Text style={styles.productPrice}>{product?.price}</Text>
                    <Text style={styles.productName}>{product?.name}</Text>
                    <View style={styles.productImageContainer}>
                        <Image
                            style={styles.productImage}
                            source={{
                                uri: product?.image,
                            }}
                        />
                    </View>
                </View>
            )}

            {scanning && (
                <BarCodeScanner
                    onBarCodeScanned={onBarCodeScanned}
                    style={{
                        height: 450,
                        width: "100%",
                    }}
                />
            )}

            <TouchableOpacity style={styles.button}>
                <Text
                    style={styles.buttonText}
                    onPress={() => {
                        setScanning((prev) => !prev);
                        setProduct(null);
                    }}
                >
                    {scanning ? "Cancelar" : "Consultar"}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "rgb(32,32,50)",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#c06b0b",
    },
    subtitle: {
        fontSize: 20,
        color: "#c5cec7",
        marginVertical: 70,
        marginHorizontal: 10,
    },
    button: {
        marginVertical: 20,
        padding: 12,
        backgroundColor: "#3f5d81",
        borderRadius: 50,
    },
    buttonText: {
        color: "#dbd6b9",
        fontSize: 20,
        fontWeight: "bold",
    },
    productContainer: {
        flex: 1,
        alignItems: "center",
    },
    productPrice: {
        fontSize: 42,
        fontWeight: "bold",
        color: "#09f71d",
    },
    productName: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#e6e6e6",
    },
    productImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    productImageContainer: {
        marginVertical: 30,
        width: 350,
        height: 350,
    },

    mark: {
        width: "50%",
        height: "20%",
        resizeMode: "contain",
        alignSelf: "flex-start",
    },
    doubt: {
        width: 200,
        height: 200,
        resizeMode: "center",
    },
});
