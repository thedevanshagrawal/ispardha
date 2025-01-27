"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MatchFixturePlayers from "@/components/MatchFixturePlayers";

const FixturePlayers = () => {

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/");
        } else {

        }
    }, [session, status, router]);


    return (
        <>
            <MatchFixturePlayers />
        </>
    );
};

export default FixturePlayers;
