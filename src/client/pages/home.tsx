import React from 'react';
import { NextPage } from 'next';

const Home: NextPage<{ data: string }> = (props) => {
  const { data } = props;

  return (
    <section id="hero-229">
      <div className="cs-container">
        <div className="cs-flex-group">
          <span className="cs-topper">By Kevin Wheeler</span>
          <h1 className="cs-title">Your Thoughts, Organized</h1>
          <p className="cs-text">
            Create notes for appointments and work contracts with ease.
          </p>
          <a href="/auth/google" className="cs-button-solid">
            Login To Begin
          </a>
          {/* <a href="" className="cs-button-transparent">
            <img
              className="cs-img"
              loading="lazy"
              decoding="async"
              src="https://csimg.nyc3.digitaloceanspaces.com/Hero/play.svg"
              alt="play icon"
              width="17"
              height="17"
            />
            Learn More
          </a> */}
        </div>
      </div>

      <picture className="cs-picture">
        <source
          media="(max-width: 600px)"
          srcSet="https://csimg.nyc3.digitaloceanspaces.com/Hero/Background-m.jpg"
        />
        <source
          media="(min-width: 601px)"
          srcSet="https://csimg.nyc3.digitaloceanspaces.com/Hero/Background.jpg"
        />
        <img
          loading="lazy"
          decoding="async"
          src="https://csimg.nyc3.digitaloceanspaces.com/Hero/Background.jpg"
          alt="mountains"
          width="2250"
          height="1500"
          aria-hidden="true"
        />
      </picture>
    </section>
  );
};

Home.getInitialProps = ({ query }) => {
  return {
    data: `some initial props including query params and controller data: ${JSON.stringify(
      query,
    )}`,
  };
};

export default Home;
