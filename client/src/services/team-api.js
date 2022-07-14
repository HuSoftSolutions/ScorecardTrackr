const baseUrl = "http://localhost:8080/scoretrackr/team";

export async function getTeamByTeamId(teamId) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/${teamId}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch score.");
}

export async function addTeam(team) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        },
        body: JSON.stringify(team)
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 201) {
        return Promise.resolve();
    } else if (response.status === 500) {
        return Promise.reject("Could not add team.");
    }
    return Promise.reject({ status: response.status });
}