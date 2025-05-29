// --- Data ---
// Nakshatra data: name, associated starting syllables, and ruling planet (lord)
const nakshatras = [
    { name: "Ashwini", syllables: ["Chu", "Che", "Cho", "La"], lord: "Ketu" },
    { name: "Bharani", syllables: ["Li", "Lu", "Le", "Lo"], lord: "Venus" },
    { name: "Krittika", syllables: ["A", "Ee", "U", "Ea"], lord: "Sun" },
    { name: "Rohini", syllables: ["O", "Va", "Vi", "Vu"], lord: "Moon" },
    { name: "Mrigashira", syllables: ["Ve", "Vo", "Ka", "Ki"], lord: "Mars" },
    { name: "Ardra", syllables: ["Ku", "Gha", "Na", "Chha"], lord: "Rahu" },
    { name: "Punarvasu", syllables: ["Ke", "Ko", "Ha", "Hi"], lord: "Jupiter" },
    { name: "Pushya", syllables: ["Hu", "He", "Ho", "Da"], lord: "Saturn" },
    { name: "Ashlesha", syllables: ["Di", "Du", "De", "Do"], lord: "Mercury" },
    { name: "Magha", syllables: ["Ma", "Mi", "Mu", "Me"], lord: "Ketu" },
    { name: "Purva Phalguni", syllables: ["Mo", "Ta", "Ti", "Tu"], lord: "Venus" },
    { name: "Uttara Phalguni", syllables: ["Te", "To", "Pa", "Pi"], lord: "Sun" },
    { name: "Hasta", syllables: ["Pu", "Sha", "Na", "Tha"], lord: "Moon" },
    { name: "Chitra", syllables: ["Pe", "Po", "Ra", "Ri"], lord: "Mars" },
    { name: "Swati", syllables: ["Ru", "Re", "Ro", "Ta"], lord: "Rahu" },
    { name: "Vishakha", syllables: ["Ti", "Tu", "Te", "To"], lord: "Jupiter" },
    { name: "Anuradha", syllables: ["Na", "Ni", "Nu", "Ne"], lord: "Saturn" },
    { name: "Jyeshtha", syllables: ["No", "Ya", "Yi", "Yu"], lord: "Mercury" },
    { name: "Mula", syllables: ["Ye", "Yo", "Bha", "Bhi"], lord: "Ketu" },
    { name: "Purva Ashadha", syllables: ["Bhu", "Dha", "Pha", "Dha"], lord: "Venus" },
    { name: "Uttara Ashadha", syllables: ["Bhe", "Bho", "Ja", "Ji"], lord: "Sun" },
    { name: "Shravana", syllables: ["Khi", "Khu", "Khe", "Kho"], lord: "Moon" },
    { name: "Dhanishtha", syllables: ["Ga", "Gi", "Gu", "Ge"], lord: "Mars" },
    { name: "Shatabhisha", syllables: ["Go", "Sa", "Si", "Su"], lord: "Rahu" },
    { name: "Purva Bhadrapada", syllables: ["Se", "So", "Da", "Di"], lord: "Jupiter" },
    { name: "Uttara Bhadrapada", syllables: ["Du", "Tha", "Jha", "Na"], lord: "Saturn" },
    { name: "Revati", syllables: ["De", "Do", "Cha", "Chi"], lord: "Mercury" }
];

