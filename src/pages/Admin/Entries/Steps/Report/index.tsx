import React from 'react';
import {
  Document,
  Page,
  StyleSheet,
  PDFViewer,
  View,
} from '@react-pdf/renderer';
import Logo from '@wms/assets/olpc_gsuite_320.png';
import { DetailEntryEntity, MasterEntryEntity } from '@wms/entities';
import HeaderReport from './Header/HeaderReport';
import HeaderDataReport from './Header/HeaderDataReport';
import TableColumns from './Table/TableColumns';
import TableRows from './Table/TableRows';
import FooterReport from './Footer/Footer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between'
  },
});

const columns = [
  { name: 'Producto', width: 25, nameBd: 'product', size: 7 },
  { name: 'Codigo Lote', width: 15, nameBd: 'lot', size: 12 },
  { name: 'N° Serie', width: 15, nameBd: 'serie', size: 12 },
  { name: 'Estatus', width: 20, nameBd: 'productStatus', size: 12 },
  { name: 'Observaciones', width: 25, nameBd: 'description', size: 7 },
];

const MyDocument: React.FC<{ data?: MasterEntryEntity }> = (props) => {
  const { data: entryData } = props;
  const [entryDetail, setEntryDetail] = React.useState<any[]>([]);

  const validatePageDecimals = () => {
    const divisionPages = ((entryDetail.length - 36) / 45).toString().split('.');
    if (divisionPages.length > 1) {
      const decimales = parseInt(divisionPages[1].substring(0, 2));
      return decimales >= 82 && decimales <= 99;
    }
    return true;
  };

  React.useEffect(() => {
    entryData?.details?.forEach(item => {
      setEntryDetail(prevState => [
        ...prevState,
        {
          product: `${item.product?.description.slice(0, 70)}...`,
          productStatus: item.productStatus.description,
          lot: item.lot,
          serie: item.serie
        }
      ]);
    });
  }, []);

  return (
    <PDFViewer style={{ width: '100%', height: '1000px' }}>
      <Document>
        <Page size="LETTER" style={styles.page}>
          {/* CREAR COMPONENTE HEADER */}
          <View>
            <HeaderReport logo={Logo} enterpriseName="OLPC - WMS" typeReport="RECIBO DE ENTRADA" numberReport={entryData?.code} />
            <HeaderDataReport data={entryData} />
            {/* CREAR COMPONENTE TABLE */}
            <TableColumns columns={columns} />
            <TableRows data={entryDetail} columns={columns} />
          </View>
          {/* CREAR COMPONENTE FOOTER */}
          <View style={{
            ...entryDetail.length > 27 && entryDetail.length < 36 ? { height: '100%', flexDirection: 'column', justifyContent: 'flex-end' } :
              entryDetail.length === 36 ? { height: '98%', flexDirection: 'column', justifyContent: 'flex-end' } :
                validatePageDecimals() && { height: '100%', flexDirection: 'column', justifyContent: 'flex-end' }
          }}>
            <FooterReport nombreEntrega={entryData.delivery} nombreRecibe={`${entryData.employee?.firstName} ${entryData.employee?.lastName}`} data={entryData} />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default MyDocument;