//     _   _     _          _   _  __            _      _ ___ 
//    /_\ | |_ _(_)_ _     /_\ | |/ _|___ _ _ __| |  _ | / __|
//   / _ \| \ V / | ' \   / _ \| |  _/ _ \ '_/ _` | | || \__ \
//  /_/ \_\_|\_/|_|_||_| /_/ \_\_|_| \___/_| \__,_|  \__/|___/
//                                                           
// #########################################################################################################################
//    ___ ___  ___  ___ 
//   / __/ _ \|   \| __|
//  | (_| (_) | |) | _| 
//   \___\___/|___/|___|
//                    
// #########################################################################################################################

// array / js object that stores the story with animations and other stuff
const storyData = {
    start: {
        text: "The sun is blazing and the air smells like cut grass. School's out—three whole months of freedom. Your phone buzzes. Two friends want to hang, but a solo chill day also sounds tempting.",
        image: "images/start.png",
        options: [
            { text: "Go to the lake with Maya", next: "S2A" },
            { text: "Join Leo at the skatepark", next: "S2B" },
            { text: "Stay home and plan a 'Me Day'", next: "S2C" }
        ],
        animation: { filePath: "animations/start.html", length: "3000" },
        random: false
    },

    S2A: {
        text: "You arrive at the lake. Maya's already floating in a giant donut tube. 'You brought the chips, right?' she laughs. There's a platform out in the water and a trail leading into the woods.",
        image: "images/lake.png",
        options: [
            { text: "Float and snack", next: "S3A" },
            { text: "Swim to the platform", next: "S3B" },
            { text: "Explore the forest trail", next: "S3C" }
        ],
        animation: NaN,
        random: false
    },

    S2B: {
        text: "The skatepark is buzzing. Leo tosses you a helmet. 'Let's hit the half-pipe—or maybe just grab smoothies and chill?'",
        image: "images/skatepark.png",
        options: [
            { text: "Try a trick", next: "S3D" },
            { text: "Get smoothies and chill", next: "S3E" },
            { text: "Ask Leo to teach you", next: "S3F" }
        ],
        animation: NaN,
        random: false
    },

    S2C: {
        text: "You stay home, surrounded by music, books, and paint. The world outside can wait. What should your first solo move be?",
        image: "images/bedroom.png",
        options: [
            { text: "Start a summer journal", next: "S3G" },
            { text: "Look up road trips", next: "S3H" },
            { text: "Paint something colorful", next: "S3I" }
        ],
        animation: NaN,
        random: false
    },

    S3A: {
        text: "You float lazily under the sun, Maya drifting nearby. Laughter echoes across the lake. Time feels slower—and better.",
        image: "images/floating.png",
        options: [
            { text: "Back to Start", next: "homepage" }
        ],
        animation: NaN,
        random: false
    },

    S3B: {
        text: "You swim hard and cannonball off the platform, making the biggest splash yet. Summer has officially started!",
        image: "images/platform.png",
        options: [
            { text: "Back to Start", next: "homepage" }
        ],
        animation: NaN,
        random: false
    },

    S3C: {
        text: "The trail winds into silence and cool shade. You find a forgotten treehouse tucked into the canopy. A new secret summer spot.",
        image: "images/treehouse.png",
        options: [
            { text: "Back to Start", next: "homepage" }
        ],
        animation: NaN,
        random: false
    },

    S3D: {
        text: "You attempt a grind—it's wobbly but legit. Leo gives you a high five. You're learning fast.",
        image: "images/trick.png",
        options: [
            { text: "Back to Start", next: "homepage" }
        ],
        animation: NaN,
        random: false
    },

    S3E: {
        text: "You sip a mango smoothie while watching skaters fly through the air. Chill mode: fully activated.",
        image: "images/smoothie.png",
        options: [
            { text: "Back to Start", next: "homepage" }
        ],
        animation: NaN,
        random: false
    },

    S3F: {
        text: "Leo patiently shows you some basics. You laugh a lot and actually land one. A new summer skill unlocked!",
        image: "images/learning.png",
        options: [
            { text: "Back to Start", next: "homepage" }
        ],
        animation: NaN,
        random: false
    },

    S3G: {
        text: "You start a journal entry with doodles, music lyrics, and dreams. The first page of many.",
        image: "images/journal.png",
        options: [
            { text: "Back to Start", next: "homepage" }
        ],
        animation: NaN,
        random: false
    },

    S3H: {
        text: "Maps, snacks, playlists—you start planning a dream road trip, even if just on paper. Someday, soon.",
        image: "images/map.png",
        options: [
            { text: "Back to Start", next: "homepage" }
        ],
        animation: NaN,
        random: false
    },

    S3I: {
        text: "Paint splashes the canvas in warm tones. A sunset, a beach, a feeling. You lose time—and love it.",
        image: "images/painting.png",
        options: [
            { text: "Back to Start", next: "homepage" }
        ],
        animation: NaN,
        random: false
    },

    homepage: {
        animation: { filePath: "animations/gotohome.html", length: "1000" }
    }
};

