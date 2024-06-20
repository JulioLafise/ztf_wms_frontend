import { Document, Page, StyleSheet, PDFViewer, View } from '@react-pdf/renderer';
import Logo from '@wms/assets/logo.png';
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
  { name: 'Producto', width: 20, nameBd: 'producto' },
  { name: 'Unidad Medida', width: 30, nameBd: 'unidadMedida' },
  { name: 'Cantidad', width: 30, nameBd: 'cantidad' },
  { name: 'Observaciones', width: 20, nameBd: 'observaciones' },
];

const MyDocument = () => {
  const data = [  
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 2', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 3', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 3', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },

    { producto: 'Prueba 4', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 2', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 2', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 3', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 4', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 2', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 3', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 4', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 3', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 4', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' }, { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 2', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 2', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 3', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 4', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 2', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 3', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 4', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 2', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 2', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 3', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 4', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 2', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 3', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 4', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 3', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 4', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },

    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },

    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },

    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' },
    // { producto: 'Prueba 5', unidadMedida: 20, cantidad: 0, observaciones: 'Prueba' }, 
  ];
  const validatePageDecimals = () => {
    const divisionPages = ((data.length - 36) / 45).toString().split('.');
    if (divisionPages.length > 1) {
      const decimales = parseInt(divisionPages[1].substring(0, 2)); 
      return decimales >= 82 && decimales <= 99;
    }
    return true;
  };

  return (
    <PDFViewer style={{ width: '100%', height: '1000px' }}>
      <Document>
        <Page size="LETTER" style={styles.page}>
          {/* CREAR COMPONENTE HEADER */}
          <View>
            <HeaderReport logo={Logo} enterpriseName="ALMACENADORA LAFISE" typeReport="RECIBO DE ENTRADA" numberReport="0001" />
            <HeaderDataReport />
            {/* CREAR COMPONENTE TABLE */}
            <TableColumns columns={columns} />
            <TableRows data={data} columns={columns} />
          </View>
          {/* CREAR COMPONENTE FOOTER */}
          <View style={{
            ...data.length > 27 && data.length < 36 ? { height: '100%', flexDirection: 'column', justifyContent: 'flex-end' } :
              data.length === 36 ? { height: '98%', flexDirection: 'column', justifyContent: 'flex-end' } :
                validatePageDecimals() && { height: '100%', flexDirection: 'column', justifyContent: 'flex-end' }
          }}>
            <FooterReport nombreEntrega="Julio Perez" nombreRecibe="Edman Mena" />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default MyDocument;