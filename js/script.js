/*

    ©️ 2023 upio

    written by upio inspired by a tiktok video 
    i was bored ok idek why im doing this 💀

    https://www.upio.dev
    https://e-z.bio/upio

*/

// uses markdownit
function loadMessage(md) {
    const message = document.querySelector("#message");

    fetch("message.txt")
        .then(response => response.text())
        .then(data => {
            message.innerHTML = md.render(data);
        })
        .catch(error => {
            message.innerHTML = "An error occurred while fetching the message";
        });
}

document.addEventListener('DOMContentLoaded', function() {
    let tempdata = {
        "did_open": false
    }

    const heart = document.querySelector("#solid-heart");
    const heart_container = document.querySelector(".heart-container");
    
    const msg_container = document.querySelector("#message-container");
    
    const md = window.markdownit({html: true});

    loadMessage(md);

    heart.addEventListener("click", function() {
        if (tempdata.did_open) {
            return;
        }
        tempdata.did_open = true;
        
        msg_container.style.display = "block";
        heart_container.style.marginTop = "-1.5%";
        
        const auto_css_height = msg_container.scrollHeight + 20; // 20 extra padding
        msg_container.style.height = auto_css_height + "px";

        // time it takes for the css to finally finish panning
        setTimeout(() => {
            msg_container.style.overflowY = "scroll";
        }, 1500);
    });

});