<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html><head><meta content="text/html; charset=iso-8859-1" http-equiv="Content-Type"><title>Paj's Home: Cryptography: JavaScript MD5: Scripts: sha256.js</title><meta content="java, script, javascript, MD5, MD4, SHA, SHA-1, secure, hash, algorithm, digital, signature, password, protection" name="keywords"><meta content="Download the scripts, see information about their history and future plans, and links to other resources." name="description"><link href="../../styles/common.css" rel="stylesheet"><link href="../../styles/blue-white.css" rel="stylesheet"></head><body><ul id="nav"><li><a href="/index.html">Paj's Home</a>:
                &nbsp;
                <ul><li><a href="/aboutme/index.html">About Me</a><br></li><li><a href="/crypt/index.html">Cryptography</a><br></li><li><a href="/security/index.html">Security</a><br></li><li><a href="/progs/index.html">Programming</a><br></li><li><a href="/web/index.html">Web Applications</a><br></li></ul></li><li><a href="/crypt/index.html">Cryptography</a>:
                &nbsp;
                <ul><li><a href="/crypt/rsa/index.html">RSA</a><br></li><li><a href="/crypt/md5/index.html">JavaScript MD5</a><br></li><li><a href="/crypt/vigenere.html">Vigenere Cipher</a><br></li><li><a href="/crypt/wordpat.html">Word Patterns</a><br></li></ul></li><li><a href="/crypt/md5/index.html">JavaScript MD5</a>:
                &nbsp;
                <ul><li><a href="/crypt/md5/scripts.html">Scripts</a><br></li><li><a href="/crypt/md5/instructions.html">Instructions</a><br></li><li><a href="/crypt/md5/auth.html">Protecting Passwords</a><br></li><li><a href="/crypt/md5/advancedauth.html">Advanced Authentication</a><br></li><li><a href="/crypt/md5/uses.html">Other Uses</a><br></li><li><a href="/crypt/md5/browsertest.html">Browser Test</a><br></li></ul></li><li><a href="/crypt/md5/scripts.html">Scripts</a>:
                &nbsp;
                <ul><li><a href="/crypt/md5/md5.html">md5.js</a><br></li><li><a href="/crypt/md5/ripemd160.html">ripemd160.js</a><br></li><li><a href="/crypt/md5/sha1.html">sha1.js</a><br></li><li><a href="/crypt/md5/sha256.html">sha256.js</a><br></li><li><a href="/crypt/md5/sha512.html">sha512.js</a><br></li></ul></li><li><a href="/crypt/md5/sha256.html">sha256.js</a>
                &nbsp;
                </li></ul><script type="text/javascript">
    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){         
        if(new Number(RegExp.$1) < 8) {
            var sfEls = document.getElementById("nav").getElementsByTagName("LI");
            for(var i=0; i < sfEls.length; i++) {
                sfEls[i].onmouseover=function() {
                    this.className+=" sfhover";
                }
                sfEls[i].onmouseout=function() {
                    this.className=this.className.replace(new RegExp(" sfhover"), "");
                }
            }
    
            var nav = document.getElementById("nav");
            for(var tnode = nav.firstChild; tnode; tnode = tnode.nextSibling)
            {
                popup = tnode.getElementsByTagName("UL");
                if(popup.length == 0) break;
                popup = popup[0];
                var posX = 0;
                var posY = 0;
                var node = tnode;
                while(node != null){
                    posX += node.offsetLeft;
                    posY += node.offsetTop;
                    node = node.offsetParent;
                }
                popup.style.top = posY + 18;
                popup.style.left = posX - 40;
            }
        }
    }
    </script><div class="clearit"></div><table style="width:100%; border-collapse: collapse"><tr><td style="width:170px"><a href="../../site/logos.html"><img src="../../logos/crypto.jpg" alt="" height="213" style="border:none" width="160"></a><p style="text-align:center"></p><p style="text-align:center"><script type="text/javascript">
                        google_ad_client = "pub-3545889579815990";
                        google_ad_width = 120;
                        google_ad_height = 240;
                        google_ad_format = "120x240_as";
                        google_ad_channel ="";
                        </script><script src="http://pagead2.googlesyndication.com/pagead/show_ads.js" type="text/javascript"></script></p></td><td><div style="text-align:center"><img src="sha256_js.png" alt="sha256.js" height="68" width="231"></div>
<div class="source"><pre><span class="cm">/*</span>
<span class="cm"> * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined</span>
<span class="cm"> * in FIPS 180-2</span>
<span class="cm"> * Version 2.2 Copyright Angel Marin, Paul Johnston 2000 - 2009.</span>
<span class="cm"> * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet</span>
<span class="cm"> * Distributed under the BSD License</span>
<span class="cm"> * See http://pajhome.org.uk/crypt/md5 for details.</span>
<span class="cm"> * Also http://anmar.eu.org/projects/jssha2/</span>
<span class="cm"> */</span>

<span class="cm">/*</span>
<span class="cm"> * Configurable variables. You may need to tweak these to be compatible with</span>
<span class="cm"> * the server-side, but the defaults work in most cases.</span>
<span class="cm"> */</span>
<span class="kd">var</span> <span class="nx">hexcase</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span>  <span class="cm">/* hex output format. 0 - lowercase; 1 - uppercase        */</span>
<span class="kd">var</span> <span class="nx">b64pad</span>  <span class="o">=</span> <span class="s2">&quot;&quot;</span><span class="p">;</span> <span class="cm">/* base-64 pad character. &quot;=&quot; for strict RFC compliance   */</span>

