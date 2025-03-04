import React from "react";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

interface LoginButtonProps {
    session: Session | null;
    admin: boolean;
}

function getColor(session: Session | null, admin: boolean): string {
    if (!session) return "#A33434";
    return admin ? "#FAB400" : "#5CCBCB";
}

export default function LoginButton({ session, admin }: LoginButtonProps) {
    return (
        <a className="login-btn" onClick={() => session ? signOut() : signIn("eveonline")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 18 18">
                <path fill={getColor(session, admin)}
                      d="m5.996 13.04-3.1 1.001.4 1.647h5.758V3.368c-3.533 0-3.063 3.973-3.063 3.973.007.199-.14.098-.172.094-.329-.024-.195.838-.116 1.207.076.37.107.488.234.819.127.33.389.28.389.28l.166 1.067c.079.499.39.788.39.788s0 .05-.068.697c-.07.648-.818.746-.818.746Z"></path>
                <path fill={getColor(session, admin)}
                      d="M9.056 3.368c3.533 0 3.063 3.973 3.063 3.973-.007.199.14.098.172.094.329-.024.195.838.116 1.208-.076.37-.107.487-.234.818-.127.33-.39.28-.39.28l-.163 1.067c-.079.499-.39.788-.39.788s0 .05.068.697c.068.648.816.749.816.749l3.1 1.001-.4 1.648H9.055V3.368Zm3.574-2.312H5.482L1.174 11.731l1.239 5.084h13.282l1.238-5.084L12.63 1.056ZM13.315.04l4.686 11.616-1.505 6.175H1.616L.111 11.655 4.797.039h8.518Z"></path>
            </svg>
        </a>
    );
}