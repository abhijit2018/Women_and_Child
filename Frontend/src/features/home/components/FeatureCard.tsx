import "@/styles/FeatureCard.css";

interface Props{
    icon:any;
    title:string;
    description:string;
}

const FeatureCard = ({icon,title,description}:Props)=>{

    return(

        <div className="featureCard">

            <div className="iconCircle">
                {icon}
            </div>

            <div>

                <h3>{title}</h3>

                <p>{description}</p>

            </div>

        </div>

    )

}

export default FeatureCard;