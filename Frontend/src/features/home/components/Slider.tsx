import { useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  FileText,
  Scale,
  Megaphone,
  FileBarChart2,
} from 'lucide-react';
import { HiOutlineDocumentText, HiOutlineShieldCheck } from 'react-icons/hi2';
import Button from '../../../components/ui/Button/Button';
import Carousel from '../../../components/ui/Carousel/Carousel';
import type { CarouselImage } from '../../../components/ui/Carousel/Carousel';
import Slide from "../../../components/ui/HeroCarousel/Slide";
import type { SlideImage } from "../../../components/ui/HeroCarousel/Slide";
import "../../../styles/Hero.css";

const HERO_IMAGES_Top: SlideImage[] = [
  {
    src: '/images/Women-Safety1.jpeg',
    alt: 'Women Safety',
  },
  {
    src: '/images//Women-Safety2.jpeg',
    alt: 'Support',
  },
  {
    src: '/images//Women-Safety3.jpeg',
    alt: 'Legal Assistance',
  },
];

const HERO_IMAGES: CarouselImage[] = [
  { src: '/images/a.jpeg', alt: 'Portal support illustration, slide 1' },
  { src: '/images/b.jpeg', alt: 'Portal support illustration, slide 2' },
  { src: '/images/c.jpeg', alt: 'Portal support illustration, slide 3' },
  { src: '/images/d.jpeg', alt: 'Portal support illustration, slide 4' },
];

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const SERVICES: Service[] = [
  {
    icon: FileText,
    title: 'File a Complaint',
    description: 'Report any issue related to women rights and safety.',
  },
  {
    icon: Scale,
    title: 'Know Your Rights',
    description: 'Learn about your legal rights and protections.',
  },
  {
    icon: Megaphone,
    title: 'Awareness Initiatives',
    description: 'Campaigns and programs for women empowerment.',
  },
  {
    icon: FileBarChart2,
    title: 'Reports & Publications',
    description: 'Access important reports, guidelines and publications.',
  },
];

function Slider() {
  const navigate = useNavigate();

  return (
    <section className="hero"  >

      <div className="hero__arc" aria-hidden="true" />

      <Slide
        images={HERO_IMAGES_Top}
        intervalMs={5000}
        showArrows={true}
        showDots={true}
      />

       <div className="hero__grid ">
        <div className="hero__content">
          <span className="hero__eyebrow">
            A confidential, women-centric support portal
          </span>

          <h1 className="hero__title">
            A safe space to be heard, <em>and to be helped.</em>
          </h1>

          <p className="hero__body">
            Women Portal connects you with verified support services,
            guidance, and a straightforward way to report concerns —
            handled with care, confidentiality, and by people trained to
            listen.
          </p>

          <div className="hero__actions">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/get-support")}
            >
              <HiOutlineDocumentText />
              File a Complaint
            </Button>

            <Button variant="ghost" size="lg">
              <HiOutlineShieldCheck />
              Know Your Rights
            </Button>
          </div>
        </div>

        <div className="hero__media">
          <div className="hero__media-frame">
            <Carousel
              images={HERO_IMAGES}
              intervalMs={5000}
              
            />
          </div>
        </div>
      </div>


   <section id="learn-more" className="hero__services">

        {SERVICES.map((service, index) => {

          const Icon = service.icon;

          return (

            <div className="service-card" key={index}>

              <div className="service-icon">
                <Icon size={34} strokeWidth={2} />
              </div>

              <div className="service-content">

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <button
                  className="service-link"
                  onClick={() => navigate('/get-support')}
                >
                  Know More →
                </button>

              </div>

            </div>

          );

        })}

      </section> 

    </section>
  );
}

export default Slider;