<span class="cm">/*</span>
<span class="cm"> * These are the functions you&#39;ll usually want to call</span>
<span class="cm"> * They take string arguments and return either hex or base-64 encoded strings</span>
<span class="cm"> */</span>
<span class="kd">function</span> <span class="nx">hex_sha256</span><span class="p">(</span><span class="nx">s</span><span class="p">)</span>    <span class="p">{</span> <span class="k">return</span> <span class="nx">rstr2hex</span><span class="p">(</span><span class="nx">rstr_sha256</span><span class="p">(</span><span class="nx">str2rstr_utf8</span><span class="p">(</span><span class="nx">s</span><span class="p">)));</span> <span class="p">}</span>
<span class="kd">function</span> <span class="nx">b64_sha256</span><span class="p">(</span><span class="nx">s</span><span class="p">)</span>    <span class="p">{</span> <span class="k">return</span> <span class="nx">rstr2b64</span><span class="p">(</span><span class="nx">rstr_sha256</span><span class="p">(</span><span class="nx">str2rstr_utf8</span><span class="p">(</span><span class="nx">s</span><span class="p">)));</span> <span class="p">}</span>
<span class="kd">function</span> <span class="nx">any_sha256</span><span class="p">(</span><span class="nx">s</span><span class="p">,</span> <span class="nx">e</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">rstr2any</span><span class="p">(</span><span class="nx">rstr_sha256</span><span class="p">(</span><span class="nx">str2rstr_utf8</span><span class="p">(</span><span class="nx">s</span><span class="p">)),</span> <span class="nx">e</span><span class="p">);</span> <span class="p">}</span>
<span class="kd">function</span> <span class="nx">hex_hmac_sha256</span><span class="p">(</span><span class="nx">k</span><span class="p">,</span> <span class="nx">d</span><span class="p">)</span>
  <span class="p">{</span> <span class="k">return</span> <span class="nx">rstr2hex</span><span class="p">(</span><span class="nx">rstr_hmac_sha256</span><span class="p">(</span><span class="nx">str2rstr_utf8</span><span class="p">(</span><span class="nx">k</span><span class="p">),</span> <span class="nx">str2rstr_utf8</span><span class="p">(</span><span class="nx">d</span><span class="p">)));</span> <span class="p">}</span>
<span class="kd">function</span> <span class="nx">b64_hmac_sha256</span><span class="p">(</span><span class="nx">k</span><span class="p">,</span> <span class="nx">d</span><span class="p">)</span>
  <span class="p">{</span> <span class="k">return</span> <span class="nx">rstr2b64</span><span class="p">(</span><span class="nx">rstr_hmac_sha256</span><span class="p">(</span><span class="nx">str2rstr_utf8</span><span class="p">(</span><span class="nx">k</span><span class="p">),</span> <span class="nx">str2rstr_utf8</span><span class="p">(</span><span class="nx">d</span><span class="p">)));</span> <span class="p">}</span>
<span class="kd">function</span> <span class="nx">any_hmac_sha256</span><span class="p">(</span><span class="nx">k</span><span class="p">,</span> <span class="nx">d</span><span class="p">,</span> <span class="nx">e</span><span class="p">)</span>
  <span class="p">{</span> <span class="k">return</span> <span class="nx">rstr2any</span><span class="p">(</span><span class="nx">rstr_hmac_sha256</span><span class="p">(</span><span class="nx">str2rstr_utf8</span><span class="p">(</span><span class="nx">k</span><span class="p">),</span> <span class="nx">str2rstr_utf8</span><span class="p">(</span><span class="nx">d</span><span class="p">)),</span> <span class="nx">e</span><span class="p">);</span> <span class="p">}</span>

<span class="cm">/*</span>
<span class="cm"> * Perform a simple self-test to see if the VM is working</span>
<span class="cm"> */</span>
<span class="kd">function</span> <span class="nx">sha256_vm_test</span><span class="p">()</span>
<span class="p">{</span>
  <span class="k">return</span> <span class="nx">hex_sha256</span><span class="p">(</span><span class="s2">&quot;abc&quot;</span><span class="p">).</span><span class="nx">toLowerCase</span><span class="p">()</span> <span class="o">==</span>
            <span class="s2">&quot;ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad&quot;</span><span class="p">;</span>
<span class="p">}</span>

<span class="cm">/*</span>
<span class="cm"> * Calculate the sha256 of a raw string</span>
<span class="cm"> */</span>
<span class="kd">function</span> <span class="nx">rstr_sha256</span><span class="p">(</span><span class="nx">s</span><span class="p">)</span>
<span class="p">{</span>
  <span class="k">return</span> <span class="nx">binb2rstr</span><span class="p">(</span><span class="nx">binb_sha256</span><span class="p">(</span><span class="nx">rstr2binb</span><span class="p">(</span><span class="nx">s</span><span class="p">),</span> <span class="nx">s</span><span class="p">.</span><span class="nx">length</span> <span class="o">*</span> <span class="mi">8</span><span class="p">));</span>
<span class="p">}</span>

<span class="cm">/*</span>
<span class="cm"> * Calculate the HMAC-sha256 of a key and some data (raw strings)</span>
<span class="cm"> */</span>
<span class="kd">function</span> <span class="nx">rstr_hmac_sha256</span><span class="p">(</span><span class="nx">key</span><span class="p">,</span> <span class="nx">data</span><span class="p">)</span>
<span class="p">{</span>
  <span class="kd">var</span> <span class="nx">bkey</span> <span class="o">=</span> <span class="nx">rstr2binb</span><span class="p">(</span><span class="nx">key</span><span class="p">);</span>
  <span class="k">if</span><span class="p">(</span><span class="nx">bkey</span><span class="p">.</span><span class="nx">length</span> <span class="o">&gt;</span> <span class="mi">16</span><span class="p">)</span> <span class="nx">bkey</span> <span class="o">=</span> <span class="nx">binb_sha256</span><span class="p">(</span><span class="nx">bkey</span><span class="p">,</span> <span class="nx">key</span><span class="p">.</span><span class="nx">length</span> <span class="o">*</span> <span class="mi">8</span><span class="p">);</span>

  <span class="kd">var</span> <span class="nx">ipad</span> <span class="o">=</span> <span class="nb">Array</span><span class="p">(</span><span class="mi">16</span><span class="p">),</span> <span class="nx">opad</span> <span class="o">=</span> <span class="nb">Array</span><span class="p">(</span><span class="mi">16</span><span class="p">);</span>
  <span class="k">for</span><span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="mi">16</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span>
  <span class="p">{</span>
    <span class="nx">ipad</span><span class="p">[</span><span class="nx">i</span><span class="p">]</span> <span class="o">=</span> <span class="nx">bkey</span><span class="p">[</span><span class="nx">i</span><span class="p">]</span> <span class="o">^</span> <span class="mh">0x36363636</span><span class="p">;</span>
    <span class="nx">opad</span><span class="p">[</span><span class="nx">i</span><span class="p">]</span> <span class="o">=</span> <span class="nx">bkey</span><span class="p">[</span><span class="nx">i</span><span class="p">]</span> <span class="o">^</span> <span class="mh">0x5C5C5C5C</span><span class="p">;</span>
  <span class="p">}</span>

  <span class="kd">var</span> <span class="nx">hash</span> <span class="o">=</span> <span class="nx">binb_sha256</span><span class="p">(</span><span class="nx">ipad</span><span class="p">.</span><span class="nx">concat</span><span class="p">(</span><span class="nx">rstr2binb</span><span class="p">(</span><span class="nx">data</span><span class="p">)),</span> <span class="mi">512</span> <span class="o">+</span> <span class="nx">data</span><span class="p">.</span><span class="nx">length</span> <span class="o">*</span> <span class="mi">8</span><span class="p">);</span>
  <span class="k">return</span> <span class="nx">binb2rstr</span><span class="p">(</span><span class="nx">binb_sha256</span><span class="p">(</span><span class="nx">opad</span><span class="p">.</span><span class="nx">concat</span><span class="p">(</span><span class="nx">hash</span><span class="p">),</span> <span class="mi">512</span> <span class="o">+</span> <span class="mi">256</span><span class="p">));</span>
<span class="p">}</span>

<span class="cm">/*</span>
<span class="cm"> * Convert a raw string to a hex string</span>
<span class="cm"> */</span>
<span class="kd">function</span> <span class="nx">rstr2hex</span><span class="p">(</span><span class="nx">input</span><span class="p">)</span>
<span class="p">{</span>
  <span class="k">try</span> <span class="p">{</span> <span class="nx">hexcase</span> <span class="p">}</span> <span class="k">catch</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span> <span class="nx">hexcase</span><span class="o">=</span><span class="mi">0</span><span class="p">;</span> <span class="p">}</span>
  <span class="kd">var</span> <span class="nx">hex_tab</span> <span class="o">=</span> <span class="nx">hexcase</span> <span class="o">?</span> <span class="s2">&quot;0123456789ABCDEF&quot;</span> <span class="o">:</span> <span class="s2">&quot;0123456789abcdef&quot;</span><span class="p">;</span>
  <span class="kd">var</span> <span class="nx">output</span> <span class="o">=</span> <span class="s2">&quot;&quot;</span><span class="p">;</span>
  <span class="kd">var</span> <span class="nx">x</span><span class="p">;</span>
  <span class="k">for</span><span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">input</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span>
  <span class="p">{</span>
    <span class="nx">x</span> <span class="o">=</span> <span class="nx">input</span><span class="p">.</span><span class="nx">charCodeAt</span><span class="p">(</span><span class="nx">i</span><span class="p">);</span>
    <span class="nx">output</span> <span class="o">+=</span> <span class="nx">hex_tab</span><span class="p">.</span><span class="nx">charAt</span><span class="p">((</span><span class="nx">x</span> <span class="o">&gt;&gt;&gt;</span> <span class="mi">4</span><span class="p">)</span> <span class="o">&amp;</span> <span class="mh">0x0F</span><span class="p">)</span>
           <span class="o">+</span>  <span class="nx">hex_tab</span><span class="p">.</span><span class="nx">charAt</span><span class="p">(</span> <span class="nx">x</span>        <span class="o">&amp;</span> <span class="mh">0x0F</span><span class="p">);</span>
  <span class="p">}</span>
  <span class="k">return</span> <span class="nx">output</span><span class="p">;</span>
<span class="p">}</span>

