// import React, { useEffect, useState } from "react";
// import { supabase } from "./supabase";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Link } from "react-router-dom";

// const Home = () => {
//   const [blogpost, setBlogpost] = useState([]);
//   useEffect(() => {
//     fetchData();
//   }, []);

//   async function fetchData() {
//     const { data } = await supabase.from("blog_posts").select("*");
//     setBlogpost(data);
//   }
//   return (
//     <div>
//       <h1>Your Story</h1>

//       <Link to={"/login"}>
//         <Button>Login</Button>
//       </Link>
//       <Link to={"/signup"}>
//         <Button>Singup</Button>
//       </Link>
//       <section>
//         {blogpost.map((content) => (
//           <Card key={content.id}>
//             <CardHeader>
//               <CardTitle>{content.title}</CardTitle>
//               <CardDescription>Author: {content.author}</CardDescription>
//             </CardHeader>
//             <CardContent>
//               {/* <p>{content.post}</p> */}
//               <p className="text-gray-600">
//                 {content.post.substring(0, 100)}...
//               </p>
//               <Link to={"/" + content.id}>
//                 <Button>Read</Button>
//               </Link>
//             </CardContent>
//             {/* <CardFooter>
//               <p>{content.author}</p>
//             </CardFooter> */}
//           </Card>
//         ))}
//       </section>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { UserAuth } from "./context/AuthContext"; // Import the AuthContext

const Home = () => {
  const [blogpost, setBlogpost] = useState([]);
  const { session } = UserAuth(); // Get the session from AuthContext

  // console.log(session.user.user_metadata.first_name);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data } = await supabase.from("blog_posts").select("*");
    setBlogpost(data);
  }

  return (
    <div>
      <h1>Your Story</h1>

      {/* Conditionally render user info or login/signup buttons */}
      {session ? (
        <div>
          <p>Welcome, {session.user.email}</p>
          <p>Name: {session.user.user_metadata?.first_name || "Unknown"}</p>
        </div>
      ) : (
        <div>
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
          <Link to={"/signup"}>
            <Button>Signup</Button>
          </Link>
        </div>
      )}

      <section>
        {blogpost.map((content) => (
          <Card key={content.id}>
            <CardHeader>
              <CardTitle>{content.title}</CardTitle>
              <CardDescription>Author: {content.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {content.post.substring(0, 100)}...
              </p>
              <Link to={"/" + content.id}>
                <Button>Read</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Home;
