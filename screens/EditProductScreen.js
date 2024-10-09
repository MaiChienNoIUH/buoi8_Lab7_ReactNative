import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function EditProductScreen({ route, navigation }) {
  const { product } = route.params;  // Nhận dữ liệu sản phẩm được truyền qua
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());

  const handleEditProduct = () => {
    const updatedProduct = { ...product, name, price };
    // Gọi API để cập nhật sản phẩm (có thể thêm logic API PUT tại đây)
    navigation.goBack();  // Quay lại HomeScreen sau khi chỉnh sửa
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
      <Button title="Save Changes" onPress={handleEditProduct} />
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
