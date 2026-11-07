// ── Shared static data ───────────────────────────────────────────────────────
// NOTE: Artwork product data is served from MongoDB via /api/artworks
// This file contains site-level static content only.

// Kept as an empty compatibility export; MongoDB is the source of truth for artworks.
export const allWorks = [];

export const navLinks = ["Collect", "Artists", "The Edits", "Journal", "Info"];

// Category labels for filters
export const categoryLabels = ["All", "Paintings", "Prints", "Photography"];

// Admin-configured slides load from site content; do not seed missing image paths.
export const heroSlides = [];

// Category section covers — visual UI, not product listing
export const categories = [
  { label: "Paintings",   src: "/categories/paintings.jpg"   },
  { label: "Prints",      src: "/categories/prints.jpg"      },
  { label: "Photography", src: "/categories/photography.jpg" },
];

// ── Blog posts ───────────────────────────────────────────────────────────────
export const blogPosts = [
  {
    slug: "why-i-never-sketch-before-i-paint",
    title: "Why I never sketch before I paint",
    category: "Process",
    date: "October 12, 2026",
    readTime: "4 min",
    cover: "/art/822454183_18116058677070803_7997214052897677537_n.jpg",
    excerpt: "Planning kills the feeling. The first mark is always the most honest — and you can't plan honesty.",
    content: [
      {
        type: "paragraph",
        text: "Every artist I admire seems to have a sketchbook. Pages of careful studies, thumbnails, value maps. They show these things in their studio tours and I watch, genuinely impressed — and then I go back to my canvas and start with no plan at all.",
      },
      {
        type: "paragraph",
        text: "It's not stubbornness. It's not laziness either, though I've been accused of both. It comes from something I discovered very early: the moment I draw a line in pencil first, I've already made a decision. And once a decision is made, I stop listening.",
      },
      {
        type: "quote",
        text: "The first mark on an empty canvas is the most honest thing you'll make. Every mark after is a response.",
      },
      {
        type: "paragraph",
        text: "What I do instead is sit. Sometimes for ten minutes. Sometimes for an hour. I sit in front of the blank canvas and I wait for something to insist on being there — a colour, a direction, a weight in one corner. When it arrives, I don't think. I just start.",
      },
      {
        type: "paragraph",
        text: "The paintings that have meant the most to me — the ones that sold to people who cried when they saw them — none of them were planned. They happened because I left the door open.",
      },
      {
        type: "paragraph",
        text: "This isn't advice. I'm not saying you shouldn't sketch. I'm saying that for me, the sketch would be a lie. And I'd rather make an honest mess than a careful, considered one.",
      },
    ],
  },
  {
    slug: "the-painting-that-took-eight-months",
    title: "The painting that took eight months",
    category: "Behind the work",
    date: "September 5, 2026",
    readTime: "6 min",
    cover: "/art/823606039_18116134385070803_3865341406544213906_n.jpg",
    excerpt: "It sat against the wall, unfinished, for most of a year. Then one evening it told me what it needed.",
    content: [
      {
        type: "paragraph",
        text: "It started in February. A large canvas — 24 by 30 — that I'd been saving for something I hadn't felt yet. One afternoon in the studio, the feeling arrived and I started without eating lunch.",
      },
      {
        type: "paragraph",
        text: "By evening I had something I hated. Not because it was bad — I've made plenty of bad things and learned to sit with them. This one felt incomplete in a way I couldn't fix. So I turned it against the wall.",
      },
      {
        type: "quote",
        text: "Some paintings aren't finished when you stop working on them. They're just paused.",
      },
      {
        type: "paragraph",
        text: "It stayed there for three months. I'd occasionally turn it around, look at it for a few minutes, then face it back to the wall. Something wasn't ready — and I've learned not to force that.",
      },
      {
        type: "paragraph",
        text: "In October, I was working on something else entirely when I accidentally knocked it over. It landed face up. I looked at it for a long time. And then I knew exactly what it needed — not more paint, but less. I spent forty minutes scraping back a section I'd over-worked and the painting was done.",
      },
      {
        type: "paragraph",
        text: "It sold three weeks later to a collector in Mumbai who said it felt like something she'd been trying to say for years. I think that's what the eight months were for.",
      },
    ],
  },
  {
    slug: "on-selling-something-you-made-at-2am",
    title: "On selling something you made at 2am",
    category: "Thoughts",
    date: "August 18, 2026",
    readTime: "3 min",
    cover: "/art/817902603_18115636340070803_3091029228027957233_n.jpg",
    excerpt: "Every collector is a stranger who agrees to carry something you felt. That never stops being strange.",
    content: [
      {
        type: "paragraph",
        text: "The first time I sold a painting, I cried in the bathroom for about ten minutes. Not sad crying. Something else — the feeling of having handed someone a piece of a night I couldn't explain to anyone.",
      },
      {
        type: "paragraph",
        text: "Most of my best work happens between midnight and four in the morning. I don't plan it that way. It's just when the house is quiet and the feeling is loudest.",
      },
      {
        type: "quote",
        text: "You're not selling paint on fabric. You're asking a stranger to carry something invisible.",
      },
      {
        type: "paragraph",
        text: "When someone buys one of those pieces, they're taking home something that belongs to a very specific kind of silence. I wonder sometimes if they feel it — if they hang it and notice that it has a particular quality at 2am that it doesn't have at noon.",
      },
      {
        type: "paragraph",
        text: "I think they do. The messages I get are always from late at night.",
      },
    ],
  },
  {
    slug: "colour-is-the-argument",
    title: "Colour is not decoration. It is the argument.",
    category: "Process",
    date: "July 2, 2026",
    readTime: "5 min",
    cover: "/art/818988016_18116134361070803_5613175907062480033_n.jpg",
    excerpt: "I don't pick colours — they insist. The work of painting is mostly arguing with that insistence.",
    content: [
      {
        type: "paragraph",
        text: "People ask me how I choose my palette. The honest answer is that I don't. The colours choose the moment, and my job is to stop arguing with them.",
      },
      {
        type: "paragraph",
        text: "I've ruined more paintings by overriding colour instinct than by any other mistake. You start with ochre because the feeling is warm, but then you think: maybe it should be cooler, more sophisticated. You reach for grey. And the painting dies a little.",
      },
      {
        type: "quote",
        text: "Colour is not what the painting looks like. It's what the painting says.",
      },
      {
        type: "paragraph",
        text: "What I've learned — slowly, painfully — is that colour carries the emotional argument of a painting. The composition might be the structure, but colour is the voice. When they disagree, the painting feels dishonest.",
      },
      {
        type: "paragraph",
        text: "So now I let the first colour that comes to me stay. I build everything else around it, in conversation with it. Sometimes it's uncomfortable. A red that feels too aggressive, a yellow that feels too bright. But if it insisted on being there at the start, it usually knows something I don't.",
      },
    ],
  },
  {
    slug: "what-lockdown-taught-the-studio",
    title: "What lockdown taught the studio",
    category: "Behind the work",
    date: "June 14, 2026",
    readTime: "7 min",
    cover: "/art/794222736_18113991668070803_4825890433763461046_n.jpg",
    excerpt: "Forty works in eight months. When the world stops, the hand doesn't. It turns out space was always enough.",
    content: [
      {
        type: "paragraph",
        text: "Before 2020, I thought I needed more: more space, a proper studio, better light, time that wasn't stolen from other things. Lockdown took all of that away — and somehow gave me the most productive period of my life.",
      },
      {
        type: "paragraph",
        text: "In eight months, I made forty works. Not all of them good. About half were experiments that failed usefully — they taught me what happens when you push a surface past the point of return. But fifteen or sixteen of them were among the best things I'd made.",
      },
      {
        type: "quote",
        text: "It turns out the studio was always the size of the attention I brought to it.",
      },
      {
        type: "paragraph",
        text: "What changed wasn't the space. It was the absence of all the reasons not to start. No plans to cancel, no errands to run at the end of the day. Just the canvas, the paint, and an unbroken stretch of time that felt — weirdly — like a gift.",
      },
      {
        type: "paragraph",
        text: "I still think about that period whenever I find myself waiting for conditions to be right. They're never right. The lockdown paintings are a reminder that the conditions were terrible, and the work was good anyway.",
      },
      {
        type: "paragraph",
        text: "Three of those pieces are still available. If you've ever wanted to own something made in that particular kind of silence, those are the ones.",
      },
    ],
  },
];
