import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const certificates = [
  ['Masters in Ethical Hacking', 'Massmatic Cyber Forensic & Information Security', 'beginner-certificate.png', 1402, 992],
  ['Code Clutch', 'Participation Certificate', 'code-clutch.png', 1404, 992],
  ['CSS Certificate', 'Front-End Development', 'css-certificate.png', 1395, 980],
  ['IT Basics & DOS', 'Command-Line Fundamentals', 'dos-certificate.png', 1350, 980],
  ['Technical Support Core', 'Computer Hardware', 'hardware-certificate.png', 1350, 974],
  ['HTML Certificate', 'Front-End Development', 'html-certificate.png', 1395, 980],
  ['Introduction to Large Language Models', 'Google Cloud Skills Boost', 'intro-to-llm-google.png', 1931, 1366],
  ['Introduction to Cybersecurity', 'EC-Council', 'introduction-ec-council.png', 3213, 2480],
  ['IT Basics Certificate', 'Computer Fundamentals', 'it-basics-certificate.png', 1395, 1012],
  ['JavaScript Certificate', 'Udemy', 'javascript-udemy.png', 2667, 1984],
  ['Networking Certificate', 'Network Fundamentals', 'networking-certificate.png', 1395, 999],
  ['Tech Royale 1.0', 'Participation Certificate', 'tech-royale-1-0-certificate-vansh-saini.png', 1404, 992],
  ['Participation Certificate', 'Event Recognition', 'vansh-saini-participation-certificate.png', 1280, 904]
].map(([title, source, file, width, height]) => ({
  title,
  source,
  width,
  height,
  ratio: width / height,
  image: `${import.meta.env.BASE_URL}certificates/${file}`
}));

const typedLines = [
  'Aspiring Cybersecurity & Digital Forensics Professional',
  'Windows Forensics | Network Analysis | OSINT',
  'Building evidence-first security projects'
];

const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const cursorTrail = document.querySelector('.cursor-trail');
const typedTarget = document.querySelector('#typed-text');
const stage = document.querySelector('#certificate-stage');
const certTitle = document.querySelector('#cert-title');
const certSource = document.querySelector('#cert-source');
const dialog = document.querySelector('#cert-dialog');
const dialogImage = document.querySelector('#dialog-image');
const dialogClose = document.querySelector('#dialog-close');

let mouseX = 0;
let mouseY = 0;
let certIndex = 0;

function initCursor() {
  window.addEventListener('pointermove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    document.documentElement.style.setProperty('--cursor-x', `${mouseX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${mouseY}px`);

    gsap.to(cursorDot, { x: mouseX, y: mouseY, duration: 0.08, ease: 'power2.out' });
    gsap.to(cursorRing, { x: mouseX, y: mouseY, duration: 0.24, ease: 'power3.out' });
    gsap.to(cursorTrail, {
      x: mouseX,
      y: mouseY,
      opacity: 0.45,
      scale: 1,
      duration: 0.22,
      ease: 'power2.out'
    });
    gsap.to(cursorTrail, {
      opacity: 0,
      scale: 2.1,
      duration: 0.65,
      delay: 0.05,
      ease: 'power2.out'
    });
  });

  document.querySelectorAll('a, button, .certificate-card').forEach((element) => {
    element.addEventListener('pointerenter', () => document.body.classList.add('cursor-active'));
    element.addEventListener('pointerleave', () => document.body.classList.remove('cursor-active'));
  });
}

function typeLoop() {
  let line = 0;
  let char = 0;
  let deleting = false;

  function tick() {
    const current = typedLines[line];
    typedTarget.textContent = current.slice(0, char);

    if (!deleting && char <= current.length) {
      char += 1;
    } else if (deleting && char >= 0) {
      char -= 1;
    }

    if (char > current.length + 10) {
      deleting = true;
    }
    if (char < 0) {
      deleting = false;
      line = (line + 1) % typedLines.length;
      char = 0;
    }

    const delay = deleting ? 32 : 58;
    window.setTimeout(tick, char > current.length ? 80 : delay);
  }

  tick();
}

