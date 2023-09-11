import React from 'react';
import * as brain from 'brain.js';

const dummyStockData = [
    {
        open: 150.5,
        close: 152.3,
        high: 155.0,
        low: 149.8,
        stockName: 'Stock A',
    },
    {
        open: 320.2,
        close: 315.5,
        high: 325.0,
        low: 312.1,
        stockName: 'Stock B',
    },
    {
        open: 45.8,
        close: 47.2,
        high: 48.6,
        low: 45.5,
        stockName: 'Stock C',
    },
    {
        open: 75.2,
        close: 76.5,
        high: 78.0,
        low: 74.3,
        stockName: 'Stock D',
    },
    {
        open: 210.7,
        close: 208.9,
        high: 213.2,
        low: 207.4,
        stockName: 'Stock E',
    },
    {
        open: 62.1,
        close: 64.8,
        high: 66.2,
        low: 61.9,
        stockName: 'Stock F',
    },
    {
        open: 180.0,
        close: 179.2,
        high: 183.5,
        low: 177.8,
        stockName: 'Stock G',
    },
    {
        open: 93.5,
        close: 92.7,
        high: 96.2,
        low: 91.8,
        stockName: 'Stock H',
    },
    {
        open: 120.3,
        close: 122.1,
        high: 124.5,
        low: 119.7,
        stockName: 'Stock I',
    },
    {
        open: 290.8,
        close: 292.4,
        high: 296.7,
        low: 288.6,
        stockName: 'Stock J',
    },
    {
        open: 55.6,
        close: 57.2,
        high: 58.9,
        low: 55.2,
        stockName: 'Stock K',
    },
    {
        open: 420.1,
        close: 416.7,
        high: 424.0,
        low: 414.2,
        stockName: 'Stock L',
    },
    {
        open: 80.5,
        close: 82.3,
        high: 84.1,
        low: 80.1,
        stockName: 'Stock M',
    },
    {
        open: 135.9,
        close: 137.4,
        high: 139.2,
        low: 134.8,
        stockName: 'Stock N',
    },
    {
        open: 240.2,
        close: 238.7,
        high: 243.5,
        low: 237.1,
        stockName: 'Stock O',
    },
    {
        open: 37.6,
        close: 36.8,
        high: 38.2,
        low: 36.1,
        stockName: 'Stock P',
    },
    {
        open: 165.2,
        close: 167.9,
        high: 169.5,
        low: 163.8,
        stockName: 'Stock Q',
    },
    {
        open: 260.4,
        close: 258.7,
        high: 263.0,
        low: 256.9,
        stockName: 'Stock R',
    },
    {
        open: 50.7,
        close: 48.9,
        high: 51.5,
        low: 48.2,
        stockName: 'Stock S',
    },
    {
        open: 310.8,
        close: 313.5,
        high: 315.2,
        low: 309.7,
        stockName: 'Stock T',
    },
];

// const sliceArray = (arr, startingIndex) => {
//     const result = [];
//     result.push(arr.slice(startingIndex, startingIndex + 5));
//     return result;
// };

//

// Function to normalize (scale up) the stock data
// function normalizeStockDataUp(data, minRange, maxRange) {
//     const normalizedData = [];
//     const minValues = {};
//     const maxValues = {};

//     // Find minimum and maximum values for each property
//     for (const property of ['open', 'close', 'high', 'low']) {
//         minValues[property] = Math.min(...data.map(stock => stock[property]));
//         maxValues[property] = Math.max(...data.map(stock => stock[property]));
//     }

//     // Normalize the data
//     for (const stock of data) {
//         const normalizedStock = {
//             stockName: stock.stockName,
//         };

//         for (const property of ['open', 'close', 'high', 'low']) {
//             normalizedStock[property] =
//                 ((stock[property] - minValues[property]) /
//                     (maxValues[property] - minValues[property])) *
//                     (maxRange - minRange) +
//                 minRange;
//         }

//         normalizedData.push(normalizedStock);
//     }

//     return normalizedData;
// }

// // Function to denormalize (scale down) the stock data
// function denormalizeStockDataDown(data, minRange, maxRange) {
//     const denormalizedData = [];
//     const minValues = {};
//     const maxValues = {};

//     for (const stock of data) {
//         const denormalizedStock = {
//             stockName: stock.stockName,
//         };

//         for (const property of ['open', 'close', 'high', 'low']) {
//             denormalizedStock[property] =
//                 ((stock[property] - minRange) / (maxRange - minRange)) *
//                     (maxValues[property] - minValues[property]) +
//                 minValues[property];
//         }

//         denormalizedData.push(denormalizedStock);
//     }

//     return denormalizedData;
// }

function scaleUp(step) {
    return {
        // stockName: step.stockName,
        open: step.open * 45,
        close: step.close * 45,
        high: step.high * 45,
        low: step.low * 45,
    };
}

function scaleDown(step) {
    return {
        // stockName: step.stockName,
        open: step.open / 45,
        close: step.close / 45,
        high: step.high / 45,
        low: step.low / 45,
    };
}

const scaledData = dummyStockData.map(scaleDown);

// const normalizedData = denormalizeStockDataDown(dummyStockData, 0, 1);
const trainingData = [
    scaledData.slice(0, 5),
    scaledData.slice(5, 10),
    scaledData.slice(10, 15),
    scaledData.slice(15, 20),
];

const net = new brain.recurrent.LSTMTimeStep({
    inputSize: 4,
    hiddenLayers: [8, 8],
    outputSize: 4,
});

const trainData = () => {
    if (trainingData) {
        console.log('training data', trainingData);
        net.train(trainingData, {
            learningRate: 0.005,
            errorThreshold: 0.02,
            // log: stats => console.log(stats),
        });
    }
};

trainData();

// forecast - predict the next 3 values
console.log(net.forecast([trainingData[0][0], trainingData[0][1]], 3).map(scaleUp));

// learning Rate - how fast the network will learn
// default is 0.01

const StockPredictor = () => {
    // inputSize 4 - as we have 4 properties (open, close, high, low)

    return <div></div>;
};

export default StockPredictor;
