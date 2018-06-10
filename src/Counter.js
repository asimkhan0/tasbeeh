import React,{Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity, Alert,
} from 'react-native'

import Prompt from './Prompt/Prompt'

export  default class Counter extends Component {
  state={
    name:"Random",
    count:0,
    target:0,
    targetPrompt:false,
  }
  
  componentDidMount() {
    if(this.props.config) {
      this.setState({
        name: this.props.config.name,
        count: this.props.config.count
      });
    }
  }
  
  incrementCounter = () => {
    this.setState({count: ++this.state.count },()=>{
      //once async state is updated
      this.props.onCounterChange(this.state.count);
      
      if(this.state.count == this.state.target){
        Alert.alert('Awesome','You achieved your target');
        //TODO: add some kinda tone + vibrate as well
      }
    });
  }
  setTarget = (value)=> {
    if(isNaN(value)){
      alert(`Please enter a valid 'NUMBER' `)
      return
    }
    this.setState({target:value,targetPrompt: false})
  }
  onReset = () => {
    Alert.alert(`Warning `,'Are you sure you want to RESET ? ',
      [
        {text:'OK',onPress:this.reset },
        {text:'Cancel',onPress:() => {console.log(`CANCEL`) }}
      ]
    )
  }
  reset = () => {
    this.setState({count: 0},()=>this.props.onCounterChange(0));
  }
  render () {
    const state = this.state;
    return(
      <View style={counterMainContainer}>
        <View style={nameContainer}>
          <Text style={nameText}> { this.state.name} </Text>
        </View>
        <View style={displayContainer}>
          <View style={[circle,counterDisplay]}>
            <Text style={text}>{state.count}</Text>
          </View>
          <TouchableOpacity
            style={[circle,targetDisplay]}
            onPress={()=>this.setState({targetPrompt: true})}>
            <Text style={text}>{state.target}</Text>
          </TouchableOpacity>
        </View>
        <View style={buttonsContainer}>
          <TouchableOpacity
            onPress={this.incrementCounter}
            style={[circle,button,add]}
            title={`Add`}
          >
            <Text style={text}> Add </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onReset}
            style={[circle,button,reset]}
          >
            <Text style={text}> Reset </Text>
          </TouchableOpacity>
        </View>
        
        <Prompt
          title='How many times ? '
          placeholder='enter a number, e.g 100 '
          defaultValue = {state.target.toString()}
          visible={this.state.targetPrompt}
          onCancel={() => this.setState({targetPrompt: false})}
          onSubmit={(value) => this.setTarget(value)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  counterMainContainer:{
    flex:1,
    justifyContent:'space-around',
  },
  nameContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-end',
  },
  nameText:{
    fontSize:30,
    fontWeight:'bold',
    color:'#fff'
  },
  displayContainer:{
    flex:2,
    flexDirection:'row',
    alignItems:'flex-end'
  },
  buttonsContainer:{
    flex:2,
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center'
  },
  circle:{
    borderRadius:150 / 2,
    backgroundColor:'red',
    margin:10
  },
  counterDisplay:{
    width:150,
    height:150,
    alignItems:'center',
    justifyContent:"center"
  },
  targetDisplay:{
    width:75,
    height:75,
    alignItems:'center',
    justifyContent:"center"
  },
  text:{
    textAlign:'center',
    fontSize:20
  },
  button:{
  
  },
  add:{
    width:150,
    height:150,
    alignItems:'center',
    justifyContent:"center",
    backgroundColor:'green'
  },
  reset:{
    width:75,
    height:75,
    alignItems:'center',
    justifyContent:"center",
    backgroundColor:'red'
  }
});
const {
  nameContainer,
  nameText,
  counterMainContainer,
  displayContainer,
  buttonsContainer,
  circle,
  counterDisplay,
  text,
  button,
  targetDisplay,
  add,
  reset
  
} = styles;
