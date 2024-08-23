import { Text, View, Image } from '@react-pdf/renderer';
import {
  SourceObject
} from '@react-pdf/types';
import styles from '@wms/styles/pdfStyles';

interface IHeaderReport {
  logo: SourceObject,
  enterpriseName: string,
  typeReport: string,
  numberReport: string
}

const HeaderReport = (props: IHeaderReport) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Image src={props.logo} style={{
          width: '90px',
          height: '40px'
        }}>
        </Image>
      </View>
      <View style={styles.headerCenter}>
        <Text style={styles.textTitleBold}>{props.enterpriseName}</Text><br />
        <Text style={styles.textTitle}>{props.typeReport}</Text>
      </View>
      <View style={styles.headerRight}>
        <Text style={styles.textTitle}>{`Noº ${props.numberReport}`}</Text>
      </View>
    </View>
  );
};

export default HeaderReport;