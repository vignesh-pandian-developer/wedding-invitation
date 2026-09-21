import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [opened, setOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const audioRef = useRef(null);

  const bride = "Ramya";
  const groom = "Vignesh";

  const weddingDate = new Date("2027-02-14T09:30:00");

  const getCountdown = () => {
    const difference =
      weddingDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
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
    };
  };

  const [countdown, setCountdown] =
    useState(getCountdown());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

 const openInvitation = async () => {
  setOpened(true);
  document.body.style.overflow = "auto";

  if (audioRef.current) {
    try {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.7;

      await audioRef.current.play();

      setMusicPlaying(true);
    } catch (error) {
      console.error("Music could not start:", error);
      setMusicPlaying(false);
    }
  }
};

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setMusicPlaying(true))
        .catch(() => {
          console.log("Browser blocked audio playback.");
        });
    }
  };

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/wedding-music.mp3"
        loop
      />

      {/* ==============================
          DOOR INTRO
      ============================== */}

      {!opened && (
        <div className="door-screen">

          <div className="door-intro">

            <div className="ornament">❈</div>

            <p className="invite-text">
              YOU ARE CORDIALLY INVITED
            </p>

            <h1>
              The Wedding
            </h1>

            <div className="door-names">
              {groom}
              <span>&</span>
              {bride}
            </div>

            <p className="door-date">
              14 • 02 • 2027
            </p>

            <div className="doors">

              <div className="door door-left">
                <span>❦</span>
              </div>

              <div className="door door-right">
                <span>❦</span>
              </div>

              <button
                className="open-invitation"
                onClick={openInvitation}
              >
                <strong>
                  Open Invitation
                </strong>

                <small>
                  Tap to enter
                </small>
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ==============================
          MAIN INVITATION
      ============================== */}

      <div
        className={`invitation ${
          opened ? "show" : ""
        }`}
      >

        {/* MUSIC */}

        <button
          className="music-button"
          onClick={toggleMusic}
        >
          {musicPlaying ? "🔊" : "🔇"}
        </button>

        {/* ==============================
            HERO
        ============================== */}

        <section className="hero">

          <div className="flower flower-1">
            ✿
          </div>

          <div className="flower flower-2">
            ❀
          </div>

          <div className="hero-content">

            <p className="small-title">
              TOGETHER WITH THEIR FAMILIES
            </p>

            <h2>
              We're Getting
              <br />
              <span>Married</span>
            </h2>

            <div className="main-names">
              <span>{groom}</span>

              <b>&</b>

              <span>{bride}</span>
            </div>

            <p className="date">
              Sunday, 14 February 2027
            </p>

            <div className="divider">
              ❦
            </div>

            <p className="description">
              With joyful hearts, we invite
              you to celebrate our special
              day with us.
            </p>

            <button
              className="gold-button"
              onClick={() => scrollTo("events")}
            >
              VIEW WEDDING DETAILS
            </button>

          </div>
        </section>

        {/* ==============================
            COUNTDOWN
        ============================== */}

        <section className="countdown-section">

          <div className="section-title">
            <p>COUNTING EVERY MOMENT</p>

            <h2>
              Until We Say "I Do"
            </h2>
          </div>

          <div className="countdown">

            <div>
              <strong>
                {String(countdown.days).padStart(
                  2,
                  "0"
                )}
              </strong>
              <span>Days</span>
            </div>

            <i>:</i>

            <div>
              <strong>
                {String(countdown.hours).padStart(
                  2,
                  "0"
                )}
              </strong>
              <span>Hours</span>
            </div>

            <i>:</i>

            <div>
              <strong>
                {String(countdown.minutes).padStart(
                  2,
                  "0"
                )}
              </strong>
              <span>Minutes</span>
            </div>

            <i>:</i>

            <div>
              <strong>
                {String(countdown.seconds).padStart(
                  2,
                  "0"
                )}
              </strong>
              <span>Seconds</span>
            </div>

          </div>
        </section>

        {/* ==============================
            COUPLE
        ============================== */}

        <section className="couple">

          <div className="section-title">
            <p>TWO HEARTS</p>

            <h2>
              One Beautiful Journey
            </h2>
          </div>

          <div className="couple-wrapper">

            <div className="person">

              <img
                src="/images/couple-1.jpeg"
                alt={groom}
              />

              <small>THE GROOM</small>

              <h3>{groom}</h3>

              <p>
                A beautiful journey begins
                with love, laughter and
                togetherness.
              </p>

            </div>

            <div className="heart">
              ♥
            </div>

            <div className="person">

              <img
                src="/images/couple-2.jpeg"
                alt={bride}
              />

              <small>THE BRIDE</small>

              <h3>{bride}</h3>

              <p>
                Two hearts, one promise,
                and a lifetime of beautiful
                memories together.
              </p>

            </div>

          </div>
        </section>

        {/* ==============================
            EVENTS
        ============================== */}

        <section
          className="events"
          id="events"
        >

          <div className="section-title">

            <p>SAVE THE DATE</p>

            <h2>
              Wedding Events
            </h2>

          </div>

          <div className="events-grid">

            <Event
              icon="🪔"
              day="FRIDAY"
              title="Engagement"
              date="12 February 2027"
              time="6:00 PM"
            />

            <Event
              icon="💍"
              day="SUNDAY"
              title="Wedding Ceremony"
              date="14 February 2027"
              time="9:30 AM"
              featured
            />

            <Event
              icon="🥂"
              day="SUNDAY"
              title="Reception"
              date="14 February 2027"
              time="7:00 PM"
            />

          </div>
        </section>

        {/* ==============================
            QUOTE
        ============================== */}

        <section className="quote">

          <div>
            <span>“</span>

            <p>
              Whatever our souls are made of,
              <br />
              theirs and mine are the same.
            </p>

            <span>”</span>
          </div>

        </section>

        {/* ==============================
            GALLERY
        ============================== */}

        <section className="gallery-section">

          <div className="section-title">

            <p>OUR MEMORIES</p>

            <h2>
              A Glimpse of Us
            </h2>

          </div>

          <div className="gallery">

            <img
              src="/images/couple-3.jpeg"
              alt=""
            />

            <img
              src="/images/couple-4.jpeg"
              alt=""
            />

            <img
              src="/images/couple-5.jpg"
              alt=""
            />

            <img
              src="/images/couple-6.jpeg"
              alt=""
            />

            <img
              src="/images/couple-7.jpeg"
              alt=""
            />

          </div>

        </section>

        {/* ==============================
            VENUE
        ============================== */}

        <section className="venue">

          <div className="section-title">

            <p>JOIN US</p>

            <h2>
              The Venue
            </h2>

          </div>

          <div className="venue-card">

            <div>

              <span className="location-icon">
                📍
              </span>

              <h3>
                Grand Wedding Hall
              </h3>

              <p>
                Anna Nagar
                <br />
                Chennai, Tamil Nadu
              </p>

              <p>
                Sunday, 14 February 2027
                <br />
                9:30 AM onwards
              </p>

              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noreferrer"
              >
                OPEN GOOGLE MAPS
              </a>

            </div>

          </div>
        </section>

        {/* ==============================
            RSVP
        ============================== */}

        <section className="rsvp">

          <div className="rsvp-card">

            <p>
              WE WOULD LOVE TO HAVE YOU
            </p>

            <h2>
              Will You Join Us?
            </h2>

            <span>
              Your presence will make our
              special day even more memorable.
            </span>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                alert(
                  "Thank you for your RSVP!"
                );
              }}
            >

              <input
                placeholder="Your Name"
                required
              />

              <input
                type="number"
                min="1"
                placeholder="Number of Guests"
                required
              />

              <select
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Will you attend?
                </option>

                <option>
                  Yes, I'll be there
                </option>

                <option>
                  Sorry, I can't attend
                </option>
              </select>

              <textarea
                rows="4"
                placeholder="Your message..."
              />

              <button
                className="gold-button"
                type="submit"
              >
                SEND RSVP
              </button>

            </form>
          </div>

        </section>

        {/* ==============================
            FINAL
        ============================== */}

        <section className="final">

          <div>

            <span>
              ❀
            </span>

            <p>
              WITH LOVE
            </p>

            <h2>
              {groom}
              <b>&</b>
              {bride}
            </h2>

            <small>
              14 • 02 • 2027
            </small>

            <p>
              Thank you for being part of
              our beautiful journey.
            </p>

          </div>

        </section>

        <footer>
          Made with ♥ for our special day
        </footer>

      </div>
    </>
  );
}

function Event({
  icon,
  day,
  title,
  date,
  time,
  featured,
}) {
  return (
    <div
      className={`event-card ${
        featured ? "featured" : ""
      }`}
    >
      <div className="event-icon">
        {icon}
      </div>

      <small>{day}</small>

      <h3>{title}</h3>

      <p>
        📅 {date}
      </p>

      <p>
        ⏰ {time}
      </p>

      <p>
        📍 Grand Wedding Hall
      </p>

      <hr />

      <span>
        Celebrate this beautiful moment
        with our family and friends.
      </span>
    </div>
  );
}

export default App;