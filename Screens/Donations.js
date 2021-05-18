import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { donations } from '../Data/Dataarray';

export default class CategoriesScreen extends React.Component {
  static navigationOptions = {
    title: 'donations'
  };

  constructor(props) {
    super(props);
  }

  

  onPressCategory = item => {
    const category = item;
  };

  renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() =>  this.onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={item.photo} />
      </View>
    </TouchableHighlight>
  );

  render() {
    return (  
      <View>
        <FlatList
          data={donations}
          renderItem={this.renderCategory}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  categoriesItemContainer: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 15,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 8,
  },
  categoriesPhoto: {
    width: '100%',
    height: 105,
    borderRadius: 8,
    shadowColor: 'blue',
    opacity: 0.7,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 3
  }
});