import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-69c5b","appId":"1:366009909918:web:e4fec436f26d676aacb18f","storageBucket":"simple-crm-69c5b.appspot.com","apiKey":"AIzaSyByhPUBHx2DzEyfGPhOEYpP3T1lzc2zfYo","authDomain":"simple-crm-69c5b.firebaseapp.com","messagingSenderId":"366009909918"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
