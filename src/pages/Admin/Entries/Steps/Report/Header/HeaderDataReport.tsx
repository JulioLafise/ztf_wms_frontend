import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment';
import { MasterEntryEntity } from '@wms/entities';
import LabelText from '../LabelText';
// Create styles
const styles = StyleSheet.create({
  general: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: 2
  },
});

interface IHeaderDataReport {
  data?: MasterEntryEntity
}

const HeaderDataReport: React.FC<IHeaderDataReport> = (props) => {
  const { data } = props;
  return (
    <View style={styles.general}>
      <LabelText textTitle="Fecha" text={moment(data?.createdAt).format('YYYY-MM-DD')} width={20} />
      <LabelText textTitle="Tipo de Entrada" text={data?.entryType?.description} width={50} />
      <LabelText textTitle="Categoria" text={data?.category?.description} width={30} />
      <LabelText textTitle="Bodega" text={data?.warehouse?.description} width={30} />
      <LabelText textTitle="Pais" text={data?.departament?.description} width={35} />
      <LabelText textTitle="Proveedor" text={`${data?.supplier?.firstName} ${data?.supplier?.lastName}`} width={35} />
      <LabelText textTitle="Moneda" text={`${data?.typeCurrency?.iconName} ${data?.typeCurrency?.description}`} width={25} />
      <LabelText textTitle="Responsable" text={`${data?.employee?.firstName} ${data?.employee?.lastName}`} width={45} />
      <LabelText textTitle="Entrega" text={data?.delivery} width={30} />
      {/* <LabelText textTitle="Descripcion" text={data?.description} width={100} /> */}
    </View>
  );
};
export default HeaderDataReport;