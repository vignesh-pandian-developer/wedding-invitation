import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const BASE_URL = import.meta.env.BASE_URL;

function App() {
  const [showDoor, setShowDoor] = useState(true);
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const audioRef = useRef(null);

  const weddingDate = new Date("2027-02-14T09:00:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  /* ---------------- COUNTDOWN ---------------- */

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (difference / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
          (difference / 1000) % 60
        ),
      });
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  /* ---------------- SCROLL ---------------- */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      document.querySelectorAll(".reveal").forEach((element) => {
        const rect = element.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.88) {
          element.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [opened]);

  /* ---------------- LETTER ANIMATION ---------------- */

  useEffect(() => {
    if (!opened) return;

    const elements = document.querySelectorAll(".animate-text");

    elements.forEach((element) => {
      if (element.dataset.animated === "true") return;

      const text = element.textContent.trim();

      element.innerHTML = "";

      [...text].forEach((char, index) => {
        const span = document.createElement("span");

        span.textContent = char === " " ? "\u00A0" : char;

        span.style.setProperty(
          "--char-index",
          index
        );

        element.appendChild(span);
      });

      element.dataset.animated = "true";
    });
  }, [opened]);

  /* ---------------- OPEN INVITATION ---------------- */

  const openInvitation = () => {
    if (opening) return;

    setOpening(true);

    /*
      Door CSS animation = 1.8 seconds.

      Keep the door mounted during the animation.
      After animation completes, remove the door.
    */

    setTimeout(() => {
      setShowDoor(false);

      setTimeout(() => {
        setOpened(true);

        window.scrollTo({
          top: 0,
          behavior: "instant",
        });
      }, 100);
    }, 1900);
  };

  /* ---------------- MUSIC ---------------- */

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (musicPlaying) {
        audioRef.current.pause();
        setMusicPlaying(false);
      } else {
        await audioRef.current.play();
        setMusicPlaying(true);
      }
    } catch (error) {
      console.log("Music playback failed:", error);
    }
  };

  /* ---------------- NAVIGATION ---------------- */

  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  /* ---------------- MAP ---------------- */

  const openMap = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=Madurai+Tamil+Nadu",
      "_blank"
    );
  };

  return (
    <div className="app">

      {/* =====================================================
          BACKGROUND MUSIC
      ===================================================== */}

      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={`${BASE_URL}music/wedding-music.mp3`}
      />

      {/* =====================================================
          DOOR INTRO
      ===================================================== */}

      {showDoor && (
        <div
          className={`door-screen ${
            opening ? "door-opening" : ""
          }`}
        >

          {/* Background glow */}
          <div className="door-bg-glow" />

          {/* Stars */}
          <div className="door-stars">
            <span>✦</span>
            <span>✧</span>
            <span>✦</span>
            <span>·</span>
            <span>✧</span>
            <span>✦</span>
            <span>·</span>
            <span>✧</span>
          </div>

          {/* Invitation text behind door */}

          <div className="door-content">

            <div className="door-eyebrow">
              TOGETHER WITH THEIR FAMILIES
            </div>

            <div className="door-ornament">
              ✦
            </div>

            <div className="door-request">
              Request the pleasure of your presence
            </div>

            <div className="door-heading">
              ON THE OCCASION OF THEIR WEDDING
            </div>

            <div className="door-names">
              Vignesh <span>&</span> Ramya
            </div>

            <div className="door-date">
              14 · 02 · 2027
            </div>

          </div>

          {/* =================================================
              DOUBLE DOOR
          ================================================= */}

          <div className="luxury-door">

            {/* Inside invitation */}
            <div className="door-center-content">

              <div className="door-monogram">
                V <span>&</span> R
              </div>

              <div className="door-inside-text">
                OUR WEDDING
              </div>

              <div className="door-inside-date">
                14 · 02 · 2027
              </div>

            </div>

            {/* LEFT DOOR */}

            <div className="door-side left-door">

              <div className="door-inner">

                <div className="door-border">

                  <div className="door-panel-top" />

                  <div className="door-panel-center">

                    <div className="door-flower">
                      ❧
                    </div>

                    <div className="door-panel-line" />

                  </div>

                  <div className="door-panel-bottom" />

                </div>

                <div className="door-handle">
                  ◇
                </div>

              </div>

            </div>

            {/* RIGHT DOOR */}

            <div className="door-side right-door">

              <div className="door-inner">

                <div className="door-border">

                  <div className="door-panel-top" />

                  <div className="door-panel-center">

                    <div className="door-flower">
                      ❧
                    </div>

                    <div className="door-panel-line" />

                  </div>

                  <div className="door-panel-bottom" />

                </div>

                <div className="door-handle">
                  ◇
                </div>

              </div>

            </div>

            {/* OPEN BUTTON */}

            {!opening && (
              <button
                className="open-button"
                onClick={openInvitation}
              >
                <span className="open-heart">
                  ♡
                </span>

                <span>
                  Open Invitation
                </span>
              </button>
            )}

          </div>

          <div className="door-footer">
            TAP TO OPEN
          </div>

        </div>
      )}

      {/* =====================================================
          MAIN INVITATION
      ===================================================== */}

      {opened && (
        <main className="invitation">

          {/* NAVIGATION */}

          <nav
            className={`navbar ${
              scrolled ? "navbar-scrolled" : ""
            }`}
          >

            <div className="nav-logo">
              V <span>&</span> R
            </div>

            <div className="nav-links">

              <button
                onClick={() =>
                  scrollToSection("home")
                }
              >
                Home
              </button>

              <button
                onClick={() =>
                  scrollToSection("story")
                }
              >
                Our Story
              </button>

              <button
                onClick={() =>
                  scrollToSection("events")
                }
              >
                Events
              </button>

              <button
                onClick={() =>
                  scrollToSection("gallery")
                }
              >
                Gallery
              </button>

              <button
                onClick={() =>
                  scrollToSection("venue")
                }
              >
                Venue
              </button>

              <button
                onClick={() =>
                  scrollToSection("rsvp")
                }
              >
                RSVP
              </button>

            </div>

            <button
              className="mobile-music"
              onClick={toggleMusic}
            >
              {musicPlaying ? "♫" : "♪"}
            </button>

          </nav>

          {/* =================================================
              HERO
          ================================================= */}

          <section
            id="home"
            className="hero-section"
          >

            <div className="hero-background">
              <img
                src={`${BASE_URL}images/couple-1.jpeg`}
                alt="Vignesh and Ramya"
              />
            </div>

            <div className="hero-overlay" />

            <div className="hero-content reveal">

              <div className="hero-small">
                TOGETHER WITH THEIR FAMILIES
              </div>

              <div className="hero-ornament">
                ✦
              </div>

              <p className="hero-invite">
                We joyfully invite you to celebrate
              </p>

              <h1 className="hero-title animate-text">
                Vignesh & Ramya
              </h1>

              <div className="hero-line">
                <span />
                <div>♥</div>
                <span />
              </div>

              <p className="hero-date">
                14 FEBRUARY 2027
              </p>

              <p className="hero-location">
                Madurai · Tamil Nadu
              </p>

              <button
                className="primary-button"
                onClick={() =>
                  scrollToSection("events")
                }
              >
                View Wedding Details
              </button>

            </div>

            <div className="scroll-indicator">
              <span>SCROLL</span>
              <div />
            </div>

          </section>

          {/* =================================================
              COUNTDOWN
          ================================================= */}

          <section className="countdown-section">

            <div className="section-container reveal">

              <div className="section-kicker">
                THE COUNTDOWN BEGINS
              </div>

              <h2 className="section-title">
                Until We Say
                <span>I Do</span>
              </h2>

              <div className="countdown">

                <div className="count-box">
                  <strong>
                    {String(
                      timeLeft.days
                    ).padStart(2, "0")}
                  </strong>

                  <span>DAYS</span>
                </div>

                <div className="count-separator">
                  :
                </div>

                <div className="count-box">
                  <strong>
                    {String(
                      timeLeft.hours
                    ).padStart(2, "0")}
                  </strong>

                  <span>HOURS</span>
                </div>

                <div className="count-separator">
                  :
                </div>

                <div className="count-box">
                  <strong>
                    {String(
                      timeLeft.minutes
                    ).padStart(2, "0")}
                  </strong>

                  <span>MINUTES</span>
                </div>

                <div className="count-separator">
                  :
                </div>

                <div className="count-box">
                  <strong>
                    {String(
                      timeLeft.seconds
                    ).padStart(2, "0")}
                  </strong>

                  <span>SECONDS</span>
                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              STORY
          ================================================= */}

          <section
            id="story"
            className="story-section"
          >

            <div className="section-container">

              <div className="story-grid">

                <div className="story-image reveal">

                  <div className="image-frame">

                    <img
                      src={`${BASE_URL}images/couple-2.jpeg`}
                      alt="Vignesh and Ramya"
                    />

                  </div>

                </div>

                <div className="story-content reveal">

                  <div className="section-kicker">
                    OUR STORY
                  </div>

                  <h2 className="section-title">
                    Two Hearts.
                    <span>One Beautiful Journey.</span>
                  </h2>

                  <div className="gold-line" />

                  <p>
                    Some stories are written in
                    books. Ours was written in
                    countless little moments,
                    smiles, conversations and
                    memories.
                  </p>

                  <p>
                    From the first hello to the
                    moments that made us realize
                    we wanted to spend our lives
                    together, every chapter has
                    brought us closer.
                  </p>

                  <p className="story-signature">
                    With love,
                    <br />
                    <strong>
                      Vignesh & Ramya
                    </strong>
                  </p>

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              EVENTS
          ================================================= */}

          <section
            id="events"
            className="events-section"
          >

            <div className="section-container">

              <div className="section-header reveal">

                <div className="section-kicker">
                  SAVE THE DATE
                </div>

                <h2 className="section-title">
                  Wedding
                  <span>Celebrations</span>
                </h2>

                <p>
                  Join us as we begin this
                  beautiful new chapter together.
                </p>

              </div>

              <div className="events-grid">

                <article className="event-card reveal">

                  <div className="event-number">
                    01
                  </div>

                  <div className="event-icon">
                    ✦
                  </div>

                  <div className="event-day">
                    SATURDAY
                  </div>

                  <h3>
                    Wedding Reception
                  </h3>

                  <div className="event-date">
                    13 FEBRUARY 2027
                  </div>

                  <p>
                    06:00 PM onwards
                  </p>

                  <div className="event-location">
                    Madurai
                  </div>

                </article>

                <article className="event-card featured reveal">

                  <div className="event-number">
                    02
                  </div>

                  <div className="event-icon">
                    ♡
                  </div>

                  <div className="event-day">
                    SUNDAY
                  </div>

                  <h3>
                    Wedding Ceremony
                  </h3>

                  <div className="event-date">
                    14 FEBRUARY 2027
                  </div>

                  <p>
                    09:00 AM onwards
                  </p>

                  <div className="event-location">
                    Madurai
                  </div>

                </article>

                <article className="event-card reveal">

                  <div className="event-number">
                    03
                  </div>

                  <div className="event-icon">
                    ✧
                  </div>

                  <div className="event-day">
                    SUNDAY
                  </div>

                  <h3>
                    Wedding Lunch
                  </h3>

                  <div className="event-date">
                    14 FEBRUARY 2027
                  </div>

                  <p>
                    12:30 PM onwards
                  </p>

                  <div className="event-location">
                    Madurai
                  </div>

                </article>

              </div>

            </div>

          </section>

          {/* =================================================
              GALLERY
          ================================================= */}

          <section
            id="gallery"
            className="gallery-section"
          >

            <div className="section-container">

              <div className="section-header reveal">

                <div className="section-kicker">
                  MEMORIES
                </div>

                <h2 className="section-title">
                  Moments
                  <span>We Treasure</span>
                </h2>

              </div>

              <div className="gallery-grid">

                <div className="gallery-item large reveal">
                  <img
                    src={`${BASE_URL}images/couple-3.jpeg`}
                    alt=""
                  />
                </div>

                <div className="gallery-item reveal">
                  <img
                    src={`${BASE_URL}images/couple-4.jpeg`}
                    alt=""
                  />
                </div>

                <div className="gallery-item reveal">
                  <img
                    src={`${BASE_URL}images/couple-5.jpg`}
                    alt=""
                  />
                </div>

                <div className="gallery-item reveal">
                  <img
                    src={`${BASE_URL}images/couple-6.jpeg`}
                    alt=""
                  />
                </div>

                <div className="gallery-item large reveal">
                  <img
                    src={`${BASE_URL}images/couple-8.jpeg`}
                    alt=""
                  />
                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              VENUE
          ================================================= */}

          <section
            id="venue"
            className="venue-section"
          >

            <div className="venue-background">
              <img
                src={`${BASE_URL}images/venue.jpeg`}
                alt="Wedding venue"
              />
            </div>

            <div className="venue-overlay" />

            <div className="venue-content reveal">

              <div className="section-kicker">
                JOIN US
              </div>

              <h2 className="section-title">
                The
                <span>Venue</span>
              </h2>

              <div className="venue-card">

                <div className="venue-icon">
                  ♧
                </div>

                <h3>
                  Wedding Venue
                </h3>

                <p>
                  Madurai
                  <br />
                  Tamil Nadu, India
                </p>

                <button
                  className="primary-button"
                  onClick={openMap}
                >
                  View on Google Maps
                </button>

              </div>

            </div>

          </section>

          {/* =================================================
              RSVP
          ================================================= */}

          <section
            id="rsvp"
            className="rsvp-section"
          >

            <div className="section-container">

              <div className="rsvp-card reveal">

                <div className="section-kicker">
                  YOUR PRESENCE MATTERS
                </div>

                <h2 className="section-title">
                  Will You
                  <span>Join Us?</span>
                </h2>

                <p>
                  Your presence would make our
                  celebration even more special.
                </p>

                <div className="rsvp-heart">
                  ♥
                </div>

                <a
                  className="primary-button"
                  href="mailto:your-email@example.com?subject=Wedding RSVP - Vignesh & Ramya"
                >
                  RSVP NOW
                </a>

              </div>

            </div>

          </section>

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer className="footer">

            <div className="footer-monogram">
              V <span>&</span> R
            </div>

            <h2>
              Vignesh & Ramya
            </h2>

            <p>
              Forever begins with us.
            </p>

            <div className="footer-line">
              ✦
            </div>

            <div className="footer-date">
              14 · 02 · 2027
            </div>

          </footer>

          {/* =================================================
              MUSIC BUTTON
          ================================================= */}

          <button
            className={`music-button ${
              musicPlaying ? "playing" : ""
            }`}
            onClick={toggleMusic}
            aria-label="Toggle music"
          >

            <span className="music-disc">
              {musicPlaying ? "♫" : "♪"}
            </span>

          </button>

        </main>
      )}

    </div>
  );
}

export default App;