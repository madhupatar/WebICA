var sessionCookie = localStorage.getItem("session");

export function loginUser(userName) {
    if (sessionCookie === null) {
        localStorage.setItem("session", {})
        sessionCookie = {}
    }

    if (sessionCookie[userName])
        return;
    
    sessionCookie[userName] = true;
    localStorage.setItem("session", sessionCookie)
}

export function isLoggedIn(userName) {
    if (Object.keys(sessionCookie)[0] !== userName)
        return false;

    return sessionCookie[userName];
}

export function logout(userName) {
    sessionCookie[userName] = false
    localStorage.removeItem("session");
    sessionCookie = null;
}

export function anyValidSession() {
    return sessionCookie !== null;
}

export function getUserName() {
    return Object.keys(sessionCookie)[0]
}