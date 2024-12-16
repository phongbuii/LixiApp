import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const data = {
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  datasets: [
    {
      data: [120, 100, 150, 130, 160, 150, 180, 170, 210, 180, 200, 220],
      color: (opacity = 1) => `blue`, // red line
    },
    {
      data: [100, 90, 120, 100, 130, 120, 150, 140, 180, 150, 170, 180],
      color: (opacity = 1) => `red`, // blue line
    },
    {
      data: [150, 130, 180, 160, 200, 180, 220, 210, 260, 220, 240, 260],
      color: (opacity = 1) => `black`, // orange line
    },
  ],
  //   legend: ['Thing 1', 'Thing 2', 'Thing 3'],
};

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  strokeWidth: 2,
};

const LineChartComponent = () => {
  return (
    <View style={styles.container}>
      <LineChart
        withShadow={false}
        withScrollableDot={false}
        withOuterLines={false}
        withInnerLines={false}
        withHorizontalLines={false}
        withHorizontalLabels={false}
        withDots={false}
        withVerticalLabels={false}
        data={data}
        width={380}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          //   borderRadius: 16,
          backgroundColor: '#fff',
          marginLeft: -50,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LineChartComponent;
