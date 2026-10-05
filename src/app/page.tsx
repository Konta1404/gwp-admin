import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
    title:
        "GWP dashboard prototype",
    description: "Template-based dashboard demonstration; charts contain sample data.",
};

export default function Home() {
    return (
        <>
            <DefaultLayout>
                <p className="mb-4" role="note">Dashboard prototype — charts and tables contain sample data.</p>
                <ECommerce />
            </DefaultLayout>
        </>
    );
}
