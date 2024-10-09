import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function EditProductScreen({ route, navigation }) {
  const { product } = route.params;
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image);
  const [category, setCategory] = useState(product.category);

  const handleEditProduct = async () => {
    const updatedProduct = {
      name,
      price,
      description,
      image,
      category
    };

    try {
      const response = await fetch(`https://66fc1f44c3a184a84d1627ea.mockapi.io/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      }); 
      const data = await response.json();
      // if (onGoBack) {
      //       onGoBack();
      //   }
      navigation.goBack(); // Quay lại màn hình trước sau khi chỉnh sửa thành công
    } catch (error) {
      console.error(error.message);
    }
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
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <Button title="Save Changes" onPress={handleEditProduct} />
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
