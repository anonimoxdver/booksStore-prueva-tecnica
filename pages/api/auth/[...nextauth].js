import nextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";


export default nextAuth({
providers: [
  KeycloakProvider({
    clientId: process.env.KEYCLOAK_ID,
    clientSecret: process.env.KEYCLOAK_SECRET,
    issuer: process.env.KEYCLOAK_ISSUER,


  }),


],
      callbacks: {
        async session({ session, token, user }) {

          // Send properties to the client, like an access_token and user id from a provider.
          
          session.sub = token.sub
          session.role = 'client'


          
          return session
        }
      }

})
