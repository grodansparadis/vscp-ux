
import { platformBrowser }    from '@angular/platform-browser';
import { enableProdMode }     from '@angular/core';
import { AppModuleNgFactory } from '../../../temp/app/calendar/twowaydatabinding/app.module.ngfactory';


enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);