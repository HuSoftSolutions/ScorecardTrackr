
const baseUrl = "http://localhost:8080";

function hasAuthority(...authorities) {
    for (const authority of authorities) {
        if (this.authorities.includes(authority)) {
            return true;
        }
    }
    return false;
}

function makeCredentials(body) {
    const jwt = body.jwt;
    localStorage.setItem("BG_TOKEN", jwt);
    const sections = jwt.split(".");
    const envelope = JSON.parse(atob(sections[1]));
    const credentials = {
        username: envelope.sub,
        authorities: envelope.authorities.split(",")
    };
    credentials.hasAuthority = hasAuthority;
    return credentials;
}

export async function login(credentials) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }
    const response = await fetch(`${baseUrl}/authenticate`, init);
    if (response.status === 200) {
        const body = await response.json();
        return Promise.resolve(makeCredentials(body));
    }
    return Promise.reject("bad credentials");
}

export async function logout() {
    localStorage.removeItem("BG_TOKEN");
    return Promise.resolve();
}

export async function refresh() {
    const jwt = localStorage.getItem("BG_TOKEN");
    if (!jwt) {
        return Promise.reject("bad credentials");
    }
    const init = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    };

    const response = await fetch(`${baseUrl}/refresh_token`, init);

    if (response.status === 200) {
        const body = await response.json();
        return Promise.resolve(makeCredentials(body));
    }

    return Promise.reject("bad credentials");
}