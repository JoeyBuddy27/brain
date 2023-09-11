import React from 'react';
import * as brain from 'brain.js';

const Book = () => {
    const trainingData = [
        'Jane saw Doug.',
        'Doug saw Jane.',
        'Spot saw Doug and Jane looking at each other.',
        'It was love at first sight, and Spot had a frontrow seat. It was a very special moment for all.',
    ];

    const net = new brain.recurrent.LSTM();

    const setTrainingData = async () => {
        net.train(trainingData, {
            iterations: 1500,
            error: 0.011,
            log: stats => console.log(stats),
        });
    };

    setTrainingData();

    return <div></div>;
};

export default Book;