// html elements
const storyContainer = document.getElementById("app");
const animationContainer = document.getElementById("animation-container");
const bgContainer = document.getElementById("bgContainer");
const fader = document.getElementById("lowTaperFader");
const storyBackground = document.getElementById("storyBackground");
let corsProb = false;

// this function removes any animation classes from a item then adds an animation class with a duration
function runAnimation(element, animationClass, duration) {
    console.log(animationClass)
    // so it takes time we make a promise
    return new Promise((resolve) => {
        // remove any existing animation classes
        element.classList.forEach((className) => {
            if (className.startsWith('animation-')) {
                element.classList.remove(className);
            }
        });

        // add the new animation class
        element.style.animationDuration = duration + 's';
        element.classList.add(animationClass);

        // add listener for the animation end event
        element.addEventListener('animationend', () => {
            // resolve to finish
            resolve();
        }, { once: true });
    });
}

// story choice show function
function optionShowFun() {
    // make fader go from 0 - 1 opacity
    runAnimation(fader, 'animation-o-f', 0.5);
    // run optionShow animation
    runAnimation(storyContainer, 'animation-optionShow', 0.5);
}

// story choice hide function
async function optionHideFun(callback) {
    // run hide animation but continue instantly
    runAnimation(storyContainer, 'animation-optionHide', 0.5);
    // fader 0.5 - 1 and wait 0.5 till next
    await runAnimation(fader, 'animation-f-l', 0.5);
    // load story
    callback();
    // then fade 1 - 0
    runAnimation(fader, 'animation-l-o', 0.7);
}

// function to load an animation
function loadAnimation(animationFile, animationLen ,callback) {
    // fetch(get) the animation html file
    fetch(animationFile)
        // the response of the fetch    
        .then(response => response.text())
        // the html data that it got
        // data => {} creates a function that takes data as a param like this function nameplaceholder(data) {}
        .then(data => {
            // parse the HTML content
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            // extract styles from animation 
            const styles = doc.querySelectorAll('style');
            styles.forEach(style => {
                // create a new <style> element and copy the content
                const styleElement = document.createElement('style');
                styleElement.textContent = style.textContent;
                // append the new <style> element to the <head> of the document
                document.head.appendChild(styleElement);
            });

            // extract the body content of the animation HTML (everything inside <body>)
            const animationContent = doc.body.innerHTML;
            // insert the extracted content into the animation container
            animationContainer.innerHTML = animationContent;

            // extract all <script> elements from the animation HTML
            const scripts = doc.querySelectorAll('script');
            scripts.forEach(script => {
                // create a new <script> element for each extracted script
                const newScript = document.createElement('script');
                newScript.textContent = script.textContent; // Copy the script's content
                // append the new <script> element to the <body> to execute it
                document.body.appendChild(newScript);
            });

            // set a timeout to proceed to the story
            setTimeout(() => {
                // \/ run story
                callback(); 
            }, animationLen); // animation lenght
        })
        .catch(err => {
            console.error("Error loading animation:", err);
            bgContainer.classList.remove('invis')
            callback(); // callback to show the story (function) if animation fails
        });
}


