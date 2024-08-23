import { Text, View } from '@react-pdf/renderer';
import _ from 'lodash';
import styles from '@wms/styles/pdfStyles';

interface ILabelText {
  fontSize?: number,
  textTitle: string,
  text: string,
  width: number
}

const LabelText = (props: ILabelText) => {
  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      width: `${props.width}%`,
    }}>
      <Text style={{
        ...styles.textBold,
        fontSize: `${_.get(props, 'fontSize', 12)}px`,
        paddingHorizontal: '6px'
      }}>
        {props.textTitle}:
      </Text>
      <Text style={{
        ...styles.text,
        fontSize: `${_.get(props, 'fontSize', 12)}px`,
        flexGrow: 1,
        borderBottom: '1px solid black'
      }}>
        {props.text}
      </Text>
    </View>
  );
};

export default LabelText;