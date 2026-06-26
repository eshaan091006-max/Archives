import { YearKey } from './themeData';

export interface EventInfo {
  id: string;
  title: string;
  description: string;
  tags: string[];
  duration?: string;
  type?: string;
  judgeName?: string;
  judgePhoto?: string;
  winnerName?: string;
  winningContingent?: string;
}

export const eventsData: Record<YearKey, Record<string, EventInfo[]>> = {
  '2023': {
    la: [
      {
        id: 'la-23-1',
        title: 'Fictional Frenzy',
        description: 'An interactive literary challenge where reality and fiction blur into creative storytelling.',
        tags: ['Fiction', 'Creative Writing', 'Literary Arts'],
        judgeName: 'Suhail Nayyar, Pranav Nambiar, Nirali Mehta, Simran Nerurkar',
        judgePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'la-23-2',
        title: 'Mere Sapno Ki Kahani',
        description: 'A beautiful blend of theatrical narration and classical dance, representing dream sequences.',
        tags: ['Narrative', 'Traditional', 'Fusion'],
        judgeName: 'Dr. Rupali Desai, Anuradha Iyengar, Sonia Parchure',
        judgePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'la-23-3',
        title: 'Just A Minute (JAM)',
        description: 'The legendary on-the-spot speaking clash testing fluency, wits, and composure.',
        tags: ['JAM', 'Speaking', 'Improv'],
        judgeName: 'Literary Arts Judges',
        judgePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'la-23-4',
        title: 'News Flash',
        description: 'A mock-journalism breaking news reporting clash.',
        tags: ['Journalism', 'Reporting', 'Speaking'],
        judgeName: 'Dev Kotak, Shishir Joshi',
        judgePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'
      }
    ],
    wpa: [
      {
        id: 'wpa-23-1',
        title: 'Harmonic Havoc',
        description: 'A competitive band and musical performance duel crossing musical styles.',
        tags: ['Music', 'Live Bands', 'Performing Arts'],
        judgeName: 'Thomson Andrews, Manasi Scott',
        judgePhoto: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'wpa-23-2',
        title: 'Sentimental Silhouettes',
        description: 'A dramatic shadow-acting and storytelling performance in the dark.',
        tags: ['Shadow Act', 'Drama', 'Performing Arts'],
        judgeName: 'Roza Rana, Dhruvi Shah',
        judgePhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'wpa-23-3',
        title: 'Chordially Yours',
        description: 'A harmonious vocal and acoustic string duet challenge.',
        tags: ['Acoustic', 'Vocal', 'Performing Arts'],
        judgeName: 'Kunal Basu, Simetri',
        judgePhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'wpa-23-4',
        title: 'Trifecta',
        description: 'The ultimate choreography, performance, and narrative dance showoff.',
        tags: ['Choreography', 'Dance Show', 'Performing Arts'],
        judgeName: 'Tanya Bhushan, Rohan Pal, Somnath Kamble, Tanvi Gadkari, Sahaj Singh Chahal, Palki Malhotra, Shruti Sinha, Shantanu Maheshwari',
        judgePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100'
      }
    ],
    fa: [
      {
        id: 'fa-23-1',
        title: 'News Up',
        description: 'Editorial cartooning and newspaper layout design challenge.',
        tags: ['Cartooning', 'Design', 'Fine Arts'],
        judgeName: 'Abhijit Chaubal, Sefi George',
        judgePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'fa-23-2',
        title: 'Artsy Relay',
        description: 'A multi-artist relay painting challenge where one picks up where the other left off.',
        tags: ['Relay Painting', 'Collaboration', 'Fine Arts'],
        judgeName: 'Bhavna Sonawane, Nikita Saraph',
        judgePhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'fa-23-3',
        title: 'Guess and Paint',
        description: 'An interactive speed painting event testing visual guessing and artistic execution.',
        tags: ['Speed Painting', 'Interactive', 'Fine Arts'],
        judgeName: 'Sumana Dey, Ritesh Gupta',
        judgePhoto: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=100'
      }
    ],
    ipa: [
      {
        id: 'ipa-23-1',
        title: 'Mehfil-e-Malhar',
        description: 'An evening of classical and semi-classical Indian vocal music.',
        tags: ['Indian Classical', 'Vocal', 'Traditional'],
        judgeName: 'Pratibha Singh Baghel (Main Day) | Indian Music Panel (Elims)',
        judgePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'ipa-23-2',
        title: 'Mere Sapno Ki Kahani',
        description: 'A beautiful blend of theatrical narration and classical dance, representing dream sequences.',
        tags: ['Narrative', 'Traditional', 'Fusion'],
        judgeName: 'Dr. Rupali Desai, Anuradha Iyengar, Sonia Parchure',
        judgePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'ipa-23-3',
        title: 'Dastaan-e-Filmy',
        description: 'A dramatic and musical performance paying tribute to legendary eras of Indian cinema.',
        tags: ['Bollywood Drama', 'Music', 'Theatricals'],
        judgeName: 'Srishti Shrivastava, Yashaswini Dayama, Sasha Frank',
        judgePhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'ipa-23-4',
        title: 'Sirf Sattar Second Hai Tumhare Pass',
        description: 'A quick-fire solo dance duel testing energy, rhythm, and classical/folk styles in 70 seconds.',
        tags: ['Solo Dance', 'Quick Fire', 'Rhythm'],
        judgeName: 'Jyothi Naithani Tommaar, Heet Samani, Jahnvi Doshi, Vaishali Sagar, Meera Joshi',
        judgePhoto: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=100'
      }
    ],
    etcw: [
      {
        id: 'etcw-23-1',
        title: 'Field Domination',
        description: 'A classic outdoor athletic and football challenge.',
        tags: ['Sports', 'Football', 'Outdoor'],
        judgeName: 'Sports Committee',
        judgePhoto: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-23-2',
        title: 'ESport',
        description: 'Competitive digital gaming tournament.',
        tags: ['Gaming', 'ESports', 'Tech'],
        judgeName: 'Gaming Committee',
        judgePhoto: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-23-3',
        title: "Ball's in your court now!",
        description: 'A high-pressure interactive crisis resolution and debating duel.',
        tags: ['Debate', 'Crisis Resolution', 'Theatricals'],
        judgeName: 'Student Panel',
        judgePhoto: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-23-4',
        title: 'Direction Workshop (WINC)',
        description: 'A comprehensive workshop on framing, direction, and theatrical screenplay.',
        tags: ['Workshops', 'Direction', 'WINC'],
        judgeName: 'Theatrical Instructors',
        judgePhoto: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-23-5',
        title: 'Dil To Dance Hai Ji (Dance Workshop - WINC)',
        description: 'A fun, interactive Bollywood and street dance tutorial workshop.',
        tags: ['Dance', 'Workshop', 'WINC'],
        judgeName: 'Choreography Experts',
        judgePhoto: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-23-6',
        title: 'Gigglymics',
        description: 'Stand-up comedy, mimicry, and comedy sketch contest.',
        tags: ['Comedy', 'Skit', 'Mimicry'],
        judgeName: 'Nilesh Vaidya',
        judgePhoto: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-23-7',
        title: 'Malharcade',
        description: 'Vibrant arcade gaming finals.',
        tags: ['Gaming', 'Arcade', 'ESports'],
        judgeName: 'ESports Crew',
        judgePhoto: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-23-8',
        title: '(Mal)har ke jeetne Wale Ko Baazigar Kehte Hai',
        description: 'A theatrical acting and script reading clash.',
        tags: ['Acting', 'Drama', 'Theatricals'],
        judgeName: 'Dar Gai, Babil Khan, Rushad Malegam, Krunal Acharya',
        judgePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-23-9',
        title: 'Dastaan-e-Filmy',
        description: 'A dramatic and musical performance paying tribute to legendary eras of Indian cinema.',
        tags: ['Bollywood Drama', 'Music', 'Theatricals'],
        judgeName: 'Srishti Shrivastava, Yashaswini Dayama, Sasha Frank',
        judgePhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-23-10',
        title: 'Solve Or Sink (Escape Room - WINC)',
        description: 'A challenging puzzle solving and physical escape room escape.',
        tags: ['Escape Room', 'Interactive', 'WINC'],
        judgeName: 'Mystery Organizers',
        judgePhoto: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-23-11',
        title: 'Flag Hosting',
        description: 'The ceremonial opening flag hosting event of the festival.',
        tags: ['Ceremonial', 'Event opening'],
        judgeName: 'Malhar OC',
        judgePhoto: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'etcw-23-12',
        title: 'Midnight Murder',
        description: 'An interactive whodunit mystery solving thriller.',
        tags: ['Mystery', 'Interactive', 'Thriller'],
        judgeName: 'Hrishab Kanti, Aditya Kashyap',
        judgePhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-23-13',
        title: 'Movie Screening - Face of the Faceless',
        description: 'The exclusive screening of the award-winning film followed by a director QA.',
        tags: ['Movie Screening', 'Cinema', 'QA'],
        judgeName: 'Film Directors',
        judgePhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-23-14',
        title: "Malhar's Got Talent",
        description: 'The premier platform for performers showcasing unique abilities.',
        tags: ['Talent Show', 'Performances', 'Comedy'],
        judgeName: 'Princy Parikh, Sakshi Shivdasani',
        judgePhoto: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-23-15',
        title: 'Rhythm Riot (Beatboxing Workshop - WINC)',
        description: 'Learn vocal percussion, rhythmic beats, and mic techniques.',
        tags: ['Beatboxing', 'Workshop', 'WINC'],
        judgeName: 'Vocal Artists',
        judgePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100'
      }
    ]
  },
  '2024': {
    la: [
      {
        id: 'la-24-1',
        title: 'For the Plot',
        description: 'An evening of storytelling secrets with Amish Tripathi, the best-selling author of The Shiva Trilogy.',
        tags: ['Storytelling', 'Creative Writing', 'Literary Arts'],
        judgeName: 'Amish Tripathi',
        judgePhoto: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'la-24-2',
        title: 'Toast and J.A.M',
        description: 'Just A Minute speaking challenge and classic toastmaster clash.',
        tags: ['JAM', 'Speaking', 'Improv', 'Literary Arts'],
        judgeName: 'Arvind Krishnan',
        judgePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'la-24-3',
        title: 'Shayrana Rang Malhar ke Sang',
        description: 'Poetic verses and soulful shayaris presented by contestants.',
        tags: ['Poetry', 'Shayari', 'Literary Arts'],
        judgeName: 'Dhruv Sharma, Amit Singh (Elims) | Ashwani Mittal, Navin Joshi (Finals)',
        judgePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'la-24-4',
        title: 'Forge A Fact',
        description: 'A battle of quick wit, facts, and logic where reality is bent with conviction.',
        tags: ['Speaking', 'Debate', 'Literary Arts'],
        judgeName: 'Kareema Barry, Dalip Tahil, Aayush Borulkar',
        judgePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'la-24-5',
        title: 'Darr ke Aage Drama hain',
        description: 'A dramatic fusion event combining literary expressions and pure performance drama.',
        tags: ['Drama', 'Acting', 'Theatricals'],
        judgeName: 'Nikita Dutta, Shreas Pardiwala',
        judgePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
      }
    ],
    wpa: [
      {
        id: 'wpa-24-1',
        title: 'Street it Up',
        description: 'A high-energy street dance battle showcasing raw style and synchronization.',
        tags: ['Street Dance', 'Hip Hop', 'Performing Arts'],
        judgeName: "Jason D'lima (Elims) | Dharmik Samani, Saumya Kamble (Finals)",
        judgePhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'wpa-24-2',
        title: 'Jab Diljit met Ed',
        description: 'A fusion musical concert where Punjabi beats and Western pop clash in harmony.',
        tags: ['Fusion Music', 'Pop', 'Melody'],
        judgeName: 'Broken Echoes (Elims) | Jeanne Merchant, Maahi, Nirali Kartik (Finals)',
        judgePhoto: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'wpa-24-3',
        title: 'Glow and Behold',
        description: 'A breathtaking performance using illuminated gear and visual choreographies in the dark.',
        tags: ['Light Dance', 'Visual Arts', 'Performing Arts'],
        judgeName: 'Ranjeet Thakur, Sandeepa Dhar | Chief Guests: MJ5',
        judgePhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'wpa-24-4',
        title: 'Improv ne bana di Jodi',
        description: 'On-the-spot improvisational acting duel in pairs.',
        tags: ['Improv', 'Acting', 'Comedy'],
        judgeName: 'Kunal Bhan, Kajol Chugh',
        judgePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'
      }
    ],
    fa: [
      {
        id: 'fa-24-1',
        title: 'Masterpiece Medley',
        description: 'A fine arts challenge testing canvas skills and compositional brilliance.',
        tags: ['Painting', 'Aesthetics', 'Fine Arts'],
        judgeName: 'Akshita Makhija (Elims) | Naitik Jain, Shubham Kamble (Finals)',
        judgePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'fa-24-2',
        title: 'Mosaic Montage',
        description: 'Creating intricate mosaic art patterns under limited time.',
        tags: ['Mosaic', 'Design', 'Fine Arts'],
        judgeName: 'Tanya Singh (Elims) | Deepti Gupta, Kavita Suthar (Finals)',
        judgePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'fa-24-3',
        title: 'Artathalon',
        description: 'A marathon style art competition spanning multiple design phases.',
        tags: ['Design', 'Fine Arts', 'Marathon'],
        judgeName: 'Fine Arts Committee',
        judgePhoto: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'fa-24-4',
        title: 'Malhar Melange',
        description: 'Mixed-media art fusion bringing together elements of painting, sculpture, and origami.',
        tags: ['Mixed Media', 'Sculpture', 'Fine Arts'],
        judgeName: 'Dhanya Namboothiri, Kanak Nanda',
        judgePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'fa-24-5',
        title: 'Capture if you Can',
        description: 'Photography contest capturing the visual essence and energy of the festival.',
        tags: ['Photography', 'Aesthetics', 'Fine Arts'],
        judgeName: 'Hansai Mehta, Mohit Suri (Finals) | Jahaan Noble (Elims)',
        judgePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'
      }
    ],
    ipa: [
      {
        id: 'ipa-24-1',
        title: 'Navras',
        description: 'A classical Indian dance showcase themed on the nine emotions of human experience.',
        tags: ['Classical Dance', 'Traditional', 'Indian Performing Arts'],
        judgeName: 'Vijayshree Chaudhary, Priya Bijlani (Finals) | Mrs. Hetal Karmakar (Elims)',
        judgePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'ipa-24-2',
        title: 'Raagon Ki Baarat',
        description: 'Soulful classical vocal music clash tracing classical ragas.',
        tags: ['Vocal', 'Classical Music', 'Indian Performing Arts'],
        judgeName: 'Soma Bhattacharya (Elims) | Priya Raina, Ruchi Fonseca (Finals)',
        judgePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'ipa-24-3',
        title: 'Jab Diljit met Ed',
        description: 'A fusion musical concert where Punjabi beats and Western pop clash in harmony.',
        tags: ['Fusion Music', 'Pop', 'Melody'],
        judgeName: 'Broken Echoes (Elims) | Jeanne Merchant, Maahi, Nirali Kartik (Finals)',
        judgePhoto: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'ipa-24-4',
        title: 'Malhari',
        description: 'A vibrant showcase of traditional Indian folk dance forms.',
        tags: ['Folk Dance', 'Traditional', 'Indian Performing Arts'],
        judgeName: 'Parth Patel, Jyothi D. Tommaar (Finals) | Jiten Mehta (Elims)',
        judgePhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'ipa-24-5',
        title: "(Beat)Hoven's Ballad",
        description: 'Instrumental and classical melody competition.',
        tags: ['Instrumental', 'Classical Music', 'Performing Arts'],
        judgeName: 'Mihir Ahuja',
        judgePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100'
      }
    ],
    etcw: [
      {
        id: 'etcw-24-1',
        title: 'Field Domination Football',
        description: "Classic football tournament testing agility, strategy, and team cohesion.",
        tags: ['Sports', 'Football', 'Outdoor'],
        judgeName: 'Clive Baretto, Errol Noronha, Rynel Fernandes',
        judgePhoto: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-24-2',
        title: 'ESports',
        description: 'Competitive multiplayer gaming championship.',
        tags: ['ESports', 'Gaming', 'Tech'],
        judgeName: 'Gaming Coordinators',
        judgePhoto: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-24-3',
        title: 'Press Play',
        description: 'High-stakes theatrical skit and stage play challenge.',
        tags: ['Theatricals', 'Skit', 'Drama'],
        judgeName: 'Neil Bhoopalam, Lekha Prajapati, Rohit Mehra (Finals) | Sahir Mehta (Elims)',
        judgePhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-24-4',
        title: 'Dil Bole Hadippa (Workshop)',
        description: 'A high-octane Bollywood dance workshop filled with energetic steps.',
        tags: ['Dance', 'Workshop', 'Interactive'],
        judgeName: 'Tejas Dhoke',
        judgePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-24-5',
        title: 'The Podcast Academy (Workshop)',
        description: 'Step-by-step masterclass on hosting, producing, and recording high-quality podcasts.',
        tags: ['Podcast', 'Workshop', 'Media'],
        judgeName: 'Ashna Sharma',
        judgePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-24-6',
        title: 'Clone-a-Drone (Workshop)',
        description: 'Aerodynamic physics, drone fabrication, and flight training session.',
        tags: ['Drone', 'Workshop', 'Tech'],
        judgeName: 'Space Geeks (StartUp)',
        judgePhoto: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-24-7',
        title: 'Friends or Foe?',
        description: 'Thrilling mystery room escape experience testing problem-solving.',
        tags: ['Mystery', 'Interactive', 'Escape Room'],
        judgeName: 'Mystery Room Team',
        judgePhoto: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-24-8',
        title: 'Darr ke Aage Drama hain',
        description: 'A dramatic fusion event combining literary expressions and pure performance drama.',
        tags: ['Drama', 'Acting', 'Theatricals'],
        judgeName: 'Nikita Dutta, Shreas Pardiwala',
        judgePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-24-9',
        title: 'Mic Drop (Workshop)',
        description: 'Voiceover acting, narration, and pitch control workshop.',
        tags: ['Voiceover', 'Workshop', 'Interactive'],
        judgeName: 'Vijay Vikram Singh',
        judgePhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: 'etcw-24-10',
        title: 'Malhar Around the World',
        description: 'Dramatic skit challenge representing cultural storylines worldwide.',
        tags: ['Skit', 'Theatricals', 'Drama'],
        judgeName: 'Shweta Tripathi Sharma, Barkha Singh (Finals) | Vaishali Jaggi (Elims)',
        judgePhoto: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=100'
      }
    ]
  },
  '2025': {
    la: [
      {
        id: 'la-25-1',
        title: 'Facts in Fiction',
        description: 'A satirical storytelling competition where reality bends into satirical narratives.',
        tags: ['Satire', 'Storytelling', 'Literary Arts'],
        judgeName: 'Rohit Shah, Devanshi Shah, Neville Bharucha, Nathan Gomes, Nilesh Vaidya',
        judgePhoto: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'la-25-2',
        title: "What's in a Jam?",
        description: 'Just A Minute on-the-spot speaking clash where hesitation, repetition, or deviation ends your run.',
        tags: ['Speaking', 'J.A.M.', 'Improvisation'],
        judgeName: 'Arvind Krishnan',
        judgePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'la-25-3',
        title: 'Lights, Camera, Sell!',
        description: 'An advertising pitch challenge where participants conceptualize and perform full ad campaigns on the spot.',
        tags: ['Advertising', 'Pitching', 'Creativity'],
        judgeName: 'Roger C.B. Pereira, Advait Chandan',
        judgePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'la-25-4',
        title: "Poet's Cut",
        description: 'A performance poetry slam merging written prose with raw emotional theater.',
        tags: ['Poetry', 'Spoken Word', 'Performance'],
        judgeName: 'Rutwik Deshpande, Manyuu Doshi, Arundhati Subramaniam',
        judgePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
      },
    ],
    wpa: [
      {
        id: 'wpa-25-1',
        title: 'Treble in Paradise',
        description: 'A dynamic band event celebrating the best musical talents competing live.',
        tags: ['Band event', 'Western Music', 'Live Bands'],
        judgeName: 'Sanjeeta Bhattacharya, Padmanabhan, Sianna Gomes',
        judgePhoto: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'wpa-25-2',
        title: 'On the Deck',
        description: 'A high-energy DJ competition mixing electronic, techno, and retro music beats.',
        tags: ['DJing', 'Electronic Music', 'Beats'],
        judgeName: 'DJ Paroma, DJ Groove, Ashley Alvares, Show Stellar',
        judgePhoto: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'wpa-25-3',
        title: 'CTRL-Z',
        description: 'Rewriting the beat one move at a time in this competitive street dance showdown.',
        tags: ['Street Dance', 'Choreography', 'Rhythm'],
        judgeName: 'Marzi Pestonji, Nanak Singh, Umanshanker Khilnani',
        judgePhoto: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'wpa-25-4',
        title: 'Once Upon A Groove',
        description: 'A theatrical dance production focusing on narrative storytelling through movement.',
        tags: ['Dance Drama', 'Groove', 'Storytelling'],
        judgeName: 'Pia Sutaria, Eshika Tahilramani, Deepansha Bansal',
        judgePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
      },
    ],
    fa: [
      {
        id: 'fa-25-1',
        title: 'Ghazal-e-Nazm',
        description: 'A dual creative exhibition translating live acoustic ghazals into fine canvas art.',
        tags: ['Ghazal', 'Fine Arts', 'Live Painting'],
        judgeName: 'Sharmila Shah, Ashwani Mittal, Poonam Pandit',
        judgePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'fa-25-2',
        title: 'Canvases Unmasked (Round 1)',
        description: 'A speed painting battle where artists mask and reveal layers of visual stories.',
        tags: ['Speed Painting', 'Fine Arts', 'Abstract'],
        judgeName: 'Priya Banerjee, Rytasha Rathore, Sanya Irani, Rahul Desai',
        judgePhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'fa-25-3',
        title: 'Canvases Unmasked (Round 2)',
        description: 'The final round of the speed painting face-off testing advanced conceptual themes.',
        tags: ['Speed Painting', 'Fine Arts', 'Finals'],
        judgeName: 'Priya Banerjee, Rytasha Rathore, Sanya Irani, Rahul Desai',
        judgePhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'fa-25-4',
        title: 'Beyond the folds',
        description: 'Crease. Create. Captivate. A competitive paper sculpture and origami event.',
        tags: ['Origami', 'Paper Sculpting', 'Fine Arts'],
        judgeName: 'Misha Gurnanee, Prerna Gupta',
        judgePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'fa-25-5',
        title: 'Flip the Frame',
        description: 'A photography challenge capturing moments before and after a split-second event.',
        tags: ['Photography', 'Framing', 'Visual Arts'],
        judgeName: 'Nishka Mehta, Amrita Sequiera',
        judgePhoto: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'fa-25-6',
        title: 'Art in Motion',
        description: 'A dynamic 3D sculpting and modeling showcase using physical media.',
        tags: ['Sculpture', 'Modeling', 'Fine Arts'],
        judgeName: 'Ashish Mhatre, Anil Jadhav',
        judgePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
      },
    ],
    ipa: [
      {
        id: 'ipa-25-1',
        title: 'My Taal-logy',
        description: 'A classical Indian rhythm and percussion solo faceoff.',
        tags: ['Classical Percussion', 'Tabla', 'Rhythm'],
        judgeName: 'Avenav Mukherjee, Gayatri Arnalkar, Dr. lalita Soni, Sonali Das, Hetal nandu',
        judgePhoto: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'ipa-25-2',
        title: 'Retro meets Metro',
        description: 'A fusion musical and choreography performance crossing eras of Indian performing arts.',
        tags: ['Retro Fusion', 'Indian Music', 'Dance'],
        judgeName: 'Shruti Seth, Aksha Pardasany Shah, Akshaya Naik, Samridhi Chandola',
        judgePhoto: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'ipa-25-3',
        title: 'Patiala dhol Bajake',
        description: 'A high-octane group dhol beats percussion competition.',
        tags: ['Dhol Beats', 'Group Drumming', 'Folk Music'],
        judgeName: 'Ankita Shivatare, Vaibhav Ghuge, Meera Joshi, Bansari Ambavane',
        judgePhoto: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'ipa-25-4',
        title: 'Kisme Kitna (rhy)dum?',
        description: 'A high-energy classical Indian duet dance faceoff.',
        tags: ['Indian Classical Dance', 'Kathak', 'Duet'],
        judgeName: 'Kavya Limaye, Ayush Sharma, Renee Chaurasia, Krishna Solanki',
        judgePhoto: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=100',
      },
    ],
    etcw: [
      {
        id: 'etcw-25-1',
        title: 'Ace the Court',
        description: 'An improvisational courtroom trial and theatrical debate.',
        tags: ['Theatricals', 'Debate', 'Improv'],
        judgeName: 'Student Panel / Organizers',
        judgePhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'etcw-25-2',
        title: 'Take One (WINC)',
        description: 'A method acting workshop exploring screen presence and vocal projection.',
        tags: ['Workshops', 'Method Acting', 'WINC'],
        judgeName: 'Ritesh Singh & Anushka Sharma',
        judgePhoto: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'etcw-25-3',
        title: 'Thats so 2000 (WINC)',
        description: 'A quad dance workshop exploring retro choreographies of the early 2000s.',
        tags: ['Workshops', 'Quad Dance', 'WINC'],
        judgeName: 'Sargun Singh',
        judgePhoto: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'etcw-25-4',
        title: 'Malhar thundercup',
        description: 'The ultimate esports and sporting clash of the festival.',
        tags: ['Sports Event', 'Gaming', 'ETCW'],
        judgeName: 'Sports Committee',
        judgePhoto: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'etcw-25-5',
        title: 'Malhar Through Time',
        description: 'A multi-era trivia challenge testing knowledge of historical pop culture.',
        tags: ['Trivia', 'Quiz', 'History'],
        judgeName: 'Rochelle Pinto, Meghansh Gupta, Shivansh Kotia',
        judgePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'etcw-25-6',
        title: 'Mission Impossible (WINC)',
        description: 'Heist Hour escape room challenge requiring logic, lock-picking, and agility.',
        tags: ['Escape Room', 'WINC', 'Logic Game'],
        judgeName: 'WINC Organizers',
        judgePhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'etcw-25-7',
        title: 'Echoes & Illusions (WINC)',
        description: 'A sound effects workshop focusing on Foley art and ambient sound simulation.',
        tags: ['Workshops', 'Sound Effects', 'WINC'],
        judgeName: 'Varun Visoi',
        judgePhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
      },
      {
        id: 'etcw-25-8',
        title: 'Comic Clones',
        description: 'A stand-up comedy and mimicry competition mimicking public personas.',
        tags: ['Comedy', 'Ventriloquism', 'Mimicry'],
        judgeName: 'Satyajit Ramdas Padhye, Geetika Vidya Ohlyan',
        judgePhoto: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=100',
      },
    ],
  },
};
