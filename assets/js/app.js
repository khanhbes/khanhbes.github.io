/* Particles.js Configuration for High-Contrast Dark Tech Neural Theme */
particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 65,
      "density": {
        "enable": true,
        "value_area": 850
      }
    },
    "color": {
      "value": ["#818cf8", "#38bdf8", "#c084fc", "#34d399"]
    },
    "shape": {
      "type": "circle"
    },
    "opacity": {
      "value": 0.55,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.15,
        "sync": false
      }
    },
    "size": {
      "value": 3.6,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 2,
        "size_min": 0.6,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 135,
      "color": "#818cf8",
      "opacity": 0.3,
      "width": 1.2
    },
    "move": {
      "enable": true,
      "speed": 1.8,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 160,
        "line_linked": {
          "opacity": 0.65
        }
      },
      "push": {
        "particles_nb": 4
      }
    }
  },
  "retina_detect": true
});
