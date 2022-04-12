import React,{useState,useEffect} from 'react';
import {Text,StyleSheet,TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types';

const styles = StyleSheet.create({

    random: {
        backgroundColor:"#999",
        width:150,
        marginHorizontal:15,
        marginVertical:25,
        fontSize:35,
        textAlign:"center"
    },

    disabled: {
        opacity:0.3,
    }
});



function RandomNumber({guess,onPress,isDisabled,id}) {

  const handlePress = () => {
      if (!isDisabled) {
            onPress(id);
      }
  }
  return (
      <TouchableOpacity onPress={handlePress}>
            <Text style={[styles.random,isDisabled && styles.disabled]} >{guess}</Text>
      </TouchableOpacity>
   
  )
}

RandomNumber.propTypes = {
    guess: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress:PropTypes.func.isRequired,
    id:PropTypes.number.isRequired
}

export default RandomNumber