// Selecting necessary elements
let wrapper = document.getElementById("wrapper");
let i1 = document.getElementById("i1");
let i2 = document.getElementById("i2");
let active = document.querySelector(".active");
let cursor = document.querySelector(".video-cursor");

// Function to toggle between active elements
function toggle(widP, heiP) {
    gsap.to(active, {
        clipPath: "",
    });
    i1.classList.toggle("active");
    i2.classList.toggle("active");
    active = document.querySelector(".active");
    gsap.to(active, {
        clipPath: `circle(15% at ${widP}% ${heiP}%)`,
    });
}

// Function to enable mousemove and mouseleave event listeners
function enableListeners() {
    wrapper.addEventListener("mousemove", mouseMoveHandler);
    wrapper.addEventListener("mouseleave", mouseLeaveHandler);
}

// Function to disable mousemove and mouseleave event listeners for 1.5 seconds
function disableListeners() {
    wrapper.removeEventListener("mousemove", mouseMoveHandler);
    wrapper.removeEventListener("mouseleave", mouseLeaveHandler);
    setTimeout(enableListeners, 1500);
}

// Mouse move event handler
function mouseMoveHandler(e) {
    var a = wrapper.getBoundingClientRect();
    const widP = (e.clientX - a.left) / a.width * 100;
    const heiP = (e.clientY - a.top) / a.height * 100;

    // Move the cursor
    gsap.to(cursor, {
        left: widP + "%",
        top: heiP + "%"
    });

    // Update clip path
    gsap.to(active, {
        clipPath: `circle(15% at ${widP}% ${heiP}%)`,
        duration: 0.2,
        ease: "power1.out"
    });
}

// Mouse leave event handler
function mouseLeaveHandler(e) {
    var a = wrapper.getBoundingClientRect();
    const widP = (e.clientX - a.left) / a.width * 100;
    const heiP = (e.clientY - a.top) / a.height * 100;

    // Hide cursor
    gsap.to(cursor, {
        scale: 0
    });

    // Update clip path
    gsap.to(active, {
        clipPath: `circle(0% at ${widP}% ${heiP}%)`,
        duration: 0.2
    });
}

// Adding event listeners
wrapper.addEventListener("mousemove", mouseMoveHandler);
wrapper.addEventListener("mouseleave", mouseLeaveHandler);
wrapper.addEventListener("click", (e) => {
    var a = wrapper.getBoundingClientRect();
    const widP = (e.clientX - a.left) / a.width * 100;
    const heiP = (e.clientY - a.top) / a.height * 100;
    disableListeners();
    // Update clip path and toggle active element
    gsap.to(active, {
        clipPath: `circle(1500px at ${widP}% ${heiP}%)`,
        duration: 1,
        ease: "power1.out",
        onComplete: () => {
            toggle(widP, heiP);
        }
    });
});

// Mouse enter event handler
wrapper.addEventListener("mouseenter", (e) => {
    // Show cursor
    gsap.to(cursor, {
        scale: 1
    });
});
