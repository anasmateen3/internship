// Add background animation style first
const bgAnimation = document.createElement('style');
bgAnimation.textContent = `
  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  @keyframes bounceIn {
    0% { transform: scale(0.8); opacity: 0; }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }
  .alert-box {
    transition: opacity 0.5s ease, transform 0.5s ease;
    opacity: 1;
  }
  .alert-box.fade-out {
    opacity: 0;
    transform: scale(0.9);
  }
`;
document.head.appendChild(bgAnimation);

// Create rainbow favicon (concentric circles)
const setFavicon = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  
  // Draw rainbow arcs
  const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
  const center = 16;
  const radius = 14;
  
  colors.forEach((color, i) => {
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.stroke();
  });
  
  // Create favicon link
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = canvas.toDataURL('image/png');
  document.head.appendChild(link);
};

// Set title with rainbow emoji
document.title = '🌈 JavaScript Interactive Elements 🌈';

// Call the favicon function
setFavicon();

// Create the entire UI with JavaScript
document.body.style.margin = '0';
document.body.style.padding = '20px';
document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
document.body.style.backgroundSize = '400% 400%';
document.body.style.animation = 'gradientBG 15s ease infinite';
document.body.style.display = 'flex';
document.body.style.flexDirection = 'column';
document.body.style.alignItems = 'center';
document.body.style.minHeight = '100vh';

// Helper function for lighter colors
function lightenColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
    return '#' + (
        0x1000000 +
        (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1);
}

// Create container for all elements
const container = document.createElement('div');
container.style.maxWidth = '800px';
container.style.width = '100%';
document.body.appendChild(container);

// Add title
const title = document.createElement('h1');
title.textContent = 'Interactive Elements';
title.style.color = '#2c3e50';
title.style.textAlign = 'center';
title.style.marginBottom = '40px';
title.style.animation = 'pulse 2s infinite';
container.appendChild(title);

/* ===== COLOR CHANGING BUTTON ===== */
const colorSection = createSection('Color Changing Button');
const colorButton = createButton('Click to Change Color', '#3498db');

let colorIndex = 0;
const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];

colorButton.addEventListener('click', function() {
    colorIndex = (colorIndex + 1) % colors.length;
    this.style.background = `linear-gradient(to right, ${colors[colorIndex]}, ${lightenColor(colors[colorIndex], 20)})`;
});

colorSection.appendChild(colorButton);
container.appendChild(colorSection);

/* ===== ENHANCED TIME-BASED GREETING ===== */
const greetingSection = createSection('Time-Based Greeting');
const greetingButton = createButton('Get Greeting', '#2ecc71');

greetingButton.addEventListener('click', function() {
    const now = new Date();
    const currentHour = now.getHours();
    let greeting, emoji, bgColor;
    
    if (currentHour < 5) {
        greeting = 'Late night owl!';
        emoji = '🦉';
        bgColor = '#1a237e';
    } else if (currentHour < 12) {
        greeting = 'Good morning!';
        emoji = '☀️';
        bgColor = '#ffab00';
    } else if (currentHour < 17) {
        greeting = 'Good afternoon!';
        emoji = '🌤️';
        bgColor = '#4fc3f7';
    } else if (currentHour < 22) {
        greeting = 'Good evening!';
        emoji = '🌙';
        bgColor = '#5c6bc0';
    } else {
        greeting = 'Time to sleep!';
        emoji = '🛌';
        bgColor = '#311b92';
    }

    // Create custom alert box
    createAlertBox(greeting, emoji, now.toLocaleTimeString(), bgColor);
});

greetingSection.appendChild(greetingButton);
container.appendChild(greetingSection);

/* ===== BASIC CALCULATOR ===== */
const calcSection = createSection('Basic Calculator');
const calcDiv = document.createElement('div');
calcDiv.style.display = 'flex';
calcDiv.style.flexDirection = 'column';
calcDiv.style.gap = '10px';
calcDiv.style.marginTop = '15px';

// Create input fields
const num1Input = createNumberInput('First number');
const num2Input = createNumberInput('Second number');

// Create calculate button
const calcButton = createButton('Add Numbers', '#e74c3c');
const resultDiv = document.createElement('div');
resultDiv.style.marginTop = '15px';
resultDiv.style.padding = '10px';
resultDiv.style.borderRadius = '5px';
resultDiv.style.backgroundColor = '#ecf0f1';
resultDiv.textContent = 'Result will appear here';

calcButton.addEventListener('click', function() {
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    
    if (isNaN(num1) || isNaN(num2)) {
        resultDiv.textContent = 'Please enter valid numbers!';
        resultDiv.style.color = '#e74c3c';
        return;
    }
    
    const sum = num1 + num2;
    resultDiv.textContent = `Result: ${num1} + ${num2} = ${sum}`;
    resultDiv.style.color = '#2ecc71';
    resultDiv.style.animation = 'bounceIn 0.5s';

    // Create alert box for the result
    createAlertBox(`Result: ${num1} + ${num2} = ${sum}`, '', '', '#2ecc71');
});

