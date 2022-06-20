const baseUrl = "http://localhost:8080/scoretrackr/hole";

export async function getHoleByHoleId(holeId) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/holeId/${holeId}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch hole.");
}

export async function getHolesByNineId(nineId) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/nineId/${nineId}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch holes.");
}

export async function addHole(hole) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        },
        body: JSON.stringify(hole)
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 201) {
        return Promise.resolve();
    } else if (response.status === 500) {
        return Promise.reject("Could not add hole.");
    }
    return Promise.reject({ status: response.status });
}

export async function updateHole(hole) {
    const init = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        },
        body: JSON.stringify(hole)
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 201) {
        return Promise.resolve();
    } else if (response.status === 500) {
        return Promise.reject("Could not update hole.");
    }
    return Promise.reject({ status: response.status });
}