function initHeroScene() {
  const canvas = document.querySelector('#hero-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0.4, 8);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

  const ambient = new THREE.AmbientLight(0x71f7cf, 1.8);
  scene.add(ambient);

  const key = new THREE.PointLight(0x16f2ff, 46, 18);
  key.position.set(-3, 4, 5);
  scene.add(key);

  const magenta = new THREE.PointLight(0xff3d81, 28, 18);
  magenta.position.set(5, -2, 4);
  scene.add(magenta);

  const heroGroup = new THREE.Group();
  scene.add(heroGroup);

  const textureLoader = new THREE.TextureLoader();
  const portraitTexture = textureLoader.load(`${import.meta.env.BASE_URL}assets/me.png`);
  portraitTexture.colorSpace = THREE.SRGBColorSpace;

  const portraitMaterial = new THREE.MeshBasicMaterial({
    map: portraitTexture,
    transparent: true,
    opacity: 0.88,
    side: THREE.DoubleSide
  });
  const portrait = new THREE.Mesh(new THREE.PlaneGeometry(3.85, 3.08, 24, 24), portraitMaterial);
  portrait.position.set(1.65, -0.28, 0);
  portrait.rotation.set(-0.04, -0.28, 0.03);
  heroGroup.add(portrait);

  const portraitFrame = new THREE.Mesh(
    new THREE.BoxGeometry(4.08, 3.34, 0.08),
    new THREE.MeshStandardMaterial({
      color: 0x061414,
      metalness: 0.7,
      roughness: 0.28,
      emissive: 0x073b38,
      emissiveIntensity: 0.55
    })
  );
  portraitFrame.position.copy(portrait.position);
  portraitFrame.position.z = -0.12;
  portraitFrame.rotation.copy(portrait.rotation);
  heroGroup.add(portraitFrame);

  const wireMaterial = new THREE.MeshStandardMaterial({
    color: 0x11f5b2,
    wireframe: true,
    transparent: true,
    opacity: 0.42,
    metalness: 0.2,
    roughness: 0.3
  });

  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.7, 0.16, 144, 18), wireMaterial);
  knot.position.set(-3.3, 1.6, -0.7);
  heroGroup.add(knot);

  const octa = new THREE.Mesh(new THREE.OctahedronGeometry(0.82, 1), wireMaterial.clone());
  octa.material.color.set(0xffc247);
  octa.position.set(3.9, 1.3, -0.45);
  heroGroup.add(octa);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.45, 0.012, 12, 160),
    new THREE.MeshBasicMaterial({ color: 0x1cf7ff, transparent: true, opacity: 0.5 })
  );
  ring.position.set(1.65, -0.28, -0.22);
  ring.rotation.set(1.22, 0.05, -0.28);
  heroGroup.add(ring);

  const packetGeometry = new THREE.BufferGeometry();
  const packetCount = 1450;
  const packetPositions = new Float32Array(packetCount * 3);
  for (let i = 0; i < packetCount; i += 1) {
    packetPositions[i * 3] = (Math.random() - 0.5) * 13;
    packetPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    packetPositions[i * 3 + 2] = (Math.random() - 0.5) * 7;
  }
  packetGeometry.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));
  const packets = new THREE.Points(
    packetGeometry,
    new THREE.PointsMaterial({
      color: 0x64ffe1,
      size: 0.018,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    })
  );
  scene.add(packets);

  const grid = new THREE.GridHelper(18, 48, 0x18ffbd, 0x123b3a);
  grid.position.set(0, -3.25, -1.6);
  grid.material.transparent = true;
  grid.material.opacity = 0.45;
  scene.add(grid);

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);

    const mobile = width < 760;
    portrait.scale.setScalar(mobile ? 0.72 : 1);
    portraitFrame.scale.copy(portrait.scale);
    ring.scale.setScalar(mobile ? 0.72 : 1);
    heroGroup.position.set(mobile ? -0.95 : 0, mobile ? -0.55 : 0, 0);
    camera.position.z = mobile ? 8.8 : 7.8;
  }

  window.addEventListener('resize', resize);
  resize();

  const clock = new THREE.Clock();
  function animate() {
    const elapsed = clock.getElapsedTime();
    const pointerX = (mouseX / window.innerWidth - 0.5) || 0;
    const pointerY = (mouseY / window.innerHeight - 0.5) || 0;

    knot.rotation.set(elapsed * 0.32, elapsed * 0.45, elapsed * 0.22);
    octa.rotation.set(elapsed * -0.28, elapsed * 0.36, elapsed * 0.2);
    ring.rotation.z = elapsed * 0.2;
    packets.rotation.y = elapsed * 0.025;
    packets.rotation.x = Math.sin(elapsed * 0.16) * 0.04;

    heroGroup.rotation.y += (pointerX * 0.18 - heroGroup.rotation.y) * 0.04;
    heroGroup.rotation.x += (-pointerY * 0.1 - heroGroup.rotation.x) * 0.04;
    camera.position.x += (pointerX * 0.42 - camera.position.x) * 0.03;
    camera.position.y += (-pointerY * 0.36 + 0.4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}

function initScrollAnimations() {
  gsap.from('.hero-content > *', {
    y: 26,
    opacity: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: 'power3.out',
    delay: 0.2
  });

  document.querySelectorAll('.reveal:not(.timeline-item), .section-heading, .section-kicker').forEach((element) => {
    gsap.fromTo(
      element,
      { y: 34, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 84%'
        }
      }
    );
  });

  gsap.fromTo(
    '.timeline-item',
    { x: -42, opacity: 0, rotateX: 7 },
    {
      x: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.78,
      stagger: 0.13,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top 82%'
      }
    }
  );
}

