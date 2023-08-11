export const getToken = (): string => {
    const storage = getUserLocalStorageData();
    return storage?.data?.token;
};

export const getRefreshToken = () => {
    const storage = getUserLocalStorageData();
    return storage?.data?.refreshToken;
};
function getUserLocalStorageData() {
    const stored = localStorage.getItem("user");
    if (!stored) {
        return undefined;
    }
    return JSON.parse(stored);
}

export function setUserLocalStorageData(data: any) {
    localStorage.setItem(
        "user",
        JSON.stringify({
            data,
        })
    );
}

export function removeUserLocalStorageData() {
    localStorage.removeItem("user");
}