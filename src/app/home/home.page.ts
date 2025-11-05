import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonAvatar,
  IonBadge,
  IonSpinner,
  IonText,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { RickAndMortyService } from '../services/rick-and-morty.service';
import { Character } from '../models/character.interface';
import { addIcons } from 'ionicons';
import { refreshOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonAvatar,
    IonBadge,
    IonSpinner,
    IonText,
    IonButton,
    IonIcon
  ],
})
export class HomePage implements OnInit {
  characters: Character[] = [];
  isLoading: boolean = false;
  hasError: boolean = false;
  errorMessage: string = '';

  constructor(private rickAndMortyService: RickAndMortyService) {
    addIcons({ refreshOutline });
  }

  ngOnInit() {
    this.loadCharacters();
  }

  /**
   * Carga la lista de personajes desde la API
   */
  loadCharacters() {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    this.rickAndMortyService.getCharacters().subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response && response.results) {
          this.characters = response.results;
        } else {
          this.handleError('No se pudieron cargar los personajes');
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.handleError('Error de conexión. Por favor, verifica tu conexión a internet.');
        console.error('Error al cargar personajes:', error);
      }
    });
  }

  /**
   * Maneja los errores mostrando un mensaje al usuario
   */
  private handleError(message: string) {
    this.hasError = true;
    this.errorMessage = message;
  }

  /**
   * Reintenta cargar los personajes
   */
  retry() {
    this.loadCharacters();
  }

  /**
   * Retorna la clase CSS según el estado del personaje
   */
  getStatusClass(status: string): string {
    switch(status.toLowerCase()) {
      case 'alive': return 'status-alive';
      case 'dead': return 'status-dead';
      default: return 'status-unknown';
    }
  }

  /**
   * Retorna el texto traducido del estado
   */
  getStatusText(status: string): string {
    switch(status.toLowerCase()) {
      case 'alive': return 'Vivo';
      case 'dead': return 'Muerto';
      default: return 'Desconocido';
    }
  }

  /**
   * Retorna el texto traducido del género
   */
  getGenderText(gender: string): string {
    switch(gender.toLowerCase()) {
      case 'male': return 'Masculino';
      case 'female': return 'Femenino';
      case 'genderless': return 'Sin género';
      default: return 'Desconocido';
    }
  }
}