function renderCertificates() {
  stage.innerHTML = '';
  certificates.forEach((certificate, index) => {
    const offset = ((index - certIndex + certificates.length) % certificates.length);
    const normalized = offset > certificates.length / 2 ? offset - certificates.length : offset;
    const card = document.createElement('button');
    card.className = 'certificate-card';
    card.type = 'button';
    card.setAttribute('aria-label', `Preview ${certificate.title}`);
    card.style.setProperty('--offset', normalized);
    card.style.setProperty('--ratio', '1.414');
    card.style.setProperty('--cert-width', '650px');
    card.dataset.distance = Math.abs(normalized);
    card.innerHTML = `
      <img src="${certificate.image}" alt="${certificate.title}" loading="lazy" />
    `;
    card.addEventListener('click', () => {
      if (index !== certIndex) {
        moveCertificateTo(index);
        return;
      }
      dialogImage.src = certificate.image;
      dialogImage.alt = certificate.title;
      dialog.showModal();
    });
    stage.append(card);
  });

  certTitle.textContent = certificates[certIndex].title;
  certSource.textContent = certificates[certIndex].source;
}

function moveCertificate(direction) {
  moveCertificateTo((certIndex + direction + certificates.length) % certificates.length);
}

function moveCertificateTo(nextIndex) {
  if (nextIndex === certIndex) return;
  stage.classList.add('is-transitioning');
  certIndex = nextIndex;
  renderCertificates();
  window.setTimeout(() => stage.classList.remove('is-transitioning'), 720);
}

function initCertificates() {
  document.querySelector('#cert-prev').addEventListener('click', () => {
    moveCertificate(-1);
  });
  document.querySelector('#cert-next').addEventListener('click', () => {
    moveCertificate(1);
  });
  dialogClose.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  renderCertificates();
}

function initHeaderState() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 16);
  });
}

initCursor();
typeLoop();
initHeroScene();
initScrollAnimations();
initCertificates();
initHeaderState();
