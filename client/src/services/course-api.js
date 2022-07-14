const baseUrl = "http://localhost:8080/scoretrackr/course";

export async function getAllCourses() {
    const init = {
        method: "GET"
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch courses.");
}

export async function getCourseByCourseId(courseId) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/${courseId}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch course.");
}

export async function getCourseByName(name) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/name/${name}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch course.");
}

export async function addCourse(course) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        },
        body: JSON.stringify(course)
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 201) {
        return Promise.resolve();
    } else if (response.status === 500) {
        return Promise.reject("Could not add course.");
    }
    return Promise.reject({ status: response.status });
}

export async function updateCourse(course) {
    const init = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        },
        body: JSON.stringify(course)
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 201) {
        return Promise.resolve();
    } else if (response.status === 500) {
        return Promise.reject("Could not update course.");
    }
    return Promise.reject({ status: response.status });
}