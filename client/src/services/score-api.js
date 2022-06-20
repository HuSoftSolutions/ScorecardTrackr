const baseUrl = "http://localhost:8080/scoretrackr/score";

export async function getScoreByScoreId(scoreId) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/scoreId/${scoreId}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch score.");
}

export async function getScoreByRoundId(roundId) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/roundId/${roundId}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch score.");
}

export async function getScoreByUserId(userId) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/userId/${userId}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch score.");
}

export async function getScoreByHoleId(holeId) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/holeId/${holeId}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch score.");
}