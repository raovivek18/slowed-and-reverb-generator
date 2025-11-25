
import React from "react";
import AudioProcessor from "@/components/AudioProcessor";
import SocialShare from "@/components/SocialShare";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const FAQS = [
  {
    question: "How long does it take to use the generator?",
    answer: "It’s super fast! Just upload your song, adjust the settings, and you’ll be ready to download in minutes.",
  },
  {
    question: "Can I use any song?",
    answer: "Yes! As long as it’s in MP3 format, you can upload and edit any song you like.",
  },
  {
    question: "Is the generator really free?",
    answer: "Yep, totally free! No hidden fees or subscriptions, just a quick, easy way to transform your music.",
  },
  {
    question: "Do I need to create an account?",
    answer: "Nope! No sign up or login needed. Just upload, edit, and download – hassle free.",
  },
  {
    question: "Can I use this for my videos?",
    answer: "Absolutely! Ideal for social media content, YouTube videos, background music, and more.",
  },
];

const Index = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <header className="mb-0 text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-light to-neon bg-clip-text text-transparent drop-shadow-sm mb-2 transition-all">
          Slowed and Reverb Generator – Make music hit different
        </h1>
      </header>

      {/* Audio Processor Tool & Share Button */}
      <section id="audio-processor" className="mb-4">
        <AudioProcessor />
        <div className="flex justify-center mt-4">
          <SocialShare
            title="Like this AI tool? Spread the word!"
            message="Check out this awesome Slowed + Reverb Generator!"
          />
        </div>
      </section>
      
      {/* Main Informational Cards */}
      <section
        className="
          max-w-2xl mx-auto my-10 flex flex-col gap-8
        "
        itemScope
        itemType="https://schema.org/WebApplication"
      >
        {/* What Is a Slowed and Reverb Generator Card */}
        <Card className="bg-black/25 rounded-2xl shadow-xl border border-purple-light/20 mb-2">
          <CardContent className="p-8 flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-purple-light mb-2 text-center">
              What Is a <span className="text-neon">Slowed and Reverb Generator?</span>
            </h2>
            <p className="text-base text-gray-200 text-justify">
              Imagine you have a favorite song—slow it down so it sounds more relaxed and dreamy, then add a little reverb for an echoing, open feel. That's what this tool does!
            </p>
            <p className="text-base text-gray-200 text-justify">
              It’s simple but amazing. You don’t have to be a producer or need special skills; just upload a song, experiment, and your slowed and reverb version is ready.
            </p>
            <p className="text-base text-gray-200 text-justify">
              If you want to change the mood of a song, or need something chilled for reels, playlists or study time, this generator gives your music a new vibe, your way.
            </p>
          </CardContent>
        </Card>

        {/* Why Use Our Generator Card */}
        <Card className="bg-black/25 rounded-2xl shadow-xl border border-purple-light/20 mb-2">
          <CardContent className="p-8 flex flex-col gap-3">
            <h3 className="text-lg md:text-xl font-semibold text-neon mb-1 text-center">
              Why Use Our <span className="text-purple-light">Slow and Reverb Generator?</span>
            </h3>
            <p className="text-base text-gray-100 text-justify">
              The best reason – it’s fast, easy, and completely free. No sign up, no download required. Just upload your track, tweak the speed &amp; reverb, and get your new sound in seconds.
            </p>
            <p className="text-base text-gray-100 text-justify">
              Make music, soundtrack videos, or just play with sound. Our tool is accessible for everyone, no music software or special skills needed!
            </p>
            <p className="text-base text-gray-100 text-justify">
              For background music, relaxing playlists, or unique remixes – get the perfect sound with no hassle or cost.
            </p>
          </CardContent>
        </Card>

        {/* How to Use Card */}
        <Card className="bg-black/25 rounded-2xl shadow-xl border border-purple-light/20 mb-2">
          <CardContent className="p-8 flex flex-col gap-3">
            <h3 className="text-lg md:text-xl font-semibold text-purple-light mb-1 text-center">
              How to Use the Slowed and Reverb Generator
            </h3>
            <p className="text-gray-100 text-center">
              Using this tool is simple. Just follow these 3 easy steps:
            </p>
            <ol className="list-decimal bg-black/40 rounded-lg p-5 space-y-3 md:mx-8 text-gray-100 mb-2">
              <li>
                <strong className="text-neon">Upload your track:</strong>
                <br />
                <span className="block text-justify">Choose your song (MP3 works best), upload it, and you’re set!</span>
              </li>
              <li>
                <strong className="text-neon">Adjust the settings:</strong>
                <br />
                <span className="block text-justify">Use the sliders to change speed and reverb. Each tweak updates the sound so you can experiment for your vibe.</span>
              </li>
              <li>
                <strong className="text-neon">Download and enjoy:</strong>
                <br />
                <span className="block text-justify">Love your new track? Download it for playlists, social, or your next video!</span>
              </li>
            </ol>
            <p className="text-gray-300 italic text-center mt-2">
              No complex software—just a few clicks for fresh, dreamy audio.
            </p>
          </CardContent>
        </Card>

        {/* Ideal For Card */}
        <Card className="bg-black/25 rounded-2xl shadow-xl border border-purple-light/30 mb-2">
          <CardContent className="p-8 flex flex-col gap-3">
            <h3 className="text-lg md:text-xl font-semibold text-neon mb-1 text-center">
              Ideal For: TikTok Editors, Lo-Fi Lovers &amp; More
            </h3>
            <p className="text-base text-gray-100 text-justify">
              If you're making videos for TikTok or just want to give your music a little relaxed and lo-fi feel, our slowed and reverb generator is perfect for you. Whether you're making TikTok videos, creating intros for YouTube, or want to get a little more creative on Instagram stories, this tool will help you with every type of project.
            </p>
            <p className="text-base text-gray-100 text-justify">
              If you like lo-fi music, this generator makes it super easy to give your favorite songs a chill and mellow vibe. Just slow down the track and start adding reverb and your music will become the perfect background sound, whether you're studying, spending time relaxing, or just want to feel a little relaxed in your day.
            </p>
            <p className="text-base text-gray-100 text-justify">
              And the best part is that this tool is not just for professionals. If you are new to editing, or just want to try something different, this generator is a very easy and fun way for you to get started. No worries about heavy software or expensive programs, just upload your track, and explore your ideas your way!
            </p>
          </CardContent>
        </Card>

        {/* FAQ Section Card */}
        <Card className="bg-black/25 rounded-2xl shadow-xl border border-purple-light/40 mb-2">
          <CardContent className="p-8 pb-6 flex flex-col gap-3">
            <section aria-labelledby="faqs">
              <h2 id="faqs" className="text-xl md:text-2xl font-extrabold text-neon mb-3 text-center">
                FAQs – Your Questions Answered
              </h2>
              <Accordion
                type="single"
                collapsible
                className="w-full"
              >
                {FAQS.map((faq, idx) => (
                  <AccordionItem
                    value={`faq-${idx}`}
                    key={idx}
                    className="border-0 mb-2 rounded-lg bg-gradient-to-r from-purple-light/20 to-neon/10"
                  >
                    <AccordionTrigger className="font-bold text-purple-light px-4 py-3 text-left hover:bg-purple-light/30 rounded-lg transition-colors text-base md:text-lg">
                      {idx + 1}. {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-100 px-6 pb-5 text-justify">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </CardContent>
        </Card>

        {/* Try It Now CTA Card */}
        <Card className="bg-gradient-to-br from-purple-light/40 via-black/50 to-neon/20 shadow-xl rounded-2xl border-none animate-fade-in my-2">
          <CardContent className="p-10 flex flex-col items-center justify-center gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-neon mb-2 text-center">
              Try It Now – Free Slowed + Reverb Generator, No Signup
            </h2>
            <p className="text-gray-100 text-center mb-1">
              Start using the <strong>slowed and reverb generator</strong> and change your music instantly.
            </p>
            <p className="text-gray-300 text-center mb-1">
              Free, easy, and ready whenever you are—no signup or hidden cost.
            </p>
            <p className="text-gray-400 mt-1 text-xs text-center">
              Express your creativity freely. Try it and see how your tracks stand out!
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Index;
