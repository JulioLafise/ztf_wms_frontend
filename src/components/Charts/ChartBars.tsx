import React from 'react';
import { Box, Typography } from '@mui/material';
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Dark from '@amcharts/amcharts5/themes/Dark';
import { useUI } from '@wms/hooks';
import {
  getSeriesBars,
  getDataSeriesBars,
  type DataChartBarProps,
  type SizeProps
} from './functions-charts';

interface Props<T> {
  id: string,
  title?: string,
  data: Array<DataChartBarProps<T>>,
  size?: SizeProps,
  variant?: 'columns' | 'lines',
  isLegend?: boolean,
  isPorcent?: boolean,
  isStacked?: boolean
}

const ChartBars = <T, >(props: Props<T>) => {
  const {
    id,
    data,
    variant = 'lines',
    size = { width: '100%', height: '300px' },
    title,
    isLegend = true,
    isPorcent = false,
    isStacked = false
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
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout
      })
    );

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

    // Create Y-axis
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: isPorcent ? 0 : undefined,
        max: isPorcent ? 100 : undefined,
        numberFormat: isPorcent ? "#'%'" : undefined,
        strictMinMax: isPorcent,
        calculateTotals: isPorcent,
        extraTooltipPrecision: 1,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create X-Axis
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          // minGridDistance: variant === 'lines' ? 20 : undefined
        }),
        categoryField: 'field'
      })
    );
    xAxis.data.setAll(getDataSeriesBars(data));

    // Create series
    getSeriesBars(data).map(serie => {
      const series = chart.series.push(
        variant === 'lines'
          ? (
            am5xy.LineSeries.new(root, {
              name: serie,
              stacked: isStacked,
              xAxis: xAxis,
              yAxis: yAxis,
              valueYField: serie,
              valueYShow: isPorcent ? 'valueYTotalPercent' : 'valueYWorking',
              categoryXField: 'field',
              tooltip: am5.Tooltip.new(root, {
                pointerOrientation: 'horizontal',
                labelText: '{name}: {valueY}'
              })
            })
          )
          : (
            am5xy.ColumnSeries.new(root, {
              name: serie,
              stacked: isStacked,
              xAxis: xAxis,
              yAxis: yAxis,
              valueYField: serie,
              valueYShow: isPorcent ? 'valueYTotalPercent' : 'valueYWorking',
              categoryXField: 'field',
            })
          )
      );

      if (series instanceof am5xy.ColumnSeries) {
        series.columns.template.setAll({
          tooltipText: `{name}, {categoryX}: ${isPorcent ? "{valueYTotalPercent.formatNumber('#.#')}%" : "{valueYWorking.formatNumber('#,###.#')}"}`,
          tooltipY: am5.percent(10),
        });

        series.bullets.push(function() {
          return am5.Bullet.new(root, {
            sprite: am5.Label.new(root, {
              text: isPorcent ? "{valueYTotalPercent.formatNumber('#.#')}%" : "{valueYWorking.formatNumber('#,###.#')}",
              fill: root.interfaceColors.get('alternativeText'),
              fontWeight: 'bold',
              centerY: am5.p50,
              centerX: am5.p50,
              populateText: true
            })
          });
        });
      }
      if (series instanceof am5xy.LineSeries) {
        series.fills.template.setAll({
          fillOpacity: 0.3,
          visible: true
        });

        series.bullets.push(function(roots) {
          return am5.Bullet.new(root, {
            sprite: am5.Circle.new(root, {
              radius: 10,
              fill: series.get('fill'),
            }),            
          });
        });
      }

      series.data.setAll(getDataSeriesBars(data));

      series.appear();
    });

    // Add legend
    if (isLegend) {
      const legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.gridLayout,
      }));
      legend.data.setAll(chart.series.values);
    }

    // Add cursor
    const cursor = chart.set('cursor', am5xy.XYCursor.new(root, {
      xAxis
    }));
    cursor.lineY.set('visible', false);

    // Add scrollbar
    chart.set('scrollbarX', am5.Scrollbar.new(root, {
      orientation: 'horizontal',
    }));

    // Make stuff animate on load
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [
    data,
    isDarkMode,
    id,
    variant,
    isLegend,
    isStacked,
    isPorcent
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

export default ChartBars;
