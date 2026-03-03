/**
 * Waypoint definitions for the globe experience.
 * Each waypoint represents a portfolio section positioned at a symbolic
 * location on the globe for visual variety (not real geography).
 */

export const waypoints = [
  {
    id: 'about',
    title: 'About',
    center: [-81.38, 28.54],
    zoom: 4,
    pitch: 45,
    bearing: 0,
    description: 'Learn about Luke Decker - map designer and cartographic strategist.',
  },
  {
    id: 'case-studies',
    title: 'Case Studies',
    center: [-98, 38],
    zoom: 3,
    pitch: 45,
    bearing: 20,
    description: 'Real-world mapping projects.',
    children: [
      {
        id: 'sunbridge',
        title: 'Sunbridge',
        center: [-81.15, 28.30],
        zoom: 3.5,
        pitch: 40,
        bearing: 10,
        description: 'Homefinder Map Refresh (2025).',
      },
      {
        id: 'lakewood-ranch',
        title: 'Lakewood Ranch',
        center: [-82.40, 27.39],
        zoom: 3,
        pitch: 45,
        bearing: 15,
        description: 'Community & Selector Map Experiences.',
      },
      {
        id: '30dmc-spaceflight',
        title: 'Spaceflight History',
        center: [-80.60, 28.57],
        zoom: 3.5,
        pitch: 40,
        bearing: -10,
        description: '30 Day Map Challenge - 8-Bit Launch Visualization.',
      },
      {
        id: '30dmc-traffic',
        title: 'Traffic Simulation',
        center: [-118.24, 34.05],
        zoom: 3,
        pitch: 45,
        bearing: 20,
        description: '30 Day Map Challenge - Real-Time Vehicle Simulation.',
      },
      {
        id: '30dmc-multifamily',
        title: 'Multifamily Layers',
        center: [-73.97, 40.75],
        zoom: 3.5,
        pitch: 40,
        bearing: -15,
        description: '30 Day Map Challenge - Multi-Zoom Community Visualization.',
      },
      {
        id: '30dmc-tectonic',
        title: 'Tectonic Plates',
        center: [-19.02, 64.96],
        zoom: 3,
        pitch: 45,
        bearing: 10,
        description: '30 Day Map Challenge - Lava-Style Tectonic Visualization.',
      },
    ],
  },
  {
    id: 'featured',
    title: 'Featured',
    center: [-122.42, 37.77],
    zoom: 3.5,
    pitch: 45,
    bearing: -15,
    description: 'Videos and publications.',
  },
  {
    id: 'skills',
    title: 'Skills',
    center: [-77.04, 38.91],
    zoom: 3.5,
    pitch: 50,
    bearing: -20,
    description: 'Technical skills and tools of the trade.',
  },
  {
    id: 'certificates',
    title: 'Certificates',
    center: [-86.80, 36.16],
    zoom: 4,
    pitch: 45,
    bearing: 10,
    description: 'Professional certifications and credentials.',
  },
  {
    id: 'contact',
    title: 'Contact',
    center: [-80.19, 25.76],
    zoom: 4,
    pitch: 50,
    bearing: 0,
    description: 'Get in touch.',
  },
];

/**
 * Get all waypoints flattened (parents + children) for map markers.
 */
export function getAllWaypointsFlat() {
  return waypoints.flatMap((wp) =>
    wp.children ? [wp, ...wp.children] : [wp]
  );
}

/**
 * Content data for each section, keyed by waypoint id.
 */
