const baseUrl = "http://localhost:8080/scoretrackr/nine";

export async function getNineByNineId(nineId) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/nineId/${nineId}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch nine.");
}

export async function getNinesByCourseId(courseId) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/courseId/${courseId}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch nines.");
}

export async function addNine(nine) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        },
        body: JSON.stringify(nine)
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 201) {
        return Promise.resolve();
    } else if (response.status === 500) {
        return Promise.reject("Could not add nine.");
    }
    return Promise.reject({ status: response.status });
}