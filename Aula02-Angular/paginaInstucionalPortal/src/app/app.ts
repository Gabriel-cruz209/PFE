import { Component, signal } from '@angular/core';
import { Sidebar } from './sidebar/sidebar';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { CardProduct } from './card-product/card-product';
import { HeroBanner } from './hero-banner/hero-banner';

@Component({
  imports: [ Sidebar, Footer, Header, CardProduct, HeroBanner],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('paginaInstucionalPortal');
}
