
import "@/styles/LeftPanel.css";
import FeatureCard from "./FeatureCard";
import QuoteCard from "./QuoteCard";

import {
    Shield,
    Users,
    BarChart3,
    HeartHandshake,
} from "lucide-react";

const LeftPanel = () => {
    return (
        <div className="leftPanel">

            {/* <img
                src="/images/ncwLogo.png"
                className="ncwLogo"
                alt="NCW"
            /> */}

            <h1>
                Empowering Women.
                <br />
                <span>Building a Safer India.</span>
            </h1>

            <p className="subtitle">
                NCW Admin Portal is a secure platform to manage,
                monitor and support initiatives for women's safety,
                rights and empowerment.
            </p>

            <div className="featureList">

                <FeatureCard
                    icon={<Shield size={20}/>}
                    title="Secure & Confidential"
                    description="Protected access for authorized administrators only."
                />

                <FeatureCard
                    icon={<Users size={20}/>}
                    title="Efficient Management"
                    description="Streamlined tools for case handling and monitoring."
                />

                <FeatureCard
                    icon={<BarChart3 size={20}/>}
                    title="Data-Driven Insights"
                    description="Real-time dashboards and analytics."
                />

                <FeatureCard
                    icon={<HeartHandshake size={20}/>}
                    title="Support & Empower"
                    description="Working together for women's safety."
                />

            </div>

            <QuoteCard/>

        </div>
    );
};

export default LeftPanel;