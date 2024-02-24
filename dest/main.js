// ------
/* NAV MENU MOBILE */
function menuMobile() {
    const header = document.querySelector(".header"),
        btnMenu = header.querySelector(".btnmenu");
    const menuMobile = document.querySelector(".menumobile"),
        linksMenuMobile = menuMobile.querySelectorAll("li a");

    btnMenu.addEventListener("click", function () {
        this.classList.toggle("--active");
        header.classList.toggle("--bg-header-m");
        if (header.classList.contains("--bg-header")) {
            header.classList.toggle("--bg-header");
        }
        menuMobile.classList.toggle("--show");
        document.body.classList.toggle("--disable-scroll");
        document.querySelector(".backtotop").classList.toggle("--hide");
    });

    function hideNav() {
        btnMenu.classList.remove("--active");
        menuMobile.classList.remove("--show");
        header.classList.remove("--bg-header-m");
        document.body.classList.remove("--disable-scroll");
        document.querySelector(".backtotop").classList.remove("--hide");
    }

    window.addEventListener("resize", function () {
        let wWindow = window.innerWidth;
        if (wWindow > 991) {
            hideNav();
        }
    });

    linksMenuMobile.forEach(function (link) {
        link.classList.remove("--active");
        if (link.href == window.location.href) {
            link.classList.add("--active");
        }
    });
}
menuMobile();

// ------
/* HANDLE MENU ACTIVE - HREF */
function handleMenuHref() {
    const linksMenu = document.querySelectorAll(".header li a");
    linksMenu.forEach(function (link) {
        link.classList.remove("--active");
        if (link.href == window.location.href) {
            link.classList.add("--active");
        }
    });
}
handleMenuHref();

// ------
/* HEADER SCROLLING - change background */
function changeBgHeader() {
    const header = document.querySelector(".header");
    let scrollY = window.scrollY;

    if (scrollY > header.clientHeight) {
        header.classList.add("--bg-header");
    } else {
        header.classList.remove("--bg-header");
    }
}
window.addEventListener("scroll", changeBgHeader);

// ------
/* BACK TO TOP */
function clickBackToTop() {
    const btn = document.querySelector(".backtotop");

    btn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    function fadeToTop() {
        let scrollY = window.scrollY;
        let bodyHeight = document.body.offsetHeight / 4;
        if (scrollY > bodyHeight) {
            btn.classList.add("--show");
        } else {
            btn.classList.remove("--show");
        }
    }
    window.addEventListener("scroll", fadeToTop);
}
clickBackToTop();

// ------
/* LOADING PAGE */
function loadPage() {
    let body = document.querySelector("body"),
        imgs = document.querySelectorAll("img").length;

    let loadedCount = 0;

    new imagesLoaded(body)
        .on("progress", () => {
            loadedCount++;
            percent = Math.floor((loadedCount / imgs) * 100);
            handleLoading(percent);
        })
        .on("done", () => {
            hideLoading();
        });

    function handleLoading(percent) {
        const progress = document.querySelector(".loading .progressbar__inner"),
            textPercent = document.querySelector(".loading .loading__percent");

        progress.style.width = `${percent}%`;
        textPercent.innerHTML = `${percent}%`;
    }

    function hideLoading() {
        let loading = document.querySelector(".loading");
        loading.classList.add("--hide");

        document.body.classList.remove("--disable-scroll");
    }
}
loadPage();

// ------
/* PROGRESS BAR ON SCROLL */
const progressBar = () => {
    let progress = document.querySelector(".progressbar-scroll");
    window.addEventListener("scroll", () => {
        let scrollY = window.scrollY;
        let height = document.body.offsetHeight - window.innerHeight;
        let percent = (Number(scrollY / height) * 100).toFixed();
        progress.style.width = percent + "%";
    });
};
window.addEventListener("load", progressBar);

// ------
/* HANDLE POPUP VIDEO */
(function handleVideo() {
    "use strict";
    const btnVideo = document.querySelector(".scvideo .scvideo__img"),
        popupVideo = document.querySelector(".popupvideo"),
        iframeVideo = document.querySelector(".popupvideo #iframe"),
        closeVideo = document.querySelector(".popupvideo #iframe .icon");

    function showPopup() {
        popupVideo.classList.add("--show");
        document.body.classList.add("--disable-scroll");
    }
    function closePopup() {
        popupVideo.classList.remove("--show");
        document.body.classList.remove("--disable-scroll");
        iframeVideo.setAttribute("src", "");
    }

    btnVideo?.addEventListener("click", () => {
        showPopup();
        // get ID with getAttribute
        let id = btnVideo.getAttribute("data-video-id");
        iframeVideo.setAttribute(
            "src",
            `https://www.youtube.com/embed/${id}?autoplay=1`
        );
    });

    closeVideo?.addEventListener("click", () => {
        closePopup();
    });

    popupVideo?.addEventListener("click", () => {
        closePopup();
    });
})();

// ------
/* Slider USERSTOFEEL */
function setWidthSliderItem() {
    const container = document.querySelector(".container");
    const items = document.querySelectorAll(".scfeelings__list .item");

    let marginlrItem =
        parseInt(
            window
                .getComputedStyle(
                    document.querySelector(".scfeelings__list .item")
                )
                .getPropertyValue("margin-left")
        ) * 2;
    let pdLeftContainer = parseInt(
        window.getComputedStyle(container).getPropertyValue("padding-left")
    );

    let width = (container.clientWidth - marginlrItem) / 2 - pdLeftContainer;

    items.forEach((item) => (item.style.width = `${width}px`));
}

