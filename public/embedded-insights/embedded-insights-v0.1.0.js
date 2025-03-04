const scriptTag = document.currentScript;
const partnerPropertyId = scriptTag.getAttribute("data-partner-property-id");
const partnerId = scriptTag.getAttribute("data-partner-id");
const baseUrl = scriptTag.getAttribute("data-base-url");

const fetchInsights = async () => {
    const currentUrl = window.location.href;
    const response = await fetch(`${baseUrl}/partner-property/${partnerPropertyId}?partnerId=${partnerId}&url=${currentUrl}`);
    const data = await response.json();
    const humanReadableInsights = data["insightsHumanReadable"]
    const excludedFields = data["excludedFields"] ?? [];

    const container = document.createElement('div');
    container.id = "househop-scout-embedded-insights";

    const respKeys = Object.keys(humanReadableInsights);
    let innerHTML = "<ul style='list-style: none; padding: 0; display:flex; flex-direction:column; gap:12px'>"

    for (const key of respKeys) {
        const value = humanReadableInsights[key];
        const isExcluded = excludedFields.includes(key);

        if (value === undefined || isExcluded) {
            continue;
        }

        const emoji = value.emoji
        const text = value.text

        innerHTML += `<li style='display:flex; align-items:center; gap:16px;'><span>${emoji}</span><span>${text}</span></li>`
    }

    innerHTML += "</ul>"

    container.innerHTML = innerHTML;
    scriptTag.insertAdjacentElement("beforebegin", container);
}

fetchInsights();