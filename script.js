// display error span 
(function () {
    const inputForm1 = document.getElementById("form-part-1").getElementsByTagName("input");

    for (let item of inputForm1) {
        // focus
        item.addEventListener("focus", function (e) {
            // label        
            e.target.nextElementSibling.classList.add("label-focus");
        })
        // lost focus
        item.addEventListener("blur", function (e) {
            // label
            if (item.value === "") {
                e.target.nextElementSibling.classList.remove("label-focus");
            }
            // error message
            let spanError = e.target.nextElementSibling.nextElementSibling;
            if (item.value != "" && !item.checkValidity()) spanError.classList.add("input-invalid");
            else spanError.classList.remove("input-invalid");
        })
    }
})();

// dropdown cursor display
(function () {
    const select = document.getElementById("dropdown");

    select.addEventListener("focus", (e) => {
        if (e.target.nextElementSibling.classList.contains("select-cursor-anim-reverse")) {
            e.target.nextElementSibling.classList.remove("select-cursor-anim-reverse")
        }
        e.target.nextElementSibling.classList.add("select-cursor-anim");
    })
    select.addEventListener("blur", (e) => {
        if (e.target.nextElementSibling.classList.contains("select-cursor-anim")) {
            e.target.nextElementSibling.classList.remove("select-cursor-anim")
        }
        e.target.nextElementSibling.classList.add("select-cursor-anim-reverse");
    })
})();

// manage extra form button
(function () {
    const formLink = document.getElementsByClassName("link");

    function show(event) {
        event.preventDefault();
        let linkTarget = this.href.split("#")[1];
        let targetContent = document.getElementById(linkTarget);
        // if target don't have focus (no current)
        if (!this.classList.contains("current-link")) {
            // change current link style
            document.querySelector(".current-link").classList.remove("current-link");
            this.classList.add("current-link");
            // change target content style
            document.querySelector(".current-content").classList.remove("current-content");
            targetContent.classList.add("current-content");
        }
    }

    for (let link of formLink) {
        link.addEventListener("click", show);
    }
})();

// perform actions on mouse wheel event
(function () {
    const allformPart = document.getElementsByClassName("form-content"),
          formContents = document.getElementsByClassName("form-content");
    let min = max = 1;
    // get the max of form part
    for (item of allformPart) {
        if (item.getAttribute("data-form-part") > max) {
            max = item.getAttribute("data-form-part");
        }
    }
    max = Number(max);

    for (item of formContents) {
        item.addEventListener("wheel", (e) => {
            const currentForm = document.getElementsByClassName("current-content")[0]
            let currentFormPart = Number(currentForm.getAttribute("data-form-part"));
            // get wheel direction
            let wheelDirection = e.deltaY;
            // if down
            if (wheelDirection > 0 && currentFormPart != max) currentFormPart++;  
            // if up 
            else if (wheelDirection < 0 && currentFormPart != min) currentFormPart--;                                
            // remove class previous content, add class to the new          
            currentForm.classList.toggle("current-content");
            document.getElementsByClassName(`form-part-${currentFormPart}`)[0].classList.toggle("current-content");
            // remove class previous link, add class to the new
            document.querySelector(".current-link").classList.remove("current-link");
            document.querySelector(`a[href="#form-part-${currentFormPart}"]`).classList.add("current-link");
        });

    }
})();

// fix bug when mouse leaves card container while select is active
(function () {
    const form = document.getElementsByClassName("container-card")[0];
    form.addEventListener("mouseleave", () => {
        var isFirefox = typeof InstallTrigger !== 'undefined';
        isFirefox ? console.log("You're using firefox, there may be a bug when leaving the form with the select active. Sorry") :
        document.activeElement.blur();         
    });
})();

// cancel default action submit + display info msg
(function () {
    const form = document.getElementById("survey-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        alert("\n\n     Sorry\n\n\n     No server-side script to process this form \n\n\n")
     });
})();

// handle tab navigation 
(function () {
    const formElts = document.forms[0].getElementsByClassName("tab-focus"),
          cardContainer = document.getElementById("container-form");

    for(item of formElts) {
        item.addEventListener("focus", (e) => {
            const tabFormPart = e.target.getAttribute("data-form-part"),
                  tabFormPartContent = document.getElementsByClassName(`form-part-${tabFormPart}`)[0];

            cardContainer.classList.add("container-form-offset");
            
            if(!tabFormPartContent.classList.contains("current-content")){
                document.getElementsByClassName(`form-part-${tabFormPart - 1}`)[0].classList.toggle("current-content");
                document.querySelector(`a[href="#form-part-${tabFormPart - 1}"`).classList.remove("current-link");
                document.querySelector(`a[href="#form-part-${tabFormPart}"`).classList.add("current-link");
                tabFormPartContent.classList.toggle("current-content");
            }
        });
    }

    document.getElementById("submit-btn").addEventListener("blur", (e) => {
        cardContainer.classList.remove("container-form-offset");
    });
})();