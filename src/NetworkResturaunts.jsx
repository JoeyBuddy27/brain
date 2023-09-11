import React, { useEffect, useState } from 'react';
import { NeuralNetwork } from 'brain.js';
import * as brain from 'brain.js';

export const net = new brain.NeuralNetwork({
    hiddenLayers: [3],
});

const NeuralResturaunts = () => {
    // const neuralNetwork = new brain.NeuralNetwork({
    //     hiddenLayers: [3],
    // });

    const [result, setResult] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

    const resturaunts = {
        'Brilliant Yellow Corral': 'Monday',
        Pennys: 'Tuesday',
        'Right Coast Wings': 'Wednesday',
        'The Delusion Last Railway Car': 'Thursday',
        'Fun Day Inn': 'Friday',
        JHOP: 'Saturday',
        Owls: 'Sunday',
    };

    // Input - day of the week
    // Output - resturaunt name

    const trainingData = [];

    // Map through each property of the resturaunts object (day of the week) and assign the relevant resturaunt name
    const setTrainingData = async () => {
        // setLoading(true);

        for (let restaurantName in resturaunts) {
            const dayOfWeek = resturaunts[restaurantName];

            // Generate all possible substrings starting from the first 3 characters
            for (let i = 0; i < dayOfWeek.length - 2; i++) {
                const substring = dayOfWeek.slice(0, i + 3); // Use .slice() and normalize to lowercase

                // Add the substring as input
                trainingData.push({
                    input: { [substring]: 1 },
                    output: { [restaurantName]: 1 },
                });
            }
        }
        console.log(trainingData);
        net.train(trainingData);
    };

    // const [loading, setLoading] = useState(true);

    setTrainingData();

    const handleInputChange = event => {
        setSearchTerm(event.target.value);
    };

    const returnResturaunt = dayOfWeek => {
        const result = net.run({ [dayOfWeek]: 1 });
        let highestValue = 0;
        let highestResturaunt = '';

        console.log(result);

        for (let resturauntName in result) {
            if (result[resturauntName] > highestValue) {
                highestValue = result[resturauntName];
                highestResturaunt = resturauntName;
            }
        }
        setResult(highestResturaunt);
        return highestResturaunt;
    };

    return (
        <div>
            {/* Your React component content */}
            Search for day of the week: <br />
            <br />
            <input
                type='text'
                value={searchTerm}
                onChange={handleInputChange}
                onSubmit={val => returnResturaunt(val)}
            />
            <button onClick={() => returnResturaunt(searchTerm)}>Submit</button>
            {/* <h1>Your day: {JSON.stringify(searchTerm)}</h1> */}
            <p> You'll be eating at: </p>
            <h2>{JSON.stringify(result)}</h2>
        </div>
    );
};

export default NeuralResturaunts;
