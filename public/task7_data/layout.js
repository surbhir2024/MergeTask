
function openLanguage(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("word");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  // var button = document.getElementById("slide");
  function slide() {
      var container = document.getElementById('about-card-row');
      container.scrollLeft += 100;
    }

  // var back = document.getElementById('slideback');
  function slideback(){
      var container = document.getElementById('about-card-row');
      document.getElementById('about-card-row');
      container.scrollLeft -= 100;

  }