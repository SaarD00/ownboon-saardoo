import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentailProvder from "next-auth/providers/credentials";
import sanityClient from "../../../sanity";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentailProvder({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "SaarDOO" },
        password: { label: "Password", type: "password" },
      },

      callbacks: {
        async signIn(user, account, profile) {
          try {
            console.log("creating user");
            // Create a new document in your Sanity.js database
            const res = await client.create({
              _type: "user",
              name: user.name,
              email: user.email,
            });
            console.log(res);
          } catch (err) {
            console.error("Error creating user:", err.message);
          }
          // Return `true` to allow sign in to proceed
        },
      },

      async authorize(credentials, req) {
        if (
          credentials?.username === "Test" &&
          credentials?.password === "test"
        ) {
          return {
            id: 1,
            name: "kornesh",
            email: "srivastavasamayara30@gmail.com",
            image:
              "https://cdn.sanity.io/images/mrfd4see/production/5db389be209c96202064cddba475d2eed0a3f287-606x723.jpg",
          };
        }
        if (
          credentials?.username === "Samayara Srivastava" &&
          credentials?.password === "amongus6969"
        ) {
          return {
            id: 2,
            name: "Samayara Srivastava",
            email: "srivastavasamayara30@gmail.com",
            image:
              "https://cdn.sanity.io/images/mrfd4see/production/5db389be209c96202064cddba475d2eed0a3f287-606x723.jpg",
          };
        }

        if (
          credentials?.username === "SaarDOO" &&
          credentials?.password === "SaarDOO"
        ) {
          return {
            id: 4,
            name: "SaarDOO ",
            email: "astrosaard@gmail.com",
            image:
              "https://cdn.discordapp.com/attachments/1018929979897163868/1084440633432875069/00099-573026695-nvinkpunk_potrait_of_a_handsome_teenage_boy_with_the_most_cutest_face.png",
          };
        }
        return null;
      },
    }),
  ],
});
