/*

    ©️ 2023 upio

    written by upio inspired by a tiktok video 
    i was bored ok idek why im doing this 💀

    https://www.upio.dev
    https://e-z.bio/upio

*/

const local_dev_cors_message = `<br><br><strong>Possible Fixes:</strong><br>This might be a problem with <i>CORS</i> policy, to fix please host the website on any hosting software like <a href="https://vercel.com/" target="_blank">Vercel</a>, Github Pages, <a href="https://cloudflare.com/" target="_blank">Cloudflare Pages</a> etc.`

// markdown it on top (real)
function loadMessage(md) {
    const message = document.querySelector("#message");

    fetch("message.txt")
        .then(response => response.text())
        .then(data => {
            message.innerHTML = md.render(data);
        })
        .catch(error => {
            if (document.location.hostname === "localhost" || document.location.href.startsWith("file://")) {
                message.innerHTML = `An error occurred while fetching the message. <code>${error}</code>${local_dev_cors_message}`;
                return;
            }
            
            message.innerHTML = `An error occurred while fetching the message. <code>${error}</code>`;
        });
}

document.addEventListener('DOMContentLoaded', function() {
    let tempdata = {
        "did_open": false
    }

    const heart = document.querySelector("#solid-heart");
    
    const msg_container = document.querySelector("#message-container");
    
    const md = window.markdownit({html: true});

    loadMessage(md);

    heart.addEventListener("click", function() {
        if (tempdata.did_open) {
            return;
        }
        tempdata.did_open = true;
        
        msg_container.classList.remove("hidden");
        msg_container.classList.add("flex");
        
        let auto_css_height = msg_container.scrollHeight + 20; // 20 extra padding
        msg_container.classList.remove("h-0");
        msg_container.classList.add(`h-[${auto_css_height}px]`);
        
        setTimeout(() => {
            if (msg_container.scrollHeight > msg_container.clientHeight) {
                msg_container.classList.remove("overflow-y-hidden");
                msg_container.classList.add("overflow-y-scroll");
            }
            
            window.onresize = function() {
                if (msg_container.scrollHeight > msg_container.clientHeight) {
                    msg_container.classList.remove("overflow-y-hidden");
                    msg_container.classList.add("overflow-y-scroll");
                } else {
                    msg_container.classList.remove("overflow-y-scroll");
                    msg_container.classList.add("overflow-y-hidden");
                }

                msg_container.classList.remove(`h-[${auto_css_height}px]`);
                auto_css_height = msg_container.scrollHeight + 20;
                msg_container.classList.add(`h-[${auto_css_height}px]`);
            }
        }, 1450);
    });

});
