import React from "react";
import "../App.css";

import image1 from "../images/cardmapr-nl-aU-tyT7E0lw-unsplash.jpg";
import image2 from "../images/scanning.avif";
import image3 from "../images/ridding5.avif";
import image4 from "../images/OIP.png";
import image5 from "../images/OIP_1.png";
import { FaArrowRight } from "react-icons/fa";
import {Link} from "react-router-dom";




function Home() {
  return (
    <div>
      <div className="hero">
        <div className="hero__content">
          <h1>
            Discover the city with Urban
            <span className="title-color">Glide</span>
          </h1>
          <p>
            Rent an e-scooter and explore the urban landscape like never before.
            Convenient, eco-friendly, and fun.
          </p>
          <button className="hero-button">Get Started</button>
        </div>
      </div>
      <div class="urban-intro">
        <h2 class="urban-intro-title">
          How it <span class="title-color">works?</span>
        </h2>
        <div className="urban-cards">
          <div className="card">
            <img src={image1} alt="Card 1" />
            <div class="card-content">
              <h2 class="title-color">On your marks</h2>
              <p>Find nearby e-scooters using our real-time map feature.</p>
            </div>
          </div>
          <div className="card">
            <img src={image2} alt="Card 2" />
            <div class="card-content">
              <h2 class="title-color">Get set</h2>
              <p>
                {" "}
                Unlock your selected e-scooter seamlessly by scanning its QR
                code within the app.
              </p>
            </div>
          </div>
          <div className="card">
            <img src={image3} alt="Card 3" />
            <div class="card-content">
              <h2 class="title-color">Go!!</h2>
              <p>
                {" "}
                Enjoy a smooth and eco-friendly ride through the city streets
                with our e-scooters.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="urban-scooter">
        <h2>
          Explore our <span class="title-color">vehicles</span>
        </h2>
        <div class="cards">
          <div class="card">
            <img src={image4} alt="Card 3" />
            <div class="card-content">
              <h3>Kick scooter</h3>
            </div>
          </div>
          <div class="card">
            <img src={image5} alt="Card 3" />
            <div class="card-content">
              <h3>Off road scooter</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="urban-discovery">
        <h2>
          Discover the Freedom of Urban<span class="title-color">Glide</span>
        </h2>
        <div class="urban-lists">
          <h3>
            <span class="title-color">Convenient</span> Rentals:
          </h3>
          <div class="urban-sublist">
            <p>
              &bull; Use a visually appealing background image or video showing
              people using UrbanGlide e-scooters.
            </p>
            <p>
              &bull; Display a bold heading like "Convenient Rentals" or "Rent
              with Ease."
            </p>
            <p>
              &bull; Provide a brief description of the rental process,
              emphasizing the user-friendly nature of the mobile app.
            </p>
            <p>
              &bull; Include a prominent CTA button labeled "Rent Now" or "Get
              Started" that directs users to the rental page or app download.
            </p>
          </div>
          <h3>
            <span class="title-color">Safety</span> First:
          </h3>
          <div class="urban-sublist">
            <p>
              &bull; Select a background image or color scheme that conveys
              safety and security, such as a helmet or safety gear.
            </p>
            <p>
              &bull; Use a heading like "Safety is Our Priority" or "Ride with
              Confidence."
            </p>
            <p>
              &bull; Provide details about the safety measures taken by
              UrbanGlide, including regular maintenance and adherence to safety
              standards.
            </p>
            <p>
              &bull; Incorporate testimonials or quotes from satisfied customers
              regarding their positive experiences with UrbanGlide's safety
              features.
            </p>
          </div>
          <h3>
            <span class="title-color">Eco</span> Friendly Travel:
          </h3>
          <div class="urban-sublist">
            <p>
              &bull; Use a visually appealing background image or video showing
              people using UrbanGlide e-scooters.
            </p>
            <p>
              &bull; Display a bold heading like "Convenient Rentals" or "Rent
              with Ease."
            </p>
            <p>
              &bull; Provide a brief description of the rental process,
              emphasizing the user-friendly nature of the mobile app.
            </p>
            <p>
              &bull; Include a prominent CTA button labeled "Rent Now" or "Get
              Started" that directs users to the rental page or app download.
            </p>
          </div>
        </div>
      </div>
      <div class="urban-ride">
        <p>Your <span class="title-color">Urban Adventure</span> Begins Here</p>
        <h2>
          Find your first <span class="title-color">Ride!!</span>
        </h2>
        <Link to="/form">
        <button class="btn-ride">Let's Ride &nbsp; <FaArrowRight /></button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
