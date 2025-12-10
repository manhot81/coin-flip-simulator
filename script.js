// Initialize chart variable
let statisticsChart = null;

// Hex dictionary for result lookup
const hexDict = {
    '000000': 2, '100000': 23, '010000': 8, '110000': 20, '001000': 45, '101000': 35,
    '011000': 41, '111000': 12, '000001': 24, '100001': 27, '010001': 3, '110001': 42,
    '001001': 51, '101001': 21, '011001': 17, '111001': 25, '000010': 7, '100010': 4,
    '010010': 29, '110010': 59, '001010': 40, '101010': 64, '011010': 47, '111010': 6,
    '000011': 19, '100011': 41, '010011': 60, '110011': 61, '001011': 54, '101011': 38,
    '011011': 58, '111011': 10, '000100': 15, '100100': 52, '010100': 39, '110100': 53,
    '001100': 62, '101100': 56, '011100': 31, '111100': 33, '000101': 36, '100101': 22,
    '010101': 63, '110101': 37, '001101': 55, '101101': 30, '011101': 49, '111101': 13,
    '000110': 46, '100110': 18, '010110': 48, '110110': 57, '001110': 32, '101110': 50,
    '011110': 28, '111110': 44, '000111': 11, '100111': 26, '010111': 5, '110111': 9,
    '001111': 34, '101111': 14, '011111': 43, '111111': 1
};

// Convert flip result to display string based on rules
function convertResult(flip) {
    const headsCount = flip.filter(coin => coin === 'H').length;
    const tailsCount = flip.filter(coin => coin === 'T').length;

    // Rule a: 2 tail 1 head -> ---
    if (tailsCount === 2 && headsCount === 1) {
        return '---';
    }
    // Rule b: 2 head 1 tail -> - -
    else if (headsCount === 2 && tailsCount === 1) {
        return '- -';
    }
    // Rule c: 3 head -> ---O
    else if (headsCount === 3) {
        return '---O';
    }
    // Rule d: 3 tail -> - -X
    else if (tailsCount === 3) {
        return '- -X';
    }
}

// Transform the converted result to final result based on rules
function transformResult(convertedResult) {
    // Rule 1: If the result is ---O, change it to - -
    if (convertedResult === '---O') {
        return '- -';
    }
    // Rule 2: If the result is - -X, change it to ---
    else if (convertedResult === '- -X') {
        return '---';
    }
    // Rule 3: Otherwise, keep the same
    else {
        return convertedResult;
    }
}

// Convert a single result to binary (0 or 1)
function resultToBinary(result) {
    // --- or ---O = 1
    if (result === '---' || result === '---O') {
        return '1';
    }
    // - - or - -X = 0
    else if (result === '- -' || result === '- -X') {
        return '0';
    }
    return '0'; // default
}

// Calculate binary conversion for upper and lower groups
function calculateBinaryGroups(finalResults) {
    // Upper 3 results (indices 5, 4, 3) - from flip 6, 5, 4
    const upperGroup = [finalResults[5], finalResults[4], finalResults[3]];
    // Lower 3 results (indices 2, 1, 0) - from flip 3, 2, 1
    const lowerGroup = [finalResults[2], finalResults[1], finalResults[0]];

    const upperBinary = upperGroup.map(result => resultToBinary(result)).join('');
    const lowerBinary = lowerGroup.map(result => resultToBinary(result)).join('');

    return { upper: upperBinary, lower: lowerBinary };
}

// Look up result number from hex dictionary using combined binary
function lookupResultNumber(upperBinary, lowerBinary) {
    const combinedBinary = upperBinary + lowerBinary;
    return hexDict[combinedBinary] || 'N/A';
}

// Flip a single coin (returns 'H' for Heads or 'T' for Tails)
function flipCoin() {
    return Math.random() < 0.5 ? 'H' : 'T';
}

// Flip 3 coins once
function flipThreeCoins() {
    return [flipCoin(), flipCoin(), flipCoin()];
}

// Perform the simulation: flip 3 coins 6 times
function runSimulation() {
    const flips = [];
    for (let i = 0; i < 6; i++) {
        flips.push(flipThreeCoins());
    }
    return flips;
}

// Count heads and tails across all flips
function countResults(flips) {
    let headsCount = 0;
    let tailsCount = 0;

    flips.forEach(flip => {
        flip.forEach(coin => {
            if (coin === 'H') {
                headsCount++;
            } else {
                tailsCount++;
            }
        });
    });

    return { heads: headsCount, tails: tailsCount };
}