// Sample list of baby names with gender, meaning, and potential starting syllables
const babyNames = [
    // Boy names
    { name: "Aarav", gender: "boy", meaning: "Peaceful", firstSyllables: ["Aa", "A"] },
    { name: "Vihaan", gender: "boy", meaning: "Morning, Dawn", firstSyllables: ["Vi", "V"] },
    { name: "Reyansh", gender: "boy", meaning: "Ray of light", firstSyllables: ["Re", "R"] },
    { name: "Krishna", gender: "boy", meaning: "Dark, Black", firstSyllables: ["Kri", "Kr", "Ku"] },
    { name: "Rudra", gender: "boy", meaning: "Roarer, Howler (Shiva)", firstSyllables: ["Ru", "R"] },
    { name: "Laksh", gender: "boy", meaning: "Target, Aim", firstSyllables: ["La", "L"] },
    { name: "Dev", gender: "boy", meaning: "God", firstSyllables: ["De", "D"] },
    { name: "Prem", gender: "boy", meaning: "Love", firstSyllables: ["Pre", "Pe", "P"] },
    { name: "Mohan", gender: "boy", meaning: "Charming", firstSyllables: ["Mo", "M"] },
    { name: "Chetan", gender: "boy", meaning: "Consciousness", firstSyllables: ["Che", "Ch"] },
    { name: "Girish", gender: "boy", meaning: "Lord of Mountains (Shiva)", firstSyllables: ["Gi", "G"] },
    { name: "Harsh", gender: "boy", meaning: "Joy, Happiness", firstSyllables: ["Ha", "H"] },
    { name: "Jay", gender: "boy", meaning: "Victory", firstSyllables: ["Ja", "J"] },
    { name: "Kiran", gender: "boy", meaning: "Ray of light", firstSyllables: ["Ki", "K"] },
    { name: "Manish", gender: "boy", meaning: "Lord of the mind", firstSyllables: ["Ma", "M"] },
    { name: "Nikhil", gender: "boy", meaning: "Complete, Whole", firstSyllables: ["Ni", "N"] },
    { name: "Pavan", gender: "boy", meaning: "Wind, Breeze", firstSyllables: ["Pa", "P"] },
    { name: "Rahul", gender: "boy", meaning: "Efficient, Conqueror of all miseries", firstSyllables: ["Ra", "R"] },
    { name: "Sameer", gender: "boy", meaning: "Early morning fragrance, Breeze", firstSyllables: ["Sa", "S"] },
    { name: "Tarun", gender: "boy", meaning: "Young", firstSyllables: ["Ta", "T"] },
    { name: "Umesh", gender: "boy", meaning: "Lord of Uma (Shiva)", firstSyllables: ["U", "Um"] },
    { name: "Vivek", gender: "boy", meaning: "Wisdom, Discretion", firstSyllables: ["Vi", "V"] },
    { name: "Yash", gender: "boy", meaning: "Fame, Glory", firstSyllables: ["Ya", "Y"] },

    // Girl names
    { name: "Ananya", gender: "girl", meaning: "Unique", firstSyllables: ["A", "An"] },
    { name: "Diya", gender: "girl", meaning: "Lamp, Light", firstSyllables: ["Di", "D"] },
    { name: "Ishani", gender: "girl", meaning: "Consort of Lord Shiva (Parvati)", firstSyllables: ["I", "Is"] },
    { name: "Kavya", gender: "girl", meaning: "Poetry", firstSyllables: ["Ka", "K"] },
    { name: "Myra", gender: "girl", meaning: "Sweet, Admirable", firstSyllables: ["My", "M"] },
    { name: "Priya", gender: "girl", meaning: "Beloved", firstSyllables: ["Pri", "P"] },
    { name: "Riya", gender: "girl", meaning: "Singer", firstSyllables: ["Ri", "R"] },
    { name: "Saanvi", gender: "girl", meaning: "Goddess Lakshmi", firstSyllables: ["Saa", "Sa", "S"] },
    { name: "Tara", gender: "girl", meaning: "Star", firstSyllables: ["Ta", "T"] },
    { name: "Vanya", gender: "girl", meaning: "Gracious gift of God", firstSyllables: ["Va", "V"] },
    { name: "Charu", gender: "girl", meaning: "Beautiful, Attractive", firstSyllables: ["Cha", "Ch"] },
    { name: "Esha", gender: "girl", meaning: "Desire, Purity (Parvati)", firstSyllables: ["E", "Es"] },
    { name: "Gauri", gender: "girl", meaning: "Fair, White (Parvati)", firstSyllables: ["Gau", "Ga", "G"] },
    { name: "Hina", gender: "girl", meaning: "Myrtle, Henna", firstSyllables: ["Hi", "H"] },
    { name: "Jiya", gender: "girl", meaning: "Sweetheart, Life", firstSyllables: ["Ji", "J"] },
    { name: "Lata", gender: "girl", meaning: "Creeper, Vine", firstSyllables: ["La", "L"] },
    { name: "Meera", gender: "girl", meaning: "Devotee of Lord Krishna", firstSyllables: ["Mee", "Me", "M"] },
    { name: "Neha", gender: "girl", meaning: "Love, Rain", firstSyllables: ["Ne", "N"] },
    { name: "Oviya", gender: "girl", meaning: "Artist, Beautiful drawing", firstSyllables: ["O", "Ov"] },
    { name: "Pooja", gender: "girl", meaning: "Worship", firstSyllables: ["Poo", "Po", "P"] },
    { name: "Rani", gender: "girl", meaning: "Queen", firstSyllables: ["Ra", "R"] },
    { name: "Sita", gender: "girl", meaning: "Furrow (Goddess)", firstSyllables: ["Si", "S"] },
    { name: "Uma", gender: "girl", meaning: "Goddess Parvati", firstSyllables: ["U", "Um"] },
    { name: "Vidya", gender: "girl", meaning: "Knowledge, Wisdom", firstSyllables: ["Vi", "V"] },
    { name: "Yamini", gender: "girl", meaning: "Night", firstSyllables: ["Ya", "Y"] },

    // Unisex names
    { name: "Arya", gender: "unisex", meaning: "Noble, Honourable", firstSyllables: ["Ar", "A"] },
    { name: "Devan", gender: "unisex", meaning: "Like a God", firstSyllables: ["De", "D"] },
    { name: "Kiran", gender: "unisex", meaning: "Ray of light", firstSyllables: ["Ki", "K"] },
    { name: "Noor", gender: "unisex", meaning: "Light", firstSyllables: ["No", "N"] },
    { name: "Prem", gender: "unisex", meaning: "Love", firstSyllables: ["Pre", "Pe", "P"] },
    { name: "Rhythm", gender: "unisex", meaning: "Music, Flow", firstSyllables: ["Rhy", "R"] },
    { name: "Sky", gender: "unisex", meaning: "Sky", firstSyllables: ["Sk", "S"] },
    { name: "Sunny", gender: "unisex", meaning: "Sunny, Cheerful", firstSyllables: ["Su", "S"] },
    { name: "Jothi", gender: "unisex", meaning: "Light, Flame", firstSyllables: ["Jo", "J"] },
    { name: "Mani", gender: "unisex", meaning: "Gem, Jewel", firstSyllables: ["Ma", "M"] }
];

