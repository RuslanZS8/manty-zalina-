// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Click Envelope
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);
});

// Logic to move the NO btn
const moveBtn = (e) => {
    if (e && e.type === 'touchstart') e.preventDefault();

    const isMobile = window.innerWidth <= 768;
    const min = isMobile ? 50 : 200;
    const max = isMobile ? 100 : 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

// Event listeners for No Button
noBtn.addEventListener("mouseover", moveBtn);
noBtn.addEventListener("touchstart", moveBtn);

// YES Button Event Listener + Email Trigger
yesBtn.addEventListener("click", () => {
    title.textContent = "Yeessss!";
    catImg.src = "cat-dance.gif";
    document.querySelector(".letter-window").classList.add("final");
    buttons.style.display = "none";
    finalText.style.display = "block";


    const web3FormsKey = "96feca60-1751-4309-8f3d-884e86335911";

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            access_key: web3FormsKey,
            subject: "She said YES to Manty! 🥩👩‍🍳",
            from_name: "Valentine Proposal",
            message: "Success! She clicked the 'Yes' button on your interactive card. Time to get those ingredients ready!"
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log("Notification email sent successfully!", data);
        })
        .catch(error => {
            console.error("Error sending email:", error);
        });
});
