const baseUrl = "http://localhost:8080/scoretrackr/mFormat";

export async function getAllMatchFormats() {
    const init = {
        method: "GET"
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch match formats.");
}

export async function getMatchFormatByMatchFormatId(matchFormatId) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/${matchFormatId}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch match format.");
}

export async function addMatchFormat(matchFormat) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        },
        body: JSON.stringify(matchFormat)
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 201) {
        return Promise.resolve();
    } else if (response.status === 500) {
        return Promise.reject("Could not add match format.");
    }
    return Promise.reject({ status: response.status });
}