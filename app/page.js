import Nav from "./components/Nav";
import Hero from "./components/Hero";
import NightScene from "./components/NightScene";
import ScrollScrubVideo from "./components/ScrollScrubVideo";
import VibeBand from "./components/VibeBand";
import Reviews from "./components/Reviews";
import Menu from "./components/Menu";
import Visit from "./components/Visit";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      {/* Scroll-driven dusk → 2 AM scene in CSS 3D — the distinctive moment,
          rendering the line their reviews keep repeating: "beach like
          vibes", after dark. Needs no footage. */}
      <NightScene />
      {/* Scroll-scrubbed video — the Burgerito centrepiece technique. Scroll
          drives the clip's timeline. Renders a designed placeholder until
          coffee-pour.mp4 is generated. */}
      <ScrollScrubVideo />
      {/* Full-bleed atmosphere band with slow parallax — the two strongest
          assets in this build, given room rather than cropped into cards. */}
      <VibeBand />
      {/* Reviews sit high on the page here, unusually — they're the only
          substantive public content that exists for this cafe. */}
      <Reviews />
      <Menu />
      <Visit />
      <Footer />
    </main>
  );
}
