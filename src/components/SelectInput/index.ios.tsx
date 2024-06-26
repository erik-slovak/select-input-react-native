import React, { type ComponentRef } from 'react'
import {
  Text, TouchableWithoutFeedback, View,
  type TextStyle,
  type ViewStyle,
  type StyleProp,
} from 'react-native'

import { AbstractSelectInput } from '../AbstractSelectInput'
import {
  type Props as AbstractSelectInputProps,
} from '../AbstractSelectInput/AbstractSelectInput'
import { PickerKeyboard } from '../PickerKeyboard'

import { styles } from './styles.ios'

export type Props = AbstractSelectInputProps & {
  buttonsTextStyle?: StyleProp<TextStyle>,
  buttonsViewStyle?: StyleProp<ViewStyle>,
  cancelKeyText: string,
  labelStyle?: StyleProp<TextStyle>,
  pickerItemStyle?: StyleProp<ViewStyle>,
  pickerViewStyle?: StyleProp<ViewStyle>,
  style?: StyleProp<ViewStyle>,
  submitKeyText: string,
}

export class SelectInput extends AbstractSelectInput<Props> {
  pickerKeyboard: ComponentRef<typeof PickerKeyboard> | null

  static defaultProps = {
    enabled: true,
    cancelKeyText: 'Cancel',
    options: [{ value: 0, label: '0' }],
    submitKeyText: 'Done',
    value: '0',
  }

  constructor (props: Props) {
    super(props)
    this.pickerKeyboard = null
  }

  setPickerKeyboardRef = (component: ComponentRef<typeof PickerKeyboard>): void => {
    this.pickerKeyboard = component
  }

  getValue = (): string => {
    const { selectedValue } = this.state
    return selectedValue
  }

  focus = (): void => {
    const { enabled, onBeginEditing } = this.props
    const pickerKeyboard = this.pickerKeyboard

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (enabled!) {
      pickerKeyboard?.focus()
      onBeginEditing?.()
    }
  }

  render (): JSX.Element {
    const {
      buttonsTextStyle,
      buttonsViewStyle,
      pickerItemStyle,
      pickerViewStyle,
      options,
      labelStyle,
      style,
      submitKeyText,
      cancelKeyText,
      value,
    } = this.props

    return (
      <TouchableWithoutFeedback onPress={this.focus}>
        <View style={style}>
          <Text
            style={labelStyle ?? styles.defaultlabelstyle}
            adjustsFontSizeToFit={true}
            allowFontScaling={false}
            numberOfLines={1}
          >
            {this.getValueLabel()}
          </Text>

          <PickerKeyboard
            ref={this.setPickerKeyboardRef}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            options={options!}
            value={value}
            onCancel={this.onCancel}
            onSubmit={this.onSubmit}
            onValueChange={this.onValueChange}
            submitKeyText={submitKeyText}
            cancelKeyText={cancelKeyText}
            buttonsTextStyle={buttonsTextStyle}
            buttonsViewStyle={buttonsViewStyle}
            pickerItemStyle={pickerItemStyle}
            pickerViewStyle={pickerViewStyle}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
