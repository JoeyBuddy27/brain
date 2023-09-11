import React from 'react';
import * as brain from 'brain.js';

export const net = new brain.NeuralNetwork({
    hiddenLayers: [3],
});

const Counter = () => {
    const trainingData = [
        [1, 2, 3, 4, 5],
        [5, 4, 3, 2, 1],
    ];

    const net = new brain.recurrent.LSTMTimeStep();

    const setTrainingData = async () => {
        net.train(trainingData);
    };

    setTrainingData();

    console.log(net.run([1, 2, 3, 4]));
    console.log(net.run([5, 4, 3, 2]));

    return <div></div>;
};

export default Counter;
