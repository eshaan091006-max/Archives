import { YearKey } from './themeData';

export interface EventInfo {
  id: string;
  title: string;
  description: string;
  tags: string[];
  duration?: string;
  type?: string;
}

export const eventsData: Record<YearKey, Record<string, EventInfo[]>> = {
  '2023': {
    la: [
      {
        id: 'la-23-1',
        title: 'Storytelling Showdown',
        description:
          'Spin a web of words and enchant the audience with your narratives. A competition of expression, pacing, and sheer imagination.',
        tags: ['Narrative', 'Creative Writing', 'Performance'],
      },
      {
        id: 'la-23-2',
        title: 'The Poetry Slam',
        description:
          'Speak your truth, rhyme your thoughts, and capture hearts. A stage for modern poets to showcase their spoken word masterpieces.',
        tags: ['Poetry', 'Spoken Word', 'Hindi & English'],
      },
    ],
    wpa: [
      {
        id: 'wpa-23-1',
        title: 'The Broadway Showdown',
        description:
          'A theatrical musical performance showcasing classic Broadway acts with a modern twist. The stage lights up with harmony and storytelling.',
        tags: ['Musical', 'Drama', 'Broadway'],
      },
    ],
    fa: [
      {
        id: 'fa-23-1',
        title: 'Canvas of Chaos',
        description:
          'A live speed-painting challenge where artists translate ambient live music into visual art on canvas.',
        tags: ['Speed Painting', 'Live Music', 'Acrylic'],
      },
    ],
    ipa: [
      {
        id: 'ipa-23-1',
        title: 'Raag Rang',
        description:
          'An Indian classical vocals competition celebrating the rich heritage of Hindustani and Carnatic music.',
        tags: ['Classical Vocal', 'Swar', 'Hindustani', 'Carnatic'],
      },
      {
        id: 'ipa-23-2',
        title: 'Taal Tarang',
        description:
          'A percussion solo faceoff with traditional instruments like Tabla, Mridangam, and Dholak.',
        tags: ['Percussion', 'Rhythm', 'Tabla', 'Solo'],
      },
    ],
    etcw: [
      {
        id: 'etcw-23-1',
        title: 'The Street Play Championship',
        description:
          'A theatrical production highlighting societal constructs, performed raw and loud in the festival arena.',
        tags: ['Theatricals', 'Street Play', 'Social Issue'],
      },
      {
        id: 'etcw-23-2',
        title: 'Improv Comedy Clash',
        description:
          'Fast-paced, witty, and completely unscripted comedy challenge where quick thinking wins the crowd.',
        tags: ['Contests', 'Comedy', 'Improv', 'Stage'],
      },
    ],
  },
  '2024': {
    la: [
      {
        id: 'shayarana-rang',
        title: 'Shayarana Rang, Malhar Ke Sangh',
        description:
          'In this Hindi poetry event, the charm of Bollywood meets the artistry of shayari. Participants are presented with a challenge that is twofold: recite original shayari, while ensuring a jugalbandi with your team member. This event is designed to bring together lovers of both film and verse in a unique competition that celebrates the depth and beauty of the Hindi language.',
        tags: ['Bollywood', 'Shayari', 'Hindi Poetry', 'Jugalbandi'],
      },
      {
        id: 'forge-a-fact',
        title: 'Forge A Fact',
        description:
          'Humour, critique, and creativity blend together in this event to challenge contingents to produce their own mockumentaries on absurd topics. This event is an exciting challenge for those who enjoy the art of parody and the craft of documentary with a twist. Putting their satirical storytelling skills to the test, contingents must entertain and provoke thought as they embark on this journalistic investigation.',
        tags: ['Mockumentary', 'Comedy', 'Parody', 'Satire'],
      },
      {
        id: 'toast-and-jam',
        title: 'Toast and J.A.M. (Just A Minute)',
        description:
          'Toast and J.A.M. is an on-the-spot performance event. Participants will try to speak for a whole minute on a given topic without hesitation, repetition, or deviation as other participants try to interject by raising objections. If an objection is accepted by the J.A.M. Master, the person who objected takes over the role of speaking. It’s a fast-paced, improvisational speaking event conducted entirely by the J.A.M. Master, where each round is innovative, hilariously irrational, and pushes the participants to challenge their limits.',
        tags: ['Just A Minute', 'Improvisation', 'On-the-spot', 'Speaking'],
      },
    ],
    wpa: [
      {
        id: 'wpa-24-1',
        title: 'Street Dance Faceoff',
        description:
          'Crews battle it out on stage with high energy street dance styles. A performance of sync, rhythm, and raw power.',
        tags: ['Street Dance', 'Choreography', 'Rhythm'],
      },
    ],
    fa: [
      {
        id: 'fa-24-1',
        title: 'Clay Sculpting Duel',
        description:
          'Two hours to mold raw clay into a sculpture representing "Igniting Passions". A test of form, depth, and detail.',
        tags: ['Sculpture', 'Clay Modelling', 'Theme Art'],
      },
    ],
    ipa: [
      {
        id: 'nritta-fusion',
        title: 'Nritta Fusion',
        description:
          'A classical Indian dance choreography blending Bharatanatyam, Kathak, and Odissi with modern thematic elements.',
        tags: ['Classical Dance', 'Kathak', 'Bharatanatyam', 'Fusion'],
      },
      {
        id: 'nukkad-natak',
        title: 'Nukkad Natak',
        description:
          'A high-energy street play event highlighting crucial socio-cultural issues with raw passion and chorus drums.',
        tags: ['Street Play', 'Drama', 'Social Cause', 'Skit'],
      },
    ],
    etcw: [
      {
        id: 'etcw-24-1',
        title: 'Screenwriting Workshop',
        description:
          'An interactive seminar led by industry veterans on character development, scene beats, and script writing.',
        tags: ['Workshops', 'Screenplay', 'Writing'],
      },
      {
        id: 'etcw-24-2',
        title: 'Directing Masterclass',
        description:
          'Learn the craft of visual storytelling, camera blocking, and working with actors in this comprehensive session.',
        tags: ['Workshops', 'Directing', 'Cinema'],
      },
    ],
  },
  '2025': {
    la: [
      {
        id: 'la-25-1',
        title: 'Wordplay Wizardry',
        description:
          'Test your vocabulary and linguistic dexterity in a series of fast-paced word puzzles, crosswords, and anagram challenges.',
        tags: ['Word Puzzles', 'Vocabulary', 'Quick Thinking'],
      },
      {
        id: 'la-25-2',
        title: 'Editorial Duel',
        description:
          'Engage in a battle of perspectives and write-ups. Critique, analyze, and report on real-time festival occurrences in this journalism sprint.',
        tags: ['Journalism', 'Writing', 'Editorial'],
      },
    ],
    wpa: [
      {
        id: 'wpa-25-1',
        title: 'Cinema Unscripted',
        description:
          'An improvisational acting competition where participants are given scenarios on the spot. Test of expressions, timing, and stage presence.',
        tags: ['Improv', 'Drama', 'Acting'],
      },
      {
        id: 'wpa-25-2',
        title: 'Symphony of the World',
        description:
          'A classical instrumental concert presenting harmonious arrangements of world music instruments.',
        tags: ['Classical', 'Instrumental', 'Orchestra'],
      },
    ],
    fa: [
      {
        id: 'fa-25-1',
        title: 'The Mural Masterpiece',
        description:
          'Teams collaborate to paint a large street mural reflecting unity and cultural diversity.',
        tags: ['Mural', 'Collaborative', 'Street Art'],
      },
      {
        id: 'fa-25-2',
        title: 'Charcoal Perspectives',
        description:
          'A monochrome drawing event focusing on capturing light and shadow transitions with raw charcoal.',
        tags: ['Charcoal', 'Monochrome', 'Sketching'],
      },
    ],
    ipa: [
      {
        id: 'folk-fiesta',
        title: 'Folk Fiesta',
        description:
          'A vibrant group dance event showcasing traditional folk dance forms of India (Ghoomar, Bhangra, Garba, and Lavani).',
        tags: ['Folk Dance', 'Bhangra', 'Garba', 'Group Performance'],
      },
      {
        id: 'swar-sandhya',
        title: 'Swar Sandhya',
        description:
          'A classical jugalbandi (duet battle) where instrumentalists and vocalists compete in real-time improvisation.',
        tags: ['Duet', 'Improvisation', 'Sitar', 'Flute'],
      },
    ],
    etcw: [
      {
        id: 'etcw-25-1',
        title: 'Center Stage Monologues',
        description:
          'A contest of emotional depth and raw acting power. Soliloquies that demand presence and absolute vulnerability.',
        tags: ['Contests', 'Acting', 'Monologue'],
      },
      {
        id: 'etcw-25-2',
        title: 'Physical Theatre Intensive',
        description:
          'Explore expression through motion, body syntax, and mime techniques in this hands-on physical theater lab.',
        tags: ['Theatricals', 'Workshops', 'Expression'],
      },
    ],
  },
};
