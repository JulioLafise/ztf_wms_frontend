import React from 'react';

export type SizeProps = {
  width?: React.CSSProperties['width'],
  height?: React.CSSProperties['height'],
}

export type DataChartBarProps<T> = {
  field: string,
  values: ValuesType<T | object>
}

type ValuesType<T> = { [key in keyof T]: number };

export type DataChartPieProps = {
  category: string,
  value: number
};

export type DataGaugeChartProps = {
  category: string,
  value: number,
  full: number,
  columnSettings?: {
    fill: any
  }
};

export const getSeriesBars = <T>(serieData: Array<DataChartBarProps<T>>) => {
  let newSerie: Array<string> = [];
  serieData.forEach((serie: DataChartBarProps<T>) => {
    newSerie = [
      ...newSerie,
      ...Object.keys(serie.values)
    ];
  });
  newSerie = [...new Set(newSerie)];
  return newSerie;
};

export const getDataSeriesBars = <T>(serieData: Array<DataChartBarProps<T>>) => {
  let data: object[] = [];
  serieData.forEach((serie: DataChartBarProps<T>) => {
    data = [
      ...data,
      {
        field: serie.field,
        ...serie.values
      }
    ];
  });
  return data;
};