<span class="cm">/*</span>
<span class="cm"> * Convert a raw string to a base-64 string</span>
<span class="cm"> */</span>
<span class="kd">function</span> <span class="nx">rstr2b64</span><span class="p">(</span><span class="nx">input</span><span class="p">)</span>
<span class="p">{</span>
  <span class="k">try</span> <span class="p">{</span> <span class="nx">b64pad</span> <span class="p">}</span> <span class="k">catch</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span> <span class="nx">b64pad</span><span class="o">=</span><span class="s1">&#39;&#39;</span><span class="p">;</span> <span class="p">}</span>
  <span class="kd">var</span> <span class="nx">tab</span> <span class="o">=</span> <span class="s2">&quot;ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/&quot;</span><span class="p">;</span>
  <span class="kd">var</span> <span class="nx">output</span> <span class="o">=</span> <span class="s2">&quot;&quot;</span><span class="p">;</span>
  <span class="kd">var</span> <span class="nx">len</span> <span class="o">=</span> <span class="nx">input</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span>
  <span class="k">for</span><span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">len</span><span class="p">;</span> <span class="nx">i</span> <span class="o">+=</span> <span class="mi">3</span><span class="p">)</span>
  <span class="p">{</span>
    <span class="kd">var</span> <span class="nx">triplet</span> <span class="o">=</span> <span class="p">(</span><span class="nx">input</span><span class="p">.</span><span class="nx">charCodeAt</span><span class="p">(</span><span class="nx">i</span><span class="p">)</span> <span class="o">&lt;&lt;</span> <span class="mi">16</span><span class="p">)</span>
                <span class="o">|</span> <span class="p">(</span><span class="nx">i</span> <span class="o">+</span> <span class="mi">1</span> <span class="o">&lt;</span> <span class="nx">len</span> <span class="o">?</span> <span class="nx">input</span><span class="p">.</span><span class="nx">charCodeAt</span><span class="p">(</span><span class="nx">i</span><span class="o">+</span><span class="mi">1</span><span class="p">)</span> <span class="o">&lt;&lt;</span> <span class="mi">8</span> <span class="o">:</span> <span class="mi">0</span><span class="p">)</span>
                <span class="o">|</span> <span class="p">(</span><span class="nx">i</span> <span class="o">+</span> <span class="mi">2</span> <span class="o">&lt;</span> <span class="nx">len</span> <span class="o">?</span> <span class="nx">input</span><span class="p">.</span><span class="nx">charCodeAt</span><span class="p">(</span><span class="nx">i</span><span class="o">+</span><span class="mi">2</span><span class="p">)</span>      <span class="o">:</span> <span class="mi">0</span><span class="p">);</span>
    <span class="k">for</span><span class="p">(</span><span class="kd">var</span> <span class="nx">j</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">j</span> <span class="o">&lt;</span> <span class="mi">4</span><span class="p">;</span> <span class="nx">j</span><span class="o">++</span><span class="p">)</span>
    <span class="p">{</span>
      <span class="k">if</span><span class="p">(</span><span class="nx">i</span> <span class="o">*</span> <span class="mi">8</span> <span class="o">+</span> <span class="nx">j</span> <span class="o">*</span> <span class="mi">6</span> <span class="o">&gt;</span> <span class="nx">input</span><span class="p">.</span><span class="nx">length</span> <span class="o">*</span> <span class="mi">8</span><span class="p">)</span> <span class="nx">output</span> <span class="o">+=</span> <span class="nx">b64pad</span><span class="p">;</span>
      <span class="k">else</span> <span class="nx">output</span> <span class="o">+=</span> <span class="nx">tab</span><span class="p">.</span><span class="nx">charAt</span><span class="p">((</span><span class="nx">triplet</span> <span class="o">&gt;&gt;&gt;</span> <span class="mi">6</span><span class="o">*</span><span class="p">(</span><span class="mi">3</span><span class="o">-</span><span class="nx">j</span><span class="p">))</span> <span class="o">&amp;</span> <span class="mh">0x3F</span><span class="p">);</span>
    <span class="p">}</span>
  <span class="p">}</span>
  <span class="k">return</span> <span class="nx">output</span><span class="p">;</span>
<span class="p">}</span>

<span class="cm">/*</span>
<span class="cm"> * Convert a raw string to an arbitrary string encoding</span>
<span class="cm"> */</span>
<span class="kd">function</span> <span class="nx">rstr2any</span><span class="p">(</span><span class="nx">input</span><span class="p">,</span> <span class="nx">encoding</span><span class="p">)</span>
<span class="p">{</span>
  <span class="kd">var</span> <span class="nx">divisor</span> <span class="o">=</span> <span class="nx">encoding</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span>
  <span class="kd">var</span> <span class="nx">remainders</span> <span class="o">=</span> <span class="nb">Array</span><span class="p">();</span>
  <span class="kd">var</span> <span class="nx">i</span><span class="p">,</span> <span class="nx">q</span><span class="p">,</span> <span class="nx">x</span><span class="p">,</span> <span class="nx">quotient</span><span class="p">;</span>

  <span class="cm">/* Convert to an array of 16-bit big-endian values, forming the dividend */</span>
  <span class="kd">var</span> <span class="nx">dividend</span> <span class="o">=</span> <span class="nb">Array</span><span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">ceil</span><span class="p">(</span><span class="nx">input</span><span class="p">.</span><span class="nx">length</span> <span class="o">/</span> <span class="mi">2</span><span class="p">));</span>
  <span class="k">for</span><span class="p">(</span><span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">dividend</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span>
  <span class="p">{</span>
    <span class="nx">dividend</span><span class="p">[</span><span class="nx">i</span><span class="p">]</span> <span class="o">=</span> <span class="p">(</span><span class="nx">input</span><span class="p">.</span><span class="nx">charCodeAt</span><span class="p">(</span><span class="nx">i</span> <span class="o">*</span> <span class="mi">2</span><span class="p">)</span> <span class="o">&lt;&lt;</span> <span class="mi">8</span><span class="p">)</span> <span class="o">|</span> <span class="nx">input</span><span class="p">.</span><span class="nx">charCodeAt</span><span class="p">(</span><span class="nx">i</span> <span class="o">*</span> <span class="mi">2</span> <span class="o">+</span> <span class="mi">1</span><span class="p">);</span>
  <span class="p">}</span>

  <span class="cm">/*</span>
<span class="cm">   * Repeatedly perform a long division. The binary array forms the dividend,</span>
<span class="cm">   * the length of the encoding is the divisor. Once computed, the quotient</span>
<span class="cm">   * forms the dividend for the next step. We stop when the dividend is zero.</span>
<span class="cm">   * All remainders are stored for later use.</span>
<span class="cm">   */</span>
  <span class="k">while</span><span class="p">(</span><span class="nx">dividend</span><span class="p">.</span><span class="nx">length</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">)</span>
  <span class="p">{</span>
    <span class="nx">quotient</span> <span class="o">=</span> <span class="nb">Array</span><span class="p">();</span>
    <span class="nx">x</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span>
    <span class="k">for</span><span class="p">(</span><span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">dividend</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span>
    <span class="p">{</span>
      <span class="nx">x</span> <span class="o">=</span> <span class="p">(</span><span class="nx">x</span> <span class="o">&lt;&lt;</span> <span class="mi">16</span><span class="p">)</span> <span class="o">+</span> <span class="nx">dividend</span><span class="p">[</span><span class="nx">i</span><span class="p">];</span>
      <span class="nx">q</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">floor</span><span class="p">(</span><span class="nx">x</span> <span class="o">/</span> <span class="nx">divisor</span><span class="p">);</span>
      <span class="nx">x</span> <span class="o">-=</span> <span class="nx">q</span> <span class="o">*</span> <span class="nx">divisor</span><span class="p">;</span>
      <span class="k">if</span><span class="p">(</span><span class="nx">quotient</span><span class="p">.</span><span class="nx">length</span> <span class="o">&gt;</span> <span class="mi">0</span> <span class="o">||</span> <span class="nx">q</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">)</span>
        <span class="nx">quotient</span><span class="p">[</span><span class="nx">quotient</span><span class="p">.</span><span class="nx">length</span><span class="p">]</span> <span class="o">=</span> <span class="nx">q</span><span class="p">;</span>
    <span class="p">}</span>
    <span class="nx">remainders</span><span class="p">[</span><span class="nx">remainders</span><span class="p">.</span><span class="nx">length</span><span class="p">]</span> <span class="o">=</span> <span class="nx">x</span><span class="p">;</span>
    <span class="nx">dividend</span> <span class="o">=</span> <span class="nx">quotient</span><span class="p">;</span>
  <span class="p">}</span>

  <span class="cm">/* Convert the remainders to the output string */</span>
  <span class="kd">var</span> <span class="nx">output</span> <span class="o">=</span> <span class="s2">&quot;&quot;</span><span class="p">;</span>
  <span class="k">for</span><span class="p">(</span><span class="nx">i</span> <span class="o">=</span> <span class="nx">remainders</span><span class="p">.</span><span class="nx">length</span> <span class="o">-</span> <span class="mi">1</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&gt;=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span><span class="o">--</span><span class="p">)</span>
    <span class="nx">output</span> <span class="o">+=</span> <span class="nx">encoding</span><span class="p">.</span><span class="nx">charAt</span><span class="p">(</span><span class="nx">remainders</span><span class="p">[</span><span class="nx">i</span><span class="p">]);</span>

  <span class="cm">/* Append leading zero equivalents */</span>
  <span class="kd">var</span> <span class="nx">full_length</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">ceil</span><span class="p">(</span><span class="nx">input</span><span class="p">.</span><span class="nx">length</span> <span class="o">*</span> <span class="mi">8</span> <span class="o">/</span>
                                    <span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">encoding</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="o">/</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="mi">2</span><span class="p">)))</span>
  <span class="k">for</span><span class="p">(</span><span class="nx">i</span> <span class="o">=</span> <span class="nx">output</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">full_length</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span>
    <span class="nx">output</span> <span class="o">=</span> <span class="nx">encoding</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">+</span> <span class="nx">output</span><span class="p">;</span>

  <span class="k">return</span> <span class="nx">output</span><span class="p">;</span>
<span class="p">}</span>

<span class="cm">/*</span>
<span class="cm"> * Encode a string as utf-8.</span>
<span class="cm"> * For efficiency, this assumes the input is valid utf-16.</span>
<span class="cm"> */</span>
<span class="kd">function</span> <span class="nx">str2rstr_utf8</span><span class="p">(</span><span class="nx">input</span><span class="p">)</span>
<span class="p">{</span>
  <span class="kd">var</span> <span class="nx">output</span> <span class="o">=</span> <span class="s2">&quot;&quot;</span><span class="p">;</span>
  <span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">;</span>
  <span class="kd">var</span> <span class="nx">x</span><span class="p">,</span> <span class="nx">y</span><span class="p">;</span>

  <span class="k">while</span><span class="p">(</span><span class="o">++</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">input</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span>
  <span class="p">{</span>
    <span class="cm">/* Decode utf-16 surrogate pairs */</span>
    <span class="nx">x</span> <span class="o">=</span> <span class="nx">input</span><span class="p">.</span><span class="nx">charCodeAt</span><span class="p">(</span><span class="nx">i</span><span class="p">);</span>
    <span class="nx">y</span> <span class="o">=</span> <span class="nx">i</span> <span class="o">+</span> <span class="mi">1</span> <span class="o">&lt;</span> <span class="nx">input</span><span class="p">.</span><span class="nx">length</span> <span class="o">?</span> <span class="nx">input</span><span class="p">.</span><span class="nx">charCodeAt</span><span class="p">(</span><span class="nx">i</span> <span class="o">+</span> <span class="mi">1</span><span class="p">)</span> <span class="o">:</span> <span class="mi">0</span><span class="p">;</span>
    <span class="k">if</span><span class="p">(</span><span class="mh">0xD800</span> <span class="o">&lt;=</span> <span class="nx">x</span> <span class="o">&amp;&amp;</span> <span class="nx">x</span> <span class="o">&lt;=</span> <span class="mh">0xDBFF</span> <span class="o">&amp;&amp;</span> <span class="mh">0xDC00</span> <span class="o">&lt;=</span> <span class="nx">y</span> <span class="o">&amp;&amp;</span> <span class="nx">y</span> <span class="o">&lt;=</span> <span class="mh">0xDFFF</span><span class="p">)</span>
    <span class="p">{</span>
      <span class="nx">x</span> <span class="o">=</span> <span class="mh">0x10000</span> <span class="o">+</span> <span class="p">((</span><span class="nx">x</span> <span class="o">&amp;</span> <span class="mh">0x03FF</span><span class="p">)</span> <span class="o">&lt;&lt;</span> <span class="mi">10</span><span class="p">)</span> <span class="o">+</span> <span class="p">(</span><span class="nx">y</span> <span class="o">&amp;</span> <span class="mh">0x03FF</span><span class="p">);</span>
      <span class="nx">i</span><span class="o">++</span><span class="p">;</span>
    <span class="p">}</span>

    <span class="cm">/* Encode output as utf-8 */</span>
    <span class="k">if</span><span class="p">(</span><span class="nx">x</span> <span class="o">&lt;=</span> <span class="mh">0x7F</span><span class="p">)</span>
      <span class="nx">output</span> <span class="o">+=</span> <span class="nb">String</span><span class="p">.</span><span class="nx">fromCharCode</span><span class="p">(</span><span class="nx">x</span><span class="p">);</span>
    <span class="k">else</span> <span class="k">if</span><span class="p">(</span><span class="nx">x</span> <span class="o">&lt;=</span> <span class="mh">0x7FF</span><span class="p">)</span>
      <span class="nx">output</span> <span class="o">+=</span> <span class="nb">String</span><span class="p">.</span><span class="nx">fromCharCode</span><span class="p">(</span><span class="mh">0xC0</span> <span class="o">|</span> <span class="p">((</span><span class="nx">x</span> <span class="o">&gt;&gt;&gt;</span> <span class="mi">6</span> <span class="p">)</span> <span class="o">&amp;</span> <span class="mh">0x1F</span><span class="p">),</span>
                                    <span class="mh">0x80</span> <span class="o">|</span> <span class="p">(</span> <span class="nx">x</span>         <span class="o">&amp;</span> <span class="mh">0x3F</span><span class="p">));</span>
    <span class="k">else</span> <span class="k">if</span><span class="p">(</span><span class="nx">x</span> <span class="o">&lt;=</span> <span class="mh">0xFFFF</span><span class="p">)</span>
      <span class="nx">output</span> <span class="o">+=</span> <span class="nb">String</span><span class="p">.</span><span class="nx">fromCharCode</span><span class="p">(</span><span class="mh">0xE0</span> <span class="o">|</span> <span class="p">((</span><span class="nx">x</span> <span class="o">&gt;&gt;&gt;</span> <span class="mi">12</span><span class="p">)</span> <span class="o">&amp;</span> <span class="mh">0x0F</span><span class="p">),</span>
                                    <span class="mh">0x80</span> <span class="o">|</span> <span class="p">((</span><span class="nx">x</span> <span class="o">&gt;&gt;&gt;</span> <span class="mi">6</span> <span class="p">)</span> <span class="o">&amp;</span> <span class="mh">0x3F</span><span class="p">),</span>
                                    <span class="mh">0x80</span> <span class="o">|</span> <span class="p">(</span> <span class="nx">x</span>         <span class="o">&amp;</span> <span class="mh">0x3F</span><span class="p">));</span>
    <span class="k">else</span> <span class="k">if</span><span class="p">(</span><span class="nx">x</span> <span class="o">&lt;=</span> <span class="mh">0x1FFFFF</span><span class="p">)</span>
      <span class="nx">output</span> <span class="o">+=</span> <span class="nb">String</span><span class="p">.</span><span class="nx">fromCharCode</span><span class="p">(</span><span class="mh">0xF0</span> <span class="o">|</span> <span class="p">((</span><span class="nx">x</span> <span class="o">&gt;&gt;&gt;</span> <span class="mi">18</span><span class="p">)</span> <span class="o">&amp;</span> <span class="mh">0x07</span><span class="p">),</span>
                                    <span class="mh">0x80</span> <span class="o">|</span> <span class="p">((</span><span class="nx">x</span> <span class="o">&gt;&gt;&gt;</span> <span class="mi">12</span><span class="p">)</span> <span class="o">&amp;</span> <span class="mh">0x3F</span><span class="p">),</span>
                                    <span class="mh">0x80</span> <span class="o">|</span> <span class="p">((</span><span class="nx">x</span> <span class="o">&gt;&gt;&gt;</span> <span class="mi">6</span> <span class="p">)</span> <span class="o">&amp;</span> <span class="mh">0x3F</span><span class="p">),</span>
                                    <span class="mh">0x80</span> <span class="o">|</span> <span class="p">(</span> <span class="nx">x</span>         <span class="o">&amp;</span> <span class="mh">0x3F</span><span class="p">));</span>
  <span class="p">}</span>
  <span class="k">return</span> <span class="nx">output</span><span class="p">;</span>
<span class="p">}</span>

<span class="cm">/*</span>
<span class="cm"> * Encode a string as utf-16</span>
<span class="cm"> */</span>
<span class="kd">function</span> <span class="nx">str2rstr_utf16le</span><span class="p">(</span><span class="nx">input</span><span class="p">)</span>
<span class="p">{</span>
  <span class="kd">var</span> <span class="nx">output</span> <span class="o">=</span> <span class="s2">&quot;&quot;</span><span class="p">;</span>
  <span class="k">for</span><span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">input</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span>
    <span class="nx">output</span> <span class="o">+=</span> <span class="nb">String</span><span class="p">.</span><span class="nx">fromCharCode</span><span class="p">(</span> <span class="nx">input</span><span class="p">.</span><span class="nx">charCodeAt</span><span class="p">(</span><span class="nx">i</span><span class="p">)</span>        <span class="o">&amp;</span> <span class="mh">0xFF</span><span class="p">,</span>
                                  <span class="p">(</span><span class="nx">input</span><span class="p">.</span><span class="nx">charCodeAt</span><span class="p">(</span><span class="nx">i</span><span class="p">)</span> <span class="o">&gt;&gt;&gt;</span> <span class="mi">8</span><span class="p">)</span> <span class="o">&amp;</span> <span class="mh">0xFF</span><span class="p">);</span>
  <span class="k">return</span> <span class="nx">output</span><span class="p">;</span>
<span class="p">}</span>

<span class="kd">function</span> <span class="nx">str2rstr_utf16be</span><span class="p">(</span><span class="nx">input</span><span class="p">)</span>
<span class="p">{</span>
  <span class="kd">var</span> <span class="nx">output</span> <span class="o">=</span> <span class="s2">&quot;&quot;</span><span class="p">;</span>
  <span class="k">for</span><span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">input</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span>
    <span class="nx">output</span> <span class="o">+=</span> <span class="nb">String</span><span class="p">.</span><span class="nx">fromCharCode</span><span class="p">((</span><span class="nx">input</span><span class="p">.</span><span class="nx">charCodeAt</span><span class="p">(</span><span class="nx">i</span><span class="p">)</span> <span class="o">&gt;&gt;&gt;</span> <span class="mi">8</span><span class="p">)</span> <span class="o">&amp;</span> <span class="mh">0xFF</span><span class="p">,</span>
                                   <span class="nx">input</span><span class="p">.</span><span class="nx">charCodeAt</span><span class="p">(</span><span class="nx">i</span><span class="p">)</span>        <span class="o">&amp;</span> <span class="mh">0xFF</span><span class="p">);</span>
  <span class="k">return</span> <span class="nx">output</span><span class="p">;</span>
<span class="p">}</span>

<span class="cm">/*</span>
<span class="cm"> * Convert a raw string to an array of big-endian words</span>
<span class="cm"> * Characters &gt;255 have their high-byte silently ignored.</span>
<span class="cm"> */</span>
<span class="kd">function</span> <span class="nx">rstr2binb</span><span class="p">(</span><span class="nx">input</span><span class="p">)</span>
<span class="p">{</span>
  <span class="kd">var</span> <span class="nx">output</span> <span class="o">=</span> <span class="nb">Array</span><span class="p">(</span><span class="nx">input</span><span class="p">.</span><span class="nx">length</span> <span class="o">&gt;&gt;</span> <span class="mi">2</span><span class="p">);</span>
  <span class="k">for</span><span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">output</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span>
    <span class="nx">output</span><span class="p">[</span><span class="nx">i</span><span class="p">]</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span>
  <span class="k">for</span><span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">input</span><span class="p">.</span><span class="nx">length</span> <span class="o">*</span> <span class="mi">8</span><span class="p">;</span> <span class="nx">i</span> <span class="o">+=</span> <span class="mi">8</span><span class="p">)</span>
    <span class="nx">output</span><span class="p">[</span><span class="nx">i</span><span class="o">&gt;&gt;</span><span class="mi">5</span><span class="p">]</span> <span class="o">|=</span> <span class="p">(</span><span class="nx">input</span><span class="p">.</span><span class="nx">charCodeAt</span><span class="p">(</span><span class="nx">i</span> <span class="o">/</span> <span class="mi">8</span><span class="p">)</span> <span class="o">&amp;</span> <span class="mh">0xFF</span><span class="p">)</span> <span class="o">&lt;&lt;</span> <span class="p">(</span><span class="mi">24</span> <span class="o">-</span> <span class="nx">i</span> <span class="o">%</span> <span class="mi">32</span><span class="p">);</span>
  <span class="k">return</span> <span class="nx">output</span><span class="p">;</span>
<span class="p">}</span>

<span class="cm">/*</span>
<span class="cm"> * Convert an array of big-endian words to a string</span>
<span class="cm"> */</span>
<span class="kd">function</span> <span class="nx">binb2rstr</span><span class="p">(</span><span class="nx">input</span><span class="p">)</span>
<span class="p">{</span>
  <span class="kd">var</span> <span class="nx">output</span> <span class="o">=</span> <span class="s2">&quot;&quot;</span><span class="p">;</span>
  <span class="k">for</span><span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">input</span><span class="p">.</span><span class="nx">length</span> <span class="o">*</span> <span class="mi">32</span><span class="p">;</span> <span class="nx">i</span> <span class="o">+=</span> <span class="mi">8</span><span class="p">)</span>
    <span class="nx">output</span> <span class="o">+=</span> <span class="nb">String</span><span class="p">.</span><span class="nx">fromCharCode</span><span class="p">((</span><span class="nx">input</span><span class="p">[</span><span class="nx">i</span><span class="o">&gt;&gt;</span><span class="mi">5</span><span class="p">]</span> <span class="o">&gt;&gt;&gt;</span> <span class="p">(</span><span class="mi">24</span> <span class="o">-</span> <span class="nx">i</span> <span class="o">%</span> <span class="mi">32</span><span class="p">))</span> <span class="o">&amp;</span> <span class="mh">0xFF</span><span class="p">);</span>
  <span class="k">return</span> <span class="nx">output</span><span class="p">;</span>
<span class="p">}</span>

<span class="cm">/*</span>
<span class="cm"> * Main sha256 function, with its support functions</span>
<span class="cm"> */</span>
<span class="kd">function</span> <span class="nx">sha256_S</span> <span class="p">(</span><span class="nx">X</span><span class="p">,</span> <span class="nx">n</span><span class="p">)</span> <span class="p">{</span><span class="k">return</span> <span class="p">(</span> <span class="nx">X</span> <span class="o">&gt;&gt;&gt;</span> <span class="nx">n</span> <span class="p">)</span> <span class="o">|</span> <span class="p">(</span><span class="nx">X</span> <span class="o">&lt;&lt;</span> <span class="p">(</span><span class="mi">32</span> <span class="o">-</span> <span class="nx">n</span><span class="p">));}</span>
<span class="kd">function</span> <span class="nx">sha256_R</span> <span class="p">(</span><span class="nx">X</span><span class="p">,</span> <span class="nx">n</span><span class="p">)</span> <span class="p">{</span><span class="k">return</span> <span class="p">(</span> <span class="nx">X</span> <span class="o">&gt;&gt;&gt;</span> <span class="nx">n</span> <span class="p">);}</span>
<span class="kd">function</span> <span class="nx">sha256_Ch</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="nx">y</span><span class="p">,</span> <span class="nx">z</span><span class="p">)</span> <span class="p">{</span><span class="k">return</span> <span class="p">((</span><span class="nx">x</span> <span class="o">&amp;</span> <span class="nx">y</span><span class="p">)</span> <span class="o">^</span> <span class="p">((</span><span class="o">~</span><span class="nx">x</span><span class="p">)</span> <span class="o">&amp;</span> <span class="nx">z</span><span class="p">));}</span>
<span class="kd">function</span> <span class="nx">sha256_Maj</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="nx">y</span><span class="p">,</span> <span class="nx">z</span><span class="p">)</span> <span class="p">{</span><span class="k">return</span> <span class="p">((</span><span class="nx">x</span> <span class="o">&amp;</span> <span class="nx">y</span><span class="p">)</span> <span class="o">^</span> <span class="p">(</span><span class="nx">x</span> <span class="o">&amp;</span> <span class="nx">z</span><span class="p">)</span> <span class="o">^</span> <span class="p">(</span><span class="nx">y</span> <span class="o">&amp;</span> <span class="nx">z</span><span class="p">));}</span>
<span class="kd">function</span> <span class="nx">sha256_Sigma0256</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span><span class="k">return</span> <span class="p">(</span><span class="nx">sha256_S</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">2</span><span class="p">)</span> <span class="o">^</span> <span class="nx">sha256_S</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">13</span><span class="p">)</span> <span class="o">^</span> <span class="nx">sha256_S</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">22</span><span class="p">));}</span>
<span class="kd">function</span> <span class="nx">sha256_Sigma1256</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span><span class="k">return</span> <span class="p">(</span><span class="nx">sha256_S</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">6</span><span class="p">)</span> <span class="o">^</span> <span class="nx">sha256_S</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">11</span><span class="p">)</span> <span class="o">^</span> <span class="nx">sha256_S</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">25</span><span class="p">));}</span>
<span class="kd">function</span> <span class="nx">sha256_Gamma0256</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span><span class="k">return</span> <span class="p">(</span><span class="nx">sha256_S</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">7</span><span class="p">)</span> <span class="o">^</span> <span class="nx">sha256_S</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">18</span><span class="p">)</span> <span class="o">^</span> <span class="nx">sha256_R</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">3</span><span class="p">));}</span>
<span class="kd">function</span> <span class="nx">sha256_Gamma1256</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span><span class="k">return</span> <span class="p">(</span><span class="nx">sha256_S</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">17</span><span class="p">)</span> <span class="o">^</span> <span class="nx">sha256_S</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">19</span><span class="p">)</span> <span class="o">^</span> <span class="nx">sha256_R</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">10</span><span class="p">));}</span>
<span class="kd">function</span> <span class="nx">sha256_Sigma0512</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span><span class="k">return</span> <span class="p">(</span><span class="nx">sha256_S</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">28</span><span class="p">)</span> <span class="o">^</span> <span class="nx">sha256_S</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">34</span><span class="p">)</span> <span class="o">^</span> <span class="nx">sha256_S</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">39</span><span class="p">));}</span>
<span class="kd">function</span> <span class="nx">sha256_Sigma1512</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span><span class="k">return</span> <span class="p">(</span><span class="nx">sha256_S</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">14</span><span class="p">)</span> <span class="o">^</span> <span class="nx">sha256_S</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">18</span><span class="p">)</span> <span class="o">^</span> <span class="nx">sha256_S</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">41</span><span class="p">));}</span>
<span class="kd">function</span> <span class="nx">sha256_Gamma0512</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span><span class="k">return</span> <span class="p">(</span><span class="nx">sha256_S</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span>  <span class="o">^</span> <span class="nx">sha256_S</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">8</span><span class="p">)</span> <span class="o">^</span> <span class="nx">sha256_R</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">7</span><span class="p">));}</span>
<span class="kd">function</span> <span class="nx">sha256_Gamma1512</span><span class="p">(</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span><span class="k">return</span> <span class="p">(</span><span class="nx">sha256_S</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">19</span><span class="p">)</span> <span class="o">^</span> <span class="nx">sha256_S</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">61</span><span class="p">)</span> <span class="o">^</span> <span class="nx">sha256_R</span><span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="mi">6</span><span class="p">));}</span>

<span class="kd">var</span> <span class="nx">sha256_K</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Array</span>
<span class="p">(</span>
  <span class="mi">1116352408</span><span class="p">,</span> <span class="mi">1899447441</span><span class="p">,</span> <span class="o">-</span><span class="mi">1245643825</span><span class="p">,</span> <span class="o">-</span><span class="mi">373957723</span><span class="p">,</span> <span class="mi">961987163</span><span class="p">,</span> <span class="mi">1508970993</span><span class="p">,</span>
  <span class="o">-</span><span class="mi">1841331548</span><span class="p">,</span> <span class="o">-</span><span class="mi">1424204075</span><span class="p">,</span> <span class="o">-</span><span class="mi">670586216</span><span class="p">,</span> <span class="mi">310598401</span><span class="p">,</span> <span class="mi">607225278</span><span class="p">,</span> <span class="mi">1426881987</span><span class="p">,</span>
  <span class="mi">1925078388</span><span class="p">,</span> <span class="o">-</span><span class="mi">2132889090</span><span class="p">,</span> <span class="o">-</span><span class="mi">1680079193</span><span class="p">,</span> <span class="o">-</span><span class="mi">1046744716</span><span class="p">,</span> <span class="o">-</span><span class="mi">459576895</span><span class="p">,</span> <span class="o">-</span><span class="mi">272742522</span><span class="p">,</span>
  <span class="mi">264347078</span><span class="p">,</span> <span class="mi">604807628</span><span class="p">,</span> <span class="mi">770255983</span><span class="p">,</span> <span class="mi">1249150122</span><span class="p">,</span> <span class="mi">1555081692</span><span class="p">,</span> <span class="mi">1996064986</span><span class="p">,</span>
  <span class="o">-</span><span class="mi">1740746414</span><span class="p">,</span> <span class="o">-</span><span class="mi">1473132947</span><span class="p">,</span> <span class="o">-</span><span class="mi">1341970488</span><span class="p">,</span> <span class="o">-</span><span class="mi">1084653625</span><span class="p">,</span> <span class="o">-</span><span class="mi">958395405</span><span class="p">,</span> <span class="o">-</span><span class="mi">710438585</span><span class="p">,</span>
  <span class="mi">113926993</span><span class="p">,</span> <span class="mi">338241895</span><span class="p">,</span> <span class="mi">666307205</span><span class="p">,</span> <span class="mi">773529912</span><span class="p">,</span> <span class="mi">1294757372</span><span class="p">,</span> <span class="mi">1396182291</span><span class="p">,</span>
  <span class="mi">1695183700</span><span class="p">,</span> <span class="mi">1986661051</span><span class="p">,</span> <span class="o">-</span><span class="mi">2117940946</span><span class="p">,</span> <span class="o">-</span><span class="mi">1838011259</span><span class="p">,</span> <span class="o">-</span><span class="mi">1564481375</span><span class="p">,</span> <span class="o">-</span><span class="mi">1474664885</span><span class="p">,</span>
  <span class="o">-</span><span class="mi">1035236496</span><span class="p">,</span> <span class="o">-</span><span class="mi">949202525</span><span class="p">,</span> <span class="o">-</span><span class="mi">778901479</span><span class="p">,</span> <span class="o">-</span><span class="mi">694614492</span><span class="p">,</span> <span class="o">-</span><span class="mi">200395387</span><span class="p">,</span> <span class="mi">275423344</span><span class="p">,</span>
  <span class="mi">430227734</span><span class="p">,</span> <span class="mi">506948616</span><span class="p">,</span> <span class="mi">659060556</span><span class="p">,</span> <span class="mi">883997877</span><span class="p">,</span> <span class="mi">958139571</span><span class="p">,</span> <span class="mi">1322822218</span><span class="p">,</span>
  <span class="mi">1537002063</span><span class="p">,</span> <span class="mi">1747873779</span><span class="p">,</span> <span class="mi">1955562222</span><span class="p">,</span> <span class="mi">2024104815</span><span class="p">,</span> <span class="o">-</span><span class="mi">2067236844</span><span class="p">,</span> <span class="o">-</span><span class="mi">1933114872</span><span class="p">,</span>
  <span class="o">-</span><span class="mi">1866530822</span><span class="p">,</span> <span class="o">-</span><span class="mi">1538233109</span><span class="p">,</span> <span class="o">-</span><span class="mi">1090935817</span><span class="p">,</span> <span class="o">-</span><span class="mi">965641998</span>
<span class="p">);</span>

<span class="kd">function</span> <span class="nx">binb_sha256</span><span class="p">(</span><span class="nx">m</span><span class="p">,</span> <span class="nx">l</span><span class="p">)</span>
<span class="p">{</span>
  <span class="kd">var</span> <span class="nx">HASH</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Array</span><span class="p">(</span><span class="mi">1779033703</span><span class="p">,</span> <span class="o">-</span><span class="mi">1150833019</span><span class="p">,</span> <span class="mi">1013904242</span><span class="p">,</span> <span class="o">-</span><span class="mi">1521486534</span><span class="p">,</span>
                       <span class="mi">1359893119</span><span class="p">,</span> <span class="o">-</span><span class="mi">1694144372</span><span class="p">,</span> <span class="mi">528734635</span><span class="p">,</span> <span class="mi">1541459225</span><span class="p">);</span>
  <span class="kd">var</span> <span class="nx">W</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Array</span><span class="p">(</span><span class="mi">64</span><span class="p">);</span>
  <span class="kd">var</span> <span class="nx">a</span><span class="p">,</span> <span class="nx">b</span><span class="p">,</span> <span class="nx">c</span><span class="p">,</span> <span class="nx">d</span><span class="p">,</span> <span class="nx">e</span><span class="p">,</span> <span class="nx">f</span><span class="p">,</span> <span class="nx">g</span><span class="p">,</span> <span class="nx">h</span><span class="p">;</span>
  <span class="kd">var</span> <span class="nx">i</span><span class="p">,</span> <span class="nx">j</span><span class="p">,</span> <span class="nx">T1</span><span class="p">,</span> <span class="nx">T2</span><span class="p">;</span>

  <span class="cm">/* append padding */</span>
  <span class="nx">m</span><span class="p">[</span><span class="nx">l</span> <span class="o">&gt;&gt;</span> <span class="mi">5</span><span class="p">]</span> <span class="o">|=</span> <span class="mh">0x80</span> <span class="o">&lt;&lt;</span> <span class="p">(</span><span class="mi">24</span> <span class="o">-</span> <span class="nx">l</span> <span class="o">%</span> <span class="mi">32</span><span class="p">);</span>
  <span class="nx">m</span><span class="p">[((</span><span class="nx">l</span> <span class="o">+</span> <span class="mi">64</span> <span class="o">&gt;&gt;</span> <span class="mi">9</span><span class="p">)</span> <span class="o">&lt;&lt;</span> <span class="mi">4</span><span class="p">)</span> <span class="o">+</span> <span class="mi">15</span><span class="p">]</span> <span class="o">=</span> <span class="nx">l</span><span class="p">;</span>

  <span class="k">for</span><span class="p">(</span><span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">m</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span> <span class="o">+=</span> <span class="mi">16</span><span class="p">)</span>
  <span class="p">{</span>
    <span class="nx">a</span> <span class="o">=</span> <span class="nx">HASH</span><span class="p">[</span><span class="mi">0</span><span class="p">];</span>
    <span class="nx">b</span> <span class="o">=</span> <span class="nx">HASH</span><span class="p">[</span><span class="mi">1</span><span class="p">];</span>
    <span class="nx">c</span> <span class="o">=</span> <span class="nx">HASH</span><span class="p">[</span><span class="mi">2</span><span class="p">];</span>
    <span class="nx">d</span> <span class="o">=</span> <span class="nx">HASH</span><span class="p">[</span><span class="mi">3</span><span class="p">];</span>
    <span class="nx">e</span> <span class="o">=</span> <span class="nx">HASH</span><span class="p">[</span><span class="mi">4</span><span class="p">];</span>
    <span class="nx">f</span> <span class="o">=</span> <span class="nx">HASH</span><span class="p">[</span><span class="mi">5</span><span class="p">];</span>
    <span class="nx">g</span> <span class="o">=</span> <span class="nx">HASH</span><span class="p">[</span><span class="mi">6</span><span class="p">];</span>
    <span class="nx">h</span> <span class="o">=</span> <span class="nx">HASH</span><span class="p">[</span><span class="mi">7</span><span class="p">];</span>

    <span class="k">for</span><span class="p">(</span><span class="nx">j</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">j</span> <span class="o">&lt;</span> <span class="mi">64</span><span class="p">;</span> <span class="nx">j</span><span class="o">++</span><span class="p">)</span>
    <span class="p">{</span>
      <span class="k">if</span> <span class="p">(</span><span class="nx">j</span> <span class="o">&lt;</span> <span class="mi">16</span><span class="p">)</span> <span class="nx">W</span><span class="p">[</span><span class="nx">j</span><span class="p">]</span> <span class="o">=</span> <span class="nx">m</span><span class="p">[</span><span class="nx">j</span> <span class="o">+</span> <span class="nx">i</span><span class="p">];</span>
      <span class="k">else</span> <span class="nx">W</span><span class="p">[</span><span class="nx">j</span><span class="p">]</span> <span class="o">=</span> <span class="nx">safe_add</span><span class="p">(</span><span class="nx">safe_add</span><span class="p">(</span><span class="nx">safe_add</span><span class="p">(</span><span class="nx">sha256_Gamma1256</span><span class="p">(</span><span class="nx">W</span><span class="p">[</span><span class="nx">j</span> <span class="o">-</span> <span class="mi">2</span><span class="p">]),</span> <span class="nx">W</span><span class="p">[</span><span class="nx">j</span> <span class="o">-</span> <span class="mi">7</span><span class="p">]),</span>
                                            <span class="nx">sha256_Gamma0256</span><span class="p">(</span><span class="nx">W</span><span class="p">[</span><span class="nx">j</span> <span class="o">-</span> <span class="mi">15</span><span class="p">])),</span> <span class="nx">W</span><span class="p">[</span><span class="nx">j</span> <span class="o">-</span> <span class="mi">16</span><span class="p">]);</span>

      <span class="nx">T1</span> <span class="o">=</span> <span class="nx">safe_add</span><span class="p">(</span><span class="nx">safe_add</span><span class="p">(</span><span class="nx">safe_add</span><span class="p">(</span><span class="nx">safe_add</span><span class="p">(</span><span class="nx">h</span><span class="p">,</span> <span class="nx">sha256_Sigma1256</span><span class="p">(</span><span class="nx">e</span><span class="p">)),</span> <span class="nx">sha256_Ch</span><span class="p">(</span><span class="nx">e</span><span class="p">,</span> <span class="nx">f</span><span class="p">,</span> <span class="nx">g</span><span class="p">)),</span>
                                                          <span class="nx">sha256_K</span><span class="p">[</span><span class="nx">j</span><span class="p">]),</span> <span class="nx">W</span><span class="p">[</span><span class="nx">j</span><span class="p">]);</span>
      <span class="nx">T2</span> <span class="o">=</span> <span class="nx">safe_add</span><span class="p">(</span><span class="nx">sha256_Sigma0256</span><span class="p">(</span><span class="nx">a</span><span class="p">),</span> <span class="nx">sha256_Maj</span><span class="p">(</span><span class="nx">a</span><span class="p">,</span> <span class="nx">b</span><span class="p">,</span> <span class="nx">c</span><span class="p">));</span>
      <span class="nx">h</span> <span class="o">=</span> <span class="nx">g</span><span class="p">;</span>
      <span class="nx">g</span> <span class="o">=</span> <span class="nx">f</span><span class="p">;</span>
      <span class="nx">f</span> <span class="o">=</span> <span class="nx">e</span><span class="p">;</span>
      <span class="nx">e</span> <span class="o">=</span> <span class="nx">safe_add</span><span class="p">(</span><span class="nx">d</span><span class="p">,</span> <span class="nx">T1</span><span class="p">);</span>
      <span class="nx">d</span> <span class="o">=</span> <span class="nx">c</span><span class="p">;</span>
      <span class="nx">c</span> <span class="o">=</span> <span class="nx">b</span><span class="p">;</span>
      <span class="nx">b</span> <span class="o">=</span> <span class="nx">a</span><span class="p">;</span>
      <span class="nx">a</span> <span class="o">=</span> <span class="nx">safe_add</span><span class="p">(</span><span class="nx">T1</span><span class="p">,</span> <span class="nx">T2</span><span class="p">);</span>
    <span class="p">}</span>

    <span class="nx">HASH</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">=</span> <span class="nx">safe_add</span><span class="p">(</span><span class="nx">a</span><span class="p">,</span> <span class="nx">HASH</span><span class="p">[</span><span class="mi">0</span><span class="p">]);</span>
    <span class="nx">HASH</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">=</span> <span class="nx">safe_add</span><span class="p">(</span><span class="nx">b</span><span class="p">,</span> <span class="nx">HASH</span><span class="p">[</span><span class="mi">1</span><span class="p">]);</span>
    <span class="nx">HASH</span><span class="p">[</span><span class="mi">2</span><span class="p">]</span> <span class="o">=</span> <span class="nx">safe_add</span><span class="p">(</span><span class="nx">c</span><span class="p">,</span> <span class="nx">HASH</span><span class="p">[</span><span class="mi">2</span><span class="p">]);</span>
    <span class="nx">HASH</span><span class="p">[</span><span class="mi">3</span><span class="p">]</span> <span class="o">=</span> <span class="nx">safe_add</span><span class="p">(</span><span class="nx">d</span><span class="p">,</span> <span class="nx">HASH</span><span class="p">[</span><span class="mi">3</span><span class="p">]);</span>
    <span class="nx">HASH</span><span class="p">[</span><span class="mi">4</span><span class="p">]</span> <span class="o">=</span> <span class="nx">safe_add</span><span class="p">(</span><span class="nx">e</span><span class="p">,</span> <span class="nx">HASH</span><span class="p">[</span><span class="mi">4</span><span class="p">]);</span>
    <span class="nx">HASH</span><span class="p">[</span><span class="mi">5</span><span class="p">]</span> <span class="o">=</span> <span class="nx">safe_add</span><span class="p">(</span><span class="nx">f</span><span class="p">,</span> <span class="nx">HASH</span><span class="p">[</span><span class="mi">5</span><span class="p">]);</span>
    <span class="nx">HASH</span><span class="p">[</span><span class="mi">6</span><span class="p">]</span> <span class="o">=</span> <span class="nx">safe_add</span><span class="p">(</span><span class="nx">g</span><span class="p">,</span> <span class="nx">HASH</span><span class="p">[</span><span class="mi">6</span><span class="p">]);</span>
    <span class="nx">HASH</span><span class="p">[</span><span class="mi">7</span><span class="p">]</span> <span class="o">=</span> <span class="nx">safe_add</span><span class="p">(</span><span class="nx">h</span><span class="p">,</span> <span class="nx">HASH</span><span class="p">[</span><span class="mi">7</span><span class="p">]);</span>
  <span class="p">}</span>
  <span class="k">return</span> <span class="nx">HASH</span><span class="p">;</span>
<span class="p">}</span>

<span class="kd">function</span> <span class="nx">safe_add</span> <span class="p">(</span><span class="nx">x</span><span class="p">,</span> <span class="nx">y</span><span class="p">)</span>
<span class="p">{</span>
  <span class="kd">var</span> <span class="nx">lsw</span> <span class="o">=</span> <span class="p">(</span><span class="nx">x</span> <span class="o">&amp;</span> <span class="mh">0xFFFF</span><span class="p">)</span> <span class="o">+</span> <span class="p">(</span><span class="nx">y</span> <span class="o">&amp;</span> <span class="mh">0xFFFF</span><span class="p">);</span>
  <span class="kd">var</span> <span class="nx">msw</span> <span class="o">=</span> <span class="p">(</span><span class="nx">x</span> <span class="o">&gt;&gt;</span> <span class="mi">16</span><span class="p">)</span> <span class="o">+</span> <span class="p">(</span><span class="nx">y</span> <span class="o">&gt;&gt;</span> <span class="mi">16</span><span class="p">)</span> <span class="o">+</span> <span class="p">(</span><span class="nx">lsw</span> <span class="o">&gt;&gt;</span> <span class="mi">16</span><span class="p">);</span>
  <span class="k">return</span> <span class="p">(</span><span class="nx">msw</span> <span class="o">&lt;&lt;</span> <span class="mi">16</span><span class="p">)</span> <span class="o">|</span> <span class="p">(</span><span class="nx">lsw</span> <span class="o">&amp;</span> <span class="mh">0xFFFF</span><span class="p">);</span>
<span class="p">}</span>
</pre></div>

<table class="hr"><tr><td></td></tr></table><div style="margin-top:0.5em;">&copy; 1998 - 2012
                        <img src="../../logos/email.png" style="border:none" height="16" alt="" width="16"><a href="mailto:paj@pajhome.org.uk">Paul Johnston</a>, distributed under the <a href="../../site/legal.html#bsdlicense">BSD License</a> &nbsp; <b>Updated:</b>10 Jun 2009</div></td></tr></table></body></html>