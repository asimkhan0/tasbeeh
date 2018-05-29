import React, {Component} from 'react'
import {View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,Modal
} from 'react-native'

import Prompt from './Prompt/Prompt'

export default class Main extends Component {
  state={
    promptVisible :false,
    tasbeehTypes: [
    
    ]
  }

  _keyExtractor = (item, index) => item.Ttype;
  
  gotoAnyTasbeeh = () => {
    console.log( `Any clicked ` );
  };
  listClickHandler = () =>{
    console.log( `list clicked ` );
  };
  addTypeModal = () =>{
    this.setModalVisible(true)
    console.log( `Add modal clicked ` );
  };
  setModalVisible(visible) {
    this.setState({promptVisible : visible});
  }
  onAdd = (value) => {
    this.setState({tasbeehTypes: [...this.state.tasbeehTypes,{Ttype:value}], promptVisible: false})
  }
  onDelete = () => {
    //TODO: should be implemented.
  }
  render() {
    return(
      <View style={styles.mainContainer}>
        <View style={styles.anyTasbeehContainer}>
          <TouchableOpacity
            title={`Any Tasbeeh`}
            style={styles.button}
            onPress={this.gotoAnyTasbeeh}>
            <Text style={styles.buttonText}>Any Tasbeeh</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.scrollerContainer}>
          <FlatList
            data={this.state.tasbeehTypes}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={this.listClickHandler}>
                  <Text style={styles.listItems}>{item.Ttype}</Text>
                </TouchableOpacity>
              ) }
            }
            keyExtractor={this._keyExtractor}
          />
        </View>
        <View style={styles.addTypeContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.addTypeModal}>
            <Text style={styles.buttonText}>Add New Tasbeeh</Text>
          </TouchableOpacity>
        </View>
        
        
        <Prompt
          title="Say something"
          placeholder="Start typing"
          defaultValue="Hello"
          visible={this.state.promptVisible}
          onCancel={() => this.setState({ promptVisible: false})}
          onSubmit={(value) => this.onAdd(value)}/>
      
      
      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    paddingTop:25,
    paddingHorizontal:2,
    alignSelf:'stretch',
  },
  anyTasbeehContainer:{
    flex:1,
  },
  scrollerContainer:{
    flex:5,
  },
  addTypeContainer:{
    flex:1
  },
  button:{
    // width:330,
    
    backgroundColor: 'green',
    paddingVertical:25,
    alignItems: 'center'
  },
  buttonText:{
    fontSize:20,
    color: '#fff'
  },
  listItems:{
    backgroundColor:'#0ff',
    fontSize:20,
    paddingVertical:20,
    paddingLeft:5
  }
});