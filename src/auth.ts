import NextAuth, { AuthError, CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { getStrapiURL } from './lib/utils';
import { loginSchema } from './lib/zod';
 
export const { auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = await loginSchema.safeParseAsync(credentials)
 
        if (parsedCredentials.success) {            
            
                const res = await fetch(getStrapiURL('/api/auth/local'), {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(parsedCredentials.data),
                  });
                
                const user = await res.json();

                if (user.error) {
                throw new AuthError("Server Error!", {cause: { code: user.error.message}})
                }
                
                return user
        }

        const zodErr = parsedCredentials.error.issues.map((entry) => {
          return `[ ${entry.message} ]`
        })
          
        throw new AuthError('Validation Error!', { cause: { code: zodErr.join(' '), type: 'zod' }});
        },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) { 
        token.email = user.user.email
        token.confirmed = user.user.confirmed
        token.blocked = user.user.blocked
        token.jwt = user.jwt
        token.docId = user.user.documentId
      }
      return token
    },
    async session({ session, token }) {
      session.user.emailVerified = token.confirmed
      session.user.blocked = token.blocked
      session.jwt = token.jwt
      session.user.id = token.docId
      return session
    },
  },
});