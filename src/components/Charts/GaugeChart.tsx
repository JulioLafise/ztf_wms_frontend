import React from 'react';
import { Box, Typography } from '@mui/material';
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5radar from '@amcharts/amcharts5/radar';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Dark from '@amcharts/amcharts5/themes/Dark';
import { useUI } from '@wms/hooks';
import {
  type DataGaugeChartProps,
  type SizeProps
} from './functions-charts';

interface Props<T> {
  id: string,
  data: Array<DataGaugeChartProps>,
  title?: string,
  size?: SizeProps,
}

const GaugeChart = <T, >(props: Props<T>) => {
  const {
    id,
    data,
    size = { width: '100%', height: '350px' },
    title
  } = props;

  const { isDarkMode } = useUI().theme;

  React.useLayoutEffect(() => {
    // Create root element
    const root = am5.Root.new(id);

    // Set themes
    const themes: am5.Theme[] = [
      am5themes_Animated.new(root),
      am5themes_Dark.new(root),
      am5themes_Responsive.new(root)
    ];

    !isDarkMode && themes.splice(1, 1);

    root.setThemes(themes);

    // Create chart
    const chart = root.container.children.push(am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      wheelX: 'panX',
      wheelY: 'zoomX',
      innerRadius: am5.percent(20),
      startAngle: -90,
      endAngle: 180
    }));

    // Colors
    // chart.get('colors')?.set('colors', [
    //   am5.color(0x0557fa),
    //   am5.color(0x1e7efa),
    //   am5.color(0xa5cff3),
    //   am5.color(0xf4c63e),
    //   am5.color(0xf35b5b)
    // ]);
    chart.get('colors')?.set('colors', [
      am5.color(0x3db1f5),
      am5.color(0xdd493c),
      am5.color(0xfcc436),
      am5.color(0x12ba69),
      am5.color(0x4d71cb)
    ]);

    // Create axes and their renderers
    const xRenderer = am5radar.AxisRendererCircular.new(root, {
      //minGridDistance: 50
    });

    xRenderer.labels.template.setAll({
      radius: 10
    });

    xRenderer.grid.template.setAll({
      forceHidden: true
    });

    const yRenderer = am5radar.AxisRendererRadial.new(root, {
      minGridDistance: 20
    });
    
    yRenderer.labels.template.setAll({
      centerX: am5.p100,
      fontWeight: '500',
      fontSize: 18,
      templateField: 'columnSettings'
    });
    
    yRenderer.grid.template.setAll({
      forceHidden: true
    });

    // Create X-Axis
    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      renderer: xRenderer,
      min: 0,
      max: 100,
      strictMinMax: true,
      numberFormat: "#'%'",
      tooltip: am5.Tooltip.new(root, {})
    }));

    // Create Y-axis
    const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: 'category',
      renderer: yRenderer
    }));
    
    yAxis.data.setAll(data);

    // Create series
    const series1 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      clustered: false,
      valueXField: 'full',
      categoryYField: 'category',
      fill: root.interfaceColors.get('alternativeBackground')
    }));
    
    series1.columns.template.setAll({
      width: am5.p100,
      fillOpacity: 0.08,
      strokeOpacity: 0,
      cornerRadius: 20
    });
    
    series1.data.setAll(data);

    const series2 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      clustered: false,
      valueXField: 'value',
      categoryYField: 'category'
    }));
    
    series2.columns.template.setAll({
      width: am5.p100,
      // fill: am5.color(0xdd493c),
      strokeOpacity: 0,
      tooltipText: '{category}: {valueX}%',
      cornerRadius: 20,
      templateField: 'columnSettings'
    });
    
    let index = 0;
    series2.data.setAll(data.map(item => {
      const newData: DataGaugeChartProps = {
        ...item,
        columnSettings: {
          fill: chart.get('colors')?.getIndex(index)
        }
      };
      index++;
      if (index > 5) index = 0;
      return newData;
    }));

    // Add cursor
    const cursor = chart.set('cursor', am5radar.RadarCursor.new(root, {
      behavior: 'zoomX'
    }));
    cursor.lineY.set('visible', false);

    // Make stuff animate on load
    series1.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [
    data,
    isDarkMode,
    id
  ]);

  return (
    <Box component="section" className="p-5 w-full">
      <Typography variant="h5" textAlign="center" className="break-all">{title}</Typography>
      <Box
        id={id}
        component="div"
        style={{
          width: size?.width,
          height: size?.height
        }}
      />
    </Box>
  );
};

export default GaugeChart;