function handleSliderFeelings() {
    var flkty = document.querySelector(".scfeelings__list-wrap");

    if (flkty) {
        const flktySlider = new FlickityResponsive(flkty, {
            cellAlign: "center",
            contain: true,
            prevNextButtons: false,
            pageDots: true,
            wrapAround: true,
            draggable: true,
            groupCells: 2,
            on: {
                ready: function () {
                    handleHeightSliderItem();
                },
            },
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        groupCells: 1,
                    },
                },
            ],
        });

        // Height slider
        function handleHeightSliderItem() {
            const sliderItems = document.querySelectorAll(
                ".scfeelings__list-wrap .item"
            );

            let height = 0;
            sliderItems.forEach((sliderItem) => {
                const desc = sliderItem.querySelector(".item__desc");

                let heightDesc = desc.scrollHeight;
                let mbDesc = parseInt(
                    window
                        .getComputedStyle(desc)
                        .getPropertyValue("margin-bottom")
                );
                let heightAuthor = document.querySelector(
                    ".scfeelings__list-wrap .author"
                ).scrollHeight;
                let pdItem =
                    parseInt(
                        window
                            .getComputedStyle(sliderItem)
                            .getPropertyValue("padding-top")
                    ) * 2;

                let heightItems = heightDesc + mbDesc + heightAuthor + pdItem;

                if (heightItems > height) {
                    height = heightItems;
                }
            });

            sliderItems.forEach((item) => {
                item.style.height = `${height}px`;
            });
        }
    }
}
window.addEventListener("load", function () {
    const scfeelingsList = this.document.querySelector(".scfeelings__list");
    if (scfeelingsList != null) {
        setWidthSliderItem();
        handleSliderFeelings();
    }
});
window.addEventListener("resize", function () {
    const scfeelingsList = this.document.querySelector(".scfeelings__list");
    if (scfeelingsList != null) {
        setWidthSliderItem();
        handleSliderFeelings();
    }
});

// ------
/* TABS POSTS */
function handleTabsNews() {
    let tabs = document.querySelectorAll(".scposts__tabs li"),
        listPosts = document.querySelectorAll(".thumb__list");

    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            // hide all class Active of Tabs
            tabs.forEach(function (tab) {
                tab.classList.remove("--active");
            });
            // add class active to Tab
            this.classList.add("--active");

            // hide all news list
            listPosts.forEach(function (item) {
                item.classList.remove("--show");
            });
            // get ID with dataset
            let id = this.dataset.tabId;
            // add class show to News list
            document
                .querySelector(".thumb__list-" + id)
                .classList.add("--show");
        });
    });
}
handleTabsNews();

// ------
/* HANDLE ACCORDION - FAQs */
function handleAccordion() {
    const accordions = document.querySelectorAll(".scaccordion .item");

    accordions.forEach(function (item, index) {
        item.addEventListener("click", function () {
            this.classList.toggle("--active");

            let answer = item.querySelector(".item__answer");
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }

            removeActive(index);
        });
    });

    function removeActive(index1) {
        accordions.forEach((item2, index2) => {
            if (index1 != index2) {
                item2.classList.remove("--active");

                let answer = item2.querySelector(".item__answer");
                answer.style.maxHeight = null;
            }
        });
    }
}
handleAccordion();

// ------
/* FORM - VALIDATION */
function Validator(options) {
    function validate(inputElement, rule) {
        const errorElement = inputElement.parentElement.querySelector(
            options.errorSelector
        );
        const errorMessage = rule.test(inputElement.value);

        if (errorMessage) {
            inputElement.parentElement.classList.add("--invalid");
            errorElement.innerText = errorMessage;
        } else {
            inputElement.parentElement.classList.remove("--invalid");
            errorElement.innerText = "";
        }

        return !errorMessage;
    }

    const formElement = document.querySelector(options.form);
    if (formElement) {
        // submit form
        formElement.addEventListener("submit", function (e) {
            e.preventDefault();
            let isFormValid = true;

            options.rules.forEach((rule) => {
                const inputElement = formElement.querySelector(rule.selector);
                const isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                formElement.submit();
            }
        });

        // events on blur, input,..
        options.rules.forEach((rule) => {
            const inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                inputElement.addEventListener("blur", function () {
                    validate(inputElement, rule);
                });

                inputElement.addEventListener("input", function () {
                    const errorElement =
                        inputElement.parentElement.querySelector(
                            options.errorSelector
                        );

                    errorElement.innerText = "";
                    inputElement.parentElement.classList.remove("--invalid");
                });
            }
        });
    }
}

Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : "Please fill in this field";
        },
    };
};
Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            const regex =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(String(value).toLowerCase())
                ? undefined
                : "This field must be email !";
        },
    };
};

Validator({
    form: "#formwrapjs",
    formGroupSelector: ".formwrap__input",
    errorSelector: ".formmsg",
    rules: [
        Validator.isRequired("#name"),
        Validator.isEmail("#email"),
        Validator.isRequired("#subject"),
        Validator.isRequired("#message"),
    ],
});

Validator({
    form: "#scsubscribejs",
    formGroupSelector: ".scsubscribejs",
    errorSelector: ".formmsg",
    rules: [Validator.isEmail("#subscribe")],
});
