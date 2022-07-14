const baseUrl = "http://localhost:8080/scoretrackr/round";

export async function getRoundByRoundId(roundId) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/${roundId}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch round.");
}

export async function addRound(round) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        },
        body: JSON.stringify(round)
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 201) {
        return Promise.resolve();
    } else if (response.status === 500) {
        return Promise.reject("Could not add round.");
    }
    return Promise.reject({ status: response.status });
}