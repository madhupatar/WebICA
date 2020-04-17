var sessionCookie = localStorage.getItem("session");

export function loginUser(callback, userName) {
    if (sessionCookie === null)
        sessionCookie = localStorage.setItem("session", {})

    if (sessionCookie[userName])
        return;
    
    sessionCookie[userName] = true;
}

export function isLoggedIn(userName) {
    if (sessionCookie[userName] === null)
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