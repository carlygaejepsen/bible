async function fetchVerse() {
    const input = document.getElementById("search").value.trim();
    const [book, chapterVerse] = input.split(' ', 2);
    const [chapter, verse] = chapterVerse.split(':');

    try {
        const response = await fetch(`data/books/${book.toLowerCase()}.json`);
        const data = await response.json();
        const verseText = data.find(v => v.chapterNumber == chapter && v.verseNumber == verse);

        if (verseText) {
            document.getElementById("verse-text").innerText = verseText.value;
        } else {
            document.getElementById("verse-text").innerText = "Verse not found.";
        }
    } catch (error) {
        console.error("Error fetching verse:", error);
        document.getElementById("verse-text").innerText = "Error loading verse.";
    }
}

// Load topical sections
async function fetchTopic() {
    let topic = document.getElementById("topics").value;
    let response = await fetch("topics.json");
    let topics = await response.json();
    
    document.getElementById("topic-content").innerText = topics[topic] || "No information available.";
}

// Load supplemental materials
async function fetchSupplement() {
    let supplement = document.getElementById("supplements").value;
    let response = await fetch("supplements.json");
    let supplements = await response.json();
    
    document.getElementById("supplement-content").innerText = supplements[supplement] || "No information available.";
}

// Apply user-selected theme & font
document.getElementById("theme").addEventListener("change", function() {
    document.body.classList.toggle("dark-mode", this.value === "dark");
});

document.getElementById("font").addEventListener("change", function() {
    document.body.classList.toggle("sans-serif", this.value === "sans-serif");
});

// Load topics & supplements dynamically
async function loadDropdowns() {
    let topicResponse = await fetch("topics.json");
    let topics = await topicResponse.json();
    let topicSelect = document.getElementById("topics");
    
    for (let key in topics) {
        let option = document.createElement("option");
        option.value = key;
        option.innerText = key;
        topicSelect.appendChild(option);
    }

    let supplementResponse = await fetch("supplements.json");
    let supplements = await supplementResponse.json();
    let supplementSelect = document.getElementById("supplements");
    
    for (let key in supplements) {
        let option = document.createElement("option");
        option.value = key;
        option.innerText = key;
        supplementSelect.appendChild(option);
    }
}

loadDropdowns();
