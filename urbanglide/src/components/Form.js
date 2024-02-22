import React from "react";


function Form() {
  return (
    <div class="urban-form">
      <div class="urban-search">
        <div class="map-section"></div>
        <div class="form-section">
            <label for="postalCode">Location</label>
            <input type="text" name="postalCode"></input>
        </div>
      </div>
    </div>
  );
}

export default Form;
