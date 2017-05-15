import 'core-js'
import 'zone.js'
import 'reflect-metadata'
import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';

// The app module
import { AppModule } from './app.module';

import {enableProdMode} from '@angular/core';
enableProdMode();

// Compile and launch the module
platformBrowserDynamic().bootstrapModule(AppModule);