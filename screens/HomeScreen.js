import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, TextInput, ActivityIndicator, StyleSheet, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL_database = 'https://66fc1f44c3a184a84d1627ea.mockapi.io/products';

  const fetchProducts = async () => { 
    try {
      const response = await fetch(URL_database);
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

    useEffect(() => {
    fetchProducts();
  }, []);

  // const handleRefresh = () => {
  //   fetchProducts(); // Tải lại sản phẩm khi cần thiết
  // };

  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`https://66fc1f44c3a184a84d1627ea.mockapi.io/products/${id}`, { method: 'DELETE' });
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch (error) {
      setError(error.message);
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <View>
        <Image source={{ uri: item.image }} style={styles.imageItem}/>
      </View>
      <View>
        <Text style={styles.productName}>Tên sp: {item.name}</Text>
        <Text style={styles.productPrice}>Giá: {item.price} USD</Text>
        <Text style={styles.productDescription}>Mô tả: {item.description}</Text>
        <Text style={styles.productCategory}>Loại sp: {item.category}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProduct', { product: item, fetchProducts: fetchProducts} )}>
          <Text style={styles.buttonText}>EDIT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleDeleteProduct(item.id)}> 
          <Text style={styles.buttonText}>DELETE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search products"
        style={styles.searchInput}
        onChangeText={(text) => {
          setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(text.toLowerCase())));
        }}
      />
      <View style={styles.buttonGroup}>
        <Button title="All" onPress={() => setFilteredProducts(products)} />
        <Button title="Donut" onPress={() => setFilteredProducts(products.filter(p => p.category === 'Donut'))} />
        <Button title="Pink Donut" onPress={() => setFilteredProducts(products.filter(p => p.category === 'Pink Donut'))} />
        <Button title="Floating" onPress={() => setFilteredProducts(products.filter(p => p.category === 'Floating'))} />
      </View>

      <View style={styles.viewBottom}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddProduct', {fetchProducts: fetchProducts})}>
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProduct}
        style={{ flex: 0.3 }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9'
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  viewBottom: {
    alignItems: 'center',
  },
  productContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  productPrice: {
    fontSize: 16,
    color: '#555'
  },
  productDescription: {
    fontSize: 16,
    color: '#777'
  },
  productCategory: {
    fontSize: 16,
    color: '#777'
  },
  button: {
    marginTop: 5,
    padding: 10,
    backgroundColor: 'green',
    alignItems: 'center',
    borderRadius: 5,
    width: 80
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16
  }
});
