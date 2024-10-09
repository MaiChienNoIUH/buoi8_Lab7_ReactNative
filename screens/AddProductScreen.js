import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function AddProductScreen({ navigation }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAddProduct = () => {
    const newProduct = { name, price };
    // Gọi API để thêm sản phẩm (có thể thêm logic API POST tại đây)
    navigation.goBack();  // Quay lại HomeScreen sau khi thêm sản phẩm
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Product Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Add Product" onPress={handleAddProduct} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
