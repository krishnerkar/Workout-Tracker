export default function Head() {
  return (
    <>
      <title>{"Krish's Workout Tracker"}</title>
      <meta name="title" content="Krish's Workout Tracker" />
      <meta
        name="description"
        content="Tracking Krish's workouts - GitHub style"
      />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      <meta name="image" property="og:image" content="/meta.png" />
      <meta
        property="og:description"
        content="Tracking Krish's workouts - GitHub style"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@krishnerkar" />
      <meta name="twitter:title" content="Krish's Workout Tracker" />
      <meta
        name="twitter:description"
        content="Tracking Krish's workouts - GitHub style"
      />
      <meta
        name="twitter:image"
        content="https://workouts-krish.vercel.app/meta.png"
      ></meta>
    </>
  );
}
