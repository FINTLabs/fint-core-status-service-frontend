
export function CustomErrorUnkown(message: string) {
    return (
        <div>
            <h1>unknown Error</h1>
            <p>An unknown error has occurred</p>
            <p>{message}</p>
            < a href={"/"} >Home</a>
        </div>
);

}
