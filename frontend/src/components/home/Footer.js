import React from "react";

export default function Footer() {
  return (
    <div class="footer-clean">
      <footer>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-sm-4 col-md-3 item">
              <h3>Services</h3>
              <ul>
                <li>
                  <a href="#">Mood Tracking</a>
                </li>
                <li>
                  <a href="#">Journalling</a>
                </li>
                <li>
                  <a href="#">Counselling Sessions</a>
                </li>
                <li>
                  <a href="#">Support Groups</a>
                </li>
              </ul>
            </div>
            <div class="col-sm-4 col-md-3 item">
              <h3>About</h3>
              <ul>
                <li>
                  <a href="#">Company</a>

                </li>
                <li>
                  <a href="#">Team</a>
                </li>
              </ul>
            </div>
            <div class="col-sm-4 col-md-3 item"></div>
            <div class="col-lg-3 item social">
              <a href="#">
              <i class="fa-brands fa-facebook"></i>
              </a>
              <a href="#">
                <i class="icon ion-social-twitter"></i>
              </a>
              <a href="#">
                <i class="icon ion-social-snapchat"></i>
              </a>
              <a href="#">
                <i class="icon ion-social-instagram"></i>
              </a>
              <p class="copyright">Amaan © 2023</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
