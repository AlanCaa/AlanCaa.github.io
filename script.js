document.addEventListener('DOMContentLoaded', function () {
  const resultElement = document.getElementById('result');
  const sies = document.getElementById('sies');
  const noes = document.getElementById('noes');
  const videoLeft = document.getElementById('videoLeft');
  const videoRight = document.getElementById('videoRight');
  const backgroundVideo = document.getElementById('backgroundvideo');

  function playAudio() {
    // Crea un elemento de audio y configura la fuente del archivo de audio
    const audio = new Audio('recursos/audio.mp3'); // Reemplaza 'ruta/a/tu/archivo/de/audio.mp3' con la ruta correcta a tu archivo de audio

    // Reproduce el audio
    audio.play();
  }

  function fadeImages() {
    // Agregar clase para aplicar transición suave
    sies.classList.add('fade-out');
    noes.classList.add('fade-in');

    // Pausar videos durante la transición
    videoLeft.pause();
    videoRight.pause();

    // Esperar 1 segundo antes de mostrar la nueva imagen
    setTimeout(() => {
      // Ocultar la primera imagen y mostrar la segunda
      sies.style.display = 'none';
      noes.style.display = 'block';

      // Quitar las clases de transición después de 1 segundo
      setTimeout(() => {
        sies.classList.remove('fade-out');
        noes.classList.remove('fade-in');
      }, 1000);

      // Reiniciar la reproducción de videos después de la transición
      videoLeft.play();
      videoRight.play();
    }, 1000);
  }

  function showThirdVideo() {
    // Configurar las propiedades del tercer video y su contenedor
    thirdVideoContainer.style.display = 'block';
    thirdVideo.style.opacity = 1;
    thirdVideo.loop = true;
    thirdVideo.play();
  }

  function hideThirdVideo() {
    // Ocultar y pausar el tercer video y su contenedor
    thirdVideoContainer.style.display = 'none';
    thirdVideo.pause();
    thirdVideo.loop = false;
  }


  function updateCounter() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    if (currentMonth === 11) {
      resultElement.textContent = '¡Es diciembre!';
      // Mostrar la imagen y videos si es diciembre
      sies.style.display = 'block';
      noes.style.display = 'none';
      videoLeft.style.opacity = 1;
      videoRight.style.opacity = 1;
      backgroundVideo.style.opacity = 1;
      // Reproducir videos en bucle si es diciembre
      backgroundVideo.loop = true;
      videoLeft.loop = true;
      videoRight.loop = true;
      backgroundVideo.play();
      videoLeft.play();
      videoRight.play();
      resultElement.style.color = "white"
      showThirdVideo();

      // Remover la clase 'no-videos' si está presente
      document.body.classList.remove('no-videos');
    } else {
      const decemberDate = new Date(currentDate.getFullYear(), 11, 1);
      const timeDiff = decemberDate.getTime() - currentDate.getTime();

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      resultElement.innerHTML = `No es diciembre.<br>Faltan ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos para diciembre.`;
      // Ocultar el tercer video si no es diciembre
      hideThirdVideo();
      // Ocultar la imagen y videos si no es diciembre
      noes.style.display = 'block';
      sies.style.display = 'none';
      videoLeft.style.opacity = 0;
      videoRight.style.opacity = 0;

      // Pausar videos si no es diciembre
      videoLeft.pause();
      videoRight.pause();
      videoLeft.loop = false;
      videoRight.loop = false;

      // Reproducir audio cuando falten 53 segundos
      if (days === 0 && hours === 0 && minutes === 0 && seconds === 53) {
        playAudio();
      }

      // Iniciar la transición suave cuando falten 5 segundos
      if (days === 0 && hours === 0 && minutes === 0 && seconds === 1) {
        fadeImages();
      }

      // Agregar la clase 'no-videos' para ajustar la alineación de la imagen
      document.body.classList.add('no-videos');
    }
  }

  // Actualizar el contador cada segundo
  setInterval(updateCounter, 1000);

  // Llamar a la función inicialmente para que no haya un retraso de un segundo al cargar la página
  updateCounter();
});
