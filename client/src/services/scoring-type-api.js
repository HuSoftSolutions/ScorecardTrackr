const baseUrl = "http://localhost:8080/scoretrackr/sType";

export async function getAllScoringTypes() {
    const init = {
        method: "GET"
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch scoring types.");
}

export async function getScoringTypeByScoringTypeId(scoringTypeId) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/${scoringTypeId}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch scoring type.");
}

export async function addScoringType(scoringType) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        },
        body: JSON.stringify(scoringType)
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 201) {
        return Promise.resolve();
    } else if (response.status === 500) {
        return Promise.reject("Could not add scoring type.");
    }
    return Promise.reject({ status: response.status });
}