
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Carousel } from "./carousel/carousel";
import { Footer } from "./footer/footer";
import { Card } from "./card/card";

@Component({
  imports: [Carousel, Footer, Card],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('revisao-app');
}
