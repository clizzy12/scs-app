<template>
  <div class="footer">
    <footer>
      <div class="feedback">
        <a class="typeform-share button" href="https://shaneckel.typeform.com/to/HnY2ps" data-mode="1" target="_blank">Feedback Survey</a>
      </div>
      <figure>
        <a href="http://www.cmu.edu">
          <img src="../assets/img/cmu.svg" alt="Carnegie Mellon University">
        </a>
      </figure>
      <div>
        <a href="http://www.qatar.cmu.edu" target="new">Qatar Campus</a> |
        <a href="http://www.cmu.edu/silicon-valley/" target="new">Silicon Valley Campus</a>
      </div>
      <div>
        <br>
        <p>School of Computer Science <br>5000 Forbes Avenue <br>Pittsburgh, PA 15213</p>
        <p>2017</p>
      </div>
    </footer>
    <div class="project-status"><b>pre-alpha</b> | to watch the progress or contribute visit our <a href="https://github.com/SchoolofComputerScience/scs-app">github</a>.</div>
  </div>
</template>

<script>
export default {
  name: 'main-footer'
}
</script>

<style lang="stylus" scoped>
.project-status {
  border-top: 1px solid #eee;
  color black;
  font-size: .8em;
  padding: .5em;
  padding-left: 1em;
  text-align: center;
  @media screen and (max-width: 600px) {
    font-size: .6em;
  }
}

.footer {
  border-top: 1px solid #eee;
  border-bottom: 0;
  margin-top: 2vw;
  .feedback {
    position: absolute;
    right: 0;
    top: 1em;
  }
  footer {
    position: relative;
    margin: 0 auto;
    max-width: 62em;
  }
  figure {
    margin: 0;
  }
  img {
    margin: 0;
    margin-top: 1vw;
    padding-bottom: 0;
    width: 16em;
    left: -2px;
    position: relative;
  }
}

@media screen and (max-width: 600px) {
  .feedback {
    display: none;
  }
  .footer {
    margin-top: 2em;
    padding: 0;
    img{
      margin-top: 1em;
      max-width: 16em;
    }
  }
}
</style>