// --- DOM Elements ---
// Get references to various HTML elements to interact with them
const fatherNameEl = document.getElementById('fatherName');
const motherNameEl = document.getElementById('motherName');
const dobEl = document.getElementById('dob');
const tobEl = document.getElementById('tob'); // Time of birth, currently not used in core logic but collected
const pobEl = document.getElementById('pob'); // Place of birth, currently not used in core logic but collected
const genderEl = document.getElementById('gender');
const predictButton = document.getElementById('predictButton');

const combinedNamesSection = document.getElementById('combinedNamesSection');
const combinedNamesListEl = document.getElementById('combinedNamesList');

const nakshatraNamesSection = document.getElementById('nakshatraNamesSection');
const nakshatraInfoEl = document.getElementById('nakshatraInfo');
const nakshatraNamesListEl = document.getElementById('nakshatraNamesList');

// Modal elements for displaying messages to the user
const messageModal = document.getElementById('messageModal');
const modalTitleEl = document.getElementById('modalTitle');
const modalMessageEl = document.getElementById('modalMessage');
const modalCloseButton = document.getElementById('modalCloseButton');

// --- Utility Functions ---

/**
 * Displays a modal with a given title and message.
 * @param {string} title - The title for the modal.
 * @param {string} message - The message content for the modal.
 */
function showModal(title, message) {
    modalTitleEl.textContent = title;
    modalMessageEl.textContent = message;
    messageModal.style.display = "block"; // Make the modal visible
}

// Event listener for the modal close button
modalCloseButton.onclick = function() {
    messageModal.style.display = "none"; // Hide the modal
}

