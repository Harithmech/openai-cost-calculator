import React, { useState } from 'react';

import { pricing, categories } from './pricing';

const calculateCost = (model, numTokens, selectedCategory, type) => {

    if (!(selectedCategory in pricing) || !(model in pricing[selectedCategory])) {
        throw new Error("Model not recognized.");
    }

    if (typeof numTokens !== 'number' || numTokens < 0) {
        throw new Error("Number of tokens must be a positive number.");
    }

    let cost = 0;

    if (selectedCategory === 'assistant_api') {
        if (model === 'code_interpreter') {
            cost = pricing[selectedCategory][model].cost_per_session * numTokens;
        } else if (model === 'file_search') {
            cost = pricing[selectedCategory][model].cost_per_gb_per_day * numTokens;
        }
    } else if (selectedCategory === 'fine_tuning_models') {
        const costPer1Ktokens = pricing[selectedCategory][model][type];
        cost = (numTokens / 1000) * costPer1Ktokens;
    } else if (selectedCategory === 'embedding_models') {
        cost = (numTokens / 1000) * pricing[selectedCategory][model].usage;
    } else if (selectedCategory === 'image_models') {
        cost = pricing[selectedCategory][model].price * numTokens;
    } else if (selectedCategory === 'audio_models') {
        if (model === 'Speech-to-Text(Whisper)') {
            cost = pricing[selectedCategory][model].price * numTokens;
        } else {
            cost = Math.round(numTokens/1000) * pricing[selectedCategory][model].price;
        }
    } else if (selectedCategory === 'language_models'){
        console.log(selectedCategory, model, type);
        const costPer1Ktokens = pricing[selectedCategory][model][type];
        cost = (numTokens / 1000) * costPer1Ktokens;
    }
    return cost;
};


function CostCalculator() {

    const [selectedCategory, setSelectedCategory] = useState('language_models');

    const [model, setModel] = useState('');

    const [numTokens, setNumTokens] = useState('');

    const [type, setType] = useState('input');

    const [cost, setCost] = useState(null);

    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            const tokens = parseFloat(numTokens);
            const computedCost = calculateCost(model, tokens, selectedCategory, type);
            setCost(computedCost);
            setError('');
        } catch (err) {
            setError(err.message);
            setCost(null);
        }
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setModel('');
        setCost(null);
        setError('');
    };

    const handleModelChange = (e) => {
        setModel(e.target.value);
        setCost(null);
        setError('');
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">OpenAI Api Cost Calculator</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category:</label>
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                        {Object.entries(categories).map(([key, value]) => (
                            <option key={key} value={key}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Model:</label>
                    <select
                        value={model}
                        onChange={handleModelChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="" disabled>Select a model</option>
                        {Object.entries(pricing[selectedCategory]).map(([key, value]) => (
                            <option key={key} value={key}>
                                {key.replace(/_/g, '-')}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedCategory !== 'assistant_api' && selectedCategory !== 'image_models' && selectedCategory !== 'audio_models' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type:</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="input_usage">Input</option>
                            <option value="output_usage">Output</option> 
                            {selectedCategory === 'fine_tuning_models' && <option value="training">Training</option>}                           
                        </select>
                    </div>
                )}
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">{selectedCategory === 'audio_models' && model === 'Speech to Text(Whisper)'? "Enter Minutes": 
                    selectedCategory === 'audio_models' ? 'Number of Characters':
                    selectedCategory === 'image_models'? "Enter No of images" :
                    selectedCategory === 'assistant_api' && model === 'code_interpreter' ? "Enter No of Sesssions":
                    selectedCategory === 'assistant_api' ? 'GB per day' : 
                    'Number of Tokens:'}</label>
                    <input
                        type="number"
                        value={numTokens}
                        onChange={(e) => setNumTokens(e.target.value)}
                        step="1"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Calculate Cost</button>
            </form>
            {error && <p className="mt-4 text-red-600">{error}</p>}
            {cost !== null && (
                <p className="mt-4 text-green-600">
                    {selectedCategory === 'assistant_api' && model === 'file_search' ?
                    `The cost for ${numTokens} GB per day using ${model.replace(/_/g, '-')} is $${cost.toFixed(2)}` :
                    selectedCategory === 'audio_models' ?
                    `The cost for ${numTokens} minutes using ${model.replace(/_/g, '-')} is $${cost.toFixed(2)}` :
                    `The cost for ${numTokens} ${type} tokens using ${model.replace(/_/g, '-')} is $${cost.toFixed(2)}`}
                </p>
            )}

            {model && pricing[selectedCategory][model].description && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Description:</h2>
                    <p>{pricing[selectedCategory][model].description}</p>
                </div>
            )}
        </div>
    );
}

export default CostCalculator;