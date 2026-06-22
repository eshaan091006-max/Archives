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
    'la': [
      {
        id: 'la-23-1',
        title: 'Storytelling Showdown',
        description: 'Spin a web of words and enchant the audience with your narratives. A competition of expression, pacing, and sheer imagination.',
        tags: ['Narrative', 'Creative Writing', 'Performance']
      },
      {
        id: 'la-23-2',
        title: 'The Poetry Slam',
        description: 'Speak your truth, rhyme your thoughts, and capture hearts. A stage for modern poets to showcase their spoken word masterpieces.',
        tags: ['Poetry', 'Spoken Word', 'Hindi & English']
      }
    ]
  },
  '2024': {
    'la': [
      {
        id: 'shayarana-rang',
        title: 'Shayarana Rang, Malhar Ke Sangh',
        description: 'In this Hindi poetry event, the charm of Bollywood meets the artistry of shayari. Participants are presented with a challenge that is twofold: recite original shayari, while ensuring a jugalbandi with your team member. This event is designed to bring together lovers of both film and verse in a unique competition that celebrates the depth and beauty of the Hindi language.',
        tags: ['Bollywood', 'Shayari', 'Hindi Poetry', 'Jugalbandi']
      },
      {
        id: 'forge-a-fact',
        title: 'Forge A Fact',
        description: 'Humour, critique, and creativity blend together in this event to challenge contingents to produce their own mockumentaries on absurd topics. This event is an exciting challenge for those who enjoy the art of parody and the craft of documentary with a twist. Putting their satirical storytelling skills to the test, contingents must entertain and provoke thought as they embark on this journalistic investigation.',
        tags: ['Mockumentary', 'Comedy', 'Parody', 'Satire']
      },
      {
        id: 'toast-and-jam',
        title: 'Toast and J.A.M. (Just A Minute)',
        description: 'Toast and J.A.M. is an on-the-spot performance event. Participants will try to speak for a whole minute on a given topic without hesitation, repetition, or deviation as other participants try to interject by raising objections. If an objection is accepted by the J.A.M. Master, the person who objected takes over the role of speaking. It’s a fast-paced, improvisational speaking event conducted entirely by the J.A.M. Master, where each round is innovative, hilariously irrational, and pushes the participants to challenge their limits.',
        tags: ['Just A Minute', 'Improvisation', 'On-the-spot', 'Speaking']
      }
    ]
  },
  '2025': {
    'la': [
      {
        id: 'la-25-1',
        title: 'Wordplay Wizardry',
        description: 'Test your vocabulary and linguistic dexterity in a series of fast-paced word puzzles, crosswords, and anagram challenges.',
        tags: ['Word Puzzles', 'Vocabulary', 'Quick Thinking']
      },
      {
        id: 'la-25-2',
        title: 'Editorial Duel',
        description: 'Engage in a battle of perspectives and write-ups. Critique, analyze, and report on real-time festival occurrences in this journalism sprint.',
        tags: ['Journalism', 'Writing', 'Editorial']
      }
    ]
  }
};
