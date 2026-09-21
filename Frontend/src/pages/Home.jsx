import { useEffect, useRef, useState } from "react";
import useCart from "../context/useCart.js";

const categories = [
  {
    name: "Indian cuisine",
    detail: "Comfort in every bite",
    icon: "🍛",
    color: "bg-orange-100",
    image: "./images/indiancuisine.avif"
  },
  {
    name: "Street favorites",
    detail: "Bold, bright, unforgettable",
    icon: "🌮",
    color: "bg-amber-100",
    image: "./images/streetfood.avif"
  },
  {
    name: "Fresh & light",
    detail: "Goodness made delicious",
    icon: "🥗",
    color: "bg-lime-100",
    image: "./images/freshandlightfood.avif"
  },
  {
    name: "Sweet endings",
    detail: "Save room for dessert",
    icon: "🍰",
    color: "bg-rose-100",
    image: "./images/sweetfood.jpg"
  },
];

const popularDishes = [
  {
    name: "Tandoori Butter Bowl",
    description: "Charred paneer, makhani sauce, basmati rice",
    price: "रु 1,806",
    rating: "4.9",
    color: "from-orange-300 to-red-400",
    emoji: "/images/TandooriButterBowl.avif",
  },
  {
    name: "Crispy Masala Wrap",
    description: "Spiced potato, fresh slaw, mint chutney",
    price: "रु 1,330",
    rating: "4.8",
    color: "from-amber-200 to-orange-400",
    emoji: "/images/CrispyMasalaWrap.avif",
  },
  {
    name: "Mango Cloud Lassi",
    description: "Alphonso mango, yogurt, cardamom",
    price: "रु 735",
    rating: "5.0",
    color: "from-yellow-200 to-amber-300",
    emoji: "/images/MangoCloudLassi.jpg",
  },
];

const reviews = [
  {
    quote:
      "The kind of meal that makes a busy Tuesday feel like a celebration.",
    name: "Maya R.",
    detail: "Regular customer",
    initials: "MR",
  },
  {
    quote:
      "Everything arrived warm, beautifully packed, and somehow even tastier than expected.",
    name: "Jonah K.",
    detail: "Verified order",
    initials: "JK",
  },
  {
    quote:
      "Bhoj Express is now our Friday night ritual. The butter bowl is genuinely excellent.",
    name: "Aisha T.",
    detail: "Verified order",
    initials: "AT",
  },
  {
    quote:
      "The flavors are bright, comforting, and exactly what I wanted after a long day.",
    name: "Ravi S.",
    detail: "Verified order",
    initials: "RS",
  },
  {
    quote:
      "Fast delivery, generous portions, and the friendliest service in the neighborhood.",
    name: "Nina P.",
    detail: "Regular customer",
    initials: "NP",
  },
  {
    quote:
      "I found my new favorite lunch spot without leaving my desk. Absolutely delightful.",
    name: "Leo M.",
    detail: "Verified order",
    initials: "LM",
  },
];

const feedbackNotes = [
  ["“Perfectly spiced and still hot when it arrived.”", "Priya, Kathmandu"],
  ["“The ordering experience was as good as the food.”", "Sam, Lalitpur"],
  ["“That mango lassi deserves its own fan club.”", "Anu, Bhaktapur"],
  ["“A reliable little bright spot in a busy week.”", "Kiran, Kathmandu"],
];

function Stars({ value = "5.0" }) {
  return (
    <span
      className="inline-flex items-center gap-1"
      aria-label={`${value} out of 5 stars`}
    >
      <span className="text-amber-400" aria-hidden="true">
        ★★★★★
      </span>
      <span className="text-xs font-bold text-orange-950">{value}</span>
    </span>
  );
}

