import { Text, View, StyleSheet } from '@react-pdf/renderer';
import stylesGlobal from '@wms/styles/pdfStyles';
import { MasterEntryEntity } from '@wms/entities';

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    marginTop: 10,
    padding: 10,
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});

interface IFooterReport {
  nombreRecibe: string,
  nombreEntrega: string,
  data: MasterEntryEntity
}

const FooterReport: React.FC<IFooterReport> = (props) => {
  const { data } = props;

  return (
    <View wrap={false} style={{
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignContent: 'space-between',
      height: '145px',
      paddingTop: 5
    }}
    >
      <View style={{ width: '100%', height: '70px', border: '1.5px solid black', marginHorizontal: '10px', borderRadius: '10px' }}>
        <Text style={stylesGlobal.text}>Observaciones:</Text>
        <Text style={{ ...stylesGlobal.text, fontSize: 8 }}>{data?.description}</Text>
      </View>
      <View style={{ ...styles.footer, textAlign: 'center', justifyContent: 'space-between' }}>
        <View style={{ width: '33%' }}>
          <Text style={{
            borderBottom: '1px solid black'
          }}></Text>
          <Text style={stylesGlobal.textBold}>{props.nombreRecibe}</Text>
        </View>
        <View style={{ width: '33%' }}>
          <Text style={{
            borderBottom: '1px solid black'
          }}></Text>
          <Text style={stylesGlobal.textBold}>{props.nombreEntrega}</Text>
        </View>
      </View>
    </View>
  );
};

export default FooterReport;