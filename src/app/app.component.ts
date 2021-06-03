import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PerspectiveCamera, Scene, FogExp2, BufferGeometry, TextureLoader, Float32BufferAttribute, PointsMaterial, AdditiveBlending, Points, WebGLRenderer, Texture } from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	ngOnInit(): void {
		
	}
 
}
