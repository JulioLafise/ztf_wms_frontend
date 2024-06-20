import LabelText from '../LabelText';
import { View, StyleSheet } from '@react-pdf/renderer';
// Create styles
const styles = StyleSheet.create({
  general: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap'
  },
});

interface IHeaderDataReport {
  data?: object
}

const HeaderDataReport = (props: IHeaderDataReport) => {
  return (
    <View style={styles.general}>
      <LabelText textTitle="Pais" text="Nicaragua" width={30} />
      <LabelText textTitle="Bodega" text="Galpon" width={35} />
      <LabelText textTitle="Tipo Inventario" text="Laptop" width={35} />
      <LabelText textTitle="Moneda" text="Dolares" width={20} />
      <LabelText textTitle="Proveedor" text="OLPC" width={40} />
      <LabelText textTitle="Responable" text="David" width={40} />
      <LabelText textTitle="Entrega" text="Cliente" width={40} />
      <LabelText textTitle="Placa" text="M25565" width={25} />
      <LabelText textTitle="Identificacion" text="26565656656s" width={35} />
    </View>
  );
};
export default HeaderDataReport;