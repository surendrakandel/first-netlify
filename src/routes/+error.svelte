<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="main">
  <div class="mars" />
  <img src="https://assets.codepen.io/1538474/404.svg" class="logo-404" alt="page not found" />
  <img src="https://assets.codepen.io/1538474/meteor.svg" class="meteor" alt="page not found" />
  <img
    src="https://assets.codepen.io/1538474/astronaut.svg"
    class="astronaut"
    alt="page not found"
  />
  <div class="container">
    <p class="font-bungee">Oh no!!</p>
    <p class="">
      You’re either misspelling the URL <br /> or requesting a page that's no longer here.
    </p>
    <div class="text-center">
      <a class="btn-back" href="/">Back to Home page</a>
    </div>
  </div>
</div>

<style>
  .container {
    margin-top: 200px;
    z-index: 1000;
  }
  .main {
    height: 100vh;
    background-image: url('https://assets.codepen.io/1538474/star.svg'),
      linear-gradient(to bottom, #06033a, #4d007d);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    gap: 2rem;
    background-attachment: fixed;
    overflow: hidden;
  }

  .logo-404 {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
  }

  .meteor {
    position: absolute;
    right: 2vmin;
    top: 16vmin;
  }

  .astronaut {
    position: absolute;
    top: 18vmin;
    left: 10vmin;
    height: 30vmin;
    animation: floating 3s infinite ease-in-out;
  }
  p,
  a {
    color: white;
    font-family: 'Space Grotesk';
  }
  a {
    color: #5cb971;
    text-decoration: none;
    font-size: 1.5rem;
  }
</style>
