const apiUrl = "/api/admin";

export async function isAdmin(): Promise<boolean> {
    return await fetch(apiUrl).then(res => res.json())
        .catch(err => console.log(err));
}