// this function is the main function that loads the story / plays it
function showStoryPart(storyPart) {
    // setting the html within the storyContainer element to the story decision
    // if (storyPart.backgroundImage) {
    //     storyBackground.style.backgroundImage = url(storyPart.backgroundImage)
    // } else {
    //     storyBackground.style.backgroundImage = url("images/bgPlaceholder.png")
    // }
    storyContainer.innerHTML = `
        ${storyPart.image ? `<img src="${storyPart.image}" height="300">` : '<!-- no image -->'}
        <p id="story-text" style="color: white; font-size: 1.4em; padding: 3px; margin: 10px;">${storyPart.text}</p>
        <div id="choices-container">
            <!-- below is javascript that dynamically adds the choice buttons -->
            <!-- breaking down the js below it does 3 main things -->
            <!-- the map function does applys some operation to each item in an array -->
            <!-- the operation that is applying is a string formating where it creates the buttons with the onclick of calling the loadStoryPart function -->
            ${storyPart.options.map(option => `
                <button class="storyButtons" onclick="optionHideFun(() => loadStoryPart('${option.next}'));">${option.text}</button>
            `).join('')}
        </div>
        <!-- oneline if statement that if the question can have a random choice button adds it -->
        ${storyPart.random ? '<p id="randomText" style="color: white; font-size: 1.4em; padding: 2px;">Click Random Button For Hint</p><button id="randomButton" class="storyButtons">Random choice</button>' : '<!-- no random -->'}        
    `;
    // js for the randomButton only if it needs to exists
    if (storyPart.random) {
        // get document elements
        const randomButton = document.getElementById("randomButton");
        const randomText = document.getElementById("randomText");
        // if they exist
        if (randomButton && randomText) {
            // add randomButton click listen
            randomButton.addEventListener("click", () => {
                // js get random item from array stuff below why so complex
                const randomIndex = Math.floor(Math.random() * storyPart.options.length);
                const randomOption = storyPart.options[randomIndex];
                randomText.textContent = "Try going: " + randomOption.text;
            });
        }
    }
    // after loading all show it 
    optionShowFun();
}

// function to load a story part
function loadStoryPart(part) {
    // get the part of the story from the storyData (it is an js object but inside it includes arrays)
    console.log(part)
    if (part === 'homepage' && corsProb) {
        window.location.href = "index.html";
    }
    const storyPart = storyData[part];
    // check if part has animation then
    if (storyPart.animation) {
        // if their is an animation
        // () => showStoryPart(storyPart) is a callback that is provided to the loadAnimation 
        // function so that after the animation is loaded the story will show
        loadAnimation(storyPart.animation.filePath, storyPart.animation.length, () => showStoryPart(storyPart));
    } else {
        // else just show story decision / text
        showStoryPart(storyPart);
    }
}

// make star background
function addStars() {
    // get starContainer
    const starContainer = document.getElementById('stars');
    // number of stars
    const numberOfStars = 200;

    // for number of stars add star
    for (let i = 0; i < numberOfStars; i++) {
        // each star is a div
        const star = document.createElement('div');
        // give it the right class
        star.className = 'star';

        const size = Math.random() * 2 + 1; // random size 
        // applying it
        star.style.width = size + 'px';
        star.style.height = size + 'px';

        // give it a random position
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';

        // random opacity and animation duration
        star.style.animationDuration = (0.5 + Math.random() * 1.2) + 's';
        star.style.opacity = 0.5 + Math.random() * 0.5;

        // append it in star container
        starContainer.appendChild(star);
    }
}

// a function to test the cors policy
function testCORS(url) {
    // fetch a test page
    fetch(url, { method: 'GET', mode: 'cors' })
        .then(response => {
            if (!response.ok) {
                // if failed print error
                console.warn(`Response error (status ${response.status})`);
            }
            // do nothing if successful
        })
        .catch(error => {
            // if fetch fail
            console.error('CORS or network error:', error);
            corsProb = true
            // show the warning
            showWarning();
        });
}

function showWarning() {
    const warning = document.getElementById('cors-warning');
    warning.style.display = 'block';
    setTimeout(() => {
        warning.style.display = 'none';
    }, 4000); // Hide after 8 seconds
}

// on document load run
window.addEventListener('DOMContentLoaded', () => {
    // add stars
    addStars();
    // get and add startButton listener
    testCORS('animations/mirrormountain.html');
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', async () => {
        // fade to white completely then remove start page html and unfade and start animation
        const startDialog = document.getElementById('startDialog');
        await runAnimation(fader, 'animation-o-l', 1);
        startDialog.innerHTML = ""; // clear Start Dialog
        loadStoryPart('start');
        await runAnimation(fader, 'animation-l-o', 0.6);
    });
});


