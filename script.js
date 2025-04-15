document.addEventListener("DOMContentLoaded", () => {
    const zooSelect = document.getElementById("zoo-select");

    // Map dropdown values to popup IDs
    const popupMap = {
        giraffe: "grafisch-popup",
        leeuw: "product-popup",
        olifant: "foto-popup",
        pelikaan: "art-popup",
        aap: "goodguy-popup",
    };

    let zIndexCounter = 10; // Start z-index for popups

    function openPopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.add("open-popup");

            // Bring this popup to the front by updating its z-index
            zIndexCounter++;
            popup.style.zIndex = zIndexCounter;

            // Add click listener to bring popup to the front
            popup.addEventListener("mousedown", () => {
                zIndexCounter++;
                popup.style.zIndex = zIndexCounter;
            });

            // Add dragging functionality to the popup header
            const header = popup.querySelector(".popup-header");
            enableDragging(popup, header);
        }
    }

    function closePopup(popup) {
        if (popup) {
            popup.classList.remove("open-popup");
        }
    }

    // Add event listener for the select dropdown
    zooSelect.addEventListener("change", function () {
        const selectedValue = this.value;
        if (popupMap[selectedValue]) {
            openPopup(popupMap[selectedValue]);
        }
        zooSelect.value = "gorilla"; // Reset dropdown to the default option
    });

    // Close individual popup when the close button is clicked
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("close-popup")) {
            const popup = e.target.closest(".popup");
            closePopup(popup);
        }
    });

    // Dragging functionality
    function enableDragging(popup, header) {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        // Mouse down event to start dragging
        header.addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - popup.offsetLeft;
            offsetY = e.clientY - popup.offsetTop;
            header.style.cursor = "grabbing";

            // Bring the popup to the front while dragging
            zIndexCounter++;
            popup.style.zIndex = zIndexCounter;
        });

        // Mouse move event to drag
        document.addEventListener("mousemove", (e) => {
            if (isDragging) {
                const x = e.clientX - offsetX;
                const y = e.clientY - offsetY;
                popup.style.left = `${x}px`;
                popup.style.top = `${y}px`;
            }
        });

        // Mouse up event to stop dragging
        document.addEventListener("mouseup", () => {
            isDragging = false;
            header.style.cursor = "grab";
        });
    }
});