import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';

const Stack = createStackNavigator();

// Định nghĩa CATEGORIES với tên món ăn và hình ảnh
const CATEGORIES = [
  { id: '1', title: 'Mì Ý', image: require('./hinhanh/miy/anhchinh.png') },
  { id: '2', title: 'Món Nhanh & Dễ', image: require('./hinhanh/monannhanh/anhchinh.jpg') },
  { id: '3', title: 'Hamburgers', image: require('./hinhanh/hamburgers/anhchinh.jpg') },
  { id: '4', title: 'Ẩm Thực Đức', image: require('./hinhanh/monanduc/anhchinh.jpg') },
  { id: '5', title: 'Nhẹ & Ngon', image: require('./hinhanh/monannhe/anhchinh.jpg') },
  { id: '6', title: 'Món Ăn Kỳ Lạ', image: require('./hinhanh/monandocla/anhchinh.jpg') },
];

// Danh sách món ăn cho từng danh mục (cập nhật với hình ảnh)
const MEALS = {
  '1': [
    { name: 'Mì Ý sốt cà chua', image: require('./hinhanh/miy/hinh1.png') },
    { name: 'Mì Ý sốt kem', image: require('./hinhanh/miy/hinh2.png') },
    { name: 'Mì Ý sốt thịt', image: require('./hinhanh/miy/hinh3.png') },
  ],
  '2': [
    { name: 'Sandwich', image: require('./hinhanh/monannhanh/hinh1.jpg') },
    { name: 'Salad', image: require('./hinhanh/monannhanh/hinh2.jpg') },
    { name: 'Pizza nhỏ', image: require('./hinhanh/monannhanh/hinh3.jpg') },
  ],
  '3': [
    { name: 'Hamburger bò', image: require('./hinhanh/hamburgers/hinh1.jpg') },
    { name: 'Hamburger gà', image: require('./hinhanh/hamburgers/hinh2.jpg') },
    { name: 'Hamburger cá', image: require('./hinhanh/hamburgers/hinh3.jpg') },
  ],
  '4': [
    { name: 'Sauerbraten', image: require('./hinhanh/monanduc/hinh1.jpg') },
    { name: 'Bratwurst', image: require('./hinhanh/monanduc/hinh2.jpg') },
    { name: 'Pretzel', image: require('./hinhanh/monanduc/hinh3.jpg') },
  ],
  '5': [
    { name: 'Salad trái cây', image: require('./hinhanh/monannhe/hinh1.jpg') },
    { name: 'Yogurt', image: require('./hinhanh/monannhe/hinh2.jpg') },
    { name: 'Smoothie', image: require('./hinhanh/monannhe/hinh3.jpg') },
  ],
  '6': [
    { name: 'Món ăn Nhật', image: require('./hinhanh/monandocla/hinh1.jpg') },
    { name: 'Món ăn Trung Quốc', image: require('./hinhanh/monandocla/hinh2.jpg') },
    { name: 'Món ăn Hàn Quốc', image: require('./hinhanh/monandocla/hinh3.jpg') },
  ],
};

// Màn hình hiển thị danh mục món ăn
const CategoriesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredCategories = CATEGORIES.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={({ pressed }) => [
        styles.gridItem,
        { backgroundColor: pressed ? '#ddd' : '#fff' }
      ]}
      onPress={() => {
        navigation.navigate('Meals', { categoryId: item.id, categoryName: item.title });
      }}
    >
      <View style={styles.categoryContainer}>
        <Image source={item.image} style={styles.categoryImage} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.searchBar}
        placeholder="Tìm kiếm danh mục..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredCategories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
};

// Màn hình chi tiết món ăn
const MealsScreen = ({ route }) => {
  const { categoryId, categoryName } = route.params;
  const meals = MEALS[categoryId] || [];

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Danh sách món ăn: {categoryName}</Text>
      <FlatList
        data={meals}
        renderItem={({ item }) => (
          <View style={styles.mealItemContainer}>
            <Image source={item.image} style={styles.mealImage} />
            <Text style={styles.mealName}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{ title: 'Danh Mục Món Ăn' }}
        />
        <Stack.Screen
          name="Meals"
          component={MealsScreen}
          options={({ route }) => ({ title: route.params.categoryName })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  gridItem: {
    flex: 1,
    margin: 10,
    height: 150,
  },
  categoryContainer: {
    flex: 1,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  categoryImage: {
    width: '100%',
    height: '70%',
    borderRadius: 15,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  mealItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  mealImage: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginRight: 15,
  },
  mealName: {
    fontSize: 18,
    color: '#555',
  },
  searchBar: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
});
