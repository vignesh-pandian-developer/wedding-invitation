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

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  /* =========================================
     COUNTDOWN
  ========================================= */

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference =
        weddingDate.getTime() - now.getTime();

      if (difference <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setCountdown({
        days: Math.floor(
          difference / (1000 * 60 * 60 * 24)
        ),
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

  /* =========================================
     SCROLL REVEAL
  ========================================= */

  useEffect(() => {
    if (!opened) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const elements =
        document.querySelectorAll(".reveal");

      elements.forEach((element) => {
        const rect =
          element.getBoundingClientRect();

        if (
          rect.top <
          window.innerHeight - 80
        ) {
          element.classList.add("visible");
        }
      });
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [opened]);

  /* =========================================
     OPEN INVITATION
  ========================================= */

  const openInvitation = () => {
    if (opening) return;

    setOpening(true);

    setTimeout(() => {
      setShowDoor(false);
      setOpened(true);
       audioRef.current.play();
        setMusicPlaying(true);
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }, 1800);
  };

  /* =========================================
     MUSIC
  ========================================= */

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
      console.log(
        "Music playback blocked:",
        error
      );
    }
  };

  /* =========================================
     NAVIGATION
  ========================================= */

  const scrollToSection = (id) => {
    const element =
      document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /* =========================================
     GOOGLE MAP
  ========================================= */

  const openMap = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=Madurai",
      "_blank"
    );
  };

  return (
    <>
      {/* =====================================
          MUSIC
      ===================================== */}

      <audio
        ref={audioRef}
        src={`${BASE_URL}music/wedding-music.mp3`}
        loop
      />

      {/* =====================================
          INTRO DOOR
      ===================================== */}

      {showDoor && (
        <div
          className={`door-screen ${
            opening ? "door-opening" : ""
          }`}
        >
          <div className="door-bg-glow" />

          <div className="door-stars">
            <span>✦</span>
            <span>✧</span>
            <span>✦</span>
            <span>✧</span>
            <span>✦</span>
            <span>✧</span>
            <span>✦</span>
            <span>✧</span>
          </div>

          {/* DOOR TOP CONTENT */}

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
              Vignesh{" "}
              <span>&amp;</span>{" "}
              Ramya
            </div>

            <div className="door-date">
              14 · 02 · 2027
            </div>
          </div>

          {/* LUXURY DOOR */}

          <div className="luxury-door">

            <div className="door-center-content">
              <div className="door-monogram">
                V <span>&amp;</span> R
              </div>

              <div className="door-inside-text">
                OUR WEDDING
              </div>

              <div className="door-inside-date">
                14 · 02 · 2027
              </div>
            </div>

            {/* LEFT */}

            <div className="door-side left-door">
              <div className="door-panel">
                <div className="panel-border">
                  <div className="panel-inner">

                    <div className="door-corner top-left" />
                    <div className="door-corner top-right" />
                    <div className="door-corner bottom-left" />
                    <div className="door-corner bottom-right" />

                    <div className="door-panel-symbol">
                      V
                    </div>

                    <div className="door-panel-line" />

                    <div className="door-panel-text">
                      TOGETHER
                    </div>

                  </div>
                </div>
              </div>

              <div className="door-handle right-handle">
                <span />
              </div>
            </div>

            {/* RIGHT */}

            <div className="door-side right-door">
              <div className="door-panel">
                <div className="panel-border">
                  <div className="panel-inner">

                    <div className="door-corner top-left" />
                    <div className="door-corner top-right" />
                    <div className="door-corner bottom-left" />
                    <div className="door-corner bottom-right" />

                    <div className="door-panel-symbol">
                      R
                    </div>

                    <div className="door-panel-line" />

                    <div className="door-panel-text">
                      FOREVER
                    </div>

                  </div>
                </div>
              </div>

              <div className="door-handle left-handle">
                <span />
              </div>
            </div>

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

          {!opening && (
            <div className="door-footer">
              TAP TO OPEN
            </div>
          )}
        </div>
      )}

      {/* =====================================
          MAIN INVITATION
      ===================================== */}

      {opened && (
        <div className="invitation">

          {/* =================================
              NAVBAR
          ================================= */}

          <header
            className={`navbar ${
              scrolled
                ? "navbar-scrolled"
                : ""
            }`}
          >
            <div
              className="nav-logo"
              onClick={() =>
                scrollToSection("home")
              }
            >
              V <span>&amp;</span> R
            </div>

            <nav className="nav-links">
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
                Story
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
            </nav>

            <button
              className="nav-music"
              onClick={toggleMusic}
            >
              {musicPlaying ? "♫" : "♪"}
            </button>
          </header>

          {/* =================================
              HERO
          ================================= */}

          <section
            id="home"
            className="hero"
          >
            <div className="hero-background" />

            <div className="hero-overlay" />

            <div className="hero-content">

              <div className="hero-eyebrow">
                TOGETHER WITH THEIR FAMILIES
              </div>

              <div className="hero-small-line">
                ✦
              </div>

              {/* =================================
                  HERO NAME
                  Vignesh
                     &
                   Ramya
              ================================= */}

              <h1 className="hero-title">

                <span className="hero-name">
                  Vignesh
                </span>

                <span className="hero-ampersand">
                  &amp;
                </span>

                <span className="hero-name">
                  Ramya
                </span>

              </h1>

              <div className="hero-date">
                14 · 02 · 2027
              </div>

              <div className="hero-location">
                Madurai, Tamil Nadu
              </div>

              <button
                className="hero-scroll-button"
                onClick={() =>
                  scrollToSection(
                    "countdown"
                  )
                }
              >
                <span>
                  SCROLL TO EXPLORE
                </span>

                <span className="scroll-arrow">
                  ↓
                </span>
              </button>

            </div>
          </section>

          {/* =================================
              COUNTDOWN
          ================================= */}

          <section
            id="countdown"
            className="countdown-section section"
          >
            <div className="section-heading reveal">

              <div className="section-kicker">
                THE COUNTDOWN
              </div>

              <h2>
                Until We Say
                <span>I Do</span>
              </h2>

              <div className="gold-line">
                <span>✦</span>
              </div>

            </div>

            <div className="countdown-grid reveal">

              <div className="countdown-box">
                <strong>
                  {countdown.days}
                </strong>
                <span>Days</span>
              </div>

              <div className="countdown-box">
                <strong>
                  {String(
                    countdown.hours
                  ).padStart(2, "0")}
                </strong>
                <span>Hours</span>
              </div>

              <div className="countdown-box">
                <strong>
                  {String(
                    countdown.minutes
                  ).padStart(2, "0")}
                </strong>
                <span>Minutes</span>
              </div>

              <div className="countdown-box">
                <strong>
                  {String(
                    countdown.seconds
                  ).padStart(2, "0")}
                </strong>
                <span>Seconds</span>
              </div>

            </div>
          </section>

          {/* =================================
              STORY
          ================================= */}

          <section
            id="story"
            className="story-section section"
          >
            <div className="story-container">

              <div className="story-image reveal">
                <img
                  src={`${BASE_URL}images/couple-1.jpeg`}
                  alt="Vignesh and Ramya"
                />
              </div>

              <div className="story-content reveal">

                <div className="section-kicker">
                  OUR STORY
                </div>

                <h2>
                  Two Hearts.
                  <span>
                    One Beautiful Journey.
                  </span>
                </h2>

                <div className="gold-line left">
                  <span>✦</span>
                </div>

                <p>
                  Some stories begin
                  unexpectedly, but the most
                  beautiful ones become a journey
                  of love, laughter and
                  togetherness.
                </p>

                <p>
                  We are grateful for every moment
                  that brought us here and excited
                  to begin this beautiful new
                  chapter together.
                </p>

                <div className="story-signature">
                  Vignesh &amp; Ramya
                </div>

              </div>
            </div>
          </section>

          {/* =================================
              EVENTS
          ================================= */}

          <section
            id="events"
            className="events-section section"
          >
            <div className="section-heading reveal">

              <div className="section-kicker">
                JOIN US
              </div>

              <h2>
                Wedding
                <span>
                  Celebrations
                </span>
              </h2>

              <div className="gold-line">
                <span>✦</span>
              </div>

            </div>

            <div className="events-grid">

              <div className="event-card reveal">

                <div className="event-icon">
                  ♡
                </div>

                <div className="event-date">
                  13 FEBRUARY 2027
                </div>

                <h3>
                  Reception
                </h3>

                <div className="event-time">
                  6:00 PM onwards
                </div>

                <p>
                  An evening filled with joy,
                  laughter and beautiful
                  memories.
                </p>

                <div className="event-location">
                  Madurai, Tamil Nadu
                </div>

              </div>

              <div className="event-card featured reveal">

                <div className="event-icon">
                  ✦
                </div>

                <div className="event-date">
                  14 FEBRUARY 2027
                </div>

                <h3>
                  Wedding
                </h3>

                <div className="event-time">
                  9:00 AM onwards
                </div>

                <p>
                  Join us as we begin our forever
                  surrounded by our loved ones.
                </p>

                <div className="event-location">
                  Madurai, Tamil Nadu
                </div>

              </div>

            </div>
          </section>

          {/* =================================
              GALLERY
          ================================= */}

          <section
            id="gallery"
            className="gallery-section section"
          >
            <div className="section-heading reveal">

              <div className="section-kicker">
                MEMORIES
              </div>

              <h2>
                Moments
                <span>
                  To Remember
                </span>
              </h2>

              <div className="gold-line">
                <span>✦</span>
              </div>

            </div>

            <div className="gallery-grid">

              {[
                "couple-1.jpeg",
                "couple-2.jpeg",
                "couple-3.jpeg",
                "couple-4.jpeg",
                "couple-5.jpg",
                "couple-6.jpeg",
                "couple-8.jpeg",
              ].map(
                (image, index) => (
                  <div
                    key={image}
                    className={`gallery-item gallery-${
                      index + 1
                    } reveal`}
                  >
                    <img
                      src={`${BASE_URL}images/${image}`}
                      alt={`Wedding memory ${
                        index + 1
                      }`}
                    />
                  </div>
                )
              )}

            </div>
          </section>

          {/* =================================
              VENUE
          ================================= */}

          <section
            id="venue"
            className="venue-section section"
          >
            <div className="venue-container">

              <div className="venue-image reveal">
                <img
                  src={`${BASE_URL}images/venue.jpeg`}
                  alt="Wedding venue"
                />
              </div>

              <div className="venue-content reveal">

                <div className="section-kicker">
                  THE VENUE
                </div>

                <h2>
                  Celebrate
                  <span>
                    With Us
                  </span>
                </h2>

                <div className="gold-line left">
                  <span>✦</span>
                </div>

                <h3>
                  Wedding Celebration
                </h3>

                <p>
                  Madurai, Tamil Nadu
                </p>

                <p>
                  We would love to celebrate
                  this special day surrounded by
                  the people who mean the most to
                  us.
                </p>

                <button
                  className="gold-button"
                  onClick={openMap}
                >
                  VIEW ON MAP
                </button>

              </div>
            </div>
          </section>

          {/* =================================
              RSVP
          ================================= */}

          <section
            id="rsvp"
            className="rsvp-section section"
          >
            <div className="rsvp-card reveal">

              <div className="section-kicker">
                RSVP
              </div>

              <h2>
                Will You
                <span>
                  Join Us?
                </span>
              </h2>

              <div className="gold-line">
                <span>✦</span>
              </div>

              <p>
                Your presence would make our
                celebration even more meaningful.
              </p>

              <button className="gold-button">
                RSVP NOW
              </button>

            </div>
          </section>

          {/* =================================
              FOOTER
          ================================= */}

          <footer className="footer">

            <div className="footer-monogram">
              V <span>&amp;</span> R
            </div>

            <div className="footer-names">
              Vignesh &amp; Ramya
            </div>

            <div className="footer-date">
              14 · 02 · 2027
            </div>

            <div className="footer-line">
              <span>✦</span>
            </div>

            <p>
              With love, laughter and forever.
            </p>

          </footer>

          {/* FLOATING MUSIC */}

          <button
            className={`floating-music ${
              musicPlaying
                ? "playing"
                : ""
            }`}
            onClick={toggleMusic}
            aria-label="Toggle wedding music"
          >
            {musicPlaying ? "♫" : "♪"}
          </button>

        </div>
      )}
    </>
  );
}

export default App;