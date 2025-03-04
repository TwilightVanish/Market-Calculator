const buildSetUrl = (id: string, percentage: string) => `/api/rate/${id}/${percentage}`;

export async function setRate(id: string, percentage: string): Promise<boolean> {
    return await fetch(buildSetUrl(id, percentage), {
    }).then(res => res.status == 200)
        .catch(err => {
            console.log(err)
            return false;
        });
}