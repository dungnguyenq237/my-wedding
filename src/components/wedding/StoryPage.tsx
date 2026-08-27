import { weddingConfig } from "../../config/wedding";

export const StoryPage = () => (
  <section className="single-page story-page" aria-labelledby="story-title">
    <p className="eyebrow">A LOVE WRITTEN IN TIME</p>
    <h2 id="story-title">Our Story</h2>
    <ol className="story-timeline">
      {weddingConfig.story.map((moment) => (
        <li key={moment.year}>
          <time>{moment.year}</time>
          <span aria-hidden="true" />
          <strong>{moment.title}</strong>
        </li>
      ))}
    </ol>
  </section>
);