// Event listener to close the modal if the user clicks outside of its content area
window.onclick = function(event) {
    if (event.target == messageModal) {
        messageModal.style.display = "none"; // Hide the modal
    }
}

/**
 * Capitalizes the first letter of a string and converts the rest to lowercase.
 * @param {string} string - The input string.
 * @returns {string} The capitalized string, or an empty string if input is falsy.
 */
function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// --- Core Logic Functions ---

/**
 * Generates name suggestions by combining parts of the father's and mother's first names.
 * @param {string} fatherName - The father's full name.
 * @param {string} motherName - The mother's full name.
 * @returns {string[]} An array of unique name suggestions.
 */
function generateCombinedNames(fatherName, motherName) {
    const suggestions = new Set(); // Use a Set to ensure unique name suggestions
    if (!fatherName || !motherName) return []; // Return empty if names are not provided

    const fn = fatherName.split(' ')[0]; // Use only the first name of the father
    const mn = motherName.split(' ')[0]; // Use only the first name of the mother

    if (fn.length < 2 || mn.length < 2) return []; // Require at least 2 characters for combination

    // Various combination strategies:
    // 1. First half of father's name + second half of mother's name
    suggestions.add(capitalizeFirstLetter(fn.substring(0, Math.ceil(fn.length / 2)) + mn.substring(Math.floor(mn.length / 2))));
    // 2. First half of mother's name + second half of father's name
    suggestions.add(capitalizeFirstLetter(mn.substring(0, Math.ceil(mn.length / 2)) + fn.substring(Math.floor(fn.length / 2))));
    // 3. First 2 letters of father's name + rest of mother's name (if mother's name is long enough)
    if (mn.length > 2) suggestions.add(capitalizeFirstLetter(fn.substring(0, 2) + mn.substring(2)));
    // 4. First 2 letters of mother's name + rest of father's name (if father's name is long enough)
    if (fn.length > 2) suggestions.add(capitalizeFirstLetter(mn.substring(0, 2) + fn.substring(2)));
    // 5. Father's first letter + mother's full first name (lowercase)
    suggestions.add(capitalizeFirstLetter(fn.charAt(0) + mn.toLowerCase()));
    // 6. Mother's first letter + father's full first name (lowercase)
    suggestions.add(capitalizeFirstLetter(mn.charAt(0) + fn.toLowerCase()));
    // 7. First 3 letters of father's name + last 3 letters of mother's name (if names are long enough)
    if (fn.length >= 3 && mn.length >= 3) suggestions.add(capitalizeFirstLetter(fn.substring(0, 3) + mn.substring(mn.length - 3)));
    // 8. First 3 letters of mother's name + last 3 letters of father's name (if names are long enough)
    if (mn.length >= 3 && fn.length >= 3) suggestions.add(capitalizeFirstLetter(mn.substring(0, 3) + fn.substring(fn.length - 3)));

    // Filter out very short or very long generated names and convert Set to Array
    return Array.from(suggestions).filter(name => name.length > 2 && name.length < 15);
}

/**
 * Determines an illustrative Nakshatra based on the day of the month of birth.
 * IMPORTANT: This is a highly simplified and NOT astrologically accurate method.
 * @param {string} dobString - The date of birth string (e.g., "YYYY-MM-DD").
 * @returns {object} The Nakshatra object (name, syllables, lord). Returns a default if DOB is invalid.
 */
function getIllustrativeNakshatra(dobString) {
    if (!dobString) return nakshatras[0]; // Default to the first Nakshatra if no DOB is provided

    const date = new Date(dobString);
    if (isNaN(date.getDate())) return nakshatras[0]; // Handle invalid date string

    const dayOfMonth = date.getDate();
    // Simple cyclic mapping based on day of the month (1-31) to Nakshatra list (0-26)
    const nakshatraIndex = (dayOfMonth - 1) % nakshatras.length;
    return nakshatras[nakshatraIndex];
}

/**
 * Suggests baby names based on Nakshatra syllables and gender.
 * @param {object} nakshatra - The Nakshatra object (containing syllables).
 * @param {string} gender - The desired gender ("boy", "girl", "unisex").
 * @param {number} [count=8] - The maximum number of names to suggest.
 * @returns {string[]} An array of suggested names.
 */
