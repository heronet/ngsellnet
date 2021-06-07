import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  PerspectiveCamera,
  Scene,
  FogExp2,
  BufferGeometry,
  TextureLoader,
  Float32BufferAttribute,
  PointsMaterial,
  AdditiveBlending,
  Points,
  WebGLRenderer,
  Texture
} from 'three';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

  @ViewChild('container', {
    static: true
  }) container: ElementRef;
  camera;
  scene;
  renderer;
  parameters: [
    [number, number, number], Texture, number
  ][];
  mouseX = 0;
  mouseY = 0;
  windowHalfY = window.innerHeight / 2;
  windowHalfX = window.innerWidth / 2;
  materials = [];

  ngOnInit(): void {
    this.init();
    this.animate();
  }
  init() {
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    this.camera.position.z = 1000;

    this.scene = new Scene();
    this.scene.fog = new FogExp2(0x000000, 0.0008);

    const geometry = new BufferGeometry();
    const vertices = [];

    const textureLoader = new TextureLoader();

    const sprite1 = textureLoader.load('/assets/sprites/snowflake1.png');
    const sprite2 = textureLoader.load('/assets/sprites/snowflake2.png');
    const sprite3 = textureLoader.load('/assets/sprites/snowflake3.png');
    const sprite4 = textureLoader.load('/assets/sprites/snowflake4.png');
    const sprite5 = textureLoader.load('/assets/sprites/snowflake5.png');

    for (let i = 0; i < 10000; i++) {
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;
      vertices.push(x, y, z);
    }
    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    this.parameters = [
      [
        [1.0, 0.2, 0.5], sprite2, 20
      ],
      [
        [0.95, 0.1, 0.5], sprite3, 15
      ],
      [
        [0.90, 0.05, 0.5], sprite1, 10
      ],
      [
        [0.85, 0, 0.5], sprite5, 8
      ],
      [
        [0.80, 0, 0.5], sprite4, 5
      ]
    ];
    for (let i = 0; i < this.parameters.length; i++) {
      const color = this.parameters[i][0];
      const sprite = this.parameters[i][1];
      const size = this.parameters[i][2];
      this.materials[i] = new PointsMaterial({
        size: size,
        map: sprite,
        blending: AdditiveBlending,
        depthTest: false,
        transparent: true
      });
      this.materials[i].color.setHSL(color[0], color[1], color[2]);
      const particles = new Points(geometry, this.materials[i]);
      particles.rotation.x = Math.random() * 6;
      particles.rotation.y = Math.random() * 6;
      particles.rotation.z = Math.random() * 6;
      this.scene.add(particles);
    }
    this.renderer = new WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.nativeElement.appendChild(this.renderer.domElement);
    this.container.nativeElement.style.touchAction = 'none';
    window.addEventListener('resize', () => this.onWindowResize());
  }
  onWindowResize() {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  animate() {
    requestAnimationFrame(() => this.animate());
    this.render();
  }
  render() {
    const time = Date.now() * 0.00005;
    for (let i = 0; i < this.scene.children.length; i++) {
      const object = this.scene.children[i];
      if (object instanceof Points) {
        object.rotation.z = time * (i < 4 ? i + 1 : -(i + 1));
      }
    }
    for (let i = 0; i < this.materials.length; i++) {
      const color = this.parameters[i][0];
      const h = (360 * (color[0] + time) % 360) / 360;
      this.materials[i].color.setHSL(h, color[1], color[2]);
    }
    this.renderer.render(this.scene, this.camera);
  }
}
