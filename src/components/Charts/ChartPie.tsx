import React from 'react';
import { Box, Typography } from '@mui/material';
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Dark from '@amcharts/amcharts5/themes/Dark';
import { useUI } from '@wms/hooks';
import { 
  type DataChartPieProps, 
  type SizeProps
} from './functions-charts';


interface Props<T> {
  id: string,
  title?: string,
  data: Array<DataChartPieProps>,
  size?: SizeProps,
  isLegend?: boolean
}

const ChartPie = <T,>(props: Props<T>) => {
  const {
    id,
    data,
    title,
    size = { width: '100%', height: '200px' },
    isLegend = true
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
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        // endAngle: 270,
        layout: root.verticalLayout
      })
    );


    // Create series
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: 'serie',
        categoryField: 'category',
        valueField: 'value',
        endAngle: 270
      })
    );

    series.states.create('hidden', {
      endAngle: -90
    });

    // Colors
    // series.get('colors')?.set('colors', [
    //   am5.color(0x0557fa),
    //   am5.color(0x1e7efa),
    //   am5.color(0xa5cff3),
    //   am5.color(0xf4c63e),
    //   am5.color(0xf35b5b)
    // ]);
    series.get('colors')?.set('colors', [
      am5.color(0x3db1f5),
      am5.color(0xdd493c),
      am5.color(0xfcc436),
      am5.color(0x12ba69),
      am5.color(0x4d71cb)
    ]);

    // Set data
    series.data.setAll(data);

    series.appear(1000, 100);

    // Set Labels Graphic
    // series.labels.template.set('forceHidden', true);
    // series.ticks.template.set('forceHidden', true);

    // Add legend
    if (isLegend) {
      const legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        // y: am5.percent(90),
        layout: root.gridLayout
        // layout: am5.GridLayout.new(root, {
        //   maxColumns: 3,
        //   fixedWidthGrid: false
        // })
      }));

      legend.data.setAll(series.dataItems);

      legend.markerRectangles.template.setAll({
        cornerRadiusTL: 10,
        cornerRadiusTR: 10,
        cornerRadiusBL: 10,
        cornerRadiusBR: 10
      });
    }

    // Make stuff animate on load
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data, isDarkMode, id, isLegend]);

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

export default ChartPie;