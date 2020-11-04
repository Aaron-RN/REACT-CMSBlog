const newDate = new Date().toLocaleDateString();

const allPosts = [
  {
    id: 1,
    author_id: 1,
    title: 'Remember to Read The Rules Of Engagment',
    body: `Just the first test post Amet Lorem velit ex sit labore non aliquip voluptate do pariatur voluptate eu.
    Laboris incididunt elit quis sit velit est proident nostrud cupidatat consequat duis commodo et dolore.
    Ullamco ea consectetur mollit duis incididunt Lorem minim nostrud. Incididunt exercitation est ullamco
    enim minim deserunt. Est pariatur do elit proident irure laboris cillum in ad. Ea nostrud exercitation
    esse eu duis adipisicing in cupidatat aute. Commodo culpa quis cupidatat ex anim sit esse nulla labore irure.`,
    created_at: newDate,
    forum: 'announcements',
    subforum: 'rules',
    is_pinned: true,
    is_locked: false,
  },
  {
    id: 2,
    author_id: 2,
    title: 'Look Left Before Looking Right',
    body: `Back in my day barbecues were anim qui aliquip sint officia sunt occaecat aliqua reprehenderit sit.
    Labore ea commodo Lorem eu reprehenderit. Et ullamco aliqua deserunt in reprehenderit. Lorem officia fugiat
    Lorem id Lorem duis. Consequat ad anim dolor non ut nostrud elit incididunt magna. Enim mollit qui consectetur
    consectetur aliqua tempor anim ipsum ullamco culpa enim exercitation. Sit consectetur anim magna mollit 
    consequat aliquip consectetur do ullamco duis tempor eiusmod consequat.`,
    created_at: newDate,
    forum: 'announcements',
    subforum: 'rules',
    is_pinned: true,
    is_locked: true,
  },
  {
    id: 3,
    author_id: 3,
    title: 'The Most Electrifying Individual in WWE History',
    body: `Finally The Rock has come back to Hackernoon, do you smellalalalow, what the rock, is cooking
    nisi proident ad amet quis reprehenderit non. Quis irure reprehenderit enim sint eu et. Dolore ullamco
    quis elit eu ipsum. Voluptate elit elit elit aliqua enim excepteur incididunt laboris laboris consequat
    aliquip. Deserunt eu nulla ad ut eiusmod sit elit cillum elit pariatur nulla cupidatat aute.`,
    created_at: newDate,
    forum: 'misc',
    is_pinned: false,
    is_locked: false,
  },
  {
    id: 4,
    author_id: 4,
    title: 'Sunset Dawn',
    body: `The day had begun on a bright note. The sun finally peeked through the rain for the first time in a week,
    and the birds were sinf=ging in its warmth. There was no way to anticipate what was about to happen. It was a
    worst-case scenario and there was no way out of it.`,
    created_at: newDate,
    forum: 'misc',
    is_pinned: false,
    is_locked: false,
  },
  {
    id: 5,
    author_id: 5,
    title: 'The Big Question',
    body: `<h3>His parents continued to question him...</h3> He didn't know what to say to them since they refused to believe the truth.
    He explained again and again, and they dismissed his explanation as a figment of his imagination. There was no way that
    grandpa, who had been dead for five years, could have told him where the treasure had been hidden. Of course, it didn't
    help that grandpa was roaring with laughter in the chair next to him as he tried to explain once again how he'd found it.`,
    created_at: newDate,
    forum: 'misc',
    is_pinned: false,
    is_locked: false,
  },
  {
    id: 6,
    author_id: 6,
    title: 'My First Diagnosis',
    body: `<b>It</b> was difficult to explain to them how the diagnosis of certain death had actually given him life.
    While everyone around him was in tears and upset, he actually felt more at ease. The doctor said it would be
    less than a year. That gave him a year to live, something he'd failed to do with his daily drudgery of a routine
    that had passed as life until then.`,
    created_at: newDate,
    forum: 'misc',
    is_pinned: false,
    is_locked: false,
  },
];

export default allPosts;
