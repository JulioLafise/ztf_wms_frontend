import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { v4 as uuid } from 'uuid';
import stylesGlobal from '@wms/styles/pdfStyles';

interface IColumnsObject {
  name: string,
  width: number,
  nameBd: string,
  size: number
}

interface ITableColumns {
  columns: IColumnsObject[],
  data: any[]
}

const styles = StyleSheet.create({
  detail: {
    width: '100%',
    padding: 10,
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});

const TableRows = (props: ITableColumns) => {
  return (
    <View style={styles.detail}>
      {props.data.map((_obj, _index) => (
        props.columns.map((obj, index) => (
          <View
            key={uuid()}
            style={{
              width: `${obj.width}%`,
              textAlign: 'center',
            }}
            wrap={false}
          >
            <Text
              key={`${_obj[obj.name]}${_index}`}
              style={{
                ...stylesGlobal.text,
                height: 30,
                display: 'flex',
                alignItems: 'center',
                fontSize: obj.size || 12,
                borderLeft: '1px solid black',
                borderBottom: '1px solid black',
                borderRight: `${index === props.columns.length - 1 && '1px solid black'}`
              }}>
              {_obj[obj.nameBd]}
            </Text>
          </View>
        ))
      ))
      }
    </View>
  );
};

export default TableRows;