export function paginate(page, limit, data) {
    return data.splice((page-1)*limit, limit)
}