import React from 'react'
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'
import { categories } from '../Data/Dataarray'

export default class CategoriesScreen extends React.Component {
  static navigationOptions = {
    title: 'Categories'
  };
  constructor(props) {
    super(props);
  }


  onPressCategory = item => {
    const title = item.name;
    const category = item;
  };

  renderCategory = ({ item }) => (
    <View style={styles.main}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={item.photo} />
        <View style={styles.textcont}>
          <Text style={styles.categoriesMile}>{item.mile}</Text>
          <Text style={styles.categoriesName}>{item.name}</Text>
        </View>
      </View>
    </View>
  );

  render() {
    return (
      <View styles={styles.main}>
        <Text styles={styles.mainText}>Latest Donations</Text>
        <FlatList
          data={categories}
          renderItem={this.renderCategory}
          keyExtractor={item => `${item.id}`}
        />
        <TouchableOpacity
          onPress={this.props.navigation.navigate('AddDonation')}
          style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    alignContent: "center",
  },
  mainText: {
    // fontWeight:"Bold",
    fontSize: 53
  },
  categoriesItemContainer: {
    width: "80%",
    marginLeft: 30,
    height: 200,
    margin: 10,
  },
  categoriesPhoto: {
    width: "100%",
    height: 155,
    borderRadius: 5,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 3,
    borderColor: '#cccccc',
    borderWidth: 0.5,
  },
  textcont: {
    flexDirection: "row",
    paddingHorizontal: 20,
    width: "50%",
    alignItems: "center",
    marginTop: -80,
  },
  categoriesName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#666',
    width: "50%",
    marginTop: 2,
    marginBottom: 2
  },
  categoriesMile: {
    flex: 1,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 6,
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#111',
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  }
});