calcDiv.appendChild(num1Input);
calcDiv.appendChild(num2Input);
calcDiv.appendChild(calcButton);
calcDiv.appendChild(resultDiv);
calcSection.appendChild(calcDiv);
container.appendChild(calcSection);

/* ===== HELPER FUNCTIONS ===== */
function createSection(titleText) {
    const section = document.createElement('div');
    section.style.backgroundColor = 'white';
    section.style.padding = '25px';
    section.style.borderRadius = '12px';
    section.style.marginBottom = '25px';
    section.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    section.style.transition = 'all 0.3s ease';
    
    section.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
    });
    
    section.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
    
    const title = document.createElement('h2');
    title.textContent = titleText;
    title.style.marginTop = '0';
    title.style.background = 'linear-gradient(to right, #3498db, #2ecc71)';
    title.style.webkitBackgroundClip = 'text';
    title.style.backgroundClip = 'text';
    title.style.color = 'transparent';
    
    section.appendChild(title);
    return section;
}

function createButton(text, color) {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.background = `linear-gradient(to right, ${color}, ${lightenColor(color, 20)})`;
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.padding = '12px 25px';
    button.style.borderRadius = '25px';
    button.style.cursor = 'pointer';
    button.style.fontSize = '16px';
    button.style.transition = 'all 0.3s';
    button.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    
    button.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 7px 20px rgba(0,0,0,0.15)';
    });
    
    button.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    });
    
    return button;
}

function createNumberInput(placeholder) {
    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = placeholder;
    input.style.padding = '10px 15px';
    input.style.border = '2px solid #ddd';
    input.style.borderRadius = '8px';
    input.style.fontSize = '16px';
    input.style.transition = 'all 0.3s';
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '#3498db';
        this.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.2)';
        this.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.style.borderColor = '#ddd';
        this.style.boxShadow = 'none';
        this.style.transform = 'scale(1)';
    });
    
    return input;
}

// Function to create alert box
function createAlertBox(greeting, emoji, time, bgColor) {
    // Create custom alert box
    const alertOverlay = document.createElement('div');
    alertOverlay.style.position = 'fixed';
    alertOverlay.style.top = '0';
    alertOverlay.style.left = '0';
    alertOverlay.style.width = '100%';
    alertOverlay.style.height = '100%';
    alertOverlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    alertOverlay.style.display = 'flex';
    alertOverlay.style.justifyContent = 'center';
    alertOverlay.style.alignItems = 'center';
    alertOverlay.style.zIndex = '1000';
    
    const alertBox = document.createElement('div');
    alertBox.classList.add('alert-box'); // Add class for styling
    alertBox.style.backgroundColor = 'white';
    alertBox.style.padding = '30px';
    alertBox.style.borderRadius = '15px';
    alertBox.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    alertBox.style.textAlign = 'center';
    alertBox.style.maxWidth = '80%';
    alertBox.style.animation = 'bounceIn 0.5s';
    alertBox.style.border = `5px solid ${bgColor}`;
    
    const greetingText = document.createElement('h2');
    greetingText.textContent = greeting;
    greetingText.style.color = bgColor;
    greetingText.style.marginTop = '0';
    greetingText.style.fontSize = '2rem';
    
    if (emoji) {
        const emojiDisplay = document.createElement('div');
        emojiDisplay.textContent = emoji;
        emojiDisplay.style.fontSize = '4rem';
        emojiDisplay.style.margin = '20px 0';
        alertBox.appendChild(emojiDisplay);
    }
    
    if (time) {
        const timeText = document.createElement('p');
        timeText.textContent = `It's ${time}`;
        timeText.style.fontSize = '1.2rem';
        timeText.style.color = '#555';
        alertBox.appendChild(timeText);
    }
    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'OK';
    closeButton.style.backgroundColor = bgColor;
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.padding = '12px 25px';
    closeButton.style.borderRadius = '50px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '1rem';
    closeButton.style.marginTop = '20px';
    closeButton.style.transition = 'all 0.3s';
    
    closeButton.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    });
    
    closeButton.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
    
    // Function to close the alert
    const closeAlert = function() {
        alertBox.classList.add('fade-out'); // Add fade-out class
        setTimeout(() => {
            document.body.removeChild(alertOverlay);
            document.removeEventListener('keydown', handleKeyPress);
        }, 500); // Wait for the fade-out duration before removing the overlay
    };
    
    // Function to handle key press
    const handleKeyPress = function(e) {
        if (e.key === 'Enter') {
            closeAlert();
        }
    };
    
    // Add event listeners
    closeButton.addEventListener('click', closeAlert);
    document.addEventListener('keydown', handleKeyPress);
    
    alertBox.appendChild(greetingText);
    alertBox.appendChild(closeButton);
    alertOverlay.appendChild(alertBox);
    document.body.appendChild(alertOverlay);
    
    // Focus the close button immediately
    closeButton.focus();
}