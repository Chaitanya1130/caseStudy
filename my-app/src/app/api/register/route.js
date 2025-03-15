 import connectDB from "@/lib/db";
 import User from "@/lib/Models/User";


export async function POST(req) {
    await connectDB();

    try {
        const { username, password } = await req.json();

        const user = await User.findOne({ username });

        if (!user) {
            const newUser = new User({ username, password });
            await newUser.save();
            return new Response(JSON.stringify({ message: "User Created" }), { status: 201 });
        } else {
            return new Response(JSON.stringify({ message: "User already exists" }), { status: 409 });
        }
    } catch (err) {
        console.error("Error:", err);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}
// import connectDB from "@/lib/db";
// import User from "@/lib/Models/User";
//
// export async function POST(req) {
//     try {
//         console.log("Connecting to DB...");
//         await connectDB(); // Check if the connection is successful
//         console.log("Connected!");
//
//         const data = await req.json();
//         console.log("Received data:", data); // Log incoming data
//
//         const newUser = new User(data);
//         await newUser.save();
//         console.log("User saved:", newUser);
//
//         return new Response(JSON.stringify({ success: true, user: newUser }), {
//             status: 201,
//             headers: { "Content-Type": "application/json" },
//         });
//     } catch (error) {
//         console.error("Error in API route:", error); // Log the actual error
//         return new Response(JSON.stringify({ success: false, error: error.message }), {
//             status: 500,
//             headers: { "Content-Type": "application/json" },
//         });
//     }
// }