function AnimatedMetric({ value, suffix = "", decimals = 0 }) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();
    let animationFrame;

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      setCurrentValue(value * easedProgress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  return (
    <span aria-label={`${value}${suffix}`}>
      {currentValue.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

function Home() {
  const marqueeReviews = [...reviews, ...reviews];
  const [sentItem, setSentItem] = useState("");
  const { addToCart } = useCart();

  // --- Swipe reviews logic ---
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / reviews.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  const scrollToIndex = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / reviews.length;
    el.scrollTo({ left: cardWidth * index, behavior: "smooth" });
  };
  // --- End swipe reviews logic ---

  const handlePrev = () => {
    if (activeIndex > 0) scrollToIndex(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < reviews.length - 1) scrollToIndex(activeIndex + 1);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    setSentItem(item.name);
    window.setTimeout(() => setSentItem(""), 1200);
  };

  return (
    <div className="overflow-hidden bg-orange-50 text-orange-950">
      <section
        id="home"
        className="relative isolate border-b border-orange-100"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_20%,_#fed7aa_0,_transparent_34%),linear-gradient(115deg,_#fff7ed_0%,_#ffedd5_54%,_#fed7aa_100%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-700">
              <span className="h-2 w-2 rounded-full bg-green-500" /> Delivering
              fresh today
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-tight sm:text-7xl">
              Food that feels like{" "}
              <span className="text-orange-600">home.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-orange-900/70">
              Big flavors, honest ingredients, and a warm delivery to your
              doorstep. Discover your next comfort meal with Bhoj Express.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="menu"
                className="rounded-full bg-orange-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-600/20 transition-transform hover:-translate-y-0.5 hover:bg-orange-700"
              >
                Explore the menu <span aria-hidden="true">→</span>
              </a>
              <a
                href="#how-it-works"
                className="rounded-full border border-orange-300 bg-white/60 px-7 py-3.5 text-sm font-bold text-orange-900 hover:bg-white"
              >
                How it works
              </a>
            </div>
            <div className="mt-10 flex items-center gap-4 text-sm text-orange-900/70">
              <div className="flex -space-x-2" aria-hidden="true">
                {["MR", "JK", "AT"].map((initials) => (
                  <span
                    key={initials}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-orange-50 bg-orange-800 text-[10px] font-bold text-white"
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <span>
                <strong className="text-orange-950">4.9/5</strong> from 2,000+
                happy foodies
              </span>
            </div>
          </div>

          {/* Right column — with extra padding so floating badges don't clip */}
          <div className="relative mx-auto w-full max-w-lg px-6 pb-8 pt-8 sm:px-8 sm:pb-10 sm:pt-10">
            {/* Top-right rating badge */}
            <div className="absolute right-0 top-0 z-10 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-orange-900/10">
              <Stars value="4.9" />
              <p className="mt-1 text-xs font-medium text-orange-900/60">
                Loved by locals
              </p>
            </div>

            {/* Main card */}
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-orange-950 p-5 shadow-2xl shadow-orange-950/20">
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] text-white">

                {/* Background image — brighter */}
                <img
                  src="/images/myrestaurant.webp"
                  alt="Featured dish"
                  className="absolute inset-0 h-full w-full object-cover brightness-110 saturate-105"
                />

                {/* Lighter gradient — only darkens top/bottom for text */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55" />

                {/* Content */}
                <div className="relative flex h-full flex-col justify-between p-7">
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-bold uppercase tracking-[0.18em] text-orange-100 drop-shadow-md">
                      Bhoj / Express
                    </span>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">
                      #01
                    </span>
                  </div>

                  <div className="text-center">
                    <p className="text-3xl font-black drop-shadow-lg">Made with heart.</p>
                    <p className="mt-2 text-orange-100 drop-shadow-md">Delivered with care.</p>
                  </div>

                  <div className="flex items-end justify-between text-xs font-semibold text-orange-100">
                    <span className="drop-shadow-md">
                      Comfort food
                      <br />
                      for every mood
                    </span>
                    <span className="text-right drop-shadow-md">
                      Est. 2026
                      <br />
                      Fresh daily
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom-left delivery badge */}
            <div className="absolute bottom-0 left-0 z-10 rounded-2xl bg-white px-5 py-4 shadow-xl shadow-orange-900/10">
              <p className="text-2xl font-black text-orange-600">30 min</p>
              <p className="text-xs font-medium text-orange-900/60">
                Average delivery
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        aria-label="Bhoj Express highlights"
        className="border-b border-orange-100 bg-white"
      >
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-7 sm:grid-cols-3 lg:px-8">
          {[
            [2000, "+", "orders delivered"],
            [4.9, " / 5", "average rating", 1],
            [30, " min", "to your doorstep"],
          ].map(([value, suffix, label, decimals = 0]) => (
            <div
              key={label}
              className="flex items-center gap-3 border-orange-100 sm:border-r sm:last:border-0"
            >
              <span className="text-2xl font-black text-orange-600">
                <AnimatedMetric
                  value={value}
                  suffix={suffix}
                  decimals={decimals}
                />
              </span>
              <span className="text-sm text-orange-950/60">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
              Find your flavor
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">
              What are you craving?
            </h2>
          </div>
          <a
            href="menu"
            className="text-sm font-bold text-orange-600 hover:text-orange-800"
          >
            View all categories <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <a
              key={category.name}
              href={
                category.name === "Indian cuisine"
                  ? "/menu?category=Indian%20Cuisine"
                  : "menu"
              }
              className={`group relative flex flex-col overflow-hidden rounded-3xl ${category.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-black tracking-tight text-orange-950">
                  {category.name}
                </h3>
                <p className="mt-1 text-sm text-orange-950/60">
                  {category.detail}
                </p>

                <span
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-orange-700 transition-all duration-300 group-hover:gap-3"
                  aria-hidden="true"
                >
                  Explore
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-orange-950 py-20 text-orange-50">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
                The crowd favorites
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-tight text-white">
                Good taste, confirmed.
              </h2>
            </div>
            <a
              href="menu"
              className="text-sm font-bold text-orange-300 hover:text-white"
            >
              Browse full menu <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {popularDishes.map((dish) => (
              <article
                key={dish.name}
                className="group relative overflow-hidden rounded-3xl bg-white text-orange-950 shadow-[0_10px_30px_rgba(124,45,18,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(124,45,18,0.15)]"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-orange-200 via-amber-300 to-yellow-200">
                  <img
                    src={dish.emoji}
                    alt={dish.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Bottom gradient for the price tag readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Rating badge — top-left */}
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-orange-950 shadow-sm backdrop-blur">
                    <span className="text-amber-400">★</span>
                    {dish.rating}
                  </span>

                  {/* Price tag — bottom-right, on the image */}
                  <span className="absolute bottom-4 right-4 rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-black text-white shadow-lg shadow-emerald-900/20">
                    {dish.price}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-black tracking-tight">{dish.name}</h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-orange-950/60">
                    {dish.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-orange-100 pt-5">
                    <Stars value={dish.rating} />

                    <button
                      type="button"
                      onClick={() => handleAddToCart(dish)}
                      className={`rounded-full px-5 py-2 text-sm font-bold transition-all duration-300 ${sentItem === dish.name
                          ? "bg-green-600 text-white"
                          : "bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/30"
                        }`}
                    >
                      {sentItem === dish.name ? "Sent ✓" : "Add to order +"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-5 py-20 lg:px-8"
      >
        <div className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
            Simple as 1, 2, yum
          </p>
          <h2 className="mt-2 text-4xl font-black tracking-tight">
            From our kitchen to your table.
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            [
              "01",
              "Choose your craving",
              "Browse a menu built around big flavor and easy choices.",
            ],
            [
              "02",
              "We cook it fresh",
              "Our kitchen starts your order when you place it, never before.",
            ],
            [
              "03",
              "Enjoy the moment",
              "Follow your delivery and get ready for a meal worth sharing.",
            ],
          ].map(([number, title, text], index) => (
            <div
              key={number}
              className="group relative border-t-2 border-orange-200 pt-6 transition-all duration-500 hover:border-orange-500 hover:-translate-y-1"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <span className="absolute -top-[2px] left-0 h-[2px] w-0 bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500 group-hover:w-full" />

              <span className="inline-block text-sm font-black text-orange-600 transition-transform duration-500 group-hover:-translate-y-1">
                {number}
              </span>

              <h3 className="mt-12 text-xl font-black tracking-tight transition-colors duration-300 group-hover:text-orange-700">
                {title}
              </h3>

              <p className="mt-3 max-w-xs text-sm leading-6 text-orange-950/60">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="reviews"
        className="border-y border-orange-200 bg-orange-100"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
                Kind words
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                The reviews are in.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-orange-950/65">
                A few notes from the people who keep us cooking. Every rating
                helps us make the next order even better.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="text-3xl font-black">4.9</span>
                <div>
                  <div
                    className="text-sm tracking-widest text-amber-400"
                    aria-label="5 out of 5 stars"
                  >
                    ★★★★★
                  </div>
                  <p className="text-xs text-orange-950/50">2,000+ reviews</p>
                </div>
              </div>
            </div>
            <a
              href="contact"
              className="w-fit rounded-full border-2 border-orange-600 px-7 py-3.5 text-sm font-bold text-orange-700 hover:bg-orange-600 hover:text-white"
            >
              Leave feedback <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Swipeable reviews with side arrows */}
          <div className="mt-10 flex items-center gap-4">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous review"
              className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-xl text-orange-600 shadow-md transition hover:bg-orange-50 disabled:opacity-30 disabled:hover:bg-white sm:flex"
            >
              ←
            </button>

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {reviews.map((review, index) => (
                <figure
                  key={`${review.name}-${index}`}
                  className="flex h-full w-[85%] flex-none snap-start flex-col rounded-2xl border border-orange-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-orange-300 hover:shadow-md sm:w-[48%] lg:w-[calc((100%-3rem)/4)]"
                >
                  <div
                    className="text-sm tracking-widest text-amber-400"
                    aria-label="5 out of 5 stars"
                  >
                    ★★★★★
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm font-bold leading-6 text-orange-950">
                    “{review.quote}”
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-3 border-t border-orange-100 pt-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-200 text-xs font-black text-orange-800">
                      {review.initials}
                    </span>
                    <span>
                      <strong className="block text-sm">{review.name}</strong>
                      <span className="text-xs text-orange-950/50">
                        {review.detail}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={activeIndex === reviews.length - 1}
              aria-label="Next review"
              className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-xl text-orange-600 shadow-md transition hover:bg-orange-50 disabled:opacity-30 disabled:hover:bg-white sm:flex"
            >
              →
            </button>
          </div>
        </div>
      </section>

      <section
        id="order"
        className="mx-auto max-w-7xl px-5 py-20 text-center lg:px-8"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white ring-4 ring-orange-200">
          <img
            src="/bhojExpress(1).jpg"
            alt="Bhoj Express"
            className="h-full w-full rounded-full object-contain"
          />
        </div>
        <h2 className="mx-auto mt-6 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
          Ready when your appetite is.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-orange-950/60">
          Skip the cooking, keep the joy. Order your favorite meal and make
          today delicious.
        </p>
        <a
          href="menu"
          className="mt-8 inline-block rounded-full bg-orange-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-700"
        >
          Start your order <span aria-hidden="true">→</span>
        </a>
      </section>
    </div>
  );
}

export default Home;