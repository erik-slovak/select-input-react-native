import React, { Component } from 'react'
import {
  type StyleProp,
  Text, TouchableOpacity,
  type TextStyle,
} from 'react-native'

import { styles } from './styles'

type Props = {
  onPress: () => void,
  text: string,
  textAlign: 'center' | 'left' | 'right',
  textStyle?: StyleProp<TextStyle>,
}

export class KeyboardButton extends Component<Props> {
  render (): JSX.Element {
    const { onPress, text, textAlign, textStyle } = this.props

    return (
      <TouchableOpacity onPress={onPress}>
        <Text
          allowFontScaling={false}
          style={[styles.buttontext, textStyle, { textAlign }]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    )
  }
}
