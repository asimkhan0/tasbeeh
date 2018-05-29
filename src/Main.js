import React, {Component} from 'react'
import {View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  BackHandler
} from 'react-native'
import Prompt from './Prompt/Prompt'
import Counter from "./Counter";

export default class Main extends Component {
  state={
    promptVisible :false,
    tasbeehTypes: []
  };
  
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid())
  }
  backAndroid = () =>{
    this.setState({opened:{}});
    return true
  };
  _keyExtractor = (item, index) => item.name;
  
  gotoAnyTasbeeh = () => {
    this.setState({opened:{name:'random1x'}})
  };
  
  listClickHandler = (value) =>{
    this.setState({opened:value})
  };
  
  addTypeModal = () =>{
    this.setModalVisible(true)
  };
  setModalVisible(visible) {
    this.setState({promptVisible : visible})
  }
  onAdd = (value) => {
    this.setState(
      {tasbeehTypes: [...this.state.tasbeehTypes,{
        name:value,count:0}],promptVisible: false})
  };
  onDelete = () => {
    //TODO: should be implemented.
  };
  
  
  renderSplashScreen= () => {
  
  };
  renderListView = () => {
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
                  onPress={() => this.listClickHandler(item)}>
                  <Text style={styles.listItems}>{item.name}</Text>
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
          title="Add New Tasbeeh"
          placeholder="Tasbeeh Name"
          defaultValue=""
          visible={this.state.promptVisible}
          onCancel={() => this.setState({ promptVisible: false})}
          onSubmit={(value) => this.onAdd(value)}/>
    
    
    
      </View>
    )
  };
  renderCounterView = (value) => {
    if(!value) return <Counter />;
    return <Counter config={value}/>
  };
  
  render() {
    let state = this.state;
    {return state.opened.name === 'random1x'? this.renderCounterView() : state.opened.name != null? this.renderCounterView(this.state.opened) :
      this.renderListView();
    }
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