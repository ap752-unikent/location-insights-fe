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
    let innerHTML = ""

    for (const key of respKeys) {
        const value = humanReadableInsights[key];
        const isExcluded = excludedFields.includes(key);

        if (value === undefined || isExcluded) {
            continue;
        }

        innerHTML += `<p>${value}</p>`
    }

    container.innerHTML = innerHTML;
    scriptTag.insertAdjacentElement("beforebegin", container);
}

fetchInsights();