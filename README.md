# Songs, Please
Find 10 new songs that match your musical preferences by providing 3 songs of your choice.

<br>

# Technologies
<li>MongoDB & Mongoose</li>
<li>Express.js</li>
<li>React.js</li>
<li>Node.js</li>
<li>Spotify Api</li>

<br>

# See Live
This app is deployed on: https://songs-please.netlify.app/


<br>



# Running the app on local machine

<h2><strong>1. Install dependencies</strong></h2>
<pre class="notranslate">
  <code>
    $ git clone https://github.com/Gneissy/songs-please.git
    $ cd songs-please
    $ npm install
    $ cd frontend
    $ npm install
  </code>
</pre>


<h2><strong>2. Environment variables</strong></h2>
You will need 3 environment variables:
<br>
<br>
<li><strong>MONGOSERVER</strong>: This is database connection</li>
<li><strong>spotifyClientId</strong>: Your client id from spotify api</li>
<li><strong>spotifyClientSecret</strong>: Your client secret from spotify api</li>

<br>

<h2><strong>3. Change backend server</strong></h2>
On top of <em>App.js</em>, uncomment following line of code:
<pre class="notranslate">
  <code>
    const backendServer = "http://localhost:3001";
  </code>
</pre>




<h2><strong>4. Start the app</strong></h2>
<br>
<h5>In the first terminal:</h5>
<pre class="notranslate">
  <code>
    $ cd songs-please
    $ npm start
  </code>
</pre>

<h5>In the second terminal:</h5>
<pre class="notranslate">
  <code>
    $ cd songs-please/frontend
    $ npm start
  </code>
</pre>