// Display the results on the page
function displayResults(flips) {
    const resultsSection = document.getElementById('results');
    const flipsContainer = document.getElementById('flipsContainer');
    const convertedContainer = document.getElementById('convertedContainer');
    const finalContainer = document.getElementById('finalContainer');
    
    // Clear previous results
    flipsContainer.innerHTML = '';
    convertedContainer.innerHTML = '';
    finalContainer.innerHTML = '';
    
    const convertedResults = []; // Store converted results
    const finalResults = []; // Store final results
    
    // Display each flip result
    flips.forEach((flip, index) => {
        // Left column: Flip Results
        const flipDiv = document.createElement('div');
        flipDiv.className = 'flip-result';
        
        let flipHtml = `<h3>Flip ${index + 1}</h3>`;
        flip.forEach((coin) => {
            const coinClass = coin === 'H' ? 'heads' : 'tails';
            flipHtml += `<span class="coin ${coinClass}">${coin}</span>`;
        });
        
        flipDiv.innerHTML = flipHtml;
        flipsContainer.appendChild(flipDiv);

        // Middle column: Converted Results
        const convertedResult = convertResult(flip);
        convertedResults.push(convertedResult);
        const convertedDiv = document.createElement('div');
        convertedDiv.className = 'converted-result';
        convertedDiv.textContent = convertedResult;
        convertedContainer.appendChild(convertedDiv);

        // Right column: Final Results
        const finalResult = transformResult(convertedResult);
        finalResults.push(finalResult);
        const finalDiv = document.createElement('div');
        finalDiv.className = 'final-result';
        finalDiv.textContent = finalResult;
        finalContainer.appendChild(finalDiv);
    });
    
    resultsSection.style.display = 'block';
    
    // Display binary conversion summary for both columns
    displayBinarySummary(convertedResults, finalResults);
}

// Create or update the bar chart
function displayChart(counts) {
    const ctx = document.getElementById('statisticsChart').getContext('2d');
    
    if (statisticsChart) {
        statisticsChart.destroy();
    }
    
    statisticsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Heads', 'Tails'],
            datasets: [{
                label: 'Count',
                data: [counts.heads, counts.tails],
                backgroundColor: [
                    '#4CAF50',
                    '#FF9800'
                ],
                borderColor: [
                    '#45a049',
                    '#e68900'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Coin Flip Results (3 coins × 6 flips = 18 total coins)'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 18,
                    ticks: {
                        stepSize: 2
                    }
                }
            }
        }
    });
    
    document.getElementById('chartSection').style.display = 'block';
}

// Display binary conversion summary
function displayBinarySummary(convertedResults, finalResults) {
    const summarySection = document.getElementById('summarySection');
    const convertedUpperBinaryDiv = document.getElementById('convertedUpperBinary');
    const convertedLowerBinaryDiv = document.getElementById('convertedLowerBinary');
    const convertedCombinedDiv = document.getElementById('convertedCombined');
    const convertedResultNumberDiv = document.getElementById('convertedResultNumber');
    const finalUpperBinaryDiv = document.getElementById('finalUpperBinary');
    const finalLowerBinaryDiv = document.getElementById('finalLowerBinary');
    const finalCombinedDiv = document.getElementById('finalCombined');
    const finalResultNumberDiv = document.getElementById('finalResultNumber');
    
    const convertedBinaryGroups = calculateBinaryGroups(convertedResults);
    const finalBinaryGroups = calculateBinaryGroups(finalResults);
    
    // Display converted results
    convertedUpperBinaryDiv.textContent = convertedBinaryGroups.upper;
    convertedLowerBinaryDiv.textContent = convertedBinaryGroups.lower;
    const convertedCombined = convertedBinaryGroups.upper + convertedBinaryGroups.lower;
    convertedCombinedDiv.textContent = convertedCombined;
    convertedResultNumberDiv.textContent = lookupResultNumber(convertedBinaryGroups.upper, convertedBinaryGroups.lower);
    
    // Display final results
    finalUpperBinaryDiv.textContent = finalBinaryGroups.upper;
    finalLowerBinaryDiv.textContent = finalBinaryGroups.lower;
    const finalCombined = finalBinaryGroups.upper + finalBinaryGroups.lower;
    finalCombinedDiv.textContent = finalCombined;
    finalResultNumberDiv.textContent = lookupResultNumber(finalBinaryGroups.upper, finalBinaryGroups.lower);
    
    summarySection.style.display = 'block';
}

// Main function to handle button click
function handleFlipButton() {
    const flips = runSimulation();
    const counts = countResults(flips);
    
    displayResults(flips);
    displayChart(counts);
}

// Attach event listener to the button
document.getElementById('flipBtn').addEventListener('click', handleFlipButton);
