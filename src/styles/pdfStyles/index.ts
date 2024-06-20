import { StyleSheet, Font } from '@react-pdf/renderer';
import playfairBold from './Playfair_Display/static/PlayfairDisplay-Bold.ttf';
import playfair from './Playfair_Display/static/PlayfairDisplay-SemiBold.ttf';
import notoserifBold from './Noto_Serif,Playfair_Display/Noto_Serif/static/NotoSerif-Bold.ttf';
import notoserif from './Noto_Serif,Playfair_Display/Noto_Serif/static/NotoSerif-Medium.ttf';

Font.register({
  family: 'Playfair',
  fonts: [
    {
      src: playfairBold,
      fontWeight: 'bold'
    },
    {
      src: playfair
    }
  ]
});

Font.register({
  family: 'NotoSerif',
  fonts: [
    {
      src: notoserifBold,
      fontWeight: 'bold'
    },
    {
      src: notoserif
    }
  ]
});

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
    display: 'flex'
  },
  headerLeft: {
    width: '20%'
  },
  headerCenter: {
    width: '60%',
    textAlign: 'center'
  },
  headerRight: {
    width: '20%',
    color: 'red',
    fontSize: '20px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  textTitleBold: {
    fontFamily: 'Playfair', 
    fontSize: '16px', 
    fontWeight: 'bold'
  },
  textTitle: {
    fontFamily: 'Playfair', 
    fontSize: '16px'
  },
  text: {
    fontFamily: 'NotoSerif', 
    fontSize: '12px'
  },
  textBold: {
    fontFamily: 'NotoSerif', 
    fontSize: '12px',
    fontWeight: 'bold'
  }
});

export default styles;