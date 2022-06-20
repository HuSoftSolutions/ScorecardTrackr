const baseUrl = "http://localhost:8080/scoretrackr/type";

export async function getAllMatchTypes() {
    const init = {
        method: "GET"
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch match types.");
}

export async function getMatchTypeByMatchTypeId(matchTypeId) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/${matchTypeId}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch match type.");
}

export async function addMatchType(matchType) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        },
        body: JSON.stringify(matchType)
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 201) {
        return Promise.resolve();
    } else if (response.status === 500) {
        return Promise.reject("Could not add match type.");
    }
    return Promise.reject({ status: response.status });
}