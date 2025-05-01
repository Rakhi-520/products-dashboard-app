import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export const options = {
  secret: process.env.NEXTAUTH_SECRET as string,
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: true,  // Change to false if running on localhost
        sameSite: "none", // Use "lax" for localhost
      },
    },
  },
  providers: [
    CredentialsProvider({
      name: "Account",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          value: "admin",
          placeholder: "enter your username",
        },
        password: {
          label: "Password",
          type: "password",
          value: "welcome",
          placeholder: "enter your password",
        },
      },
      async authorize(credentials) {
        console.log("Credentials received:", credentials);

        const user = {
          id: "1",
          username: "admin",
          password: "welcome",
          name: "Admin User",
        };

        if (
          credentials?.username === user.username &&
          credentials?.password === user.password
        ) {
          console.log("✅ Login successful!");
          return user;
        } else {
          console.log("❌ Login failed: invalid credentials");
          return null;
        }
      }
    }), 
    
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      style: {
        logo: "/github.svg",
        bg: "#f2f2f2",
        text: "#000",
      },
    }),
  ],
};
