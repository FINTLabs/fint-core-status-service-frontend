

export function CustomErrorFetchingError(message: string) {
    return (
        <div>
            <h1>500 Internal server error</h1>
            <p>{message}</p>
        </div>
    )
}