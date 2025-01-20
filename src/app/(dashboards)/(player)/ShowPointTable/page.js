'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PointTableDetails from "@/components/PointTableDetails";

const ShowPointTable = () => {

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
            <PointTableDetails />
        </>
    );
};

export default ShowPointTable;
