/*
NextAuth setup adapted from YouTube Tutorial.
https://www.youtube.com/watch?v=n-fVrzaikBQ
https://github.com/machadop1407/nextjs-15-authentication-next-auth
*/

import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const { auth, handlers, signIn, signOut }  = NextAuth({
    providers: [SpotifyProvider({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        authorization:'https://accounts.spotify.com/authorize?scope=playlist-modify-public',
    })],
    callbacks: {

        async jwt({ token, account }) {
            if(account){
                token.access_token = account.access_token;
                token.refresh_token = account.refresh_token;
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                token
            }
    }}});
