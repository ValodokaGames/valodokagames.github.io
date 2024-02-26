<head>
  <title>Play Games and Educational Games for Free | Valodoka</title>
</head>
<body>
  <!--indicator if your offline-->
  
<script>

window.addEventListener("online", function() {
  alert("You are online now!");
});

window.addEventListener("offline", function() {
  alert("You are offline!\nPlease check your internet connection and try again.");
});


if (navigator.onLine) {
  console.log("You are online");
} else {
  console.log("You are offline");
}

</script>

  <!--Scroller-->
  <style>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #808080;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #0000FF;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #00ffff;
}
</style>
<!--end of scroller-->
  <div class="topnav">
  <!--Page parts-->
  <a class="active" href="/" title="School Apps Redirector Homepage"><image src="https://avatars.githubusercontent.com/u/159365921?u=053790b29c84bb4c77e07d0c704ef1e8b2530377&v=4" title="Valodoka Homepage" alt="Valodoka GitHub logo"></image>
  <a class="active" href="/" title="School Apps Redirector Homepage">Home</a>
  <a href="/games" title="Click me to check out the newest or oldest games from Valodoka.">Games</a>
  <a href="/games/educational" title="Click me to check out the newest or oldest educational games from Valodoka.">Educational Games</a>
  <a href="/previews" title="Check out some previews that are coming soon!">Previews</a>
  <a href="/contactus" title="Contact Us for any question or comment you'd like to say.">Contact Us</a>
  <a href="/about">About Valodoka</a>
<!--Main Home part-->
<hr>
<h1>Gamers, Students, and Teachers Love Playing Valodoka</h1>
<p>Valodoka is the #1 site for educational games and unblocked games.</p>

<hr>
<!--Information - the number 1 site for games and edu games-->
<h1>The #1 Site For Games and Educational Games</h1>
<p>There is no other website that has educational games and unblocked games...besides Valodoka. That's why Valodoka is the #1 site for educational and unblocked games. Games such as Drive Mad, Monster Tracks, Tomb of the Mask, and more, and Educational Games such as Happy Filled Glass 2 (Happy Glass), Stick Mathpup, and more.</p>

<hr>
<!--faq-->
<h1>Frequently Asked Questions</h1>
<h2>How to get to the games page?</h2>
<p>On the top, look for "Games". Then you'll see all of the non-educational games.</p>
<h2>How to get to the educational games page?</h2>
<p>On the top, next to "Games", look for "Educational Games". Then you'll see all the educational games.</p>
<h2>Need More Questions? <a href="/contactus/">Contact Us</a>, or you can look at <a href="/support/">Valodoka Support</a>.</h2>
<hr>
<h3>Want to see what's happening?</h3>
<p>You can check out our newsletter or click on the notification button for news about Valodoka and their games.</p>
<script>
// The latest spec has updated this method to a promise-based syntax that works like this:
Notification.requestPermission()

// Previously, the syntax was based on a simple callback; this version is now deprecated:
Notification.requestPermission(callback)
</script>
<button onclick="notifyMe()">Notify me!</button>
<script>
function notifyMe() {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification("You have enabled the notifications! Thanks! You can see what new notifications will come every time you open this site! Enjoy!");
    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const notification = new Notification("Hi there!");
        // …
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}
</script>
<button style="background-color: transparent;"><a href="/subscribetoournewsletter.html?redirectedByHomepage=true">Subscribe to our newsletter</a></button>
<hr>
<!--Footer-->
<footer>
  <!--Valodoka social media-->
  <!--social media text p-->
  <p>Social Media</p>
  <!--youtube svg logo-->
  <svg xmlns="http://www.w3.org/2000/svg" height="14" width="15.75" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg>


  <!--end of valodoka social Media-->

  <p>The Owner's Social Media</p>

  <!--youtube svg logo-->
  <svg xmlns="http://www.w3.org/2000/svg" height="14" width="15.75" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg>

  <!--tiktok svg logo-->
<svg xmlns="http://www.w3.org/2000/svg" height="14" width="12.25" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"/></svg>

  <!--instagram logo-->

 
  <p>Copyright &copy; 2024 by <a href="//github.com/NothingButTyler/">NothingButTyler</a>. All rights reserved.</p>
</footer>
