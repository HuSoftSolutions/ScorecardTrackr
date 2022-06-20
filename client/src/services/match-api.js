const baseUrl = "http://localhost:8080/scoretrackr/match";

export async function getMatchByMatchId(matchId) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/${matchId}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch match.");
}

export async function addMatch(match) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        },
        body: JSON.stringify(match)
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 201) {
        return Promise.resolve();
    } else if (response.status === 500) {
        return Promise.reject("Could not add match.");
    }
    return Promise.reject({ status: response.status });
}

export async function deleteMatchByMatchId(matchId) {
    const init = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        }
    };
    const response = await fetch(`${baseUrl}/${matchId}`, init);
    if (response.status === 204) {
        return Promise.resolve();
    } else if (response.status === 404) {
        return Promise.reject("Could not find match to delete.");
    }
    return Promise.reject("Error in deleting match.");
}