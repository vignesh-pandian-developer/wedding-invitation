import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const BASE_URL = import.meta.env.BASE_URL;

function App() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const audioRef = useRef(null);

  /*
   * ==========================================
   * WEDDING DATE
   * Change this to your actual wedding date.
   * ==========================================
   */
  const weddingDate = new Date("2027-02-14T09:00:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  /*
   * ==========================================
   * COUNTDOWN
   * ==========================================
   */
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      if (distance <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (distance / (1000 * 60 * 60)) % 24
      );

      const minutes = Math.floor(
        (distance / (1000 * 60)) % 60
      );

      const seconds = Math.floor(
        (distance / 1000) % 60
      );

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  /*
   * ==========================================
   * SCROLL EFFECT
   * ==========================================
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /*
   * ==========================================
   * OPEN INVITATION
   * ==========================================
   */
  const openInvitation = async () => {
    setOpening(true);

    /*
     * Start music from the user's click.
     * This is important because browsers can block
     * audio that starts without user interaction.
     */
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.65;

        await audioRef.current.play();

        setMusicPlaying(true);
      } catch (error) {
        console.error(
          "Wedding music could not start:",
          error
        );

        setMusicPlaying(false);
      }
    }

    /*
     * Give the doors time to animate.
     */
    setTimeout(() => {
      setOpened(true);
      document.body.style.overflow = "auto";

      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }, 1500);
  };

  /*
   * ==========================================
   * MUSIC TOGGLE
   * ==========================================
   */
  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setMusicPlaying(true);
      } catch (error) {
        console.error(
          "Music playback failed:",
          error
        );
      }
    } else {
      audioRef.current.pause();
      setMusicPlaying(false);
    }
  };

  /*
   * ==========================================
   * GOOGLE MAPS
   * Replace with your actual venue.
   * ==========================================
   */
  const openMap = () => {
    window.open(
      "https://www.google.com/maps",
      "_blank",
      "noopener,noreferrer"
    );
  };

  /*
   * ==========================================
   * INITIAL PAGE LOCK
   * ==========================================
   */
  useEffect(() => {
    if (!opened) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [opened]);

  return (
    <div className="wedding-app">

      {/* ======================================
          BACKGROUND MUSIC
      ======================================= */}

      <audio
        ref={audioRef}
        src={`${BASE_URL}music/wedding-music.mp3`}
        loop
        preload="auto"
      />

      {/* ======================================
          DOOR INTRO
      ======================================= */}

      {!opened && (
        <section
          className={`door-screen ${
            opening ? "door-opening" : ""
          }`}
        >

          <div className="door-background">

            <div className="door-glow"></div>

            <div className="floating-petal petal-1">
              ✦
            </div>

            <div className="floating-petal petal-2">
              ❋
            </div>

            <div className="floating-petal petal-3">
              ✦
            </div>

            <div className="door-content">

              <div className="door-small-title">
                TOGETHER WITH THEIR FAMILIES
              </div>

              <div className="door-ornament">
                ❦
              </div>

              <div className="door-invite">
                REQUEST THE PLEASURE OF YOUR PRESENCE
              </div>

              <h1 className="door-title">
                Our Wedding
              </h1>

              <div className="door-couple">
                <span>Vignesh</span>
                <b>&</b>
                <span>Ramya</span>
              </div>

              <div className="door-date">
                14 • 02 • 2027
              </div>

              <div className="door-frame">

                <div className="door-left">
                  <div className="door-decoration">
                    ❦
                  </div>

                  <div className="door-panel panel-one"></div>
                  <div className="door-panel panel-two"></div>
                </div>

                <div className="door-right">
                  <div className="door-decoration">
                    ❦
                  </div>

                  <div className="door-panel panel-one"></div>
                  <div className="door-panel panel-two"></div>
                </div>

                <button
                  className="open-button"
                  onClick={openInvitation}
                  disabled={opening}
                >
                  <span className="open-icon">
                    ♡
                  </span>

                  <span>
                    {opening
                      ? "Opening..."
                      : "Open Invitation"}
                  </span>

                  <small>
                    Tap to enter
                  </small>
                </button>

              </div>

              <div className="door-bottom-text">
                A celebration of love, laughter & forever
              </div>

            </div>

          </div>
        </section>
      )}

      {/* ======================================
          MAIN INVITATION
      ======================================= */}

      <main
        className={`invitation ${
          opened ? "invitation-visible" : ""
        }`}
      >

        {/* ====================================
            NAVIGATION
        ===================================== */}

        <header
          className={`top-navigation ${
            scrolled ? "nav-scrolled" : ""
          }`}
        >

          <div className="nav-logo">
            V <span>&</span> R
          </div>

          <nav>
            <a href="#home">Home</a>
            <a href="#story">Our Story</a>
            <a href="#events">Events</a>
            <a href="#gallery">Gallery</a>
            <a href="#venue">Venue</a>
            <a href="#rsvp">RSVP</a>
          </nav>

          <button
            className="nav-music"
            onClick={toggleMusic}
          >
            {musicPlaying ? "♫" : "♪"}
          </button>

        </header>

        {/* ====================================
            HERO
        ===================================== */}

        <section
          id="home"
          className="hero-section"
        >

          <div className="hero-particles">
            <span>✦</span>
            <span>✧</span>
            <span>❋</span>
            <span>✦</span>
            <span>✧</span>
          </div>

          <div className="hero-left">

            <div className="hero-label">
              WE ARE GETTING MARRIED
            </div>

            <div className="hero-line"></div>

            <h1>
              Vignesh
              <span>&</span>
              Ramya
            </h1>

            <p className="hero-description">
              Two hearts, two souls,
              <br />
              one beautiful journey.
            </p>

            <div className="hero-date">
              <span>14</span>
              <div>
                <small>FEBRUARY</small>
                <b>2027</b>
              </div>
            </div>

          </div>

          <div className="hero-image-wrapper">

            <div className="hero-ring ring-one"></div>
            <div className="hero-ring ring-two"></div>

            <div className="hero-image-back">
              <img
                src="images/couple-1.jpeg"
                alt="Vignesh and Ramya"
              />
            </div>

            <div className="hero-image-front">
              <img
                src={`${BASE_URL}images/couple-2.jpeg`}
                alt="Vignesh and Ramya"
              />
            </div>

            <div className="hero-flower flower-one">
              ❋
            </div>

            <div className="hero-flower flower-two">
              ❋
            </div>

          </div>

        </section>

        {/* ====================================
            INTRO
        ===================================== */}

        <section
          id="story"
          className="story-section"
        >

          <div className="section-decoration">
            ❦
          </div>

          <p className="section-kicker">
            OUR JOURNEY
          </p>

          <h2>
            Two Hearts,
            <br />
            <i>One Story</i>
          </h2>

          <p className="story-text">
            Some moments become memories.
            Some memories become stories.
            And some stories become forever.
          </p>

          <div className="story-signature">
            Vignesh <span>♡</span> Ramya
          </div>

        </section>

        {/* ====================================
            OVERLAPPING GALLERY
        ===================================== */}

        <section
          id="gallery"
          className="overlap-section"
        >

          <div className="section-heading">

            <p>
              OUR MEMORIES
            </p>

            <h2>
              Moments
              <i> to cherish</i>
            </h2>

            <span>
              A few beautiful memories from
              our journey together.
            </span>

          </div>

          <div className="overlap-gallery">

            <div className="gallery-photo gallery-photo-one">
              <div className="photo-number">
                01
              </div>

              <img
                src={`${BASE_URL}images/couple-1.jpeg`}
                alt="Wedding memory 1"
              />
            </div>

            <div className="gallery-photo gallery-photo-two">
              <div className="photo-number">
                02
              </div>

              <img
                src={`${BASE_URL}images/couple-2.jpeg`}
                alt="Wedding memory 2"
              />
            </div>

            <div className="gallery-photo gallery-photo-three">
              <div className="photo-number">
                03
              </div>

              <img
                src={`${BASE_URL}images/couple-3.jpeg`}
                alt="Wedding memory 3"
              />
            </div>

            <div className="gallery-photo gallery-photo-four">
              <div className="photo-number">
                04
              </div>

              <img
                src={`${BASE_URL}images/couple-4.jpeg`}
                alt="Wedding memory 4"
              />
            </div>

            <div className="gallery-center">

              <div>
                V
              </div>

              <span>
                &
              </span>

              <div>
                R
              </div>

            </div>

          </div>

        </section>

        {/* ====================================
            COUNTDOWN
        ===================================== */}

        <section className="countdown-section">

          <div className="countdown-overlay"></div>

          <div className="countdown-content">

            <p>
              THE COUNTDOWN BEGINS
            </p>

            <h2>
              Until We Say
              <i> "I Do"</i>
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

        {/* ====================================
            EVENTS
        ===================================== */}

        <section
          id="events"
          className="events-section"
        >

          <div className="section-heading">

            <p>
              SAVE THE DATE
            </p>

            <h2>
              Wedding
              <i> Events</i>
            </h2>

            <span>
              Join us as we celebrate
              these special moments.
            </span>

          </div>

          <div className="events-grid">

            <article className="event-card">

              <div className="event-icon">
                ♡
              </div>

              <p className="event-day">
                FRIDAY
              </p>

              <h3>
                Engagement
              </h3>

              <div className="event-date">
                12 FEB
              </div>

              <p>
                6:00 PM
              </p>

              <span>
                Family Hall
              </span>

              <div className="event-line"></div>

            </article>

            <article className="event-card featured">

              <div className="event-icon">
                ❦
              </div>

              <p className="event-day">
                SUNDAY
              </p>

              <h3>
                Wedding
              </h3>

              <div className="event-date">
                14 FEB
              </div>

              <p>
                9:00 AM
              </p>

              <span>
                Wedding Hall
              </span>

              <div className="event-line"></div>

            </article>

            <article className="event-card">

              <div className="event-icon">
                ✦
              </div>

              <p className="event-day">
                SUNDAY
              </p>

              <h3>
                Reception
              </h3>

              <div className="event-date">
                14 FEB
              </div>

              <p>
                6:30 PM
              </p>

              <span>
                Reception Hall
              </span>

              <div className="event-line"></div>

            </article>

          </div>

        </section>

        {/* ====================================
            FEATURE IMAGE
        ===================================== */}

        <section className="feature-photo-section">

          <div className="feature-photo">

            <img
              src={`${BASE_URL}images/couple-5.jpeg`}
              alt="Vignesh and Ramya"
            />

            <div className="feature-overlay"></div>

            <div className="feature-text">

              <span>
                AND SO THE
              </span>

              <h2>
                Adventure
                <i> Begins</i>
              </h2>

              <div>
                14 . 02 . 2027
              </div>

            </div>

          </div>

        </section>

        {/* ====================================
            VENUE
        ===================================== */}

        <section
          id="venue"
          className="venue-section"
        >

          <div className="venue-image">

            <img
              src={`${BASE_URL}images/venue.jpeg`}
              alt="Wedding venue"
              onError={(event) => {
                event.currentTarget.style.display =
                  "none";
              }}
            />

            <div className="venue-placeholder">
              <span>❦</span>
              <p>OUR WEDDING VENUE</p>
            </div>

          </div>

          <div className="venue-content">

            <p className="section-kicker">
              JOIN US
            </p>

            <h2>
              The
              <br />
              <i>Venue</i>
            </h2>

            <div className="venue-line"></div>

            <h3>
              Your Wedding Hall
            </h3>

            <p>
              Your complete wedding venue
              address goes here.
              <br />
              Madurai, Tamil Nadu
            </p>

            <button
              className="map-button"
              onClick={openMap}
            >
              <span>↗</span>
              VIEW ON MAP
            </button>

          </div>

        </section>

        {/* ====================================
            RSVP
        ===================================== */}

        <section
          id="rsvp"
          className="rsvp-section"
        >

          <div className="rsvp-flower flower-left">
            ❋
          </div>

          <div className="rsvp-flower flower-right">
            ❋
          </div>

          <div className="rsvp-content">

            <div className="section-decoration">
              ❦
            </div>

            <p>
              WE WOULD LOVE TO HAVE YOU
            </p>

            <h2>
              Be Our
              <i> Guest</i>
            </h2>

            <span>
              Your presence will make our
              celebration even more special.
            </span>

            <button
              className="rsvp-button"
              onClick={() => {
                window.location.href =
                  "mailto:your-email@example.com?subject=Wedding RSVP";
              }}
            >
              RSVP
            </button>

          </div>

        </section>

        {/* ====================================
            FOOTER
        ===================================== */}

        <footer className="footer">

          <div className="footer-monogram">
            V <span>&</span> R
          </div>

          <h2>
            Vignesh
            <span>&</span>
            Ramya
          </h2>

          <p>
            With love, laughter and
            happily ever after.
          </p>

          <div className="footer-date">
            14 • 02 • 2027
          </div>

          <div className="footer-line"></div>

          <small>
            MADE WITH LOVE ♥
          </small>

        </footer>

        {/* ====================================
            FLOATING MUSIC BUTTON
        ===================================== */}

        <button
          className={`floating-music ${
            musicPlaying ? "playing" : ""
          }`}
          onClick={toggleMusic}
          aria-label={
            musicPlaying
              ? "Pause wedding music"
              : "Play wedding music"
          }
        >

          <span className="music-disc">
            ♪
          </span>

          {musicPlaying && (
            <span className="music-waves">
              <i></i>
              <i></i>
              <i></i>
            </span>
          )}

        </button>

      </main>
    </div>
  );
}

export default App;