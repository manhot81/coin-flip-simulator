// Initialize chart variable
let statisticsChart = null;

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
    
    // Clear previous results
    flipsContainer.innerHTML = '';
    
    // Display each flip result
    flips.forEach((flip, index) => {
        const flipDiv = document.createElement('div');
        flipDiv.className = 'flip-result';
        
        let flipHtml = `<h3>Flip ${index + 1}</h3>`;
        flip.forEach((coin) => {
            const coinClass = coin === 'H' ? 'heads' : 'tails';
            const coinLabel = coin === 'H' ? 'Heads' : 'Tails';
            flipHtml += `<span class="coin ${coinClass}">${coin}</span>`;
        });
        
        flipDiv.innerHTML = flipHtml;
        flipsContainer.appendChild(flipDiv);
    });
    
    resultsSection.style.display = 'block';
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

// Main function to handle button click
function handleFlipButton() {
    const flips = runSimulation();
    const counts = countResults(flips);
    
    displayResults(flips);
    displayChart(counts);
}

// Attach event listener to the button
document.getElementById('flipBtn').addEventListener('click', handleFlipButton);