function suggestNakshatraNames(nakshatra, gender, count = 8) {
    if (!nakshatra || !nakshatra.syllables || nakshatra.syllables.length === 0) return [];

    const targetSyllables = nakshatra.syllables.map(s => s.toLowerCase()); // Normalize to lowercase

    // Filter the main babyNames list
    const filteredNames = babyNames.filter(nameDetail => {
        // Check gender match (allows unisex names for specific gender requests)
        const nameMatchesGender = (gender === 'unisex') || (nameDetail.gender === gender) || (nameDetail.gender === 'unisex');
        if (!nameMatchesGender) return false;

        // Check if any of the name's defined starting syllables match the Nakshatra's auspicious syllables
        return nameDetail.firstSyllables.some(nameSyllable =>
            targetSyllables.some(targetSyllable => nameSyllable.toLowerCase().startsWith(targetSyllable))
        );
    });

    // Shuffle the filtered names to provide variety if there are many matches
    const shuffled = filteredNames.sort(() => 0.5 - Math.random());
    // Return the requested number of names (or fewer if not enough matches)
    return shuffled.slice(0, count).map(n => n.name);
}

// --- Event Handler for the Predict Button ---
predictButton.addEventListener('click', () => {
    // 1. Get User Inputs
    const father = fatherNameEl.value.trim();
    const mother = motherNameEl.value.trim();
    const dob = dobEl.value;
    // const tob = tobEl.value; // Available if needed for more complex logic later
    // const pob = pobEl.value.trim(); // Available if needed
    const gender = genderEl.value;

    // 2. Validate Inputs
    if (!father || !mother || !dob || !gender) {
        showModal("Input Error", "Please fill in Father's Name, Mother's Name, Date of Birth, and Gender.");
        return; // Stop execution if validation fails
    }

    // Clear previous results from the UI
    combinedNamesListEl.innerHTML = '';
    nakshatraNamesListEl.innerHTML = '';
    nakshatraInfoEl.textContent = '';
    combinedNamesSection.classList.add('hidden'); // Hide sections until new results are ready
    nakshatraNamesSection.classList.add('hidden');


    // 3. Generate and Display Combined Names
    const combinedNames = generateCombinedNames(father, mother);
    if (combinedNames.length > 0) {
        combinedNames.forEach(name => {
            const li = document.createElement('li');
            li.textContent = name;
            combinedNamesListEl.appendChild(li);
        });
        combinedNamesSection.classList.remove('hidden'); // Show the section
    } else {
        // Provide feedback if no combined names could be generated
        const li = document.createElement('li');
        li.textContent = "Could not generate unique combinations. Try different names or spellings.";
        combinedNamesListEl.appendChild(li);
        combinedNamesSection.classList.remove('hidden');
    }


    // 4. Get Illustrative Nakshatra and Suggest/Display Names
    const currentNakshatra = getIllustrativeNakshatra(dob);
    nakshatraInfoEl.textContent = `Illustrative Nakshatra: ${currentNakshatra.name} (Lord: ${currentNakshatra.lord}). Auspicious Syllables: ${currentNakshatra.syllables.join(', ')}.`;

    const nakshatraBasedNames = suggestNakshatraNames(currentNakshatra, gender); // Uses default count of 8
    if (nakshatraBasedNames.length > 0) {
        nakshatraBasedNames.forEach(name => {
            const li = document.createElement('li');
            li.textContent = name;
            nakshatraNamesListEl.appendChild(li);
        });
    } else {
        // Provide feedback if no Nakshatra-based names are found
        const li = document.createElement('li');
        li.textContent = `No names found starting with syllables ${currentNakshatra.syllables.join(', ')} for the selected gender in our current list.`;
        nakshatraNamesListEl.appendChild(li);
    }
    nakshatraNamesSection.classList.remove('hidden'); // Show the section

    // Scroll the results area into view for better user experience
    document.getElementById('resultsArea').scrollIntoView({ behavior: 'smooth' });
});
