import { Text, View, StyleSheet } from '@react-pdf/renderer';
import stylesGlobal from '@wms/styles/pdfStyles';
import { v4 as uuid } from 'uuid';

interface IColumnsObject {
  name: string,
  width: number
}

interface ITableColumns {
  columns: IColumnsObject[]
}

const styles = StyleSheet.create({
  detail: {
    width: '100%',
    padding: 10,
    paddingBottom: 0,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});

const TableColumns = (props: ITableColumns) => {
  return (
    <View style={styles.detail}>
      {props.columns.map((obj, index) => (
        <View key={uuid()} style={{ width: `${obj.width}%`, textAlign: 'center' }}>
          <Text
            key={obj.name}
            style={{
              ...stylesGlobal.textBold,
              borderLeft: '1px solid black',
              borderTop: '1px solid black',
              borderBottom: '1px solid black',
              borderRight: `${index === props.columns.length - 1 && '1px solid black'}`
            }}>
            {obj.name}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default TableColumns;