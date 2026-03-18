// Import all images from assets folder
import aboutAircraft from './about - aircraft.jfif';
import aboutPart from './about - part.jfif';
import aircraftMaintenance1 from './Aircraft Maintenance 1.jfif';
import aircraftMaintenance2 from './Aircraft Maintenance 2.jfif';
import aircraftParts1 from './Aircraft Parts 1.jfif';
import aircraftParts2 from './Aircraft Parts 2.jfif';
import aircraftSolutions1 from './Aircraft Solutions 1.jfif';
import aircraftSolutions2 from './Aircraft Solutions 2.jfif';
import commercialAviation1 from './Commercial Aviation 1.jfif';
import commercialAviation2 from './Commercial Aviation 2.jfif';
import helicopters1 from './Helicopters 1.jfif';
import helicopters2 from './Helicopters 2.jfif';
import logo from './logo.png';
import militaryDivision1 from './Military Division 1.jfif';
import militaryDivision2 from './Military Division 2.jfif';

// Export all assets as a structured object
export const assets = {
  logo,
  about: {
    aircraft: aboutAircraft,
    part: aboutPart,
  },
  services: {
    aircraftMaintenance1,
    aircraftMaintenance2,
    aircraftParts1,
    aircraftParts2,
    aircraftSolutions1,
    aircraftSolutions2,
    commercialAviation1,
    commercialAviation2,
    helicopters1,
    helicopters2,
    militaryDivision1,
    militaryDivision2,
  }
};

// Placeholder data for services and work portfolio
// In production, this data should come from the API

export const serviceData = [
  {
    id: 1,
    slug: 'web-development',
    title: 'Web Development',
    description: 'Custom web development solutions tailored to your business needs.',
    fullDescription: 'We create modern, responsive websites and web applications using the latest technologies.',
    image: '/placeholder-service.jpg',
    features: ['Responsive Design', 'Modern Technologies', 'SEO Optimized', 'Fast Performance']
  },
  {
    id: 2,
    slug: 'mobile-development',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications.',
    fullDescription: 'Build powerful mobile apps for iOS and Android platforms.',
    image: '/placeholder-service.jpg',
    features: ['Native Apps', 'Cross-Platform', 'UI/UX Design', 'App Store Optimization']
  }
]

export const workData = [
  {
    id: 1,
    slug: 'project-one',
    title: 'Project One',
    description: 'A sample project showcasing our work.',
    fullDescription: 'Detailed description of the project and technologies used.',
    image: '/placeholder-work.jpg',
    category: 'Web Development',
    client: 'Sample Client',
    year: '2024'
  },
  {
    id: 2,
    slug: 'project-two',
    title: 'Project Two',
    description: 'Another sample project from our portfolio.',
    fullDescription: 'Detailed description of the project and technologies used.',
    image: '/placeholder-work.jpg',
    category: 'Mobile Development',
    client: 'Sample Client',
    year: '2024'
  }
]
