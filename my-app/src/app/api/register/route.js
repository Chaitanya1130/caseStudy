 import connectDB from "@/lib/db";
 import User from "@/lib/models/users";
 import bcrypt from "bcryptjs";


export async function POST(req) {
    await connectDB();
    try {
        const { username, password,role="student" } = await req.json();
        const user = await User.findOne({ username });


        if (!user) {
            //salt will tell us how many times we want to hash the password(just think of it as number of rounds)
            const salt=await bcrypt.genSalt(2);
            const hashedpassword=await bcrypt.hash(password,salt);
            const newUser = new User({ username:username, passwordHash: hashedpassword,role,files:[],tags:[] });
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

// for file uploading into database
 export async function PUT(req){
     await connectDB();
     try {
         const { username, file } = await req.json();
         const user = await User.findOne({ username });

         if (!user) {
             console.log("User not found in database");
             return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
         }

         if (!file || !file.fileName || !file.previewImage) {
             return new Response(JSON.stringify({ message: "File name or preview image not found" }), { status: 400 });
         }

         let fileexisting = user.files.some(f => f.fileName === file.fileName);
         if (fileexisting) {
             return new Response(JSON.stringify({ message: "File already exists" }), { status: 409 });
         }

         if (file.tags) {
             user.tags = file.tags;
         }

         user.files.push({
             fileName: file.fileName,
             previewImage: file.previewImage,
             tags: file.tags || ["misc"]
         });



         await user.save();
         return new Response(JSON.stringify({ message: "User file details updated" }), { status: 200 });
     }
     catch (err) {
         console.error("Error:", err);
         return new Response(JSON.stringify({ message: "Internal Server Error while updating the file details" }), { status: 500 });
     }
 }



 //for getting all the tags on giving the username

 export async function GET(req) {
     await connectDB();
     console.log("Received GET request:", req.nextUrl);

     try {
         const username = req.nextUrl.searchParams.get("username");
         if (!username) {
             return new Response(JSON.stringify({ message: "Username is required" }), { status: 400 });
         }

         const user = await User.findOne({ username });
         if (!user) {
             return new Response(JSON.stringify({ message: "User does not exist" }), { status: 404 });
         }

         return new Response(JSON.stringify({ tags: user.tags }), { status: 200 });
     } catch (err) {

         return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
     }
 }