export const sectionContent = {
  about: {
    heading: 'Luke Decker',
    subheading: 'Map Designer, Cartography, GIS Engineer',
    body: 'I replace static PDFs and manual data-visualization workflows with interactive mapping experiences, with 4+ years of experience in digital cartography.',
  },
  skills: {
    heading: 'Skills',
    categories: [
      {
        label: 'Mapping & GIS',
        items: ['Mapbox GL JS', 'Mapbox Studio', 'QGIS', 'ArcGIS Pro', 'GeoJSON', 'SQL', 'Spatial Analysis'],
      },
      {
        label: 'Design & Automation',
        items: ['Blender', 'Adobe Creative Suite', 'Figma', 'Data Visualization', 'UX/UI Design', 'n8n'],
      },
    ],
  },
  certificates: {
    heading: 'Certificates',
    items: [
      { title: 'Trustworthy Generative AI', issuer: 'Vanderbilt University', year: '2026' },
      { title: 'Claude Code: Software Engineering with AI Agents', issuer: 'Vanderbilt University', year: '2025' },
      { title: 'Foundations of UX Design', issuer: 'Google', year: '2024' },
      { title: 'AI: Implications for Business Strategy', issuer: 'MIT Sloan Executive Education', year: '2024' },
      { title: 'Prompt Engineering for ChatGPT', issuer: 'Vanderbilt University', year: '2024' },
      { title: 'Digital Marketing Strategy & Analytics', issuer: 'Columbia Business School', year: '2023' },
    ],
  },
  'sunbridge': {
    title: 'Sunbridge',
    subtitle: 'Homefinder Map Refresh (2025)',
    overview: 'In early 2025, I led the complete refresh of the interactive Sunbridge Homefinder map, modernizing a longstanding community map to showcase Sunbridge\'s evolving neighborhoods and amenities.',
    challenge: 'Sunbridge had a functional but dated interactive map that needed more current data, stronger cartography, clearer navigation, and coordinated alignment across marketing, product, customer service, and internal stakeholders without disrupting the existing digital experience.',
    role: 'Lead GIS and cartographic designer, responsible for client communication, data management, Mapbox styling, visual redesign, and cross-functional coordination across product, leadership, engineering, marketing, and customer service.',
    solution: [
      { heading: 'Enhanced Environmental Identity', detail: 'Introduced custom 2D tree sprites to better represent green space and visually reinforce parks, trails, and natural areas without relying on heavier 3D assets.', media: null },
      { heading: 'Roadway Detail and Infrastructure Clarity', detail: 'Added road centerlines, labels, crosswalk markings, and parking lot striping so circulation and built infrastructure read clearly at interactive map scale.', media: null },
      { heading: 'Amenity Differentiation', detail: 'Applied stronger visual hierarchy and labeling for tennis courts, pickleball courts, pools, and community buildings so amenities felt like purposeful destinations instead of generic polygons.', media: null },
      { heading: 'Dynamic Neighborhood Labeling', detail: 'Introduced neighborhood labels at appropriate zoom levels to improve orientation and help users understand how the broader community is organized.', media: null },
    ],
    impact: [
      'Quickly communicates community structure, green space, and amenities.',
      'Helps prospective buyers better evaluate neighborhood location and context.',
      'Improves navigation clarity through stronger hierarchy and more lifelike cartography.',
    ],
    results: [],
    tags: ['Mapbox GL JS', 'GIS Data Management', 'Cartography', 'Real Estate UX'],
    featuredImage: '/content/sunbridge/CleanShot 2026-03-03 at 09.33.48@2x.png',
    videoUrl: null,
    gallery: [],
    liveUrl: 'https://sunbridgefl.com/Interactive-Map/',
    liveLabel: 'View Live Interactive Map',
  },
  'lakewood-ranch': {
    title: 'Lakewood Ranch',
    subtitle: 'Community & Selector Map Experiences',
    overview: 'I led GIS data management, base map development, and interactive storytelling experiences for the Lakewood Ranch Community and Selector maps, helping users explore one of the largest master-planned communities in the United States.',
    challenge: 'Lakewood Ranch spans more than 32,000 acres with a complex mix of villages, amenities, residential zones, and points of interest, so the experience had to balance large-scale context, neighborhood-level detail, scrollytelling journeys, and stakeholder expectations without overwhelming users.',
    role: 'Responsible for complete GIS data management across the community, Mapbox base map design, neighborhood and infrastructure mapping, scrollytelling tour creation, and close collaboration with frontend engineers on interaction logic and performance.',
    solution: [
      { heading: 'Large-Scale GIS Data Management', detail: 'Standardized and maintained datasets for neighborhood boundaries, amenities, points of interest, circulation infrastructure, villages, and residential zones so the mapping experience could scale reliably.', media: null },
      { heading: 'Tailored Base Map Design', detail: 'Built a custom Mapbox style that emphasized community hierarchy, legible labels across zoom levels, and clear visual separation between categories of features.', media: null },
      { heading: 'Interactive Scrollytelling Tours', detail: 'Created guided narrative tours that walk users through amenity categories, neighborhood relationships, and lifestyle-based experiences instead of relying on static browsing alone.', media: null },
      { heading: 'Cross-Team Engineering Integration', detail: 'Worked directly with frontend developers to align data schemas, filter logic, transitions, and responsive behavior so the custom experiences stayed performant across devices.', media: null },
    ],
    impact: [
      'Supports meaningful exploration of neighborhoods, amenities, and lifestyle offerings.',
      'Gives users both macro community context and micro-level place detail.',
      'Strengthens digital storytelling for a nationally recognized master-planned community.',
    ],
    results: [],
    tags: ['Mapbox GL JS', 'GIS Data Management', 'Scrollytelling', 'Frontend Collaboration'],
    featuredImage: '/content/lakewood-ranch/CleanShot 2026-03-03 at 09.57.33@2x.png',
    videoUrl: null,
    gallery: [],
    liveUrl: 'https://lakewoodranch.com/around-the-area/community-maps/',
    liveLabel: 'View Community & Regional Maps',
  },
  '30dmc-spaceflight': {
    title: 'US Spaceflight History',
    subtitle: '30 Day Map Challenge - 8-Bit Space Launch Visualization',
    overview: 'An interactive retro-styled visualization of 65 years of United States spaceflight history, from 1957 Vanguard tests through the SpaceX era, with each launch rendered as a 3D arch soaring from the planet surface.',
    challenge: '30 Day Map Challenge prompts: Day 18 "Out of this world" and Day 28 "Black" - visualize spaceflight data in a way that captures the scope of 65 years of missions while maintaining visual impact.',
    role: 'Personal creative project for the 2025 30 Day Map Challenge.',
    solution: [
      { heading: 'Retro CRT Aesthetic', detail: 'Custom CSS shaders and particle swarm renderer create a nostalgic 8-bit computer aesthetic with sound design for enhanced immersion.', media: null },
      { heading: '3D Launch Arcs', detail: 'Each space launch appears as a living 3D arch soaring from the planet surface, visualizing approximately 65 years of mission data in an animated format.', media: null },
    ],
    results: [],
    tags: ['Mapbox GL JS', 'WebGL', 'Data Visualization', 'Creative'],
    featuredImage: '/content/30dmc-spaceflight/space 1.png',
    videoUrl: null,
    gallery: [],
    liveUrl: 'https://www.linkedin.com/posts/luke-h-decker_30daymapchallenge-builtwithmapbox-dataviz-activity-7400718700686888960-J9S1',
  },
  '30dmc-traffic': {
    title: 'Rush Hour Traffic Simulation',
    subtitle: '30 Day Map Challenge - Real-Time Vehicle Simulation',
    overview: 'A real-time traffic simulation where every vehicle makes independent decisions each second - monitoring spacing, responding to traffic signals, and dynamically adjusting acceleration and braking.',
    challenge: '30 Day Map Challenge prompt: Day 26 "Transportation" - build a traffic simulation where vehicles behave autonomously rather than follow pre-rendered animation paths.',
    role: 'Personal creative project for the 2025 30 Day Map Challenge.',
    solution: [
      { heading: 'Autonomous Vehicle Logic', detail: 'Each vehicle independently monitors spacing to cars ahead, responds to traffic light signals, and adjusts acceleration and braking in real time.', media: null },
      { heading: 'Dynamic Simulation Engine', detail: 'Rather than pre-rendered animations, the simulation runs live with vehicles making real-time decisions based on surrounding traffic conditions.', media: null },
    ],
    results: [],
    tags: ['Mapbox GL JS', 'Simulation', 'JavaScript', 'Creative'],
    featuredImage: '/content/30dmc-traffic/rush hour 1.png',
    videoUrl: null,
    gallery: [
      { type: 'image', src: '/content/30dmc-traffic/rush hour 2.png', alt: 'Intersection detail', caption: 'Vehicles responding to traffic signals' },
      { type: 'image', src: '/content/30dmc-traffic/rush hour 3.png', alt: 'Rush hour overview', caption: 'Full simulation at peak traffic' },
    ],
    liveUrl: 'https://www.linkedin.com/posts/luke-h-decker_30daymapchallenge-mapbox-dataviz-activity-7399727887819489280-zr_m',
  },
  '30dmc-multifamily': {
    title: 'Multifamily Community Layers',
    subtitle: '30 Day Map Challenge - Multi-Zoom Community Visualization',
    overview: 'A layered map visualization of a theoretical multifamily residential community that reveals increasing detail at each zoom level - from parking lots and points of interest down to individual unit availability inside buildings.',
    challenge: '30 Day Map Challenge prompts: Day 21 "Icons" and Day 6 "Dimensions" - show how communities have layers of complexity that can be revealed through progressive zoom levels.',
    role: 'Personal creative project for the 2025 30 Day Map Challenge.',
    solution: [
      { heading: 'Progressive Detail', detail: 'Surface-level view shows parking lots and points of interest, while zooming in causes residential buildings to break apart and reveal unit-level availability.', media: null },
      { heading: 'Multi-Source Data', detail: 'Integrates OpenStreetMap data, Mapbox Satellite imagery, and custom datasets with different visual styles at each zoom level.', media: null },
    ],
    results: [],
    tags: ['Mapbox GL JS', 'Real Estate', 'Data Visualization', 'Creative'],
    featuredImage: '/content/30dmc-multifamily/multifam 1.png',
    videoUrl: null,
    gallery: [
      { type: 'image', src: '/content/30dmc-multifamily/multifam 2.png', alt: 'Zoomed-out community view', caption: 'Surface-level parking and POI layer' },
      { type: 'image', src: '/content/30dmc-multifamily/multifam 3.png', alt: 'Zoomed-in unit view', caption: 'Building breakout showing unit availability' },
    ],
    liveUrl: 'https://www.linkedin.com/posts/luke-h-decker_30daymapchalllenge-gis-mapping-activity-7398749364912861184-60Pl',
  },
  '30dmc-tectonic': {
    title: 'Global Tectonic Structure',
    subtitle: '30 Day Map Challenge - Lava-Style Tectonic Visualization',
    overview: 'A cinematic lava-style thematic map layering global microplates, major fault zones, and plate interfaces over shaded relief, revealing how the planet fits together beneath our feet.',
    challenge: '30 Day Map Challenge: Day 5 - create a compelling visualization of Earth\'s tectonic structure using multiple geospatial datasets.',
    role: 'Personal creative project for the 2025 30 Day Map Challenge.',
    solution: [
      { heading: 'Lava-Style Rendering', detail: 'Distinctive warm color palette reminiscent of molten material, highlighting geological features with a cinematic aesthetic.', media: null },
      { heading: 'Multi-Layer Integration', detail: 'Three primary datasets layered together: USGS tectonic plates and fault zones, Natural Earth land boundaries at 10m resolution, and Natural Earth shaded relief raster.', media: null },
      { heading: 'Motion Design', detail: 'Adobe After Effects used to add cinematic animations, bringing the tectonic visualization to life with dynamic motion and polish.', media: null },
    ],
    results: [],
    tags: ['Mapbox GL JS', 'USGS Data', 'Data Visualization', 'Adobe After Effects', 'Creative'],
    featuredImage: '/content/30dmc-tectonic/tectonic 1.png',
    videoUrl: null,
    gallery: [],
    liveUrl: 'https://www.linkedin.com/posts/luke-h-decker_30daymapchallenge-gis-mapping-activity-7394747654150311936-Gehf',
  },
  featured: {
    heading: 'Featured In',
    items: [
      {
        title: 'The Art of Place: Maps That Merge Design, Data, and Discovery',
        source: 'Mapbox BUILD 2025',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=Svkt4e1k3iY',
      },
      {
        title: 'BUILD 2024 - Developer Show & Tell',
        source: 'Mapbox BUILD 2024',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=6AwdgJE4ytI',
      },
      {
        title: 'Mapbox 2025: A Year of Growth, Community, and New Ideas',
        source: 'Mapbox Blog',
        type: 'article',
        url: 'https://www.mapbox.com/blog/mapbox-2025-a-year-of-growth-community-and-new-ideas',
      },
      {
        title: 'Inspiring Map Projects from Build with Mapbox 2025',
        source: 'Mapbox Blog',
        type: 'article',
        url: 'https://www.mapbox.com/blog/inspiring-map-projects-from-build-with-mapbox-2025',
      },
    ],
  },
  contact: {
    heading: 'Contact',
    email: 'lukehdeck@gmail.com',
    links: [
      { label: 'LinkedIn', url: 'https://linkedin.com/in/luke-h-decker' },
    ],
    message: '',
  },
};
