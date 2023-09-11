import React, { useEffect, useState } from 'react';
import { NeuralNetwork } from 'brain.js';
import * as brain from 'brain.js';

export const net = new brain.NeuralNetwork({
    hiddenLayers: [3],
});

const NeuralNetworkComponent = () => {
    // const neuralNetwork = new brain.NeuralNetwork({
    //     hiddenLayers: [3],
    // });

    console.log(net);

    const [result, setResult] = useState(null);

    useEffect(() => {
        const net = new brain.NeuralNetwork({ hiddenLayers: [3] });
        const trainingData = [
            { input: [0, 0], output: [0] },
            { input: [0, 1], output: [1] },
            { input: [1, 0], output: [1] },
            { input: [1, 1], output: [0] },
        ];

        const trainingDataCoursesVenues = [
            {
                input: ['Brabazon'],
                output: ['Golf courses'],
            },
            {
                input: ['PGA national'],
                output: ['Golf courses'],
            },
            {
                input: ['The Belfry'],
                output: ['Venues'],
            },
            {
                input: ['Adare Manor'],
                output: ['Venues'],
            },
        ];

        // input ref, green blue
        // output light, nuetral, dark

        const colors = [
            { green: 0.2, blue: 0.4 },
            { green: 0.4, blue: 0.6 },
            { red: 0.2, green: 0.6, blue: 0.8 },
            { green: 1, blue: 1 },
            { red: 0.8, green: 1, blue: 1 },
            { red: 1, green: 1, blue: 1 },
            { green: 1, blue: 0.8 },
            { red: 1, green: 0.8, blue: 0.6 },
        ];

        const brightnesses = [
            { dark: 0.8 },
            { neutral: 0.8 },
            { light: 0.7 },
            { light: 0.8 },
            { light: 0.9 },
            { light: 1 },
            { light: 0.8 },
            { neutral: 0.7 },
        ];

        const colorsTrainingData = [];

        for (let i = 0; i < colors.length; i++) {
            colorsTrainingData.push({
                input: colors[i],
                output: brightnesses[i],
            });
        }

        const colorNet = new brain.NeuralNetwork({ hiddenLayers: [3] });

        colorNet.train(colorsTrainingData);

        const ColorPrediction = colorNet.run({
            red: 0.9,
            green: 0.4,
            blue: 0,
        });

        console.log('color', ColorPrediction);

        net.train(trainingDataCoursesVenues);

        // Update the state with the result
        const prediction = net.run(['Brabazon']);
        setResult(prediction);

        // Log the result inside the useEffect
        console.log(prediction);
    }, []); // Empty dependency array ensures useEffect runs only once

    return (
        <div>
            {/* Your React component content */}
            biscuit result {result?.toString()}
        </div>
    );
};

export default NeuralNetworkComponent;
