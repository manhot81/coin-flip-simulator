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

// I Ching data embedded directly
const ichingData = {
    "trigrams": [
        {"id": 0, "name": "坤", "pinyin": "Kun", "binary": "000"},
        {"id": 1, "name": "震", "pinyin": "Zhen", "binary": "001"},
        {"id": 2, "name": "坎", "pinyin": "Kan", "binary": "010"},
        {"id": 3, "name": "兌", "pinyin": "Dui", "binary": "011"},
        {"id": 4, "name": "艮", "pinyin": "Gen", "binary": "100"},
        {"id": 5, "name": "離", "pinyin": "Li", "binary": "101"},
        {"id": 6, "name": "巽", "pinyin": "Xun", "binary": "110"},
        {"id": 7, "name": "乾", "pinyin": "Qian", "binary": "111"}
    ],
    "hexagrams": [
        {"id": 1, "name": "乾", "pinyin": "Qian", "symbol": "乾上乾下", "trigram_upper": 7, "trigram_lower": 7, "ci": "元亨利貞。"},
        {"id": 2, "name": "坤", "pinyin": "Kun", "symbol": "坤上坤下", "trigram_upper": 0, "trigram_lower": 0, "ci": "元亨。利牝馬之貞。君子有攸往，先迷後得主，利。西南得朋，東北喪朋。安貞吉。"},
        {"id": 3, "name": "屯", "pinyin": "Zhun", "symbol": "坎上震下", "trigram_upper": 2, "trigram_lower": 1, "ci": "元亨利貞。勿用有攸往，利建侯。"},
        {"id": 4, "name": "蒙", "pinyin": "Meng", "symbol": "艮上坎下", "trigram_upper": 4, "trigram_lower": 2, "ci": "亨。匪我求童蒙，童蒙求我。初筮告，再三瀆，瀆不告。利貞。"},
        {"id": 5, "name": "需", "pinyin": "Xu", "symbol": "坎上乾下", "trigram_upper": 2, "trigram_lower": 7, "ci": "有孚，光亨，貞吉。利涉大川。"},
        {"id": 6, "name": "訟", "pinyin": "Song", "symbol": "乾上坎下", "trigram_upper": 7, "trigram_lower": 2, "ci": "有孚窒。惕中吉。終凶。利見大人，不利涉大川。"},
        {"id": 7, "name": "師", "pinyin": "Shi", "symbol": "坎上坤下", "trigram_upper": 2, "trigram_lower": 0, "ci": "貞，丈人吉，无咎。"},
        {"id": 8, "name": "比", "pinyin": "Bi", "symbol": "坤上坎下", "trigram_upper": 0, "trigram_lower": 2, "ci": "吉。原筮元永貞，无咎。不寧方來，後夫凶。"},
        {"id": 9, "name": "小畜", "pinyin": "Xiao Chu", "symbol": "巽上乾下", "trigram_upper": 6, "trigram_lower": 7, "ci": "亨。密雲不雨，自我西郊。"},
        {"id": 10, "name": "履", "pinyin": "Lü", "symbol": "乾上兌下", "trigram_upper": 7, "trigram_lower": 3, "ci": "履虎尾，不咥人，亨。"},
        {"id": 11, "name": "泰", "pinyin": "Tai", "symbol": "坤上乾下", "trigram_upper": 0, "trigram_lower": 7, "ci": "小往大來，吉亨。"},
        {"id": 12, "name": "否", "pinyin": "Pi", "symbol": "乾上坤下", "trigram_upper": 7, "trigram_lower": 0, "ci": "天地不交，否。君子以儉德辟難，不可榮以祿。"},
        {"id": 13, "name": "同人", "pinyin": "Tong Ren", "symbol": "乾上離下", "trigram_upper": 7, "trigram_lower": 5, "ci": "同人于野，亨。利涉大川，利君子貞。"},
        {"id": 14, "name": "大有", "pinyin": "Da You", "symbol": "離上乾下", "trigram_upper": 5, "trigram_lower": 7, "ci": "元亨。"},
        {"id": 15, "name": "謙", "pinyin": "Qian", "symbol": "坤上艮下", "trigram_upper": 0, "trigram_lower": 4, "ci": "亨，君子有終。"},
        {"id": 16, "name": "豫", "pinyin": "Yu", "symbol": "震上坤下", "trigram_upper": 1, "trigram_lower": 0, "ci": "利建侯行師。"},
        {"id": 17, "name": "隨", "pinyin": "Sui", "symbol": "兌上震下", "trigram_upper": 3, "trigram_lower": 1, "ci": "元亨利貞，无咎。"},
        {"id": 18, "name": "蠱", "pinyin": "Gu", "symbol": "巽上艮下", "trigram_upper": 6, "trigram_lower": 4, "ci": "元亨，利涉大川。先甲三日，後甲三日。"},
        {"id": 19, "name": "臨", "pinyin": "Lin", "symbol": "坤上兌下", "trigram_upper": 0, "trigram_lower": 3, "ci": "元亨利貞。至於八月有凶。"},
        {"id": 20, "name": "觀", "pinyin": "Guan", "symbol": "巽上坤下", "trigram_upper": 6, "trigram_lower": 0, "ci": "盥而不薦，有孚顒若。"},
        {"id": 21, "name": "噬嗑", "pinyin": "Shi He", "symbol": "離上震下", "trigram_upper": 5, "trigram_lower": 1, "ci": "亨。利用獄。"},
        {"id": 22, "name": "賁", "pinyin": "Bi", "symbol": "艮上離下", "trigram_upper": 4, "trigram_lower": 5, "ci": "亨。小利有攸往。"},
        {"id": 23, "name": "剝", "pinyin": "Bo", "symbol": "艮上坤下", "trigram_upper": 4, "trigram_lower": 0, "ci": "利西南，不利有攸往。"},
        {"id": 24, "name": "復", "pinyin": "Fu", "symbol": "坤上震下", "trigram_upper": 0, "trigram_lower": 1, "ci": "亨。出入无疾，朋來无咎。反復其道，七日來復，利有攸往。"},
        {"id": 25, "name": "无妄", "pinyin": "Wu Wang", "symbol": "乾上震下", "trigram_upper": 7, "trigram_lower": 1, "ci": "元亨利貞。其匪正有眚，不利有攸往。"},
        {"id": 26, "name": "大畜", "pinyin": "Da Chu", "symbol": "艮上乾下", "trigram_upper": 4, "trigram_lower": 7, "ci": "利貞。不家食吉，利涉大川。"},
        {"id": 27, "name": "頤", "pinyin": "Yi", "symbol": "震上艮下", "trigram_upper": 1, "trigram_lower": 4, "ci": "貞吉。觀頤，自求口實。"},
        {"id": 28, "name": "大過", "pinyin": "Da Guo", "symbol": "兌上巽下", "trigram_upper": 3, "trigram_lower": 6, "ci": "棟橈，利有攸往，亨。"},
        {"id": 29, "name": "坎", "pinyin": "Kan", "symbol": "坎上坎下", "trigram_upper": 2, "trigram_lower": 2, "ci": "習坎。有孚，維心亨，行有尚。"},
        {"id": 30, "name": "離", "pinyin": "Li", "symbol": "離上離下", "trigram_upper": 5, "trigram_lower": 5, "ci": "利貞，亨。畜牝牛吉。"},
        {"id": 31, "name": "咸", "pinyin": "Xian", "symbol": "兌上艮下", "trigram_upper": 3, "trigram_lower": 4, "ci": "亨，利貞，取女吉。"},
        {"id": 32, "name": "恆", "pinyin": "Heng", "symbol": "巽上震下", "trigram_upper": 6, "trigram_lower": 1, "ci": "亨，无咎，利貞，利有攸往。"},
        {"id": 33, "name": "遯", "pinyin": "Dun", "symbol": "乾上艮下", "trigram_upper": 7, "trigram_lower": 4, "ci": "亨。小利貞。"},
        {"id": 34, "name": "大壯", "pinyin": "Da Zhuang", "symbol": "震上乾下", "trigram_upper": 1, "trigram_lower": 7, "ci": "利貞。"},
        {"id": 35, "name": "晉", "pinyin": "Jin", "symbol": "離上坤下", "trigram_upper": 5, "trigram_lower": 0, "ci": "康侯用錫馬蕃庶，晝日三接。"},
        {"id": 36, "name": "明夷", "pinyin": "Ming Yi", "symbol": "坤上離下", "trigram_upper": 0, "trigram_lower": 5, "ci": "利艱貞。"},
        {"id": 37, "name": "家人", "pinyin": "Jia Ren", "symbol": "巽上離下", "trigram_upper": 6, "trigram_lower": 5, "ci": "利女貞。"},
        {"id": 38, "name": "睽", "pinyin": "Kui", "symbol": "離上兌下", "trigram_upper": 5, "trigram_lower": 3, "ci": "小事吉。"},
        {"id": 39, "name": "蹇", "pinyin": "Jian", "symbol": "坎上艮下", "trigram_upper": 2, "trigram_lower": 4, "ci": "利西南，不利東北。利見大人，貞吉。"},
        {"id": 40, "name": "解", "pinyin": "Xie", "symbol": "震上坎下", "trigram_upper": 1, "trigram_lower": 2, "ci": "利西南，无所往，其來復吉。有攸往，夙吉。"},
        {"id": 41, "name": "損", "pinyin": "Sun", "symbol": "兌上艮下", "trigram_upper": 3, "trigram_lower": 4, "ci": "有孚，元吉，无咎，可貞，利有攸往。曷之用，二簋可用享。"},
        {"id": 42, "name": "益", "pinyin": "Yi", "symbol": "巽上震下", "trigram_upper": 6, "trigram_lower": 1, "ci": "利有攸往，利涉大川。"},
        {"id": 43, "name": "夬", "pinyin": "Guai", "symbol": "乾上兌下", "trigram_upper": 7, "trigram_lower": 3, "ci": "揚于王庭，孚號有厲，告自邑，不利即戎，利有攸往。"},
        {"id": 44, "name": "姤", "pinyin": "Gou", "symbol": "巽上乾下", "trigram_upper": 6, "trigram_lower": 7, "ci": "女壯，勿用取女。"},
        {"id": 45, "name": "萃", "pinyin": "Cui", "symbol": "兌上坤下", "trigram_upper": 3, "trigram_lower": 0, "ci": "亨。王假有廟，利見大人，亨，利貞。用大牲吉，利有攸往。"},
        {"id": 46, "name": "升", "pinyin": "Sheng", "symbol": "坤上巽下", "trigram_upper": 0, "trigram_lower": 6, "ci": "元亨，用見大人，勿恤，南征吉。"},
        {"id": 47, "name": "困", "pinyin": "Kun", "symbol": "兌上坎下", "trigram_upper": 3, "trigram_lower": 2, "ci": "亨，貞，大人吉，无咎。有言不信。"},
        {"id": 48, "name": "井", "pinyin": "Jing", "symbol": "坎上巽下", "trigram_upper": 2, "trigram_lower": 6, "ci": "改邑不改井，无喪无得，往來井井。汔至亦未繘井，羸其瓶，凶。"},
        {"id": 49, "name": "革", "pinyin": "Ge", "symbol": "兌上離下", "trigram_upper": 3, "trigram_lower": 5, "ci": "己日乃孚，元亨利貞，悔亡。"},
        {"id": 50, "name": "鼎", "pinyin": "Ding", "symbol": "離上巽下", "trigram_upper": 5, "trigram_lower": 6, "ci": "元吉，亨。"},
        {"id": 51, "name": "震", "pinyin": "Zhen", "symbol": "震上震下", "trigram_upper": 1, "trigram_lower": 1, "ci": "亨。震來虩虩，笑言啞啞。震驚百里，不喪匕鬯。"},
        {"id": 52, "name": "艮", "pinyin": "Gen", "symbol": "艮上艮下", "trigram_upper": 4, "trigram_lower": 4, "ci": "艮其背，不獲其身，行其庭，不見其人，无咎。"},
        {"id": 53, "name": "漸", "pinyin": "Jian", "symbol": "巽上艮下", "trigram_upper": 6, "trigram_lower": 4, "ci": "女歸吉，利貞。"},
        {"id": 54, "name": "歸妹", "pinyin": "Gui Mei", "symbol": "兌上震下", "trigram_upper": 3, "trigram_lower": 1, "ci": "征凶，无攸利。"},
        {"id": 55, "name": "豐", "pinyin": "Feng", "symbol": "離上震下", "trigram_upper": 5, "trigram_lower": 1, "ci": "亨，王假之，勿憂，宜日中。"},
        {"id": 56, "name": "旅", "pinyin": "Lü", "symbol": "艮上離下", "trigram_upper": 4, "trigram_lower": 5, "ci": "小亨，旅貞吉。"},
        {"id": 57, "name": "巽", "pinyin": "Xun", "symbol": "巽上巽下", "trigram_upper": 6, "trigram_lower": 6, "ci": "小亨，利有攸往，利見大人。"},
        {"id": 58, "name": "兌", "pinyin": "Dui", "symbol": "兌上兌下", "trigram_upper": 3, "trigram_lower": 3, "ci": "亨，利貞。"},
        {"id": 59, "name": "渙", "pinyin": "Huan", "symbol": "坎上巽下", "trigram_upper": 2, "trigram_lower": 6, "ci": "亨。王假有廟，利涉大川，利貞。"},
        {"id": 60, "name": "節", "pinyin": "Jie", "symbol": "兌上坎下", "trigram_upper": 3, "trigram_lower": 2, "ci": "亨。苦節不可貞。"},
        {"id": 61, "name": "中孚", "pinyin": "Zhong Fu", "symbol": "巽上兌下", "trigram_upper": 6, "trigram_lower": 3, "ci": "豚魚吉，利涉大川，利貞。"},
        {"id": 62, "name": "小過", "pinyin": "Xiao Guo", "symbol": "艮上震下", "trigram_upper": 4, "trigram_lower": 1, "ci": "亨，利貞，可小事，不可大事。飛鳥遺之音，不宜上，宜下，大吉。"},
        {"id": 63, "name": "既濟", "pinyin": "Ji Ji", "symbol": "離上坎下", "trigram_upper": 5, "trigram_lower": 2, "ci": "亨小，利貞，初吉終亂。"},
        {"id": 64, "name": "未濟", "pinyin": "Wei Ji", "symbol": "坎上離下", "trigram_upper": 2, "trigram_lower": 5, "ci": "亨，小狐汔濟，濡其尾，无攸利。"}
    ]
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

// Convert binary to symbol representation
function binaryToSymbol(binaryString) {
    // Convert each bit: 1 = '---', 0 = '- -'
    let symbols = [];
    for (let i = 0; i < binaryString.length; i++) {
        symbols.push(binaryString[i] === '1' ? '---' : '- -');
    }
    return symbols;
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

// Generate and display the hex dictionary lookup table
function generateHexTable(convertedResults = null, finalResults = null) {
    const tableElement = document.getElementById('hexTable');
    tableElement.innerHTML = ''; // Clear previous table
    
    // Calculate which cells to highlight based on results
    let convertedHexIds = [];
    let finalHexIds = [];
    
    if (convertedResults) {
        const convertedBinaryGroups = calculateBinaryGroups(convertedResults);
        convertedHexIds.push(lookupResultNumber(convertedBinaryGroups.upper, convertedBinaryGroups.lower));
    }
    
    if (finalResults) {
        const finalBinaryGroups = calculateBinaryGroups(finalResults);
        finalHexIds.push(lookupResultNumber(finalBinaryGroups.upper, finalBinaryGroups.lower));
    }
    
    // Create trigram index maps from embedded data
    const trigramByBinary = {};
    const trigramById = {};
    
    ichingData.trigrams.forEach(trigram => {
        trigramByBinary[trigram.binary] = trigram;
        trigramById[trigram.id] = trigram;
    });
    
    // Create hexagram index
    const hexagramById = {};
    ichingData.hexagrams.forEach(hex => {
        hexagramById[hex.id] = hex;
    });
    
    // Header sequence in binary for columns
    const colHeaders = ['111', '011', '101', '001', '110', '010', '100', '000'];
    
    // Create thead
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th></th>'; // Corner cell
    
    colHeaders.forEach(binary => {
        const th = document.createElement('th');
        const trigram = trigramByBinary[binary];
        
        // Display trigram name
        const nameDiv = document.createElement('div');
        nameDiv.textContent = trigram.name;
        th.appendChild(nameDiv);
        
        // Display binary as vertical symbols
        const symbols = binaryToSymbol(binary);
        const symbolDiv = document.createElement('div');
        symbolDiv.className = 'header-symbol';
        symbols.forEach((symbol, index) => {
            if (index > 0) {
                symbolDiv.appendChild(document.createElement('br'));
            }
            symbolDiv.appendChild(document.createTextNode(symbol));
        });
        th.appendChild(symbolDiv);
        
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    tableElement.appendChild(thead);
    
    // Create tbody
    const tbody = document.createElement('tbody');
    const rowHeaders = ['111', '011', '101', '001', '110', '010', '100', '000'];
    
    rowHeaders.forEach(rowBinary => {
        const row = document.createElement('tr');
        
        // Row header
        const rowHeaderCell = document.createElement('th');
        const rowTrigram = trigramByBinary[rowBinary];
        
        // Display trigram name
        const nameDiv = document.createElement('div');
        nameDiv.textContent = rowTrigram.name;
        rowHeaderCell.appendChild(nameDiv);
        
        // Display binary as vertical symbols
        const symbols = binaryToSymbol(rowBinary);
        const symbolDiv = document.createElement('div');
        symbolDiv.className = 'header-symbol';
        symbols.forEach((symbol, index) => {
            if (index > 0) {
                symbolDiv.appendChild(document.createElement('br'));
            }
            symbolDiv.appendChild(document.createTextNode(symbol));
        });
        rowHeaderCell.appendChild(symbolDiv);
        
        row.appendChild(rowHeaderCell);
        
        // Data cells
        colHeaders.forEach(colBinary => {
            const cell = document.createElement('td');
            const binaryValue = colBinary + rowBinary; // Column (Upper) + Row (Lower)
            const hexagramId = hexDict[binaryValue];
            const hexagram = hexagramById[hexagramId];
            
            cell.innerHTML = `
                <div class="hex-name">${hexagram.name}</div>
                <div class="hex-symbol">${hexagram.symbol}</div>
                <div class="hex-id">${hexagram.id}</div>
            `;
            
            // Highlight converted result cell
            if (convertedHexIds.includes(hexagramId)) {
                cell.classList.add('converted-result');
            }
            
            // Highlight final result cell
            if (finalHexIds.includes(hexagramId)) {
                cell.classList.add('final-result');
            }
            
            // Add click event to open modal
            cell.addEventListener('click', function() {
                openHexagramModal(hexagramId, hexagram.name);
            });
            
            row.appendChild(cell);
        });
        
        tbody.appendChild(row);
    });
    tableElement.appendChild(tbody);
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
    
    // Return the results for highlighting
    return { convertedResults, finalResults };
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
    
    const { convertedResults, finalResults } = displayResults(flips);
    displayChart(counts);
    generateHexTable(convertedResults, finalResults);
    
    // Show table section
    document.getElementById('tableSection').style.display = 'block';
}

// Open modal and display hexagram details
function openHexagramModal(hexagramId, hexagramName) {
    const hexagram = ichingData.hexagrams.find(h => h.id === hexagramId);
    if (!hexagram) return;
    
    document.getElementById('modalTitle').textContent = `${hexagram.name} (${hexagram.pinyin}) - #${hexagramId}`;
    document.getElementById('modalBody').textContent = hexagram.ci;
    document.getElementById('hexagramModal').style.display = 'flex';
}

// Close modal
function closeHexagramModal() {
    document.getElementById('hexagramModal').style.display = 'none';
}

// Attach event listeners
document.getElementById('flipBtn').addEventListener('click', handleFlipButton);

// Close modal when clicking the X button
document.querySelector('.modal-close').addEventListener('click', closeHexagramModal);

// Close modal when clicking outside the modal content
window.addEventListener('click', function(event) {
    const modal = document.getElementById('hexagramModal');
    if (event.target === modal) {
        closeHexagramModal();
    }
});
