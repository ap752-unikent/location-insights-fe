import "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.12.0/cdn/shoelace.js";
const { registerIconLibrary } = await import("https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.12.0/cdn/utilities/icon-library.js");

registerIconLibrary('lucide', {
    resolver: name => `https://cdn.jsdelivr.net/npm/lucide-static@0.477.0/icons/${name}.svg`
});

const scriptTags = document.querySelectorAll("script");
let scriptTag = Array.from(scriptTags).find(script => script.getAttribute("data-partner-property-id"));
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

        innerHTML += `<li style='display:flex; align-items:center; gap:16px;'>
                <div style="display:flex; color: #434667; font-size: 20px;">
                    <sl-icon library="lucide" name="${emoji}"></sl-icon>
                </div>
                <span>${text}</span>
            </li>`
    }

    innerHTML += "</ul>"

    container.innerHTML = innerHTML;
    scriptTag.insertAdjacentElement("beforebegin", container);
}

fetchInsights();