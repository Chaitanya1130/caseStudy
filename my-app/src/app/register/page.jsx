export default function Register() {
    return (
        <form action="/api/register/route.js" method="POST">
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <input type="text" name="validatePass" placeholder="Re-Enter Password" required />
            <input type="submit" value="Register" />

        </form>
    )
}